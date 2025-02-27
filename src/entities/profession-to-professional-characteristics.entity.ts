import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Profession } from './professions.entity';
import { ProfessionalCharacteristics } from './professional-characteristics.entity';
import { User } from './user.entity';

@Table({ tableName: 'professions-to-professional-characteristics' })
export class ProfessionToProfessionalCharacteristics extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Profession)
  @Column
  professionId: number;

  @ForeignKey(() => ProfessionalCharacteristics)
  @Column
  professionalCharacteristicsId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  score: number;
}
