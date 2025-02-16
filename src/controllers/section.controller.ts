import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SectionProvider } from '../providers/section.provider';
import { CreateSectionDto } from '../dto/test/section/create-section.dto';
import { UpdateSectionDto } from '../dto/test/section/update-section.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('/section')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SectionController {
  constructor(
    @Inject(SectionProvider) private sectionProvider: SectionProvider,
  ) {}

  @Get('/getAll')
  public async getAllSections() {
    return await this.sectionProvider.getAllSections();
  }

  @Get('/getSectionById')
  public async getSectionById(@Body() data: { id: number }) {
    return await this.sectionProvider.getSectionById(data.id);
  }

  @Get('/getSectionsByTestId')
  public async getSectionsByTestId(@Body() data: { testId: number }) {
    return await this.sectionProvider.getSectionsByTestId(data.testId);
  }

  @Post('/createSection')
  public async createSection(@Body() data: CreateSectionDto) {
    return await this.sectionProvider.create(data);
  }

  @Patch('/updateSection')
  public async updateSection(@Body() data: UpdateSectionDto) {
    return await this.sectionProvider.update(data);
  }

  @Delete('/deleteSection')
  public async deleteSection(@Body() data: { id: number }) {
    return await this.sectionProvider.delete(data.id);
  }
}
