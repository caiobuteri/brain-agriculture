import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from '../producers/entities/producer.entity';
import { Farm } from '../farms/entities/farm.entity';
import { CropsRepository, FarmsRepository, ProducersRepository } from '.';
import { HarvestsRepository } from './harvests.repository';
import { Harvest } from '../harvests/entities/harvest.entity';
import { Crop } from '../crops/entities/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Farm, Harvest, Crop])],
  providers: [
    ProducersRepository,
    FarmsRepository,
    HarvestsRepository,
    CropsRepository,
  ],
  exports: [
    ProducersRepository,
    FarmsRepository,
    HarvestsRepository,
    CropsRepository,
  ],
})
export class RepositoriesModule {}
