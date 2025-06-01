import { Test, TestingModule } from '@nestjs/testing';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { Crop } from './entities/crop.entity';

const mockCrop: Crop = {
  id: 'crop-uuid',
  name: 'Milho',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  harvest: { id: 'harvest-uuid' } as any,
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
