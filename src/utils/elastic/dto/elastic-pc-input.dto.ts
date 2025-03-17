import { PcTypesEnum } from '../../../config/enums/pc-types.enum';

export class ElasticPcInputDto {
  index: string;
  id: string;
  name: string;
  description: string;
  PCType: PcTypesEnum;

  constructor(
    index: string = '',
    id: string = '-1',
    name: string = '',
    description: string = '',
    PCType: PcTypesEnum = PcTypesEnum.NONE,
  ) {
    this.index = index;
    this.id = id;
    this.name = name;
    this.description = description;
    this.PCType = PCType;
  }
}
