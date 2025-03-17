import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { HardLightTestProvider } from '../providers/hard-light-test.provider';
import { CreateHltDto } from '../dto/test/create-hlt.dto';

@Controller('test/hlt')
export class HardLightTestController {
  constructor(
    @Inject(HardLightTestProvider)
    private hardLightTestProvider: HardLightTestProvider,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.hardLightTestProvider.getAll();
  }

  @Get('/getById/:id')
  public async getById(@Param('id') id: number) {
    return await this.hardLightTestProvider.getById(id);
  }

  @Get('/getByUserId/:userId')
  public async getByUserId(@Param('userId') userId: number) {
    return await this.hardLightTestProvider.getByUserId(userId);
  }

  @Post('/create')
  public async create(@Body() data: CreateHltDto) {
    return await this.hardLightTestProvider.create(data);
  }

  @Delete('/delete/:id')
  public async delete(@Param('id') id: number) {
    return await this.hardLightTestProvider.delete(id);
  }
}
