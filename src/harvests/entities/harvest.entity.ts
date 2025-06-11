import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Crop } from '../../crops/entities/crop.entity';
import { Farm } from '../../farms/entities/farm.entity';

@Entity()
@Index('IDX_unique_farm_year_not_deleted', ['farmId', 'year'], {
  unique: true,
  where: '"deletedAt" IS NULL',
})
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

  @Column()
  farmId?: string;

  @OneToMany(() => Crop, (crop) => crop.harvest, { cascade: true })
  crops: Crop[];
}
