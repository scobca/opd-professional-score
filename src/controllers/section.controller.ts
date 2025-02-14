import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { SectionProvider } from '../providers/section.provider';
import { CreateSectionDto } from '../dto/test/section/create-section.dto';
import { UpdateSectionDto } from '../dto/test/section/update-section.dto';

@Controller('/section')
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
