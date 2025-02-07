import {
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Roles } from '../config/enums/roles.enum';
import { VerificationCodes } from './verification-codes.entity';
import { Profession } from './professions.entity';
import { Test } from './test.entity';
import { TestToTestBlock } from './test-to-test-block.entity';

@Table({ tableName: 'user' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @NotNull
  @Column
  username: string;

  @NotNull
  @Unique
  @Column
  email: string;

  @NotNull
  @Column
  role: Roles;

  @NotNull
  @Column
  password: string;

  @HasMany(() => VerificationCodes)
  verificationCodes: VerificationCodes;

  @HasMany(() => Profession)
  professions: Profession[];

  @BelongsToMany(() => Test, () => TestToTestBlock)
  tests: Test[];
}
