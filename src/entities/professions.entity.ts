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
import { User } from './user.entity';
import { TestBlock } from './test-blocks.entity';
import { ProfessionToTestBlock } from './profession-to-test-block.entity';

@Table({ tableName: 'professions' })
export class Profession extends Model {
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

  @ForeignKey(() => Profession)
  @Column
  professionId: number;

  @BelongsTo(() => Profession)
  profession: Profession;

  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => TestBlock, () => ProfessionToTestBlock)
  testBlocks: TestBlock[];
}
