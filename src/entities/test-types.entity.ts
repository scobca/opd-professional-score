import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Test } from './test.entity';
import { SimpleLightTestEntity } from './simple-light-test.entity';
import { SimpleSoundTestEntity } from './simple-sound-test.entity';
import { HardLightTestEntity } from './hard-light-test.entity';

@Table({ tableName: 'test_types' })
export class TestTypes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @HasMany(() => Test, { onDelete: 'CASCADE' })
  tests: Test[];

  @HasMany(() => SimpleLightTestEntity, { onDelete: 'CASCADE' })
  simpleLightTest: SimpleLightTestEntity;

  @HasMany(() => SimpleSoundTestEntity, { onDelete: 'CASCADE' })
  simpleSoundTest: SimpleSoundTestEntity;

  @HasMany(() => HardLightTestEntity, { onDelete: 'CASCADE' })
  hardLightTest: HardLightTestEntity;
}
