import { UpdateSectionDto } from './section/update-section.dto';
import { CreateSectionInTestDto } from './create-section-in-test.dto';

export class UpdatedTestDataDto {
  name?: string;
  header?: string;
  description?: string;
  minPoints?: number;
  maxPoints?: number;
  minTime?: number;
  maxTime?: number;
  testTypeId?: number;
  sections?: (CreateSectionInTestDto | UpdateSectionDto)[];
}
