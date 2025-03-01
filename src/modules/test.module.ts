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
import { TestProvider } from '../providers/test.provider';
import { TestController } from '../controllers/test.controller';
import { SectionProvider } from '../providers/section.provider';
import { TestBlockProvider } from '../providers/test-block.provider';
import { TestBlocksController } from '../controllers/test-blocks.controller';
import { UserModule } from './user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      TestTypes,
      Test,
      TestBlock,
      TestToTestBlock,
      TestToUserDashboard,
    ]),
    UserModule,
  ],
  controllers: [TestTypesController, TestController, TestBlocksController],
  providers: [
    JwtDecoderUtil,
    TestTypesProvider,
    TestProvider,
    TestBlockProvider,
    SectionProvider,
  ],
  exports: [],
})
export class TestModule {}
