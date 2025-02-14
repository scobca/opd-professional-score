import { Section } from '../entities/section.entity';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SectionProvider } from '../providers/section.provider';
import { SectionController } from '../controllers/section.controller';

@Module({
  imports: [SequelizeModule.forFeature([Section])],
  controllers: [SectionController],
  providers: [SectionProvider],
  exports: [SectionProvider],
})
export class SectionModule {}
