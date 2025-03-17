import { Module } from '@nestjs/common';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { Profession } from '../entities/professions.entity';
import { ProfessionToTestBlock } from '../entities/profession-to-test-block.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfessionalCharacteristicsProvider } from '../providers/professional-characteristics.provider';
import { ProfessionalCharacteristicsController } from '../controllers/professional-characteristics.controller';
import { ProfessionProvider } from '../providers/profession.provider';
import { ProfessionController } from '../controllers/professions.controller';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { UserModule } from './user.module';
import { ProfessionScores } from '../entities/profession-scores.entity';
import { ArchiveProfessionsStrategy } from '../strategies/archive-professions.strategy';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticUtil } from '../utils/elastic/elastic.util';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ProfessionalCharacteristics,
      Profession,
      ProfessionToTestBlock,
      ProfessionScores,
    ]),
    UserModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        node: 'http://localhost:9200',
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME') as string,
          password: configService.get('ELASTICSEARCH_PASSWORD') as string,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    ProfessionalCharacteristicsProvider,
    ProfessionProvider,
    JwtDecoderUtil,
    ArchiveProfessionsStrategy,
    ElasticUtil,
  ],
  controllers: [ProfessionalCharacteristicsController, ProfessionController],
  exports: [
    ProfessionalCharacteristicsProvider,
    ProfessionProvider,
    JwtDecoderUtil,
    ArchiveProfessionsStrategy,
  ],
})
export class ProfessionModule {}
