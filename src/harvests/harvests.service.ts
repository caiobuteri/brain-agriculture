import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { Harvest } from './entities/harvest.entity';
import { HarvestsRepository, FarmsRepository } from '../repositories';
import { Crop } from '../crops/entities/crop.entity';

@Injectable()
export class HarvestsService {
  constructor(
    private readonly harvestsRepository: HarvestsRepository,
    private readonly farmsRepository: FarmsRepository,
  ) {}

  async create(dto: CreateHarvestDto): Promise<Harvest> {
    const farm = await this.farmsRepository.findById(dto.farmId);
    if (!farm) {
      throw new NotFoundException('Fazenda não encontrada');
    }

    // Verifica se já existe uma safra para a mesma fazenda e ano
    const existing = await this.harvestsRepository.findOne({
      where: {
        farm: { id: dto.farmId },
        year: dto.year,
      },
      relations: ['farm'],
    });

    if (existing) {
      throw new BadRequestException(
        'Já existe uma safra cadastrada para esta fazenda neste ano.',
      );
    }

    const harvest = new Harvest({
      year: dto.year,
      farm,
    });

    return this.harvestsRepository.save(harvest);
  }

  async findAll(): Promise<Harvest[]> {
    return this.harvestsRepository.findAll();
  }

  async findById(id: string): Promise<Harvest> {
    const harvest = await this.harvestsRepository.findById(id);
    if (!harvest) throw new NotFoundException('Safra não encontrada');
    return harvest;
  }

  async delete(id: string): Promise<void> {
    const harvest = await this.harvestsRepository.findById(id);
    if (!harvest) throw new NotFoundException('Safra não encontrada');
    await this.harvestsRepository.delete(id);
  }

  async findCropsByHarvest(harvestId: string): Promise<Crop[]> {
    const harvest = await this.harvestsRepository.findById(harvestId);
    if (!harvest) {
      throw new NotFoundException('Safra não encontrada');
    }

    return harvest.crops || [];
  }
}
