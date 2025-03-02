import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ProfessionsStatisticProvider } from '../providers/professions-statistic.provider';
import { CreateProfessionStats } from '../dto/service/create-profession-stats.dto';

@Controller('/professionStatistic')
export class ProfessionStatisticController {
  constructor(
    @Inject(ProfessionsStatisticProvider)
    private professionStatisticProvider: ProfessionsStatisticProvider,
  ) {}

  @Get('/getProfessionStatistic')
  public async getStatistic(@Body() data: { id: number }) {
    return await this.professionStatisticProvider.getStaticForProfession(
      data.id,
    );
  }

  @Post('/createStats')
  public async createStats(@Body() data: CreateProfessionStats[]) {
    return await this.professionStatisticProvider.createStats(data);
  }
}
