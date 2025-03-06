import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { TestBlockProvider } from '../providers/test-block.provider';
import { CreateTestBlockDto } from '../dto/test/test-blocks/create-test-block.dto';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { UpdateTestBlockDto } from '../dto/test/test-blocks/update-test-block.dto';

@Controller('/testBlock')
export class TestBlocksController {
  constructor(
    @Inject(TestBlockProvider) private testBlockProvider: TestBlockProvider,
    @Inject(JwtDecoderUtil) private jwtDecoderUtil: JwtDecoderUtil,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.testBlockProvider.getAll();
  }

  @Get('/getTestBlockById')
  public async getTestBlockById(@Body() data: { id: number }) {
    return await this.testBlockProvider.getTestBlockById(data.id);
  }

  @Post('/createTestBlock')
  public async createTestBlock(
    @Body() data: CreateTestBlockDto,
    @Req() req: Request,
  ) {
    const jwt = this.jwtDecoderUtil.decode(req);
    if (jwt && 'id' in jwt && typeof jwt.id === 'number') {
      return await this.testBlockProvider.createTestBlock(data, jwt.id);
    }
  }

  @Patch('/updateTestBlock')
  public async updateTestBlock(@Body() data: UpdateTestBlockDto) {
    return await this.testBlockProvider.updateTestBlock(data);
  }

  @Delete('/deleteTestBlock')
  public async deleteTestBlock(@Body() data: { id: number }) {
    return await this.testBlockProvider.deleteTestBlock(data.id);
  }
}
