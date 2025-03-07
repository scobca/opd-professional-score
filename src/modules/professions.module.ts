import { Module } from '@nestjs/common';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { Profession } from '../entities/professions.entity';
import { ProfessionToTestBlock } from '../entities/profession-to-test-block.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfessionalCharacteristicsProvider } from '../providers/professional-characteristics.provider';
import { ProfessionalCharacteristicsController } from '../controllers/professional-characteristics.controller';
import { ProfessionProvider } from '../providers/profession.provider';
import { ProfessionController } from '../controllers/professions.controller';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { UserModule } from './user.module';
import { ProfessionScores } from '../entities/profession-scores.entity';
import { ArchiveProfessionsStrategy } from '../strategies/archive-professions.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ProfessionalCharacteristics,
      Profession,
      ProfessionToTestBlock,
      ProfessionScores,
    ]),
    UserModule,
  ],
  providers: [
    ProfessionalCharacteristicsProvider,
    ProfessionProvider,
    JwtDecoderUtil,
    ArchiveProfessionsStrategy,
  ],
  controllers: [ProfessionalCharacteristicsController, ProfessionController],
  exports: [
    ProfessionalCharacteristicsProvider,
    ProfessionProvider,
    JwtDecoderUtil,
    ArchiveProfessionsStrategy,
  ],
})
export class ProfessionModule {}
