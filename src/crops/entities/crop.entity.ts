import { Entity, Column, ManyToOne, JoinColumn, Unique, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Harvest } from '../../harvests/entities/harvest.entity';

@Entity()
@Index('IDX_unique_harvest_name_not_deleted', ['harvestId', 'name'], {
  unique: true,
  where: '"deletedAt" IS NULL',
})
export class Crop extends BaseEntity {
  constructor(input?: Partial<Crop>) {
    super(input);
    Object.assign(this, input);
  }

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Harvest, (harvest) => harvest.crops, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'harvestId' })
  harvest: Harvest;

  @Column()
  harvestId?: string;
}
