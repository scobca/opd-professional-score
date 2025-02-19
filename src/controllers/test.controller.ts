import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TestProvider } from '../providers/test.provider';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { CreateTestDto } from '../dto/test/create-test.dto';
import { UpdateTestDto } from '../dto/test/update-test.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('/test')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TestController {
  constructor(
    @Inject(TestProvider) private testProvider: TestProvider,
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

  @Get('/getTestById')
  public async getTestById(@Body() data: { id: number }) {
    return await this.testProvider.getTestById(data.id);
  }

  @Get('/getTestsByAuthorId')
  public async getTestsByAuthorId(@Body() data: { id: number }) {
    return await this.testProvider.getTestByAuthorId(data.id);
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
