import { PcTypesEnum } from '../../../config/enums/pc-types.enum';

export class UpdatedProfCharDataDto {
  name?: string;
  description?: string;
  pcType?: PcTypesEnum;
}
