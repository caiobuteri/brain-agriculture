import { Module } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';
import { ProducersRepository } from './producers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  providers: [ProducersService, ProducersRepository],
  controllers: [ProducersController],
})
export class ProducersModule {}
