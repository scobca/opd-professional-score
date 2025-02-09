import { Roles } from '../../config/enums/roles.enum';

export class UserPayload {
  id: number;
  username: string;
  email: string;
  role: Roles;
  isBanned: boolean;
}
