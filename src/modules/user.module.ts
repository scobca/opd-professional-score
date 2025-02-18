import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { VerificationCodes } from '../entities/verification-codes.entity';
import { UserProvider } from '../providers/user.provider';
import { UserController } from '../controllers/user.controller';
import { BcryptUtil } from '../utils/bcrypt.util';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config/jwt.conf';
import { MailerProvider } from '../providers/mailer.provider';

@Module({
  imports: [
    SequelizeModule.forFeature([User, VerificationCodes]),
    JwtModule.register({
      secret: jwtConfig.jwtSecret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  providers: [UserProvider, BcryptUtil, MailerProvider],
  controllers: [UserController],
  exports: [UserProvider, BcryptUtil, MailerProvider],
})
export class UserModule {}
