import { Test, TestingModule } from '@nestjs/testing';
import { CropsService } from './crops.service';
import { Crop } from './entities/crop.entity';
import { Harvest } from '../harvests/entities/harvest.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CropsRepository, HarvestsRepository } from '../repositories';

describe('CropsService', () => {
  let service: CropsService;

  const mockCrop: Crop = {
    id: 'crop-uuid',
    name: 'Milho',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    harvestId: 'harvest-uuid',
    harvest: {} as Harvest,
  };

  const cropsRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const harvestsRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropsService,
        { provide: CropsRepository, useValue: cropsRepository },
        { provide: HarvestsRepository, useValue: harvestsRepository },
      ],
    }).compile();

    service = module.get(CropsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a crop', async () => {
      harvestsRepository.findById.mockResolvedValue({ id: 'harvest-uuid' });
      cropsRepository.findOne.mockResolvedValue(null);
      cropsRepository.save.mockResolvedValue(mockCrop);

      const result = await service.create({
        name: 'Milho',
        harvestId: 'harvest-uuid',
      });
      expect(result).toEqual(mockCrop);
    });

    it('should throw if harvest not found', async () => {
      harvestsRepository.findById.mockResolvedValue(null);

      await expect(
        service.create({ name: 'Milho', harvestId: 'harvest-uuid' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw if crop name already exists for harvest', async () => {
      harvestsRepository.findById.mockResolvedValue({ id: 'harvest-uuid' });
      cropsRepository.findOne.mockResolvedValue(mockCrop);

      await expect(
        service.create({ name: 'Milho', harvestId: 'harvest-uuid' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all crops', async () => {
      cropsRepository.findAll.mockResolvedValue([mockCrop]);
      const result = await service.findAll();
      expect(result).toEqual([mockCrop]);
    });
  });

  describe('findById', () => {
    it('should return a crop', async () => {
      cropsRepository.findById.mockResolvedValue(mockCrop);
      const result = await service.findById('crop-uuid');
      expect(result).toEqual(mockCrop);
    });

    it('should throw if crop not found', async () => {
      cropsRepository.findById.mockResolvedValue(null);
      await expect(service.findById('crop-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a crop', async () => {
      cropsRepository.findById.mockResolvedValue(mockCrop);
      cropsRepository.delete.mockResolvedValue(undefined);

      const result = await service.delete('crop-uuid');
      expect(result).toBeUndefined();
    });

    it('should throw if crop not found', async () => {
      cropsRepository.findById.mockResolvedValue(null);
      await expect(service.delete('crop-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
