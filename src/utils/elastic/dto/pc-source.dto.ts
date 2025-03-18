import { PcTypesEnum } from '../../../config/enums/pc-types.enum';

export interface PcSourceDto {
  name: string;
  description: string;
  pcType: PcTypesEnum;
}
