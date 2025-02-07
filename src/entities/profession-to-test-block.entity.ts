import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Profession } from './professions.entity';
import { TestBlock } from './test-blocks.entity';

@Table({ tableName: 'professions_to_test_blocks' })
export class ProfessionToTestBlock extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  @ForeignKey(() => Profession)
  professionId: number;

  @Column
  @ForeignKey(() => TestBlock)
  testBlockId: number;
}
