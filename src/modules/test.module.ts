import { Module } from '@nestjs/common';
import { Test } from '../entities/test.entity';
import { TestBlock } from '../entities/test-blocks.entity';
import { TestToTestBlock } from '../entities/test-to-test-block.entity';
import { TestTypes } from '../entities/test-types.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestToUserDashboard } from '../entities/test-to-user-dashboard.entity';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { TestTypesProvider } from '../providers/test-types.provider';
import { TestTypesController } from '../controllers/test-types.controller';
import { TestArchiveProvider } from '../providers/archive/test.archive.provider';
import { TestArchiveController } from '../controllers/test.archive.controller';
import { SectionProvider } from '../providers/section.provider';
import { TestBlockArchiveProvider } from '../providers/archive/test-block.archive.provider';
import { TestBlocksArchiveController } from '../controllers/test-blocks.archive.controller';
import { UserModule } from './user.module';
import { SimpleLightTestEntity } from '../entities/simple-light-test.entity';
import { SimpleLightTestController } from '../controllers/simple-light-test.controller';
import { SimpleLightTestProvider } from '../providers/simple-light-test.provider';
import { TestValidationStrategy } from '../strategies/test-validation.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([
      TestTypes,
      Test,
      TestBlock,
      TestToTestBlock,
      TestToUserDashboard,
      SimpleLightTestEntity,
    ]),
    UserModule,
  ],
  controllers: [
    TestTypesController,
    TestArchiveController,
    TestBlocksArchiveController,
    SimpleLightTestController,
  ],
  providers: [
    JwtDecoderUtil,
    TestValidationStrategy,
    TestTypesProvider,
    TestArchiveProvider,
    TestBlockArchiveProvider,
    SectionProvider,
    SimpleLightTestProvider,
  ],
  exports: [],
})
export class TestModule {}
