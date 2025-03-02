import { Inject, Injectable } from '@nestjs/common';
import { AverageProfessionRatingStrategy } from '../strategies/average-profession-rating.strategy';
import { ProfessionStatsOutput } from '../IO/custom/profession-stats.output';
import { CreateProfessionStats } from '../dto/service/create-profession-stats.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { ProfessionScores } from '../entities/profession_scores.entity';
import { DoubleRecordException } from '../exceptions/common/double-record.exception';

@Injectable()
export class ProfessionsStatisticProvider {
  constructor(
    @Inject(AverageProfessionRatingStrategy)
    private averageProfessionRatingStrategy: AverageProfessionRatingStrategy,
  ) {}

  public async getStaticForProfession(
    id: number,
  ): Promise<ProfessionStatsOutput[]> {
    const res = await this.averageProfessionRatingStrategy.getStatistics(id);

    return res.sort((a, b) => a.pcId - b.pcId);
  }

  public async createStats(data: CreateProfessionStats[]) {
    await Promise.all(
      data.map(async (el) => {
        await this.checkValid(el.professionId, el.pcId, el.userId);

        try {
          await ProfessionScores.create({
            professionId: el.professionId,
            profCharId: el.pcId,
            userId: el.userId,
            score: el.score,
          });
        } catch (e: any) {
          console.error(e);
        }
      }),
    );

    return new BasicSuccessfulResponse('Stats created successfully.');
  }

  private async checkValid(professionId: number, pcId: number, userId: number) {
    const el = await ProfessionScores.findOne({
      where: {
        professionId: professionId,
        profCharId: pcId,
        userId: userId,
      },
    });

    if (el != null)
      throw new DoubleRecordException(
        'Estimation with that params already exists',
      );
  }
}
