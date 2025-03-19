import { CodeTypeEnum } from '../../config/enums/code-type.enum';

export interface SendCodeAgainDto {
  email: string;
  username: string;
  codeType: CodeTypeEnum;
}
