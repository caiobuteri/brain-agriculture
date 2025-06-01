import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityMetadata, Repository } from 'typeorm';
import { Farm } from '../farms/entities/farm.entity';

@Injectable()
export class FarmsRepository {
  private entityMetadata: EntityMetadata;
  private relations: string[];

  constructor(
    @InjectRepository(Farm)
    private readonly repository: Repository<Farm>,
    private readonly dataSource: DataSource,
  ) {
    this.entityMetadata = this.dataSource.getMetadata(Farm);
    this.relations = this.entityMetadata.relations.map(
      (relation) => relation.propertyName,
    );
  }

  async create(farm: Partial<Farm>): Promise<Farm> {
    const entity = this.repository.create(farm);
    return this.repository.save(entity);
  }

  async update(id: string, data: Partial<Farm>): Promise<Farm | null> {
    await this.repository.update(id, data);
    return this.repository.findOne({ where: { id } });
  }

  async save(farm: Farm): Promise<Farm> {
    return this.repository.save(farm);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findAll(): Promise<Farm[]> {
    return this.repository.find({ relations: this.relations });
  }

  async findById(id: string): Promise<Farm | null> {
    return this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
  }
}
