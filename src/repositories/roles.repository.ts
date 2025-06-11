import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOneOptions,
  Repository,
  FindManyOptions,
  DataSource,
  EntityMetadata,
} from 'typeorm';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class RolesRepository {
  private entityMetadata: EntityMetadata;
  private relations: string[];

  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {
    this.entityMetadata = this.dataSource.getMetadata(Role);
    this.relations = this.entityMetadata.relations.map(
      (relation) => relation.propertyName,
    );
  }

  async findOne(options: FindOneOptions<Role>): Promise<Role | null> {
    return this.repository.findOne({ ...options, relations: this.relations });
  }
}
