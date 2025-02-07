import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { VerificationCodes } from '../entities/verification-codes.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, VerificationCodes])],
  providers: [],
  controllers: [],
  exports: [],
})
export class UserModule {}
