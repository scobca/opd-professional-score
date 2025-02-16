import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfessionalCharacteristicsProvider } from '../providers/professional-characteristics.provider';
import { CreateProfCharDto } from '../dto/professions/professional-characteristics/create-prof-char.dto';
import { UpdateProfCharDto } from '../dto/professions/professional-characteristics/update-prof-char.dto';

@Controller('/profChar')
export class ProfessionalCharacteristicsController {
  constructor(
    @Inject(ProfessionalCharacteristicsProvider)
    private profCharProvider: ProfessionalCharacteristicsProvider,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.profCharProvider.getAll();
  }

  @Get('/getProfCharById')
  public async getById(@Body() data: { id: number }) {
    return await this.profCharProvider.getProfCharById(data.id);
  }

  @Post('/createProfChar')
  public async createProfChar(@Body() data: CreateProfCharDto) {
    return await this.profCharProvider.createProfChar(data);
  }

  @Patch('/updateProfChar')
  public async updateProfChar(@Body() data: UpdateProfCharDto) {
    return await this.profCharProvider.updateProfChar(data);
  }

  @Delete('/deleteProfChar')
  public async deleteProfChar(@Body() data: { id: number }) {
    return await this.profCharProvider.deleteProfChar(data.id);
  }
}
