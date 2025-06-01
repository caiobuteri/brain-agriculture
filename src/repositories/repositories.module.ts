import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersRepository } from './producers.repository';
import { FarmsRepository } from './farms.repository';
import { Producer } from '../producers/entities/producer.entity';
import { Farm } from '../farms/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Farm])],
  providers: [ProducersRepository, FarmsRepository],
  exports: [ProducersRepository, FarmsRepository],
})
export class RepositoriesModule {}
