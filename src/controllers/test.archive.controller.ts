import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { TestArchiveProvider } from '../providers/archive/test.archive.provider';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { CreateTestDto } from '../dto/test/archive/create-test.dto';
import { UpdateTestDto } from '../dto/test/archive/update-test.dto';
import { TestToUserDashboard } from '../entities/test-to-user-dashboard.entity';
import { CustomTestOutputAdmin } from '../IO/custom/custom-test-output-admin';

@Controller('/test')
export class TestArchiveController {
  constructor(
    @Inject(TestArchiveProvider) private testProvider: TestArchiveProvider,
    @Inject(JwtDecoderUtil) private jwtDecoderUtil: JwtDecoderUtil,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.testProvider.getAllTests();
  }

  @Get('/getAllTestsAdmin')
  public async getAllTestsAdmin() {
    const tests = await this.testProvider.getAllTests();
    return tests.map((test) => ({
      id: test.id,
      name: test.name,
      header: test.header,
      createdAt: test.createdAt as string,
    }));
  }

  @Get('/getAllSolvedTests')
  public async getAllSolvedTests() {
    const tests = await TestToUserDashboard.findAll();
    const res: CustomTestOutputAdmin[] = [];

    await Promise.all(
      tests.map(async (test) => {
        const unit = await this.testProvider.getTestById(test.testId);
        res.push({
          id: unit.id,
          name: unit.name,
          header: unit.header,
          createdAt: unit.createdAt as string,
        });
      }),
    );

    return res;
  }

  @Get('/getAllTestsByUserId/:id')
  public async getAllTestsByUserId(@Param('id') id: number) {
    const tests = await TestToUserDashboard.findAll({
      where: { userId: id },
    });
    const res: CustomTestOutputAdmin[] = [];

    await Promise.all(
      tests.map(async (test) => {
        const unit = await this.testProvider.getTestById(test.testId);
        res.push({
          id: unit.id,
          name: unit.name,
          header: unit.header,
          createdAt: unit.createdAt as string,
        });
      }),
    );

    return res;
  }

  @Get('/getTestById/:id')
  public async getTestById(@Param('id') id: number) {
    return await this.testProvider.getTestById(id);
  }

  @Get('/getTestsByAuthorId/:id')
  public async getTestsByAuthorId(@Param('id') id: number) {
    return await this.testProvider.getTestByAuthorId(id);
  }

  @Post('/createTest')
  public async createTest(@Body() data: CreateTestDto, @Req() req: Request) {
    const jwt = this.jwtDecoderUtil.decode(req);
    if (jwt && 'id' in jwt && typeof jwt.id === 'number') {
      return await this.testProvider.createTest(data, jwt.id);
    }
  }

  @Patch('/updateTest')
  public async updateTest(@Body() data: UpdateTestDto) {
    return await this.testProvider.updateTest(data);
  }

  @Delete('/deleteTest')
  public async deleteTest(@Body() data: { id: number }) {
    return await this.testProvider.deleteTest(data.id);
  }
}
