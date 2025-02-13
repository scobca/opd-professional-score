import { Module } from '@nestjs/common';
import { Test } from '../entities/test.entity';
import { TestBlock } from '../entities/test-blocks.entity';
import { TestToTestBlock } from '../entities/test-to-test-block.entity';
import { TestTypes } from '../entities/test-types.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestToUserDashboard } from '../entities/test-to-user-dashboard.entity';
import { Section } from '../entities/section.entity';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { TestTypesProvider } from '../providers/test-types.provider';
import { TestTypesController } from '../controllers/test-types.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      TestTypes,
      Section,
      Test,
      TestBlock,
      TestToTestBlock,
      TestToUserDashboard,
    ]),
  ],
  controllers: [TestTypesController],
  providers: [TestTypesProvider, JwtDecoderUtil],
  exports: [],
})
export class TestModule {}
