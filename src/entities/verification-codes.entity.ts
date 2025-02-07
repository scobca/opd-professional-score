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
import { CodeTypeEnum } from '../config/enums/code-type.enum';
import { User } from './user.entity';

@Table({ tableName: 'verification_codes' })
export class VerificationCodes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  code: number;

  @Column({
    type: DataType.ENUM(...Object.values(CodeTypeEnum)),
    allowNull: false,
  })
  codeType: CodeTypeEnum;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
