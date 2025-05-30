import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Crop } from '../../crops/entities/crop.entity';
import { Farm } from '../../farms/entities/farm.entity';

@Entity()
export class Harvest extends BaseEntity {
  constructor(input?: Partial<Harvest>) {
    super(input);
    Object.assign(this, input);
  }

  @Column()
  year: number;

  @ManyToOne(() => Farm, (farm) => farm.harvests, { onDelete: 'CASCADE' })
  @JoinColumn()
  farm: Farm;

  @OneToMany(() => Crop, (crop) => crop.harvest, { cascade: true })
  crops: Crop[];
}
