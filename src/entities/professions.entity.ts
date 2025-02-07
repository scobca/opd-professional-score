import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { TestBlock } from './test-blocks.entity';
import { ProfessionToTestBlock } from './profession-to-test-block.entity';
import { ProfessionalCharacteristics } from './professional-characteristics.entity';

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

  @ForeignKey(() => ProfessionalCharacteristics)
  @Column
  professionalCharacteristics: number;

  @BelongsTo(() => ProfessionalCharacteristics)
  professionalCharacteristic: ProfessionalCharacteristics;

  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => TestBlock, () => ProfessionToTestBlock)
  testBlocks: TestBlock[];
}
