import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Producer } from './entities/producer.entity';
import { Farm } from '../farms/entities/farm.entity';

const mockProducer: Producer = {
  id: '123',
  document: '12345678900',
  firstName: 'John',
  lastName: 'Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  farms: [],
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

describe('ProducersController', () => {
  let controller: ProducersController;
  let service: ProducersService;

  const serviceMock = {
    create: jest.fn().mockResolvedValue(mockProducer),
    findAll: jest.fn().mockResolvedValue([mockProducer]),
    findOne: jest.fn().mockResolvedValue(mockProducer),
    update: jest.fn().mockResolvedValue(mockProducer),
    remove: jest.fn().mockResolvedValue(undefined),
    findFarmsByProducer: jest.fn().mockResolvedValue([mockFarm]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        {
          provide: ProducersService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
    service = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a producer', async () => {
    const dto: CreateProducerDto = {
      firstName: 'John',
      lastName: 'Doe',
      document: '12345678900',
    };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockProducer);
  });

  it('should return all producers', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockProducer]);
  });

  it('should return one producer', async () => {
    const result = await controller.findOne('123');
    expect(service.findOne).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockProducer);
  });

  it('should update a producer', async () => {
    const dto: UpdateProducerDto = {
      firstName: 'Jane',
      lastName: 'Smith',
      document: '09876543210',
    };
    const result = await controller.update('123', dto);
    expect(service.update).toHaveBeenCalledWith('123', dto);
    expect(result).toEqual(mockProducer);
  });

  it('should remove a producer', async () => {
    const result = await controller.remove('123');
    expect(service.remove).toHaveBeenCalledWith('123');
    expect(result).toBeUndefined();
  });

  it('should return farms of a producer', async () => {
    const result = await controller.findFarms('123');
    expect(service.findFarmsByProducer).toHaveBeenCalledWith('123');
    expect(result).toEqual([mockFarm]);
  });
});
