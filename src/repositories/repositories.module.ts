import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from '../producers/entities/producer.entity';
import { Farm } from '../farms/entities/farm.entity';
import { FarmsRepository, ProducersRepository } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Farm])],
  providers: [ProducersRepository, FarmsRepository],
  exports: [ProducersRepository, FarmsRepository],
})
export class RepositoriesModule {}
