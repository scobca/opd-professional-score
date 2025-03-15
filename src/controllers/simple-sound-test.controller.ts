import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { SimpleSoundTestProvider } from '../providers/simple-sound-test.provider';
import { CreateSstDto } from '../dto/test/create-sst.dto';

@Controller('/test/sst')
export class SimpleSoundTestController {
  constructor(
    @Inject(SimpleSoundTestProvider)
    private simpleSoundTestProvider: SimpleSoundTestProvider,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.simpleSoundTestProvider.getAll();
  }

  @Get('/getById/:id')
  public async getById(@Param('id') id: number) {
    return await this.simpleSoundTestProvider.getById(id);
  }

  @Get('/getByUserId/:userId')
  public async getBuUserId(@Param('userId') userId: number) {
    return await this.simpleSoundTestProvider.getByUserId(userId);
  }

  @Post('/create')
  public async create(@Body() data: CreateSstDto) {
    return await this.simpleSoundTestProvider.create(data);
  }

  @Delete('/delete/:id')
  public async delete(@Param('id') id: number) {
    return await this.simpleSoundTestProvider.delete(id);
  }
}
