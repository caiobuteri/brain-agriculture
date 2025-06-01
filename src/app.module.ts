import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './shared/database/postgres.module';
import { ConfigModule } from '@nestjs/config';
import { ProducersModule } from './producers/producers.module';
import { FarmsModule } from './farms/farms.module';
import { HarvestsModule } from './harvests/harvests.module';
import { CropsModule } from './crops/crops.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule,
    RepositoriesModule,
    ProducersModule,
    FarmsModule,
    HarvestsModule,
    CropsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
