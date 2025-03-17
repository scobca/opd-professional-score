import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppProvider } from '../providers/app.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user.module';
import { TestModule } from './test.module';
import { ProfessionModule } from './professions.module';
import { AuthModule } from './auth.module';
import { SectionModule } from './section.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ServiceModule } from './service.module';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '0'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.SMTP_TRANSPORT,
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UserModule,
    SectionModule,
    TestModule,
    ProfessionModule,
    AuthModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppProvider],
})
export class AppModule {}
