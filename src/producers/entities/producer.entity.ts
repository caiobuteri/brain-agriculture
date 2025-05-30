import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

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
}
