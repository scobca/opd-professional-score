import { Inject, Injectable } from '@nestjs/common';
import { Test } from '../../entities/test.entity';
import { TestNotFoundException } from '../../exceptions/test/test-not-found.exception';
import { CreateTestDto } from '../../dto/test/archive/create-test.dto';
import { SectionProvider } from '../section.provider';
import { CreateSectionDto } from '../../dto/test/section/create-section.dto';
import { Section } from '../../entities/section.entity';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { UserProvider } from '../user.provider';
import { UpdateTestDto } from '../../dto/test/archive/update-test.dto';
import { TypesMismatchException } from '../../exceptions/common/types-mismatch.exception';
import { TestCreatedResponse } from '../../IO/custom/test-created-response';

@Injectable()
export class TestArchiveProvider {
  constructor(
    @Inject(SectionProvider) private sectionProvider: SectionProvider,
    @Inject(UserProvider) private userProvider: UserProvider,
  ) {}

  public async getAllTests(): Promise<Test[]> {
    return await Test.findAll({ include: [Section] });
  }

  public async getTestById(id: number): Promise<Test> {
    const test = await Test.findOne({ where: { id: id }, include: [Section] });
    if (!test) throw new TestNotFoundException(id, 'id', 'Test');

    return test;
  }

  public async getTestByAuthorId(
    authorId: number,
  ): Promise<BasicSuccessfulResponse<Test[]>> {
    await this.userProvider.getUserById(authorId);
    const tests = await Test.findAll({ where: { authorId: authorId } });

    if (tests.length == 0) {
      const res = {
        message: `This user hasn't got any tests.`,
        tests: tests,
      };

      return new BasicSuccessfulResponse(res);
    } else {
      const res = {
        message: `Tests created by user with id '${authorId}':`,
        tests: tests,
      };

      return new BasicSuccessfulResponse(res);
    }
  }

  public async createTest(
    data: CreateTestDto,
    authorId: number,
  ): Promise<BasicSuccessfulResponse<TestCreatedResponse>> {
    const test = await Test.create({
      ...data,
      authorId: authorId,
    });

    await Promise.all(
      data.sections.map((section) => {
        const newSection: CreateSectionDto = {
          testId: test.id,
          ...section,
        };
        return this.sectionProvider.create(newSection);
      }),
    );

    const res: TestCreatedResponse = {
      message: 'Test created successfully.',
      test: await this.getTestById(test.id),
    };

    return new BasicSuccessfulResponse(res);
  }

  public async updateTest(data: UpdateTestDto) {
    const updatedData = data.updatedData;
    const test = await this.getTestById(data.id);
    const sectionIds: number[] = [];
    const deletableSections = await this.sectionProvider.getSectionsByTestId(
      test.id,
    );

    await Test.update({ ...updatedData }, { where: { id: data.id } });

    if (updatedData.sections != null) {
      await Promise.all(
        updatedData.sections.map(async (section) => {
          if (!('id' in section)) {
            const newSection: CreateSectionDto = {
              ...section,
              testId: test.id,
            };
            await this.sectionProvider.create(newSection);
          } else if ('updatedData' in section) {
            sectionIds.push(section.id);
            await this.sectionProvider.update(section);
          } else
            throw new TypesMismatchException("Section doesn't match any type");
        }),
      );

      await Promise.all(
        deletableSections.map(async (section) => {
          if (!sectionIds.includes(section.id)) {
            return this.sectionProvider.delete(section.id);
          }
        }),
      );
    }

    const res = {
      message: 'Test updated successfully.',
      test: await this.getTestById(test.id),
    };
    return new BasicSuccessfulResponse(res);
  }

  public async deleteTest(
    id: number,
  ): Promise<BasicSuccessfulResponse<string>> {
    await this.getTestById(id);
    await Test.destroy({ where: { id: id } }).then(() =>
      this.sectionProvider.deleteAllByTestId(id),
    );

    return new BasicSuccessfulResponse('Test deleted successfully.');
  }
}
