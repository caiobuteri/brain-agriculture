import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from '../repositories';
import { RoleName } from '../role/common/roles.enum';
import { RoleService } from '../role/role.service';

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

  async createWithRole(dto: CreateUserDto, roleName: RoleName) {
    const exists = await this.repository.findOne({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException('E-mail já cadastrado');

    const role = await this.roleService.findByName(roleName);

    return this.repository.create({ ...dto, roles: [role] });
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
