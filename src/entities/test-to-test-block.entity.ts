import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Test } from './test.entity';
import { TestBlock } from './test-blocks.entity';

@Table({ tableName: 'test_to_test_block' })
export class TestToTestBlock extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  @ForeignKey(() => Test)
  testId: number;

  @Column
  @ForeignKey(() => TestBlock)
  testBlockId: number;
}
