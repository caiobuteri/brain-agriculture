import { Expose, Type } from 'class-transformer';
import { FarmResponseDto } from '../../farms/dto/farm-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class HarvestResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  year: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => FarmResponseDto)
  farm?: FarmResponseDto;
}
