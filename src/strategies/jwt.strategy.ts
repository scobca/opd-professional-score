import { Inject, Injectable } from '@nestjs/common';
import { UserProvider } from '../providers/user.provider';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../config/jwt.conf';
import { ValidateJwtTokenDto } from '../dto/auth/validate-jwt-token.dto';
import { IncorrectTokenException } from '../exceptions/auth/incorrect-token.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserProvider) private readonly userProvider: UserProvider,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.jwtSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: ValidateJwtTokenDto) {
    const user = await this.userProvider.getUserById(payload.id);
    if (!(user?.email == payload.email && user.role == payload.role)) {
      throw new IncorrectTokenException('Token was damaged');
    }

    return user;
  }
}
