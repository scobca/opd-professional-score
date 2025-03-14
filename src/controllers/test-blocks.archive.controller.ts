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
import { TestBlockArchiveProvider } from '../providers/archive/test-block.archive.provider';
import { CreateTestBlockDto } from '../dto/test/archive/test-blocks/create-test-block.dto';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { UpdateTestBlockDto } from '../dto/test/archive/test-blocks/update-test-block.dto';

@Controller('/testBlock')
export class TestBlocksArchiveController {
  constructor(
    @Inject(TestBlockArchiveProvider)
    private testBlockProvider: TestBlockArchiveProvider,
    @Inject(JwtDecoderUtil) private jwtDecoderUtil: JwtDecoderUtil,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.testBlockProvider.getAll();
  }

  @Get('/getTestBlockById/:id')
  public async getTestBlockById(@Param('id') id: number) {
    return await this.testBlockProvider.getTestBlockById(id);
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
