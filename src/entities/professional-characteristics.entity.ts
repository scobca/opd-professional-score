import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Profession } from './professions.entity';

@Table({ tableName: 'professional_characteristics' })
export class ProfessionalCharacteristics extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @NotNull
  @Unique
  @Column
  name: string;

  @NotNull
  @Column
  description: string;

  @HasMany(() => Profession)
  professionals: Profession[];
}
