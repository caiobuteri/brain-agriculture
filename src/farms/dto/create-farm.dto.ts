import { IsNotEmpty, IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateFarmDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsNumber()
  totalArea: number;

  @IsNotEmpty()
  @IsNumber()
  cultivableArea: number;

  @IsNotEmpty()
  @IsNumber()
  vegetationArea: number;

  @IsNotEmpty()
  @IsUUID()
  producerId: string;
}
