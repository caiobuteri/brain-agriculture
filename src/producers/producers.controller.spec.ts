import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

const mockProducer = {
  id: '45f4498d-a0a5-4671-8497-c7ee8cb4dafb',
  document: '12345678901',
  firstName: 'John',
  lastName: 'Doe',
  farms: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProducersController', () => {
  let controller: ProducersController;
  let service: ProducersService;

  const mockProducersService = {
    create: jest.fn().mockResolvedValue(mockProducer),
    findAll: jest.fn().mockResolvedValue([mockProducer]),
    findOne: jest.fn().mockResolvedValue(mockProducer),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockProducer, firstName: 'Updated' }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        {
          provide: ProducersService,
          useValue: mockProducersService,
        },
      ],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
    service = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return a producer', async () => {
      const dto: CreateProducerDto = {
        document: '12345678901',
        firstName: 'John',
        lastName: 'Doe',
      };
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockProducer);
    });
  });

  describe('findAll', () => {
    it('should return all producers', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockProducer]);
    });
  });

  describe('findOne', () => {
    it('should return one producer by id', async () => {
      const result = await controller.findOne(mockProducer.id);
      expect(service.findOne).toHaveBeenCalledWith(mockProducer.id);
      expect(result).toEqual(mockProducer);
    });
  });

  describe('update', () => {
    it('should update and return the producer', async () => {
      const dto: UpdateProducerDto = {
        document: '12345678901',
        firstName: 'Updated',
        lastName: 'Doe',
      };
      const result = await controller.update(mockProducer.id, dto);
      expect(service.update).toHaveBeenCalledWith(mockProducer.id, dto);
      expect(result.firstName).toEqual('Updated');
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct id', async () => {
      const result = await controller.remove(mockProducer.id);
      expect(service.remove).toHaveBeenCalledWith(mockProducer.id);
      expect(result).toBeUndefined();
    });
  });
});
