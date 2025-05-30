import { Exclude, Expose } from 'class-transformer';
import { Farm } from '../../farms/entities/farm.entity';

export class ProducerResponseDto {
  @Expose()
  id: string;

  @Expose()
  document: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  farms?: Farm[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
