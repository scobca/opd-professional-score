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
    UserModule,
    SectionModule,
    TestModule,
    ProfessionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppProvider],
})
export class AppModule {}
