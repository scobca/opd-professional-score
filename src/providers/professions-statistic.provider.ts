import { Inject, Injectable } from '@nestjs/common';
import { AverageProfessionRatingStrategy } from '../strategies/average-profession-rating.strategy';
import { ProfessionStatsOutput } from '../IO/custom/profession-stats.output';
import { CreateProfessionStats } from '../dto/service/create-profession-stats.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { ProfessionScores } from '../entities/profession-scores.entity';
import { DoubleRecordException } from '../exceptions/common/double-record.exception';
import { UpdateProfessionStats } from '../dto/service/update-profession-stats.dto';
import { ProfessionScoreNotFound } from '../exceptions/service/profession-score-not-found.exception';
import { ProfessionProvider } from './profession.provider';
import { ProfessionalCharacteristicsProvider } from './professional-characteristics.provider';
import { UserProvider } from './user.provider';
import { ArchiveProfessionsStrategy } from '../strategies/archive-professions.strategy';
import { DeleteProfessionStatsDto } from '../dto/service/delete-profession-stats.dto';

@Injectable()
export class ProfessionsStatisticProvider {
  constructor(
    @Inject(ProfessionProvider) private professionProvider: ProfessionProvider,
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(AverageProfessionRatingStrategy)
    private averageProfessionRatingStrategy: AverageProfessionRatingStrategy,
    @Inject(ProfessionalCharacteristicsProvider)
    private professionalCharacteristicsProvider: ProfessionalCharacteristicsProvider,
    @Inject(ArchiveProfessionsStrategy)
    private archiveProfessionsStrategy: ArchiveProfessionsStrategy,
  ) {}

  public async getStaticForProfession(
    id: number,
  ): Promise<ProfessionStatsOutput[]> {
    const res = await this.averageProfessionRatingStrategy.getStatistics(id);

    return res.sort((a, b) => a.pcId - b.pcId);
  }

  public async getStatsByUserAndProfession(
    userId: number,
    professionId: number,
  ) {
    return await ProfessionScores.findAll({
      where: {
        userId: userId,
        professionId: professionId,
      },
    });
  }

  public async createStats(data: CreateProfessionStats[]) {
    await Promise.all(
      data.map(async (el) => {
        await this.checkComponentsValid(el.professionId, el.pcId, el.userId);
        await this.checkDoubleRecord(el.professionId, el.pcId, el.userId);

        await ProfessionScores.create({
          professionId: el.professionId,
          profCharId: el.pcId,
          userId: el.userId,
          score: el.score,
        });
      }),
    );

    await this.archiveProfessionsStrategy.setArchiveStatus(
      data[0].professionId,
    );

    return new BasicSuccessfulResponse('Stats created successfully.');
  }

  public async updateStats(data: UpdateProfessionStats[]) {
    await Promise.all(
      data.map(async (el) => {
        await this.checkComponentsValid(el.professionId, el.pcId, el.userId);

        const e = await ProfessionScores.findOne({
          where: {
            professionId: el.professionId,
            profCharId: el.pcId,
            userId: el.userId,
          },
        });
        if (e == null) throw new ProfessionScoreNotFound();

        if (e.score != el.score) {
          await ProfessionScores.update(
            {
              score: el.score,
            },
            {
              where: {
                professionId: el.professionId,
                profCharId: el.pcId,
                userId: el.userId,
              },
            },
          );
        }
      }),
    );

    await this.archiveProfessionsStrategy.setArchiveStatus(
      data[0].professionId,
    );

    return new BasicSuccessfulResponse('Stats updated successfully.');
  }

  public async deleteStats(data: DeleteProfessionStatsDto) {
    await ProfessionScores.destroy({
      where: {
        userId: data.userId,
        professionId: data.professionId,
      },
    });
    await this.archiveProfessionsStrategy.setArchiveStatus(data.professionId);

    return new BasicSuccessfulResponse('Stats deleted successfully.');
  }

  private async checkComponentsValid(
    professionId: number,
    pcId: number,
    userId: number,
  ) {
    await this.userProvider.getUserById(userId);
    await this.professionProvider.getProfessionById(professionId);
    await this.professionalCharacteristicsProvider.getProfCharById(pcId);
  }

  private async checkDoubleRecord(
    professionId: number,
    pcId: number,
    userId: number,
  ) {
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
