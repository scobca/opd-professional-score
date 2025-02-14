import { Injectable } from '@nestjs/common';
import { Section } from '../entities/section.entity';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { SectionNotFoundException } from '../exceptions/test/sections/section-not-found.exception';
import { CreateSectionDto } from '../dto/test/section/create-section.dto';
import { InvalidEnumSyntaxException } from '../exceptions/validation/invalid-enum-syntax.exception';
import { SectionType } from '../config/enums/section-types.enum';
import { UpdateSectionDto } from '../dto/test/section/update-section.dto';

@Injectable()
export class SectionProvider {
  public async getAllSections(): Promise<Section[]> {
    return await Section.findAll();
  }

  public async getSectionById(
    sectionId: number,
  ): Promise<BasicSuccessfulResponse<Section> | null> {
    const section = await Section.findOne({ where: { id: sectionId } });
    if (section == null) throw new SectionNotFoundException(sectionId, 'id');

    return new BasicSuccessfulResponse<Section>(section);
  }

  public async create(
    data: CreateSectionDto,
  ): Promise<BasicSuccessfulResponse<Section>> {
    if (!Object.values(SectionType).includes(data.sectionType))
      throw new InvalidEnumSyntaxException('SectionTypes', data.sectionType);

    const section = await Section.create({
      testId: data.testId,
      sectionType: data.sectionType,
      question: data.question,
      options: data.options,
      answer: data.answer,
    });

    return new BasicSuccessfulResponse(section);
  }

  public async update(
    data: UpdateSectionDto,
  ): Promise<BasicSuccessfulResponse<Section>> {
    await this.getSectionById(data.id);
    const updatedData: Partial<Section> = data.updatedData;
    if (
      updatedData.sectionType != null &&
      !Object.values(SectionType).includes(updatedData.sectionType)
    )
      throw new InvalidEnumSyntaxException(
        'SectionTypes',
        updatedData.sectionType,
      );

    const newSection = await Section.update(
      { ...updatedData },
      { where: { id: data.id } },
    );

    return new BasicSuccessfulResponse(newSection);
  }

  public async delete(id: number): Promise<BasicSuccessfulResponse<string>> {
    await this.getSectionById(id);
    await Section.destroy({ where: { id: id } });

    return new BasicSuccessfulResponse(`Section deleted successfully`);
  }
}
