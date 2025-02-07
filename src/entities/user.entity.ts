import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Roles } from '../config/enums/roles.enum';
import { VerificationCodes } from './verification-codes.entity';
import { Profession } from './professions.entity';
import { Test } from './test.entity';
import { TestToUserDashboard } from './test-to-user-dashboard.entity';

@Table({ tableName: 'user' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  username: string;

  @Unique
  @Column({ allowNull: false })
  email: string;

  @Column({ type: DataType.ENUM(...Object.values(Roles)), allowNull: false })
  role: Roles;

  @Column({ allowNull: false })
  password: string;

  @Column
  isBanned: boolean;

  @HasMany(() => VerificationCodes)
  verificationCodes: VerificationCodes;

  @HasMany(() => Profession)
  professions: Profession[];

  @BelongsToMany(() => Test, () => TestToUserDashboard)
  tests: Test[];
}
