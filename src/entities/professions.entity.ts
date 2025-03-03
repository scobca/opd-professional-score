import {
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestBlock } from './test-blocks.entity';
import { ProfessionToTestBlock } from './profession-to-test-block.entity';
import { ProfessionScores } from './profession-scores.entity';

@Table({ tableName: 'professions' })
export class Profession extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @HasMany(() => ProfessionScores, { onDelete: 'CASCADE' })
  professionScores: ProfessionScores[];

  @BelongsToMany(() => TestBlock, () => ProfessionToTestBlock)
  testBlocks: TestBlock[];
}
