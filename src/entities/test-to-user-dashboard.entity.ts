import {
  AutoIncrement,
  Column,
  ForeignKey,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Test } from './test.entity';
import { User } from './user.entity';

@Table({ tableName: 'test_to_user_dashboard' })
export class TestToUserDashboard {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Test)
  @Column
  testId: number;

  @NotNull
  @Column
  score: number;

  @NotNull
  @Column
  time: number;

  @NotNull
  @Column
  valid: boolean;
}
