import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { HarvestsService } from './harvests.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { HarvestResponseDto } from './dto/harvest-response.dto';
import { Crop } from '../crops/entities/crop.entity';

@UseInterceptors(new TransformInterceptor(HarvestResponseDto))
@Controller('harvests')
export class HarvestsController {
  constructor(private readonly service: HarvestsService) {}

  @Post()
  create(@Body() dto: CreateHarvestDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get(':id/crops')
  async findCrops(@Param('id') harvestId: string): Promise<Crop[]> {
    return this.service.findCropsByHarvest(harvestId);
  }
}
