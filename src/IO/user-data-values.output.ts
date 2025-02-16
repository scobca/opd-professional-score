import { Roles } from '../config/enums/roles.enum';

export class UserDataValuesOutput {
  id: number;
  username: string;
  email: string;
  role: Roles;
  password: string;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}
