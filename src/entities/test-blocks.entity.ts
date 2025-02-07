import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Test } from './test.entity';
import { TestToTestBlock } from './test-to-test-block.entity';
import { Profession } from './professions.entity';
import { ProfessionToTestBlock } from './profession-to-test-block.entity';

@Table({ tableName: 'test_blocks' })
export class TestBlock extends Model {
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

  @BelongsToMany(() => Test, () => TestToTestBlock)
  tests: Test[];

  @BelongsToMany(() => Profession, () => ProfessionToTestBlock)
  professions: Profession[];
}
