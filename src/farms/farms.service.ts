import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { FarmsRepository, ProducersRepository } from '../repositories';
import { Harvest } from '../harvests/entities/harvest.entity';

@Injectable()
export class FarmsService {
  constructor(
    private readonly farmRepository: FarmsRepository,
    private readonly producersRepository: ProducersRepository,
  ) {}

  async create(dto: CreateFarmDto): Promise<Farm> {
    const producer = await this.producersRepository.findById(dto.producerId);
    if (!producer) {
      throw new NotFoundException('Produtor não encontrado');
    }

    this.validateAreas(dto.totalArea, dto.cultivableArea, dto.vegetationArea);
    const farm = new Farm({ ...dto, producer });

    return this.farmRepository.save(farm);
  }

  async update(id: string, dto: UpdateFarmDto): Promise<Farm> {
    const existing = await this.farmRepository.findById(id);
    if (!existing) throw new NotFoundException('Fazenda não encontrada');

    this.validateAreas(
      dto.totalArea ?? existing.totalArea,
      dto.cultivableArea ?? existing.cultivableArea,
      dto.vegetationArea ?? existing.vegetationArea,
    );

    Object.assign(existing, dto);
    return this.farmRepository.save(existing);
  }

  async delete(id: string): Promise<void> {
    const farm = await this.farmRepository.findById(id);
    if (!farm) throw new NotFoundException('Fazenda não encontrada');
    await this.farmRepository.delete(id);
  }

  async findAll(): Promise<Farm[]> {
    return this.farmRepository.findAll();
  }

  async findById(id: string): Promise<Farm> {
    const farm = await this.farmRepository.findById(id);
    if (!farm) throw new NotFoundException('Fazenda não encontrada');
    return farm;
  }

  async findHarvestsByFarm(farmId: string): Promise<Harvest[]> {
    const farm = await this.farmRepository.findById(farmId);
    if (!farm) {
      throw new NotFoundException('Fazenda não encontrada');
    }

    return farm.harvests || [];
  }

  private validateAreas(
    total: number,
    cultivable: number,
    vegetation: number,
  ): void {
    const totalNum = Number(total);
    const cultivableNum = Number(cultivable);
    const vegetationNum = Number(vegetation);

    if (cultivableNum + vegetationNum > totalNum) {
      throw new BadRequestException(
        'Soma das áreas agricultável e de vegetação excede a área total',
      );
    }
  }
}
