import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { SimpleLightTestProvider } from '../providers/simple-light-test.provider';
import { CreateSltDto } from '../dto/test/create-slt.dto';

@Controller('/test/slt')
export class SimpleLightTestController {
  constructor(
    @Inject(SimpleLightTestProvider)
    private simpleLightTestProvider: SimpleLightTestProvider,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.simpleLightTestProvider.getAll();
  }

  @Get('/getById/:id')
  public async getById(@Param('id') id: number) {
    return await this.simpleLightTestProvider.getById(id);
  }

  @Get('/getByUserId/:userId')
  public async getBuUserId(@Param('userId') userId: number) {
    return await this.simpleLightTestProvider.getByUserId(userId);
  }

  @Post('/create')
  public async create(@Body() data: CreateSltDto) {
    return await this.simpleLightTestProvider.create(data);
  }

  @Delete('/delete/:id')
  public async delete(@Param('id') id: number) {
    return await this.simpleLightTestProvider.delete(id);
  }
}
