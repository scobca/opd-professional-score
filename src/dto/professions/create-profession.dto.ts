import { NewProfCharDto } from './new-prof-char.dto';

export class CreateProfessionDto {
  name: string;
  description: string;
  profChar: NewProfCharDto[];
}
