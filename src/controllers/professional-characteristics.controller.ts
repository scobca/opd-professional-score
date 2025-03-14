import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
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

  @Get('/getByName/:name')
  public async getByName(@Param('name') name: string) {
    return await this.profCharProvider.getPCByName(name);
  }

  @Get('getAllPersonal')
  public async getAllPersonal() {
    return await this.profCharProvider.getAllPersonal();
  }

  @Get('getAllIntellectual')
  public async getAllIntellectual() {
    return await this.profCharProvider.getAllIntellectual();
  }

  @Get('getAllPhysical')
  public async getAllPhysical() {
    return await this.profCharProvider.getAllPhysical();
  }

  @Get('getAllPhysiological')
  public async getAllPhysiological() {
    return await this.profCharProvider.getAllPhysiological();
  }

  @Get('getAllPsychoPhysiological')
  public async getAllPsychoPhysiological() {
    return await this.profCharProvider.getAllPsychoPhysiological();
  }

  @Get('getAllOperational')
  public async getAllOperational() {
    return await this.profCharProvider.getAllOperational();
  }

  @Get('/getProfCharById/:id')
  public async getById(@Param('id') id: number) {
    return await this.profCharProvider.getProfCharById(id);
  }

  @Post('/createProfChar')
  public async createProfChar(@Body() data: CreateProfCharDto) {
    return await this.profCharProvider.createProfChar(data);
  }

  @Post('/createPullOfProfChar')
  public async createPullOfProfChar(@Body() data: CreateProfCharDto[]) {
    return await this.profCharProvider.createPullOfProfChar(data);
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
