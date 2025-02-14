import { SectionType } from '../../../config/enums/section-types.enum';

export class UpdatedSectionDataDto {
  sectionType?: SectionType;
  question?: string;
  option?: string;
  answer?: string;
}
