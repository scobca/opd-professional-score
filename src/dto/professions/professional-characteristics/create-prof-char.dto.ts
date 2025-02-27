import { PcTypesEnum } from '../../../config/enums/pc-types.enum';

export class CreateProfCharDto {
  name: string;
  description: string;
  pcType: PcTypesEnum;
}
