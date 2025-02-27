import { Injectable } from '@nestjs/common';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { ProfessionToProfessionalCharacteristics } from '../entities/profession-to-professional-characteristics.entity';
import { ProfessionStatsOutput } from '../IO/custom/profession-stats.output';
import { Profession } from '../entities/professions.entity';
import { ProfessionNotFoundException } from '../exceptions/professions/profession-not-found.exception';

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

        const professionToPC =
          await ProfessionToProfessionalCharacteristics.findAll({
            where: {
              professionId: professionId,
              professionalCharacteristicsId: pc.id,
            },
          });

        await Promise.all(
          professionToPC.map((el) => {
            score += el.score;
          }),
        );

        res.push({
          professionId: profession.id,
          professionName: profession.name,
          pcName: pc.name,
          averageScore: score / professionToPC.length,
        } as ProfessionStatsOutput);
      }),
    );

    return res;
  }
}
