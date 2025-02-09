import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthProvider } from '../providers/auth.provider';
import { LoginUserDto } from '../dto/auth/login-user.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { SuccessAuthResponseDto } from '../dto/auth/success-auth-response.dto';

@Controller('/auth')
export class AuthController {
  constructor(@Inject(AuthProvider) private authProvider: AuthProvider) {}

  @Post('/login')
  public async login(
    @Body() data: LoginUserDto,
  ): Promise<BasicSuccessfulResponse<SuccessAuthResponseDto>> {
    return await this.authProvider.login(data);
  }
}
