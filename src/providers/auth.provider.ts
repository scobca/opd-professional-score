import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dto/auth/login-user.dto';
import { UserProvider } from './user.provider';
import { BcryptUtil } from '../utils/bcrypt.util';
import { UserPayload } from '../dto/auth/user-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { SuccessAuthResponseDto } from '../dto/auth/success-auth-response.dto';
import { IncorrectUserCreditsException } from '../exceptions/auth/incorrect-user-credits.exception';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';

@Injectable()
export class AuthProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(BcryptUtil) private bcryptUtil: BcryptUtil,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  public async login(
    data: LoginUserDto,
  ): Promise<BasicSuccessfulResponse<SuccessAuthResponseDto>> {
    const user = await this.userProvider.getUserByEmail(data.email);

    if (user && (await this.bcryptUtil.compare(data.password, user.password))) {
      return this.createToken(user);
    }
    throw new IncorrectUserCreditsException();
  }

  public async register(data: CreateUserDto) {
    return await this.userProvider.createUser(data);
  }

  public createToken(
    user: User,
  ): BasicSuccessfulResponse<SuccessAuthResponseDto> {
    const payload: UserPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isBanned: user.isBanned,
    };
    const response: SuccessAuthResponseDto = {
      token: this.jwtService.sign(payload),
      role: user.role,
    };

    return new BasicSuccessfulResponse<SuccessAuthResponseDto>(response);
  }
}
