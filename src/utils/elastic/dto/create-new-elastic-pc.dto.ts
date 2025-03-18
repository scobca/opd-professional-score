import { PcTypesEnum } from '../../../config/enums/pc-types.enum';

export interface CreateNewElasticPcDto {
  index: string;
  id: string;
  name: string;
  description: string;
  PCType: PcTypesEnum;
}
