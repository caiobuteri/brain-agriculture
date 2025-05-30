import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './shared/database/postgres.module';
import { ConfigModule } from '@nestjs/config';
import { ProducersModule } from './producers/producers.module';
import { FarmsModule } from './farms/farms.module';
import { HarvestsModule } from './harvests/harvests.module';
import { CropsModule } from './crops/crops.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule,
    ProducersModule,
    FarmsModule,
    HarvestsModule,
    CropsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
