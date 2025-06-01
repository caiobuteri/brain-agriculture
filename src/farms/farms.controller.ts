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

@UseInterceptors(new TransformInterceptor(FarmResponseDto))
@Controller('farms')
export class FarmsController {
  constructor(private readonly service: FarmsService) {}

  @Post()
  create(@Body() dto: CreateFarmDto) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFarmDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
