import { SectionType } from '../../../config/enums/section-types.enum';

export class CreateSectionInTestDto {
  sectionType: SectionType;
  question: string;
  options: string;
  answer: string;
}
