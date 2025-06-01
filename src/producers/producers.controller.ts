import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerResponseDto } from './dto/producer-response.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { FarmResponseDto } from '../farms/dto/farm-response.dto';

@Controller('producers')
export class ProducersController {
  constructor(private readonly service: ProducersService) {}

  @Post()
  @UseInterceptors(new TransformInterceptor(ProducerResponseDto))
  create(@Body() dto: CreateProducerDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseInterceptors(new TransformInterceptor(ProducerResponseDto))
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseInterceptors(new TransformInterceptor(ProducerResponseDto))
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(new TransformInterceptor(ProducerResponseDto))
  update(@Param('id') id: string, @Body() dto: UpdateProducerDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get(':id/farms')
  @UseInterceptors(new TransformInterceptor(FarmResponseDto))
  async findFarms(@Param('id') producerId: string) {
    const farms = await this.service.findFarmsByProducer(producerId);
    return farms;
  }
}
