import { CreateUserDto } from '../user/create-user.dto';

export class RegistrationSecondStepDto {
  userData: CreateUserDto;
  code: number;
}
