import { Module } from '@nestjs/common';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { Profession } from '../entities/professions.entity';
import { ProfessionToTestBlock } from '../entities/profession-to-test-block.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfessionalCharacteristicsProvider } from '../providers/professional-characteristics.provider';
import { ProfessionalCharacteristicsController } from '../controllers/professional-characteristics.controller';
import { UserProvider } from '../providers/user.provider';
import { JwtService } from '@nestjs/jwt';
import { BcryptUtil } from '../utils/bcrypt.util';
import { ProfessionProvider } from '../providers/profession.provider';
import { ProfessionToProfessionalCharacteristics } from '../entities/profession-to-professional-characteristics.entity';
import { ProfessionController } from '../controllers/professions.controller';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ProfessionalCharacteristics,
      Profession,
      ProfessionToTestBlock,
      ProfessionToProfessionalCharacteristics,
    ]),
  ],
  providers: [
    ProfessionalCharacteristicsProvider,
    ProfessionProvider,
    JwtService,
    JwtDecoderUtil,
    BcryptUtil,
    UserProvider,
  ],
  controllers: [ProfessionalCharacteristicsController, ProfessionController],
  exports: [],
})
export class ProfessionModule {}
