import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Producer } from '../../producers/entities/producer.entity';
import { Harvest } from '../../harvests/entities/harvest.entity';

@Entity()
export class Farm extends BaseEntity {
  constructor(input?: Partial<Farm>) {
    super(input);
    Object.assign(this, input);
  }

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalArea: number;

  @Column('decimal', { precision: 10, scale: 2 })
  cultivableArea: number;

  @Column('decimal', { precision: 10, scale: 2 })
  vegetationArea: number;

  @ManyToOne(() => Producer, (producer) => producer.farms, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'producerId' })
  producer: Producer;

  @OneToMany(() => Harvest, (harvest) => harvest.farm, { cascade: true })
  harvests: Harvest[];
}
