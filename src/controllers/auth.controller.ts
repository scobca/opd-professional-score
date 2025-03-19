import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthProvider } from '../providers/auth.provider';
import { LoginUserDto } from '../dto/auth/login-user.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { SuccessAuthResponseDto } from '../dto/auth/success-auth-response.dto';
import { RegistrationFirstStepDto } from '../dto/auth/registration-first-step.dto';
import { RegistrationSecondStepDto } from '../dto/auth/registration-second-step.dto';
import { SendCodeAgainDto } from '../dto/auth/send-code-again.dto';

@Controller('/auth')
export class AuthController {
  constructor(@Inject(AuthProvider) private authProvider: AuthProvider) {}

  @Post('/sendCodeAgain')
  public async sendCodeAgain(@Body() data: SendCodeAgainDto) {
    return await this.authProvider.sendCodeAgain(data);
  }

  @Post('/registrationFirstStep')
  public async registrationFirstStep(@Body() data: RegistrationFirstStepDto) {
    return await this.authProvider.signUpFirstStep(data);
  }

  @Post('/register')
  public async register(@Body() data: RegistrationSecondStepDto) {
    return await this.authProvider.registerSecondStep(data);
  }

  @Post('/login')
  public async login(
    @Body() data: LoginUserDto,
  ): Promise<BasicSuccessfulResponse<SuccessAuthResponseDto>> {
    return await this.authProvider.login(data);
  }
}
