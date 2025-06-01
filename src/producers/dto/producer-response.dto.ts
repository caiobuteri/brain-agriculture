import { Expose } from 'class-transformer';
import { Farm } from '../../farms/entities/farm.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProducerResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  document: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty({
    type: [Farm],
  })
  @Expose()
  farms?: Farm[];

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
