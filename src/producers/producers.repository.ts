// src/producers/producers.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, FindManyOptions } from 'typeorm';
import { Producer } from './entities/producer.entity';

@Injectable()
export class ProducersRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly repository: Repository<Producer>,
  ) {}

  async create(producer: Partial<Producer>): Promise<Producer> {
    const entity = this.repository.create(producer);
    return this.repository.save(entity);
  }

  async save(producer: Partial<Producer>): Promise<Producer> {
    return this.repository.save(producer);
  }

  async findAll(options?: FindManyOptions<Producer>): Promise<Producer[]> {
    return this.repository.find(options);
  }

  async findById(id: string): Promise<Producer | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['properties'],
    });
  }

  async findByDocument(document: string): Promise<Producer | null> {
    return this.repository.findOne({
      where: { document },
      relations: ['properties'],
    });
  }

  async findOne(options: FindOneOptions<Producer>): Promise<Producer | null> {
    return this.repository.findOne(options);
  }

  async update(id: string, data: Partial<Producer>): Promise<Producer | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
