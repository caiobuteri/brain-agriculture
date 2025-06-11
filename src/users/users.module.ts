import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UsersController } from './users.controller';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [RepositoriesModule, RoleModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
