import { Farm } from '../../farms/entities/farm.entity';

export class ProducerResponseDto {
  id: string;
  document: string;
  firstName: string;
  lastName: string;
  farms?: Farm[];
  createdAt: Date;
  updatedAt: Date;
}
