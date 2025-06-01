import { Expose, Type } from 'class-transformer';
import { ProducerResponseDto } from '../../producers/dto/producer-response.dto';

export class FarmResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  state: string;

  @Expose()
  totalArea: number;

  @Expose()
  cultivableArea: number;

  @Expose()
  vegetationArea: number;

  @Expose()
  @Type(() => ProducerResponseDto)
  producer: ProducerResponseDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
