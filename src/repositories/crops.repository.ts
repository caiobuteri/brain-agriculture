import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  EntityMetadata,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { Crop } from '../crops/entities/crop.entity';

@Injectable()
export class CropsRepository {
  private entityMetadata: EntityMetadata;
  private relations: string[];

  constructor(
    @InjectRepository(Crop)
    private readonly repository: Repository<Crop>,
    private readonly dataSource: DataSource,
  ) {
    this.entityMetadata = this.dataSource.getMetadata(Crop);
    this.relations = this.entityMetadata.relations.map(
      (relation) => relation.propertyName,
    );
  }

  async create(crop: Partial<Crop>): Promise<Crop> {
    const entity = this.repository.create(crop);
    return this.repository.save(entity);
  }

  async update(id: string, data: Partial<Crop>): Promise<Crop | null> {
    await this.repository.update(id, data);
    return this.repository.findOne({ where: { id } });
  }

  async save(crop: Crop): Promise<Crop> {
    return this.repository.save(crop);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findOne(options?: FindOneOptions<Crop>): Promise<Crop | null> {
    return this.repository.findOne({ ...options, relations: this.relations });
  }

  async findAll(options?: FindManyOptions<Crop>): Promise<Crop[]> {
    return this.repository.find({ ...options, relations: this.relations });
  }

  async findById(id: string): Promise<Crop | null> {
    return this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
  }
}
