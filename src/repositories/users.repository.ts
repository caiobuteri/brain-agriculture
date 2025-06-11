import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOneOptions,
  Repository,
  FindManyOptions,
  DataSource,
  EntityMetadata,
} from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UsersRepository {
  private entityMetadata: EntityMetadata;
  private relations: string[];

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {
    this.entityMetadata = this.dataSource.getMetadata(User);
    this.relations = this.entityMetadata.relations.map(
      (relation) => relation.propertyName,
    );
  }

  async create(producer: Partial<User>): Promise<User> {
    const entity = this.repository.create(producer);
    return this.repository.save(entity);
  }

  async save(producer: Partial<User>): Promise<User> {
    return this.repository.save(producer);
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return this.repository.find({ ...options, relations: this.relations });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
  }

  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.repository.findOne({ ...options, relations: this.relations });
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
