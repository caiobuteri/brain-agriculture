import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from '../repositories';
import { RoleName } from '../role/common/roles.enum';
import { RoleService } from '../role/role.service';
import { User } from './entities/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly roleService: RoleService,
  ) {}

  findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  findByEmail(email: string, withRoles = false) {
    return this.repository.findOne({
      where: { email },
      relations: withRoles ? ['roles'] : [],
    });
  }

  async createUser(dto: CreateUserDto) {
    const existing = await this.repository.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }

    return this.repository.create(dto); // não faz hash aqui!
  }

  async createUserWithRole(
    dto: CreateUserDto,
    roleName: RoleName,
  ): Promise<User> {
    const existing = await this.repository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const role = await this.roleService.findByName(roleName);

    return this.repository.create({
      ...dto,
      roles: [role],
    });
  }

  async createUserWithRoleTransaction(
    dto: CreateUserDto,
    roleName: RoleName,
    manager: EntityManager,
  ): Promise<User> {
    const existing = await manager.findOne(User, {
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const role = await this.roleService.findByName(roleName);

    const user = manager.create(User, {
      ...dto,
      roles: [role],
    });

    return manager.save(User, user);
  }

  async seedSuperAdmin() {
    const email = 'superadmin';
    const existing = await this.repository.findOne({ where: { email } });

    if (existing) return;

    const role = await this.roleService.findByName(RoleName.ADMIN);

    return this.repository.create({
      name: 'Super Admin',
      email,
      password: 'superadmin',
      roles: [role],
    });
  }
}
