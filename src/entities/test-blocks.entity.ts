import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
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

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @BelongsToMany(() => Test, () => TestToTestBlock)
  tests: Test[];

  @BelongsToMany(() => Profession, () => ProfessionToTestBlock)
  professions: Profession[];
}
