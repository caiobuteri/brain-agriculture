import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducersRepository } from './producers.repository';

@Injectable()
export class ProducersService {
  constructor(private readonly producerRepository: ProducersRepository) {}

  async create(dto: CreateProducerDto): Promise<Producer> {
    // Validação de CPF/CNPJ duplicado
    const exists = await this.producerRepository.findOne({
      where: { document: dto.document },
    });
    if (exists) {
      throw new BadRequestException('CPF ou CNPJ já cadastrado.');
    }

    // Validação de formato básico de CPF/CNPJ (opcional)
    if (!this.isValidCPFOrCNPJ(dto.document)) {
      throw new BadRequestException('CPF ou CNPJ inválido.');
    }

    return this.producerRepository.create(dto);
  }

  async findAll(): Promise<Producer[]> {
    return this.producerRepository.findAll();
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findOne({
      where: { id },
      relations: ['farms'],
    });

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado.');
    }

    return producer;
  }

  async update(id: string, dto: UpdateProducerDto): Promise<Producer> {
    const producer = await this.findOne(id);

    if (dto.document && dto.document !== producer.document) {
      // Verifica duplicidade
      const existing = await this.producerRepository.findOne({
        where: { document: dto.document },
      });
      if (existing) {
        throw new BadRequestException('Outro produtor já usa este CPF/CNPJ.');
      }

      // Valida novo CPF/CNPJ
      if (!this.isValidCPFOrCNPJ(dto.document)) {
        throw new BadRequestException('CPF ou CNPJ inválido.');
      }
    }

    Object.assign(producer, dto);
    return this.producerRepository.save(producer);
  }

  async remove(id: string): Promise<void> {
    const producer = await this.findOne(id);
    await this.producerRepository.delete(producer.id);
  }

  private isValidCPFOrCNPJ(value: string): boolean {
    // Remover caracteres especiais
    const cleanValue = value.replace(/[^\d]+/g, '');

    // CPF tem 11 dígitos, CNPJ tem 14
    return cleanValue.length === 11 || cleanValue.length === 14;
  }
}
