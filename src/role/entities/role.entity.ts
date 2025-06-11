import { Entity, Column, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Adjust the import path as necessary
import { BaseEntity } from '../../common/entities/base.entity';
import { RoleName } from '../common/roles.enum';

@Entity()
export class Role extends BaseEntity {
  @Column({ type: 'enum', unique: true, enum: RoleName })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
