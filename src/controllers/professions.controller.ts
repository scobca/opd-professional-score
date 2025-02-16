import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfessionProvider } from '../providers/profession.provider';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { CreateProfessionDto } from '../dto/professions/create-profession.dto';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { UpdateProfessionDto } from '../dto/professions/update-profession.dto';

@Controller('/professions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfessionController {
  constructor(
    @Inject(ProfessionProvider) private professionProvider: ProfessionProvider,
    @Inject(JwtDecoderUtil) private jwtDecoderUtil: JwtDecoderUtil,
  ) {}

  @Get('/getAll')
  public async getAllProfessions() {
    return await this.professionProvider.getAll();
  }

  @Get('/getProfessionById')
  public async getProfessionById(@Body() data: { id: number }) {
    return await this.professionProvider.getProfessionById(data.id);
  }

  @Post('/createProfession')
  public async createProfession(
    @Body() data: CreateProfessionDto,
    @Req() req: Request,
  ) {
    const jwt = this.jwtDecoderUtil.decode(req);
    if (jwt && 'id' in jwt && typeof jwt.id === 'number') {
      return await this.professionProvider.createProfession(data, jwt.id);
    }
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
