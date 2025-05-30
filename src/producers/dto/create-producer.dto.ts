import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProducerDto {
  @IsNotEmpty({
    message: 'Campo document é obrigatório',
  })
  @IsString()
  @Length(11, 14)
  document: string;

  @IsNotEmpty({
    message: 'Campo firstName é obrigatório',
  })
  @IsString()
  firstName: string;

  @IsNotEmpty({
    message: 'Campo lastName é obrigatório',
  })
  @IsString()
  lastName: string;
}
