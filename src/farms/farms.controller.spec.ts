import { Test, TestingModule } from '@nestjs/testing';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { Producer } from '../producers/entities/producer.entity';
import { User } from '../users/entities/user.entity';
import { RoleName } from '../role/common/roles.enum';
import { Role } from '../role/entities/role.entity';

export const mockUser: Partial<User> = {
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
  id: 'producer-uuid',
  document: '12345678901',
  firstName: 'João',
  lastName: 'Silva',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  farms: [],
  user: mockUser as User,
};

const mockFarm: Farm = {
  id: 'farm-uuid',
  name: 'Fazenda Santa Luzia',
  city: 'Ribeirão Preto',
  state: 'SP',
  totalArea: 150,
  cultivableArea: 90,
  vegetationArea: 60,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  producer: mockProducer,
  harvests: [],
};

const mockFarmsService = {
  create: jest.fn().mockResolvedValue(mockFarm),
  findAll: jest.fn().mockResolvedValue([mockFarm]),
  findById: jest.fn().mockResolvedValue(mockFarm),
  update: jest.fn().mockResolvedValue(mockFarm),
  delete: jest.fn().mockResolvedValue(undefined),
};

describe('FarmsController', () => {
  let controller: FarmsController;
  let service: FarmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmsController],
      providers: [
        {
          provide: FarmsService,
          useValue: mockFarmsService,
        },
      ],
    }).compile();

    controller = module.get<FarmsController>(FarmsController);
    service = module.get<FarmsService>(FarmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a farm', async () => {
    const dto: CreateFarmDto = {
      name: 'Fazenda Santa Luzia',
      city: 'Ribeirão Preto',
      state: 'SP',
      totalArea: 150,
      cultivableArea: 90,
      vegetationArea: 60,
      producerId: 'producer-uuid',
    };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockFarm);
  });

  it('should return all farms', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockFarm]);
  });

  it('should return a farm by id', async () => {
    const id = 'farm-uuid';
    const result = await controller.findById(id);
    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockFarm);
  });

  it('should update a farm', async () => {
    const id = 'farm-uuid';
    const dto: UpdateFarmDto = {
      name: 'Nova Fazenda',
    };
    const result = await controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(mockFarm);
  });

  it('should delete a farm', async () => {
    const id = 'farm-uuid';
    const result = await controller.delete(id);
    expect(service.delete).toHaveBeenCalledWith(id);
    expect(result).toBeUndefined();
  });
});
