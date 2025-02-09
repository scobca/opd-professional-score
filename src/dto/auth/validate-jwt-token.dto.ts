import { Roles } from '../../config/enums/roles.enum';

export class ValidateJwtTokenDto {
  id: number;
  email: string;
  role: Roles;
}
