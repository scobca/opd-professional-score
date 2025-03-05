import { Body, Controller, Get, Inject, Patch, Post } from '@nestjs/common';
import { ProfessionsStatisticProvider } from '../providers/professions-statistic.provider';
import { CreateProfessionStats } from '../dto/service/create-profession-stats.dto';
import { UpdateProfessionStats } from '../dto/service/update-profession-stats.dto';

@Controller('/professionStatistic')
export class ProfessionStatisticController {
  constructor(
    @Inject(ProfessionsStatisticProvider)
    private professionStatisticProvider: ProfessionsStatisticProvider,
  ) {}

  @Post('/getProfessionStatistic')
  public async getStatistic(@Body() data: { id: number }) {
    return await this.professionStatisticProvider.getStaticForProfession(
      data.id,
    );
  }

  @Post('/createStats')
  public async createStats(@Body() data: CreateProfessionStats[]) {
    return await this.professionStatisticProvider.createStats(data);
  }

  @Patch('/updateStats')
  public async updateStats(@Body() data: UpdateProfessionStats[]) {
    return await this.professionStatisticProvider.updateStats(data);
  }
}
