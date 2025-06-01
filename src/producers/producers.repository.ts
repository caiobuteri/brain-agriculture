// src/producers/producers.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOneOptions,
  Repository,
  FindManyOptions,
  DataSource,
  EntityMetadata,
} from 'typeorm';
import { Producer } from './entities/producer.entity';

@Injectable()
export class ProducersRepository {
  private producerMetadata: EntityMetadata;
  private relations: string[];

  constructor(
    @InjectRepository(Producer)
    private readonly repository: Repository<Producer>,
    private readonly dataSource: DataSource,
  ) {
    this.producerMetadata = this.dataSource.getMetadata(Producer);
    this.relations = this.producerMetadata.relations.map(
      (relation) => relation.propertyName,
    );
  }

  async create(producer: Partial<Producer>): Promise<Producer> {
    const entity = this.repository.create(producer);
    return this.repository.save(entity);
  }

  async save(producer: Partial<Producer>): Promise<Producer> {
    return this.repository.save(producer);
  }

  async findAll(options?: FindManyOptions<Producer>): Promise<Producer[]> {
    return this.repository.find({ ...options, relations: this.relations });
  }

  async findById(id: string): Promise<Producer | null> {
    return this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
  }

  async findByDocument(document: string): Promise<Producer | null> {
    return this.repository.findOne({
      where: { document },
      relations: this.relations,
    });
  }

  async findOne(options: FindOneOptions<Producer>): Promise<Producer | null> {
    return this.repository.findOne({ ...options, relations: this.relations });
  }

  async update(id: string, data: Partial<Producer>): Promise<Producer | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
