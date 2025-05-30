// src/shared/database/base.entity.ts

import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { DeepPartial } from 'typeorm';

export abstract class BaseEntity {
  constructor(input?: DeepPartial<BaseEntity>) {
    if (input) {
      Object.assign(this, input);
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
