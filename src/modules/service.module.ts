import { Module } from '@nestjs/common';
import { ProfessionModule } from './professions.module';
import { ProfessionsStatisticProvider } from '../providers/professions-statistic.provider';
import { AverageProfessionRatingStrategy } from '../strategies/average-profession-rating.strategy';
import { ProfessionStatisticController } from '../controllers/profession-statistic.controller';
import { UserModule } from './user.module';

@Module({
  imports: [ProfessionModule, UserModule],
  providers: [ProfessionsStatisticProvider, AverageProfessionRatingStrategy],
  controllers: [ProfessionStatisticController],
  exports: [],
})
export class ServiceModule {}
