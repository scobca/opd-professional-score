import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Profession } from './professions.entity';
import { ProfessionToProfessionalCharacteristics } from './profession-to-professional-characteristics.entity';
import { PcTypesEnum } from '../config/enums/pc-types.enum';

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

  @Column({
    type: DataType.ENUM(...Object.values(PcTypesEnum)),
    allowNull: false,
  })
  PCType: PcTypesEnum;

  @BelongsToMany(
    () => Profession,
    () => ProfessionToProfessionalCharacteristics,
  )
  profession: Profession[];
}
