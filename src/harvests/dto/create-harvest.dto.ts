import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateHarvestDto {
  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsUUID()
  @IsNotEmpty()
  farmId: string;
}
