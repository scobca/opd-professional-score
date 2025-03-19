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
import { MailerProvider } from './mailer.provider';
import { RegistrationFirstStepDto } from '../dto/auth/registration-first-step.dto';
import { MailInfoDto } from '../dto/mailer/mail-info.dto';
import { AuthCodesStrategy } from '../strategies/auth-codes.strategy';
import { DoubleRecordException } from '../exceptions/common/double-record.exception';
import { IncorrectVerificationCodeException } from '../exceptions/auth/incorrect-verification-code.exception';
import { RegistrationSecondStepDto } from '../dto/auth/registration-second-step.dto';
import { CodeTypeEnum } from '../config/enums/code-type.enum';
import { SendCodeAgainDto } from '../dto/auth/send-code-again.dto';

@Injectable()
export class AuthProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(BcryptUtil) private bcryptUtil: BcryptUtil,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(MailerProvider) private mailerProvider: MailerProvider,
    @Inject(AuthCodesStrategy) private authCodesStrategy: AuthCodesStrategy,
  ) {}

  public async sendCodeAgain(data: SendCodeAgainDto) {
    let code = 0;
    if (data.codeType == CodeTypeEnum.AUTH) {
      await this.authCodesStrategy.applyAuthCode(data.email).then((res) => {
        code = res.code;
      });
    } else if (data.codeType == CodeTypeEnum.PASSWORD) {
      await this.authCodesStrategy.applyPassCode(data.email).then((res) => {
        code = res.code;
      });
    }

    const mail: MailInfoDto = {
      email: data.email,
      username: data.username,
      code: code,
    };
    await this.mailerProvider.sendAccountVerificationMail(mail).then(() => {
      return new BasicSuccessfulResponse<string>('Code sent successfully');
    });
  }

  public async signUpFirstStep(
    data: RegistrationFirstStepDto,
  ): Promise<BasicSuccessfulResponse<string>> {
    const user = await User.findOne({ where: { email: data.email } });
    if (user != null)
      throw new DoubleRecordException('User already exist. Want to login?');

    const code = await this.authCodesStrategy.applyAuthCode(data.email);
    const mail: MailInfoDto = {
      email: data.email,
      username: data.username,
      code: code.code,
    };

    await this.mailerProvider.sendAccountVerificationMail(mail);
    return new BasicSuccessfulResponse<string>(
      'Email with verification code sent successfully.',
    );
  }

  public async registerSecondStep(data: RegistrationSecondStepDto) {
    if (
      await this.authCodesStrategy.verifyCode(data.code, data.userData.email)
    ) {
      return await this.userProvider.createUser(data.userData);
    } else {
      throw new IncorrectVerificationCodeException();
    }
  }

  public async login(
    data: LoginUserDto,
  ): Promise<BasicSuccessfulResponse<SuccessAuthResponseDto>> {
    const user = await this.userProvider.getUserByEmail(data.email);

    if (user && (await this.bcryptUtil.compare(data.password, user.password))) {
      return this.createToken(user);
    }
    throw new IncorrectUserCreditsException();
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
