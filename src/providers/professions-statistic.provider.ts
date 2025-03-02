import { Inject, Injectable } from '@nestjs/common';
import { AverageProfessionRatingStrategy } from '../strategies/average-profession-rating.strategy';
import { ProfessionStatsOutput } from '../IO/custom/profession-stats.output';
import { CreateProfessionStats } from '../dto/service/create-profession-stats.dto';
import { ProfessionToProfessionalCharacteristics } from '../entities/profession-to-professional-characteristics.entity';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';

@Injectable()
export class ProfessionsStatisticProvider {
  constructor(
    @Inject(AverageProfessionRatingStrategy)
    private averageProfessionRatingStrategy: AverageProfessionRatingStrategy,
  ) {}

  public async getStaticForProfession(
    id: number,
  ): Promise<ProfessionStatsOutput[]> {
    return this.averageProfessionRatingStrategy.getStatistics(id);
  }

  public async createStats(data: CreateProfessionStats[]) {
    await Promise.all(
      data.map(async (el) => {
        await ProfessionToProfessionalCharacteristics.create({
          professionId: el.professionId,
          professionalCharacteristicsId: el.pcId,
          userId: el.userId,
          score: el.score,
        });
      }),
    );

    return new BasicSuccessfulResponse('Stats created successfully.');
  }
}
