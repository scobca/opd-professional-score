import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { VerificationCodes } from '../entities/verification-codes.entity';
import { UserProvider } from '../providers/user.provider';
import { UserController } from '../controllers/user.controller';
import { BcryptUtil } from '../utils/bcrypt.util';

@Module({
  imports: [SequelizeModule.forFeature([User, VerificationCodes])],
  providers: [UserProvider, BcryptUtil],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
