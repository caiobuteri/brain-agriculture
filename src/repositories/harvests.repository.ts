import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  DataSource,
  EntityMetadata,
  FindManyOptions,
} from 'typeorm';
import { Harvest } from '../harvests/entities/harvest.entity';

@Injectable()
export class HarvestsRepository {
  private entityMetadata: EntityMetadata;
  private relations: string[];

  constructor(
    @InjectRepository(Harvest)
    private readonly repository: Repository<Harvest>,
    private readonly dataSource: DataSource,
  ) {
    this.entityMetadata = this.dataSource.getMetadata(Harvest);
    this.relations = this.entityMetadata.relations.map(
      (relation) => relation.propertyName,
    );
  }

  create(data: Partial<Harvest>): Harvest {
    return this.repository.create(data);
  }

  save(harvest: Harvest): Promise<Harvest> {
    return this.repository.save(harvest);
  }

  findAll(options?: FindManyOptions<Harvest>): Promise<Harvest[]> {
    return this.repository.find({ ...options, relations: this.relations });
  }

  findOne(options?: FindOneOptions<Harvest>): Promise<Harvest | null> {
    return this.repository.findOne({ ...options, relations: this.relations });
  }

  findById(id: string): Promise<Harvest | null> {
    return this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
