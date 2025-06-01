import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from './producers.service';
import { ProducersRepository } from '../repositories/producers.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Producer } from './entities/producer.entity';

const mockProducer: Producer = {
  id: '1',
  document: '12345678901',
  firstName: 'John',
  lastName: 'Doe',
  farms: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const mockRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('ProducersService', () => {
  let service: ProducersService;
  let repository: ProducersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        { provide: ProducersRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(ProducersService);
    repository = module.get(ProducersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a producer', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue(mockProducer);

    const result = await service.create(mockProducer);
    expect(result).toEqual(mockProducer);
    expect(repository.create).toHaveBeenCalled();
  });

  it('should throw if CPF already exists', async () => {
    mockRepository.findOne.mockResolvedValue(mockProducer);

    await expect(service.create(mockProducer)).rejects.toThrow(
      BadRequestException,
    );
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
    expect(repository.delete).toHaveBeenCalledWith('1');
  });

  it('should return farms by producer', async () => {
    mockRepository.findById.mockResolvedValue({ ...mockProducer, farms: [] });
    const result = await service.findFarmsByProducer('1');
    expect(result).toEqual([]);
  });
});
