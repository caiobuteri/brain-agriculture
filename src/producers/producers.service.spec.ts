import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from './producers.service';
import { ProducersRepository } from '../repositories/producers.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Producer } from './entities/producer.entity';
import { User } from '../users/entities/user.entity';
import { RoleName } from '../role/common/roles.enum';
import { Role } from '../role/entities/role.entity';
import { UsersService } from '../users/users.service';
import { DataSource, EntityManager } from 'typeorm';

const mockUser: Partial<User> = {
  id: 'user-uuid',
  name: 'João Silva',
  email: 'joao@example.com',
  password: 'hashed-password',
  roles: [
    {
      id: 'role-id',
      name: RoleName.PRODUCER,
      users: [], // circular ref, pode ser omitido em testes
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    } as Role,
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const mockProducer: Producer = {
  id: '1',
  document: '12345678901',
  firstName: 'John',
  lastName: 'Doe',
  farms: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  user: mockUser as User,
};

const mockRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockRepoFromManager = {
  findOne: jest.fn(),
  create: jest.fn().mockImplementation((data: Partial<Producer>) => data),
  save: jest.fn().mockImplementation((data: Partial<Producer>) => ({
    ...data,
    id: 'producer-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  })),
};

describe('ProducersService', () => {
  let service: ProducersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: ProducersRepository,
          useValue: mockRepository,
        },
        {
          provide: UsersService,
          useValue: {
            createUserWithRoleTransaction: jest.fn().mockResolvedValue({
              id: 'user-uuid',
              name: 'João Silva',
              email: 'joao@example.com',
              password: 'hashed-password',
              roles: [],
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
            }),
          },
        },
        {
          provide: DataSource,
          useValue: {
            transaction: jest
              .fn()
              .mockImplementation(
                async (cb: (manager: EntityManager) => Promise<Producer>) => {
                  const mockEntityManager: Partial<EntityManager> = {
                    getRepository: jest
                      .fn()
                      .mockReturnValue(mockRepoFromManager),
                  };
                  return cb(mockEntityManager as EntityManager);
                },
              ),
          },
        },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a producer', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue(mockProducer);

    const result = await service.create({
      ...mockProducer,
      email: mockUser.email!,
      password: mockUser.password!,
    });
    expect(result).toMatchObject({
      document: mockProducer.document,
      firstName: mockProducer.firstName,
      lastName: mockProducer.lastName,
      user: {
        id: 'user-uuid',
        email: 'joao@example.com',
      },
    });

    expect(mockRepoFromManager.create).toHaveBeenCalled();
  });

  it('should throw if CPF already exists', async () => {
    mockRepoFromManager.findOne.mockResolvedValue(mockProducer);

    await expect(
      service.create({
        ...mockProducer,
        email: mockUser.email!,
        password: mockUser.password!,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should return all producers', async () => {
    mockRepository.findAll.mockResolvedValue([mockProducer]);
    const result = await service.findAll();
    expect(result).toEqual([mockProducer]);
  });

  it('should return one producer', async () => {
    mockRepository.findById.mockResolvedValue(mockProducer);
    const result = await service.findOne('1');
    expect(result).toEqual(mockProducer);
  });

  it('should throw if producer not found', async () => {
    mockRepository.findById.mockResolvedValue(null);
    await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
  });

  it('should update a producer', async () => {
    mockRepository.findById.mockResolvedValue(mockProducer);
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.save.mockResolvedValue({
      ...mockProducer,
      firstName: 'Jane',
    });

    const result = await service.update('1', { firstName: 'Jane' });
    expect(result.firstName).toBe('Jane');
  });

  it('should remove a producer', async () => {
    mockRepository.findById.mockResolvedValue(mockProducer);
    await service.remove('1');
    expect(mockRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should return farms by producer', async () => {
    mockRepository.findById.mockResolvedValue({ ...mockProducer, farms: [] });
    const result = await service.findFarmsByProducer('1');
    expect(result).toEqual([]);
  });
});
