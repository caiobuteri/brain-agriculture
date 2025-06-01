import { Expose, Type } from 'class-transformer';
import { ProducerResponseDto } from '../../producers/dto/producer-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FarmResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  city: string;

  @ApiProperty()
  @Expose()
  state: string;

  @ApiProperty()
  @Expose()
  totalArea: number;

  @ApiProperty()
  @Expose()
  cultivableArea: number;

  @ApiProperty()
  @Expose()
  vegetationArea: number;

  @ApiProperty()
  @Expose()
  @Type(() => ProducerResponseDto)
  producer: ProducerResponseDto;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
