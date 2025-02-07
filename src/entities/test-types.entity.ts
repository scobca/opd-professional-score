import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Test } from './test.entity';

@Table({ tableName: 'test_types' })
export class TestTypes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @NotNull
  @Column
  name: string;

  @NotNull
  @Column
  description: string;

  @HasMany(() => Test)
  tests: Test[];
}
