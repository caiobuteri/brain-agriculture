import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducersRepository } from '../repositories/producers.repository';
import { Farm } from '../farms/entities/farm.entity';
import { UsersService } from '../users/users.service';
import { DataSource } from 'typeorm';
import { RoleName } from '../role/common/roles.enum';

@Injectable()
export class ProducersService {
  constructor(
    private readonly producerRepository: ProducersRepository,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateProducerDto): Promise<Producer> {
    console.log(dto);
    return this.dataSource.transaction(async (manager) => {
      const userName = `${dto.firstName} ${dto.lastName}`;
      const user = await this.usersService.createUserWithRoleTransaction(
        { ...dto, name: userName },
        RoleName.PRODUCER,
        manager,
      );
      const producer = manager.getRepository(Producer).create({ ...dto, user });
      return manager.getRepository(Producer).save(producer);
    });
  }

  async findAll(): Promise<Producer[]> {
    return this.producerRepository.findAll();
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findById(id);

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado.');
    }

    return producer;
  }

  async update(id: string, dto: UpdateProducerDto): Promise<Producer> {
    const producer = await this.findOne(id);

    if (!producer) {
      throw new BadRequestException('Outro produtor já usa este CPF/CNPJ.');
    }

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

  async findFarmsByProducer(producerId: string): Promise<Farm[]> {
    const producer = await this.producerRepository.findById(producerId);
    if (!producer) {
      throw new NotFoundException('Produtor não encontrado');
    }

    return producer.farms || [];
  }

  private isValidCPFOrCNPJ(value: string): boolean {
    // Remover caracteres especiais
    const cleanValue = value.replace(/[^\d]+/g, '');

    // CPF tem 11 dígitos, CNPJ tem 14
    return cleanValue.length === 11 || cleanValue.length === 14;
  }
}
