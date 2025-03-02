import { Body, Controller, Get, Inject } from '@nestjs/common';
import { ProfessionsStatisticProvider } from '../providers/professions-statistic.provider';

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

  @Get('hello')
  public hello() {
    return 'Hello World!';
  }
}
