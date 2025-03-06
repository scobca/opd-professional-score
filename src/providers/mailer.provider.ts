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
      html: `
        <html lang="ru">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Подтверждение регистрации</title>
        <style>
            /* Встроенные стили для совместимости */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dddddd;
            }
            .header {
                text-align: center;
                padding: 10px 0;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .verification-code {
                display: inline-block;
                padding: 15px 25px;
                margin: 20px 0;
                background-color: #f0f0f0;
                color: #333333;
                font-size: 24px;
                font-weight: bold;
                border-radius: 5px;
                border: 1px solid #dddddd;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777777;
            }
        </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="header">
                        <h1>Подтверждение регистрации</h1>
                    </td>
                </tr>
                <tr>
                    <td class="content">
                        <p>Здравствуйте, ${data.username}!</p>
                        <p>Спасибо за регистрацию на нашем сайте. Для завершения регистрации введите следующий код верификации:</p>
                        <div class="verification-code">${data.code}</div>
                        <p>Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.</p>
                    </td>
                </tr>
                <tr>
                    <td class="footer">
                        <p>С уважением,<br>Команда OPD-Professional_Score</p>
                        <p>Если у вас возникли вопросы, свяжитесь с нами: <a href="mailto:support@yourwebsite.com">esc-notes@yandex.ru</a></p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
      `,
    });
  }

  public async sendPassVerificationMail(data: MailInfoDto) {
    await this.mailService.sendMail({
      to: data.email,
      from: process.env.SMTP_USER,
      subject: 'Verify your password changing on Opd-Professional-Score',
      html: `
        <html lang="ru">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Подтверждение регистрации</title>
        <style>
            /* Встроенные стили для совместимости */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dddddd;
            }
            .header {
                text-align: center;
                padding: 10px 0;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .verification-code {
                display: inline-block;
                padding: 15px 25px;
                margin: 20px 0;
                background-color: #f0f0f0;
                color: #333333;
                font-size: 24px;
                font-weight: bold;
                border-radius: 5px;
                border: 1px solid #dddddd;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777777;
            }
        </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="header">
                        <h1>Подтверждение регистрации</h1>
                    </td>
                </tr>
                <tr>
                    <td class="content">
                        <p>Здравствуйте, ${data.username}!</p>
                        <p>Спасибо за регистрацию на нашем сайте. Для завершения регистрации введите следующий код верификации:</p>
                        <div class="verification-code">${data.code}</div>
                        <p>Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.</p>
                    </td>
                </tr>
                <tr>
                    <td class="footer">
                        <p>С уважением,<br>Команда OPD-Professional_Score</p>
                        <p>Если у вас возникли вопросы, свяжитесь с нами: <a href="mailto:support@yourwebsite.com">esc-notes@yandex.ru</a></p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
      `,
    });
  }
}
