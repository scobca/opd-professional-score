import { CreateSectionInTestDto } from './create-section-in-test.dto';

export class CreateTestDto {
  name: string;
  header: string;
  description: string;
  minPoints: number;
  maxPoints: number;
  minTime: number;
  maxTime: number;
  testTypeId: number;
  sections: CreateSectionInTestDto[];
}
