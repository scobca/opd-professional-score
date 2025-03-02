import { Injectable } from '@nestjs/common';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { ProfessionStatsOutput } from '../IO/custom/profession-stats.output';
import { Profession } from '../entities/professions.entity';
import { ProfessionNotFoundException } from '../exceptions/professions/profession-not-found.exception';
import { ProfessionScores } from '../entities/profession_scores.entity';

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

        const professionToPC = await ProfessionScores.findAll({
          where: {
            professionId: professionId,
            profCharId: pc.id,
          },
        });

        await Promise.all(
          professionToPC.map((el) => {
            score += el.score;
          }),
        );
        const averageScore = score / professionToPC.length;

        res.push({
          professionId: profession.id,
          professionName: profession.name,
          professionDescription: profession.description,
          pcId: pc.id,
          pcName: pc.name,
          pcDescription: pc.description,
          averageScore: isNaN(averageScore) ? 0 : averageScore,
        });
      }),
    );

    return res;
  }
}
