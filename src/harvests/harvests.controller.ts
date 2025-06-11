import {
  Controller,
  Post,
  Get,
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
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { CropResponseDto } from '../crops/dto/crop-response.dto';

@UseInterceptors(new TransformInterceptor(HarvestResponseDto))
@Controller('harvests')
export class HarvestsController {
  constructor(private readonly service: HarvestsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: HarvestResponseDto,
  })
  create(@Body() dto: CreateHarvestDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiResponse({
    type: [HarvestResponseDto],
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: HarvestResponseDto,
  })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get(':id/crops')
  @ApiResponse({
    type: [CropResponseDto],
  })
  async findCrops(@Param('id') harvestId: string): Promise<Crop[]> {
    return this.service.findCropsByHarvest(harvestId);
  }
}
