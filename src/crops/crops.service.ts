import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { CropsRepository, HarvestsRepository } from '../repositories';
import { Crop } from './entities/crop.entity';

@Injectable()
export class CropsService {
  constructor(
    private readonly cropsRepository: CropsRepository,
    private readonly harvestsRepository: HarvestsRepository,
  ) {}

  async create(dto: CreateCropDto): Promise<Crop> {
    const harvest = await this.harvestsRepository.findById(dto.harvestId);
    if (!harvest) {
      throw new NotFoundException('Safra não encontrada');
    }

    const existing = await this.cropsRepository.findOne({
      where: {
        name: dto.name,
        harvest: { id: dto.harvestId },
      },
    });

    console.log({ existing });

    if (existing) {
      throw new BadRequestException(
        'Já existe uma cultura com este nome nesta safra.',
      );
    }

    const crop = new Crop({ name: dto.name, harvest });
    return this.cropsRepository.save(crop);
  }

  async findAll(): Promise<Crop[]> {
    return this.cropsRepository.findAll();
  }

  async findById(id: string): Promise<Crop> {
    const crop = await this.cropsRepository.findById(id);
    if (!crop) throw new NotFoundException('Cultura não encontrada');
    return crop;
  }

  async delete(id: string): Promise<void> {
    const crop = await this.findById(id);
    await this.cropsRepository.delete(crop.id);
  }
}
