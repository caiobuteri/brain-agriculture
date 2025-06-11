import { Test, TestingModule } from '@nestjs/testing';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { Crop } from './entities/crop.entity';
import { Farm } from '../farms/entities/farm.entity';
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

const mockCrop: Crop = {
  id: 'crop-uuid',
  name: 'Milho',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  harvest: {
    id: 'harvest-uuid',
    crops: [],
    farm: mockFarm,
    year: 2023,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  harvestId: 'harvest-uuid',
};

describe('CropsController', () => {
  let controller: CropsController;
  let service: CropsService;

  const serviceMock = {
    create: jest.fn().mockResolvedValue(mockCrop),
    findAll: jest.fn().mockResolvedValue([mockCrop]),
    findById: jest.fn().mockResolvedValue(mockCrop),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropsController],
      providers: [
        {
          provide: CropsService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get(CropsController);
    service = module.get(CropsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a crop', async () => {
    const dto = { name: 'Milho', harvestId: 'harvest-uuid' };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockCrop);
  });

  it('should return all crops', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockCrop]);
  });

  it('should return a crop by id', async () => {
    const result = await controller.findById('crop-uuid');
    expect(result).toEqual(mockCrop);
  });

  it('should delete a crop', async () => {
    const result = await controller.delete('crop-uuid');
    expect(result).toBeUndefined();
  });
});
