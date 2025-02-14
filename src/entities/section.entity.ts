import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
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

  @ForeignKey(() => Test)
  @Column
  testId: number;

  @BelongsTo(() => Test)
  test: Test;

  @Column({
    type: DataType.ENUM(...Object.values(SectionType)),
    allowNull: false,
  })
  sectionType: SectionType;

  @Column({ allowNull: false })
  question: string;

  @Column({ allowNull: false })
  options: string;

  @Column({ allowNull: false })
  answer: string;
}
