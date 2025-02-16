import { NewProfCharDto } from './new-prof-char.dto';
import { RemovableProfCharDto } from './removable-prof-char.dto';

export class UpdatedDataProfessionDto {
  name?: string;
  description?: string;
  newProfChar?: NewProfCharDto[];
  removableProfChar?: RemovableProfCharDto[];
}
