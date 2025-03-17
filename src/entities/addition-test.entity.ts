import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { TestTypes } from './test-types.entity';

@Table({ tableName: 'addition-test' })
export class AdditionTestEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => TestTypes)
  @Column
  testTypeId: number;

  @BelongsTo(() => TestTypes)
  testType: TestTypes;

  @Column({ allowNull: false })
  averageCallbackTime: number;

  @Column({ allowNull: false })
  dispersion: number;

  @Column({ allowNull: false })
  allSignals: number;

  @Column({ allowNull: false })
  mistakes: number;

  @Column({ allowNull: false })
  valid: boolean;
}
