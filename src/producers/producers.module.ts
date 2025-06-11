import { Module } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [RepositoriesModule, UsersModule],
  providers: [ProducersService],
  controllers: [ProducersController],
})
export class ProducersModule {}
