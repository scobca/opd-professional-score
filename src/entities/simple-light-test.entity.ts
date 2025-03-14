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

@Table({ tableName: 'simple-light-test' })
export class SimpleLightTestEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @ForeignKey(() => TestTypes)
  @Column({ allowNull: false })
  testTypeId: number;

  @BelongsTo(() => User)
  testType: TestTypes;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ allowNull: false })
  averageCallbackTime: number;

  @Column({ allowNull: false })
  allSignals: number;

  @Column({ allowNull: false })
  misclicks: number;

  @Column({ allowNull: false })
  dispersion: number;

  @Column({ allowNull: false })
  valid: boolean;
}
