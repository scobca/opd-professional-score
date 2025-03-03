import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
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

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @HasMany(() => Test, { onDelete: 'CASCADE' })
  tests: Test[];
}
