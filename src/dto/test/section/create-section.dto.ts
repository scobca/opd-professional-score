import { SectionType } from '../../../config/enums/section-types.enum';

export class CreateSectionDto {
  testId: number;
  sectionType: SectionType;
  question: string;
  options: string;
  answer: string;
}
