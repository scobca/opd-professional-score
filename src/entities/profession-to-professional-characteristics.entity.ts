import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Profession } from './professions.entity';
import { ProfessionalCharacteristics } from './professional-characteristics.entity';

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
}
