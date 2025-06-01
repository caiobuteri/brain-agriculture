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
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { FarmResponseDto } from './dto/farm-response.dto';
import { HarvestResponseDto } from '../harvests/dto/harvest-response.dto';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

@UseInterceptors(new TransformInterceptor(FarmResponseDto))
@Controller('farms')
export class FarmsController {
  constructor(private readonly service: FarmsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: FarmResponseDto,
  })
  create(@Body() dto: CreateFarmDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: [FarmResponseDto],
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: FarmResponseDto,
  })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFarmDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get(':id/harvests')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: [HarvestResponseDto],
  })
  @UseInterceptors(new TransformInterceptor(HarvestResponseDto))
  async findHarvests(@Param('id') farmId: string) {
    return this.service.findHarvestsByFarm(farmId);
  }
}
