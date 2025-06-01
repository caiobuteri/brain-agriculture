import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from '../producers/entities/producer.entity';
import { Farm } from '../farms/entities/farm.entity';
import { FarmsRepository, ProducersRepository } from '.';
import { HarvestsRepository } from './harvests.repository';
import { Harvest } from '../harvests/entities/harvest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Farm, Harvest])],
  providers: [ProducersRepository, FarmsRepository, HarvestsRepository],
  exports: [ProducersRepository, FarmsRepository, HarvestsRepository],
})
export class RepositoriesModule {}
