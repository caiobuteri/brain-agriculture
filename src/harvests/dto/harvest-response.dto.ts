import { Expose, Type } from 'class-transformer';
import { FarmResponseDto } from '../../farms/dto/farm-response.dto';

export class HarvestResponseDto {
  @Expose()
  id: string;

  @Expose()
  year: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => FarmResponseDto)
  farm?: FarmResponseDto;
}
