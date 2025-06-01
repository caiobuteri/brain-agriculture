import { Expose } from 'class-transformer';

export class CropResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  harvestId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
