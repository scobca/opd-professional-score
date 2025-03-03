import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestTypes } from './test-types.entity';
import { Section } from './section.entity';
import { TestBlock } from './test-blocks.entity';
import { TestToTestBlock } from './test-to-test-block.entity';
import { User } from './user.entity';
import { TestToUserDashboard } from './test-to-user-dashboard.entity';

@Table({ tableName: 'tests' })
export class Test extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  header: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  minPoints: number;

  @Column({ allowNull: false })
  maxPoints: number;

  @Column({ allowNull: false })
  minTime: number;

  @Column({ allowNull: false })
  maxTime: number;

  @ForeignKey(() => User)
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => TestTypes)
  @Column
  testTypeId: number;

  @BelongsTo(() => TestTypes)
  testType: TestTypes;

  @HasMany(() => Section, { onDelete: 'CASCADE' })
  sections: Section[];

  @BelongsToMany(() => TestBlock, () => TestToTestBlock)
  testBlocks: TestBlock[];

  @BelongsToMany(() => User, () => TestToUserDashboard)
  user: User[];
}
