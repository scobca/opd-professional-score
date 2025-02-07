import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestTypes } from './test-types.entity';
import { Section } from './section.entity';
import { TestBlock } from './test-blocks.entity';
import { TestToTestBlock } from './test-to-test-block.entity';
import { User } from './user.entity';

@Table({ tableName: 'tests' })
export class Test extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @NotNull
  @Column
  name: string;

  @NotNull
  @Column
  header: string;

  @NotNull
  @Column
  description: string;

  @NotNull
  @Column
  minPoints: number;

  @NotNull
  @Column
  maxPoints: number;

  @NotNull
  @Column
  minTime: number;

  @NotNull
  @Column
  maxTime: number;

  @ForeignKey(() => TestTypes)
  @Column
  testId: number;

  @BelongsTo(() => TestTypes)
  testType: TestTypes;

  @ForeignKey(() => Section)
  @Column
  sectionId: number;

  @BelongsTo(() => Section)
  section: Section;

  @BelongsToMany(() => TestBlock, () => TestToTestBlock)
  testBlocks: TestBlock[];

  @BelongsToMany(() => User, () => TestToTestBlock)
  user: User[];
}
