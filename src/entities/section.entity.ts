import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SectionType } from '../config/enums/section-types.enum';
import { Test } from './test.entity';

@Table({ tableName: 'sections' })
export class Section extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @HasMany(() => Test)
  tests: Test[];

  @NotNull
  @Column
  sectionType: SectionType;

  @NotNull
  @Column
  question: string;

  @NotNull
  @Column
  options: string;

  @NotNull
  @Column
  answer: string;
}
