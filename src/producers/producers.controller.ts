import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerResponseDto } from './dto/producer-response.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { FarmResponseDto } from '../farms/dto/farm-response.dto';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../role/common/roles.guard';
import { RoleName } from '../role/common/roles.enum';
import { Roles } from '../role/common/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('producers')
export class ProducersController {
  constructor(private readonly service: ProducersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ProducerResponseDto,
  })
  @UseInterceptors(new TransformInterceptor(ProducerResponseDto))
  create(@Body() dto: CreateProducerDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiResponse({
    type: [ProducerResponseDto],
  })
  @UseInterceptors(new TransformInterceptor(ProducerResponseDto))
  findAll() {
    return this.service.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleName.PRODUCER)
  @ApiOperation({ summary: 'Retorna os dados do produtor autenticado' })
  @ApiResponse({ status: 200, description: 'Dados retornados com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  async findMe(@Request() req) {
    return this.service.findByUserId(req.user.id);
  }

  @Get(':id')
  @ApiResponse({
    type: ProducerResponseDto,
  })
  @UseInterceptors(new TransformInterceptor(ProducerResponseDto))
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ProducerResponseDto,
  })
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
