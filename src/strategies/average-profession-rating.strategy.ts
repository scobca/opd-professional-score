import { Injectable } from '@nestjs/common';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { ProfessionStatsOutput } from '../IO/custom/profession-stats.output';
import { Profession } from '../entities/professions.entity';
import { ProfessionNotFoundException } from '../exceptions/professions/profession-not-found.exception';
import { ProfessionScores } from '../entities/profession-scores.entity';

@Injectable()
export class AverageProfessionRatingStrategy {
  public async getStatistics(
    professionId: number,
  ): Promise<ProfessionStatsOutput[]> {
    const profChar = await ProfessionalCharacteristics.findAll();
    const profession = await Profession.findOne({
      where: { id: professionId },
    });

    if (profession == null) {
      throw new ProfessionNotFoundException(professionId, 'id');
    }

    const res: ProfessionStatsOutput[] = [];

    await Promise.all(
      profChar.map(async (pc) => {
        let score = 0;
        let minScore = 21;
        let maxScore = -21;

        const professionToPC = await ProfessionScores.findAll({
          where: {
            professionId: professionId,
            profCharId: pc.id,
          },
        });

        await Promise.all(
          professionToPC.map((el) => {
            score += el.score;
            minScore = Math.min(minScore, el.score);
            maxScore = Math.max(maxScore, el.score);
          }),
        );
        const dispersion = maxScore - minScore;
        const average = score / professionToPC.length;

        if (!isNaN(average)) {
          let resultScore: number;
          if (dispersion != 0) {
            resultScore = average + (1 / dispersion) * average;
          } else {
            resultScore = average + average;
          }

          res.push({
            professionId: profession.id,
            professionName: profession.name,
            professionDescription: profession.description,
            pcId: pc.id,
            pcName: pc.name,
            pcDescription: pc.description,
            averageScore: parseFloat(resultScore.toFixed(2)),
          });
        }
      }),
    );

    return res;
  }
}
