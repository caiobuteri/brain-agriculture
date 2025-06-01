import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateFarmDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalArea: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cultivableArea: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  vegetationArea: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  producerId: string;
}
