import { Inject, Injectable } from '@nestjs/common';
import { TestBlock } from '../entities/test-blocks.entity';
import { TestBlockNotFoundException } from '../exceptions/test/test-blocks/test-block-not-found.exception';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { TestToTestBlock } from '../entities/test-to-test-block.entity';
import { CreateTestBlockDto } from '../dto/test/test-blocks/create-test-block.dto';
import { TestProvider } from './test.provider';
import { Test } from '../entities/test.entity';
import { SectionProvider } from './section.provider';
import { CreateTestToTestBlockDto } from '../dto/test/test-blocks/create-test-to-test-block.dto';
import { UpdateTestBlockDto } from '../dto/test/test-blocks/update-test-block.dto';

@Injectable()
export class TestBlockProvider {
  constructor(
    @Inject(TestProvider) private testProvider: TestProvider,
    @Inject(SectionProvider) private sectionProvider: SectionProvider,
  ) {}

  public async getAll(): Promise<TestBlock[]> {
    return TestBlock.findAll({ include: [Test] });
  }

  public async getTestBlockById(id: number): Promise<TestBlock> {
    const block = await TestBlock.findOne({
      where: { id: id },
      include: [Test],
    });
    if (block == null) throw new TestBlockNotFoundException(id, 'id');

    return block;
  }

  private async getTTB(
    testId: number,
    testBlockId: number,
  ): Promise<TestToTestBlock | null> {
    return await TestToTestBlock.findOne({
      where: { testId: testId, testBlockId: testBlockId },
    });
  }

  private async createTestToTestBlock(
    dto: CreateTestToTestBlockDto,
  ): Promise<TestToTestBlock> {
    await this.testProvider.getTestById(dto.testId);
    return await TestToTestBlock.create({
      testId: dto.testId,
      testBlockId: dto.testBlockId,
    });
  }

  private async deleteTTB(id: number): Promise<void> {
    await TestToTestBlock.destroy({ where: { id: id } });
  }

  public async createTestBlock(
    data: CreateTestBlockDto,
    authorId: number,
  ): Promise<BasicSuccessfulResponse<TestBlock>> {
    const testBlock = await TestBlock.create({ ...data, authorId: authorId });

    await Promise.all(
      data.tests.map(async (test) => {
        await this.createTestToTestBlock({
          testId: test.testId,
          testBlockId: testBlock.id,
        });
      }),
    );

    const res = {
      message: 'Test block successfully created',
      testBlock: await this.getTestBlockById(testBlock.id),
    };
    return new BasicSuccessfulResponse(res);
  }

  public async updateTestBlock(data: UpdateTestBlockDto) {
    await this.getTestBlockById(data.id);
    const updatedData = data.updatedData;

    await TestBlock.update({ ...data }, { where: { id: data.id } });

    if (updatedData.newTests != null) {
      await Promise.all(
        updatedData.newTests.map(async (test) => {
          await this.createTestToTestBlock({
            testId: test.testId,
            testBlockId: data.id,
          });
        }),
      );
    }

    if (updatedData.updatedTests != null) {
      await Promise.all(
        updatedData.updatedTests.map(async (test) => {
          await this.testProvider.updateTest(test);
        }),
      );
    }

    if (updatedData.removableTests != null) {
      await Promise.all(
        updatedData.removableTests.map(async (test) => {
          const TTB = await this.getTTB(test.testId, data.id);
          if (TTB == null)
            throw new TestBlockNotFoundException(test.testId, 'id');

          await this.deleteTTB(TTB.id);
        }),
      );
    }

    const res = {
      message: 'Test block updated successfully.',
      testBlock: await this.getTestBlockById(data.id),
    };

    return new BasicSuccessfulResponse(res);
  }

  public async deleteTestBlock(
    id: number,
  ): Promise<BasicSuccessfulResponse<string>> {
    await this.getTestBlockById(id);
    await TestBlock.destroy({ where: { id: id } });

    return new BasicSuccessfulResponse('Test block successfully deleted');
  }
}
