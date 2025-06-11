// src/role/role.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RoleName } from './common/roles.enum';
import { RolesRepository } from '../repositories';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RolesRepository) {}

  async findByName(name: RoleName): Promise<Role> {
    const role = await this.repository.findOne({ where: { name } });
    if (!role) {
      throw new NotFoundException(`Papel '${name}' não encontrado.`);
    }
    return role;
  }
}
