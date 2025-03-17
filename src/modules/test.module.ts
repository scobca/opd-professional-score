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
import { SimpleSoundTestController } from '../controllers/simple-sound-test.controller';
import { SimpleSoundTestProvider } from '../providers/simple-sound-test.provider';
import { SimpleSoundTestEntity } from '../entities/simple-sound-test.entity';
import { HardLightTestEntity } from '../entities/hard-light-test.entity';
import { HardLightTestController } from '../controllers/hard-light-test.controller';
import { HardLightTestProvider } from '../providers/hard-light-test.provider';

@Module({
  imports: [
    SequelizeModule.forFeature([
      TestTypes,
      Test,
      TestBlock,
      TestToTestBlock,
      TestToUserDashboard,
      SimpleLightTestEntity,
      SimpleSoundTestEntity,
      HardLightTestEntity,
    ]),
    UserModule,
  ],
  controllers: [
    TestTypesController,
    TestArchiveController,
    TestBlocksArchiveController,
    SimpleLightTestController,
    SimpleSoundTestController,
    HardLightTestController,
  ],
  providers: [
    JwtDecoderUtil,
    TestValidationStrategy,
    TestTypesProvider,
    TestArchiveProvider,
    TestBlockArchiveProvider,
    SectionProvider,
    SimpleLightTestProvider,
    SimpleSoundTestProvider,
    HardLightTestProvider,
  ],
  exports: [],
})
export class TestModule {}
