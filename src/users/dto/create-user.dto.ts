import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Caio Buteri' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'caio@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123', minLength: 6, writeOnly: true })
  @IsString()
  @MinLength(6)
  password: string;
}
