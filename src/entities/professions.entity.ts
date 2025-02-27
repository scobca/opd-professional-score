import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestBlock } from './test-blocks.entity';
import { ProfessionToTestBlock } from './profession-to-test-block.entity';
import { ProfessionalCharacteristics } from './professional-characteristics.entity';
import { ProfessionToProfessionalCharacteristics } from './profession-to-professional-characteristics.entity';

@Table({ tableName: 'professions' })
export class Profession extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @BelongsToMany(
    () => ProfessionalCharacteristics,
    () => ProfessionToProfessionalCharacteristics,
  )
  professionalCharacteristics: ProfessionalCharacteristics[];

  @BelongsToMany(() => TestBlock, () => ProfessionToTestBlock)
  testBlocks: TestBlock[];
}
