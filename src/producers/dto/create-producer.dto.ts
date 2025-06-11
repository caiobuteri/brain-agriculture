import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateProducerDto extends OmitType(CreateUserDto, [
  'name',
] as const) {
  @ApiProperty()
  @Transform(({ value }) => sanitizeHtml(value))
  @IsNotEmpty({
    message: 'Campo firstName é obrigatório',
  })
  @IsString()
  firstName: string;

  @ApiProperty()
  @Transform(({ value }) => sanitizeHtml(value))
  @IsNotEmpty({
    message: 'Campo lastName é obrigatório',
  })
  @IsString()
  lastName: string;

  @ApiProperty()
  @Transform(({ value }) => sanitizeHtml(value))
  @IsString()
  document: string;
}
