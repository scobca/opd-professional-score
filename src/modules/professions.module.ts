import { Module } from '@nestjs/common';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { Profession } from '../entities/professions.entity';
import { ProfessionToTestBlock } from '../entities/profession-to-test-block.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ProfessionalCharacteristics,
      Profession,
      ProfessionToTestBlock,
    ]),
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class ProfessionModule {}
