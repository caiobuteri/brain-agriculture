import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from '../producers/entities/producer.entity';
import { Farm } from '../farms/entities/farm.entity';
import {
  CropsRepository,
  FarmsRepository,
  ProducersRepository,
  UsersRepository,
  HarvestsRepository,
  RolesRepository,
} from '.';
import { Harvest } from '../harvests/entities/harvest.entity';
import { Crop } from '../crops/entities/crop.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producer, Farm, Harvest, Crop, User, Role]),
  ],
  providers: [
    ProducersRepository,
    FarmsRepository,
    HarvestsRepository,
    CropsRepository,
    UsersRepository,
    RolesRepository,
  ],
  exports: [
    ProducersRepository,
    FarmsRepository,
    HarvestsRepository,
    CropsRepository,
    UsersRepository,
    RolesRepository,
  ],
})
export class RepositoriesModule {}
