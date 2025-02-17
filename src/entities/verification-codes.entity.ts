import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CodeTypeEnum } from '../config/enums/code-type.enum';

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

  @Column
  email: string;
}
