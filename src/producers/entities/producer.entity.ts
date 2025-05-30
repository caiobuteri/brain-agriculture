import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Farm } from '../../farms/entities/farm.entity';

@Entity()
export class Producer extends BaseEntity {
  constructor(input?: Partial<Producer>) {
    super(input);
    Object.assign(this, input);
  }

  @Column({ length: 14, type: 'varchar' })
  document: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @OneToMany(() => Farm, (farm) => farm.producer, { cascade: true })
  farms: Farm[];
}
