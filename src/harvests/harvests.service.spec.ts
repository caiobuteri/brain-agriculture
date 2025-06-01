import { Test, TestingModule } from '@nestjs/testing';
import { HarvestsService } from './harvests.service';
import { HarvestsRepository, FarmsRepository } from '../repositories';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { Harvest } from './entities/harvest.entity';
import { Farm } from '../farms/entities/farm.entity';
import { Producer } from '../producers/entities/producer.entity';

describe('HarvestsService', () => {
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
    producer: mockProducer,
    harvests: [],
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

  const harvestsRepository = {
    findOne: jest.fn(),
    findAll: jest.fn().mockResolvedValue([mockHarvest]),
    findById: jest.fn(),
    save: jest.fn().mockResolvedValue(mockHarvest),
    delete: jest.fn(),
  };

  const farmsRepository = {
    findById: jest.fn().mockResolvedValue(mockFarm),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestsService,
        { provide: HarvestsRepository, useValue: harvestsRepository },
        { provide: FarmsRepository, useValue: farmsRepository },
      ],
    }).compile();

    service = module.get<HarvestsService>(HarvestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new harvest', async () => {
      harvestsRepository.findOne.mockResolvedValue(null);

      const dto: CreateHarvestDto = {
        year: 2024,
        farmId: 'farm-id',
      };

      const result = await service.create(dto);
      expect(farmsRepository.findById).toHaveBeenCalledWith('farm-id');
      expect(harvestsRepository.findOne).toHaveBeenCalled();
      expect(harvestsRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockHarvest);
    });

    it('should throw if farm does not exist', async () => {
      farmsRepository.findById.mockResolvedValue(null);

      const dto: CreateHarvestDto = {
        year: 2024,
        farmId: 'invalid-farm-id',
      };

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it('should throw if harvest already exists for farm and year', async () => {
      farmsRepository.findById.mockResolvedValue(mockFarm); // ✅ Garante que a fazenda existe
      harvestsRepository.findOne.mockResolvedValue(mockHarvest); // ✅ Já existe uma safra

      const dto: CreateHarvestDto = {
        year: 2024,
        farmId: 'farm-id',
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException); // ✅ Agora vai passar
    });
  });

  describe('findAll', () => {
    it('should return all harvests', async () => {
      const result = await service.findAll();
      expect(harvestsRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockHarvest]);
    });
  });

  describe('findById', () => {
    it('should return harvest by id', async () => {
      harvestsRepository.findById.mockResolvedValue(mockHarvest);
      const result = await service.findById('harvest-id');
      expect(result).toEqual(mockHarvest);
    });

    it('should throw if harvest not found', async () => {
      harvestsRepository.findById.mockResolvedValue(null);
      await expect(service.findById('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete harvest by id', async () => {
      harvestsRepository.findById.mockResolvedValue(mockHarvest);
      await service.delete('harvest-id');
      expect(harvestsRepository.delete).toHaveBeenCalledWith('harvest-id');
    });

    it('should throw if harvest not found', async () => {
      harvestsRepository.findById.mockResolvedValue(null);
      await expect(service.delete('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
