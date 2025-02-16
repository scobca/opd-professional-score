import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Profession } from './professions.entity';
import { ProfessionToProfessionalCharacteristics } from './profession-to-professional-characteristics.entity';

@Table({ tableName: 'professional_characteristics' })
export class ProfessionalCharacteristics extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @BelongsToMany(
    () => Profession,
    () => ProfessionToProfessionalCharacteristics,
  )
  profession: Profession[];
}
