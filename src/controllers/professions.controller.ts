import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfessionProvider } from '../providers/profession.provider';
import { CreateProfessionDto } from '../dto/professions/create-profession.dto';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { UpdateProfessionDto } from '../dto/professions/update-profession.dto';

@Controller('/professions')
export class ProfessionController {
  constructor(
    @Inject(ProfessionProvider) private professionProvider: ProfessionProvider,
    @Inject(JwtDecoderUtil) private jwtDecoderUtil: JwtDecoderUtil,
  ) {}

  @Get('/getAll')
  public async getAllProfessions() {
    return await this.professionProvider.getAll();
  }

  @Post('/getProfessionById')
  public async getProfessionById(@Body() data: { id: number }) {
    return await this.professionProvider.getProfessionById(data.id);
  }

  @Post('/createProfession')
  public async createProfession(@Body() data: CreateProfessionDto) {
    return await this.professionProvider.createProfession(data);
  }

  @Post('/createPullOfProfessions')
  public async createPullOfProfessions(@Body() data: CreateProfessionDto[]) {
    return await this.professionProvider.createPullOfProfessions(data);
  }

  @Patch('/updateProfession')
  public async updateProfession(@Body() data: UpdateProfessionDto) {
    return await this.professionProvider.updateProfession(data);
  }

  @Delete('/deleteProfession')
  public async deleteProfession(@Body() data: { id: number }) {
    return await this.professionProvider.deleteProfessionById(data.id);
  }
}
