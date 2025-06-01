import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from './producers.service';
import { ProducersRepository } from './producers.repository';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

describe('ProducersService', () => {
  let service: ProducersService;
  let repository: ProducersRepository;

  const mockProducerCreate = {
    id: '45f4498d-a0a5-4671-8497-c7ee8cb4dafb',
    document: '12345678901',
    firstName: 'John',
    lastName: 'Doe',
  };

  const mockProducer = {
    id: '45f4498d-a0a5-4671-8497-c7ee8cb4dafb',
    document: '12345678901',
    firstName: 'John',
    lastName: 'Doe',
    farms: [],
  };

  const mockProducersRepository = {
    create: jest.fn().mockImplementation((producer) => ({
      id: '45f4498d-a0a5-4671-8497-c7ee8cb4dafb',
      ...producer,
    })),
    save: jest.fn(),
    findAll: jest.fn().mockResolvedValue([mockProducer]),
    findById: jest.fn().mockResolvedValue(mockProducer),
    findByDocument: jest.fn().mockResolvedValue(null),
    findOne: jest.fn().mockResolvedValue(mockProducer),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: ProducersRepository,
          useValue: mockProducersRepository,
        },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
    repository = module.get<ProducersRepository>(ProducersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a producer', async () => {
      const dto: CreateProducerDto = {
        document: '12345678901',
        firstName: 'John',
        lastName: 'Doe',
      };
      mockProducersRepository.findOne.mockResolvedValueOnce(null);

      const result = await service.create(dto);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockProducerCreate);
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const result = await service.findAll();
      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockProducer]);
    });
  });

  describe('findOne', () => {
    it('should return a producer by id', async () => {
      const id = '45f4498d-a0a5-4671-8497-c7ee8cb4dafb';
      const result = await service.findOne(id);
      expect(repository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProducer);
    });
  });

  describe('update', () => {
    it('should update and return the updated producer', async () => {
      const id = '45f4498d-a0a5-4671-8497-c7ee8cb4dafb';
      const dto: UpdateProducerDto = {
        firstName: 'Jane',
        lastName: 'Smith',
        document: '98765432100',
      };

      mockProducersRepository.findOne.mockResolvedValueOnce(null);
      mockProducersRepository.save = jest.fn().mockResolvedValue({
        ...mockProducer,
        ...dto,
      });

      const result = await service.update(id, dto);
      expect(repository.save).toHaveBeenCalledWith({ ...mockProducer, ...dto });
      expect(result).toEqual({ ...mockProducer, ...dto });
    });
  });

  describe('remove', () => {
    it('should remove a producer', async () => {
      const id = '45f4498d-a0a5-4671-8497-c7ee8cb4dafb';
      await expect(service.remove(id)).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
