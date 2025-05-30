// src/producers/producers.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<Producer[]> {
    return this.repository.find({ relations: ['properties'] });
  }

  async findById(id: string): Promise<Producer | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['properties'],
    });
  }

  async update(id: string, data: Partial<Producer>): Promise<Producer | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
