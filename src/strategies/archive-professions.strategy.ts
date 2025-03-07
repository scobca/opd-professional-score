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
    if (professionScores.length > 0) {
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
