import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailInfoDto } from '../dto/mailer/mail-info.dto';
import * as process from 'node:process';

@Injectable()
export class MailerProvider {
  constructor(@Inject(MailerService) private mailService: MailerService) {}

  public async sendAccountVerificationMail(data: MailInfoDto) {
    await this.mailService.sendMail({
      to: data.email,
      from: process.env.SMTP_USER,
      subject: 'Verify your email on Opd-Professional-Score',
      html: `Dear, ${data.username}! <br> There is your verification code: <br><br> <b> ${data.code} </b> <br><br> Don't tell code to anyone!`,
    });
  }

  public async sendPassVerificationMail(data: MailInfoDto) {
    await this.mailService.sendMail({
      to: data.email,
      from: process.env.SMTP_USER,
      subject: 'Verify your password changing on Opd-Professional-Score',
      html: `Dear, ${data.username}! <br> There is your verification code: <br><br> <b> ${data.code} </b> <br><br> Don't tell code to anyone!`,
    });
  }
}
