import { Test, TestingModule } from '@nestjs/testing';
import { HarvestsController } from './harvests.controller';
import { HarvestsService } from './harvests.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { Harvest } from './entities/harvest.entity';
import { Farm } from '../farms/entities/farm.entity';
import { Producer } from '../producers/entities/producer.entity';

describe('HarvestsController', () => {
  let controller: HarvestsController;
  let service: HarvestsService;

  const mockProducer: Producer = {
    id: 'producer-uuid',
    document: '12345678901',
    firstName: 'João',
    lastName: 'Silva',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    farms: [],
  };

  const mockFarm: Farm = {
    id: 'farm-id',
    name: 'Fazenda Modelo',
    city: 'Cidade X',
    state: 'SP',
    totalArea: 100,
    cultivableArea: 70,
    vegetationArea: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    harvests: [],
    producer: mockProducer,
  };

  const mockHarvest: Harvest = {
    id: 'harvest-id',
    year: 2024,
    farm: mockFarm,
    crops: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockHarvest),
    findAll: jest.fn().mockResolvedValue([mockHarvest]),
    findById: jest.fn().mockResolvedValue(mockHarvest),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestsController],
      providers: [
        {
          provide: HarvestsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<HarvestsController>(HarvestsController);
    service = module.get<HarvestsService>(HarvestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a harvest', async () => {
    const dto: CreateHarvestDto = {
      year: 2024,
      farmId: 'farm-id',
    };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockHarvest);
  });

  it('should return all harvests', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockHarvest]);
  });

  it('should return one harvest by id', async () => {
    const result = await controller.findById('harvest-id');
    expect(service.findById).toHaveBeenCalledWith('harvest-id');
    expect(result).toEqual(mockHarvest);
  });

  it('should delete a harvest by id', async () => {
    const result = await controller.delete('harvest-id');
    expect(service.delete).toHaveBeenCalledWith('harvest-id');
    expect(result).toBeUndefined();
  });
});
