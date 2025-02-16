import { Module } from '@nestjs/common';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { Profession } from '../entities/professions.entity';
import { ProfessionToTestBlock } from '../entities/profession-to-test-block.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfessionalCharacteristicsProvider } from '../providers/professional-characteristics.provider';
import { ProfessionalCharacteristicsController } from '../controllers/professional-characteristics.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ProfessionalCharacteristics,
      Profession,
      ProfessionToTestBlock,
    ]),
  ],
  providers: [ProfessionalCharacteristicsProvider],
  controllers: [ProfessionalCharacteristicsController],
  exports: [],
})
export class ProfessionModule {}
