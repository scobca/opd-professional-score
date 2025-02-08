import { Roles } from '../../config/enums/roles.enum';

export class CreateUserDto {
  username: string;
  email: string;
  role: Roles;
  password: string;
  isBanned: boolean;
}
