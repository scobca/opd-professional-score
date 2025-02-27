import { Module } from '@nestjs/common';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { Profession } from '../entities/professions.entity';
import { ProfessionToTestBlock } from '../entities/profession-to-test-block.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfessionalCharacteristicsProvider } from '../providers/professional-characteristics.provider';
import { ProfessionalCharacteristicsController } from '../controllers/professional-characteristics.controller';
import { ProfessionProvider } from '../providers/profession.provider';
import { ProfessionToProfessionalCharacteristics } from '../entities/profession-to-professional-characteristics.entity';
import { ProfessionController } from '../controllers/professions.controller';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { UserModule } from './user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ProfessionalCharacteristics,
      Profession,
      ProfessionToTestBlock,
      ProfessionToProfessionalCharacteristics,
    ]),
    UserModule,
  ],
  providers: [
    ProfessionalCharacteristicsProvider,
    ProfessionProvider,
    JwtDecoderUtil,
  ],
  controllers: [ProfessionalCharacteristicsController, ProfessionController],
  exports: [
    ProfessionalCharacteristicsProvider,
    ProfessionProvider,
    JwtDecoderUtil,
  ],
})
export class ProfessionModule {}
