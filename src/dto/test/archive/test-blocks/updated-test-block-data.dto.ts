import { NewTestsDto } from './test-changes/new-tests.dto';
import { UpdateTestDto } from '../update-test.dto';
import { RemovableTestsDto } from './test-changes/removable-tests.dto';

export class UpdatedTestBlockData {
  name?: string;
  description?: string;
  newTests?: NewTestsDto[];
  updatedTests?: UpdateTestDto[];
  removableTests?: RemovableTestsDto[];
}
