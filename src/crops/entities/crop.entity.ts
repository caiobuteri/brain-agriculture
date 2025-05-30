import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Harvest } from '../../harvests/entities/harvest.entity';

@Entity()
export class Crop extends BaseEntity {
  constructor(input?: Partial<Crop>) {
    super(input);
    Object.assign(this, input);
  }

  @Column()
  name: string;

  @ManyToOne(() => Harvest, (harvest) => harvest.crops, { onDelete: 'CASCADE' })
  @JoinColumn()
  harvest: Harvest;
}
