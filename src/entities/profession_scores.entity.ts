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

@Table({ tableName: 'profession_scores' })
export class ProfessionScores extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Profession)
  @Column
  professionId: number;

  @BelongsTo(() => Profession)
  profession: Profession;

  @ForeignKey(() => ProfessionalCharacteristics)
  @Column
  profCharId: number;

  @BelongsTo(() => ProfessionalCharacteristics)
  professionalCharacteristics: ProfessionalCharacteristics;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ allowNull: false })
  score: number;
}
