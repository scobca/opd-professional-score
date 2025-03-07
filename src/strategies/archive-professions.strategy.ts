import { Profession } from '../entities/professions.entity';
import { ProfessionNotFoundException } from '../exceptions/professions/profession-not-found.exception';
import { ProfessionScores } from '../entities/profession-scores.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArchiveProfessionsStrategy {
  public async setArchiveStatus(professionId: number): Promise<void> {
    const profession = await Profession.findOne({
      where: { id: professionId },
    });
    if (profession == null)
      throw new ProfessionNotFoundException(professionId, 'id');

    const professionScores = await ProfessionScores.findAll({
      where: { professionId: professionId },
    });

    const userIds = new Set();
    professionScores.forEach((professionScore) => {
      userIds.add(professionScore.userId);
    });

    if (userIds.size >= 3) {
      await Profession.update(
        { archived: false },
        { where: { id: professionId } },
      );
    } else {
      await Profession.update(
        { archived: true },
        { where: { id: professionId } },
      );
    }
  }
}
