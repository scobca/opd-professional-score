import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CodeTypeEnum } from '../config/enums/code-type.enum';
import { User } from './user.entity';

@Table({ tableName: 'verification_codes' })
export class VerificationCodes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: string;

  @NotNull
  @Column
  code: number;

  @NotNull
  @Column
  codeType: CodeTypeEnum;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
