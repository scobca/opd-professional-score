import { Module } from '@nestjs/common';
import { Test } from '../entities/test.entity';
import { TestBlock } from '../entities/test-blocks.entity';
import { TestToTestBlock } from '../entities/test-to-test-block.entity';
import { TestTypes } from '../entities/test-types.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestToUserDashboard } from '../entities/test-to-user-dashboard.entity';
import { Section } from '../entities/section.entity';

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
  controllers: [],
  providers: [],
  exports: [],
})
export class TestModule {}
