import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/common/roles.decorator';
import { RoleName } from '../role/common/roles.enum';
import { RolesGuard } from '../role/common/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de usuário (signup)' })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'E-mail já cadastrado' })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.createUser(dto);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Post('producers')
  @ApiOperation({ summary: 'Criação de produtor' })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'E-mail já cadastrado' })
  async createProducer(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.createWithRole(dto, RoleName.PRODUCER);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Post('admins')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleName.ADMIN)
  @ApiOperation({ summary: 'Criação de admin (somente para admins)' })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'E-mail já cadastrado' })
  async createAdmin(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.createWithRole(dto, RoleName.ADMIN);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
