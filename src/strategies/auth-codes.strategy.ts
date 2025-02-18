import { Inject, Injectable } from '@nestjs/common';
import { VerificationCodes } from '../entities/verification-codes.entity';
import { CodeGeneratorUtil } from '../utils/code-generator.util';
import { CodeTypeEnum } from '../config/enums/code-type.enum';
import { VerificationCodeNotExistsException } from '../exceptions/auth/verification-code-not-exists.exception';

@Injectable()
export class AuthCodesStrategy {
  constructor(
    @Inject(CodeGeneratorUtil) private codeGenerator: CodeGeneratorUtil,
  ) {}

  public async getAuthCodeByEmail(email: string) {
    return await VerificationCodes.findOne({ where: { email: email } });
  }

  public async deleteCode(id: number) {
    await VerificationCodes.destroy({ where: { id: id } });
  }

  public async applyAuthCode(email: string) {
    const code = await this.getAuthCodeByEmail(email);
    if (code != null && code.codeType == CodeTypeEnum.AUTH)
      await this.deleteCode(code.id);

    return await VerificationCodes.create({
      code: this.codeGenerator.generateCode(),
      codeType: CodeTypeEnum.AUTH,
      email: email,
    });
  }

  public async applyPassCode(email: string) {
    const code = await this.getAuthCodeByEmail(email);
    if (code != null && code.codeType == CodeTypeEnum.PASSWORD)
      await this.deleteCode(code.id);

    return await VerificationCodes.create({
      code: this.codeGenerator.generateCode(),
      codeType: CodeTypeEnum.PASSWORD,
      email: email,
    });
  }

  public async verifyCode(code: number, email: string) {
    const internalCode = await this.getAuthCodeByEmail(email);
    if (internalCode == null) throw new VerificationCodeNotExistsException();

    if (code == internalCode.code) {
      await VerificationCodes.destroy({ where: { id: internalCode.id } });
      return true;
    } else return false;
  }
}
