import { NewTestsDto } from './test-changes/new-tests.dto';

export class CreateTestBlockDto {
  name: string;
  description: string;
  tests: NewTestsDto[];
}
