import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Farm } from '../../farms/entities/farm.entity';
import { User } from '../../users/entities/user.entity';

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

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => Farm, (farm) => farm.producer, { cascade: true })
  farms: Farm[];
}
