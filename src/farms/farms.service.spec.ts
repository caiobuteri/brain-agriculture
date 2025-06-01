import { Test, TestingModule } from '@nestjs/testing';
import { FarmsService } from './farms.service';
import { FarmsRepository, ProducersRepository } from '../repositories';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockFarm: Farm = new Farm({
  id: 'farm-id',
  name: 'Fazenda A',
  city: 'Cidade A',
  state: 'SP',
  totalArea: 100,
  cultivableArea: 60,
  vegetationArea: 40,
  producer: { id: 'producer-id' } as any,
  harvests: [],
});

const mockFarmsRepository = {
  save: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
};

const mockProducersRepository = {
  findById: jest.fn(),
};

describe('FarmsService', () => {
  let service: FarmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmsService,
        { provide: FarmsRepository, useValue: mockFarmsRepository },
        { provide: ProducersRepository, useValue: mockProducersRepository },
      ],
    }).compile();

    service = module.get<FarmsService>(FarmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a farm if producer exists and areas are valid', async () => {
      const dto: CreateFarmDto = {
        name: 'Fazenda A',
        city: 'Cidade A',
        state: 'SP',
        totalArea: 100,
        cultivableArea: 60,
        vegetationArea: 40,
        producerId: 'producer-id',
      };

      mockProducersRepository.findById.mockResolvedValue({ id: 'producer-id' });
      mockFarmsRepository.save.mockResolvedValue(mockFarm);

      const result = await service.create(dto);

      expect(result).toEqual(mockFarm);
      expect(mockFarmsRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if producer does not exist', async () => {
      mockProducersRepository.findById.mockResolvedValue(null);

      await expect(
        service.create({ ...mockFarm, producerId: 'not-exists' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if area is invalid', async () => {
      mockProducersRepository.findById.mockResolvedValue({ id: 'producer-id' });
      const invalidDto = {
        ...mockFarm,
        cultivableArea: 80,
        vegetationArea: 30,
        totalArea: 100,
        producerId: 'producer-id',
      };

      await expect(service.create(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update a farm if it exists and area is valid', async () => {
      mockFarmsRepository.findById.mockResolvedValue({ ...mockFarm });
      mockFarmsRepository.save.mockResolvedValue({
        ...mockFarm,
        name: 'Updated',
      });

      const dto: UpdateFarmDto = { name: 'Updated' };

      const result = await service.update('farm-id', dto);

      expect(result.name).toBe('Updated');
    });

    it('should throw NotFoundException if farm does not exist', async () => {
      mockFarmsRepository.findById.mockResolvedValue(null);

      await expect(service.update('not-found', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a farm if it exists', async () => {
      mockFarmsRepository.findById.mockResolvedValue(mockFarm);
      await service.delete('farm-id');
      expect(mockFarmsRepository.delete).toHaveBeenCalledWith('farm-id');
    });

    it('should throw NotFoundException if farm does not exist', async () => {
      mockFarmsRepository.findById.mockResolvedValue(null);
      await expect(service.delete('not-found')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all farms', async () => {
      mockFarmsRepository.findAll.mockResolvedValue([mockFarm]);
      const result = await service.findAll();
      expect(result).toEqual([mockFarm]);
    });
  });

  describe('findById', () => {
    it('should return farm by id', async () => {
      mockFarmsRepository.findById.mockResolvedValue(mockFarm);
      const result = await service.findById('farm-id');
      expect(result).toEqual(mockFarm);
    });

    it('should throw NotFoundException if farm not found', async () => {
      mockFarmsRepository.findById.mockResolvedValue(null);
      await expect(service.findById('not-found')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
