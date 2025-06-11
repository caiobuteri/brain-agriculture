import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateProducerDto extends OmitType(CreateUserDto, [
  'name',
] as const) {
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

  @ApiProperty()
  @IsString()
  document: string;
}
