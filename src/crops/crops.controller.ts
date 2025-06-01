import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { CropResponseDto } from './dto/crop-response.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

@UseInterceptors(new TransformInterceptor(CropResponseDto))
@Controller('crops')
export class CropsController {
  constructor(private readonly service: CropsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CropResponseDto,
  })
  create(@Body() dto: CreateCropDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiResponse({
    type: [CropResponseDto],
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: CropResponseDto,
  })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
