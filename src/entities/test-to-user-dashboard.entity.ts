import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Test } from './test.entity';
import { User } from './user.entity';

@Table({ tableName: 'test_to_user_dashboard' })
export class TestToUserDashboard extends Model {
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

  @Column({ allowNull: false })
  score: number;

  @Column({ allowNull: false })
  time: number;

  @Column({ allowNull: false })
  valid: boolean;
}
