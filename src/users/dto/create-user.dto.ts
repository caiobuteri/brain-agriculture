import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateUserDto {
  @ApiProperty({ example: 'Caio Buteri' })
  @Transform(({ value }) => sanitizeHtml(value))
  @IsString()
  name: string;

  @ApiProperty({ example: 'caio@example.com' })
  @Transform(({ value }) => sanitizeHtml(value))
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123', minLength: 6, writeOnly: true })
  @Transform(({ value }) => sanitizeHtml(value))
  @IsString()
  @MinLength(6)
  password: string;
}
