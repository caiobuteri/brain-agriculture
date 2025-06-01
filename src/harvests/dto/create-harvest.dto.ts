import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateHarvestDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  farmId: string;
}
