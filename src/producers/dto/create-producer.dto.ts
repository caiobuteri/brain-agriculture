import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo document é obrigatório',
  })
  @IsString()
  @Length(11, 14)
  document: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo firstName é obrigatório',
  })
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo lastName é obrigatório',
  })
  @IsString()
  lastName: string;
}
