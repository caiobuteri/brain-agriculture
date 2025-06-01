import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Crop } from '../../crops/entities/crop.entity';
import { Farm } from '../../farms/entities/farm.entity';

@Entity()
@Unique(['farm', 'year'])
export class Harvest extends BaseEntity {
  constructor(input?: Partial<Harvest>) {
    super(input);
    Object.assign(this, input);
  }

  @Column({ nullable: false })
  year: number;

  @ManyToOne(() => Farm, (farm) => farm.harvests, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @OneToMany(() => Crop, (crop) => crop.harvest, { cascade: true })
  crops: Crop[];
}
