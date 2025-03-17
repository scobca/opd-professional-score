import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { AdditionTestProvider } from '../providers/additioon-test.provider';
import { CreateAtDto } from '../dto/test/create-at.dto';

@Controller('test/at')
export class AdditionTestController {
  constructor(
    @Inject(AdditionTestProvider)
    private additionTestProvider: AdditionTestProvider,
  ) {}

  @Get('getAll')
  public async getAll() {
    return await this.additionTestProvider.getAll();
  }

  @Get('getById/:id')
  public async getById(@Param('id') id: number) {
    return await this.additionTestProvider.getById(id);
  }

  @Get('getByUserId/:userId')
  public async getByUserId(@Param('userId') userId: number) {
    return await this.additionTestProvider.getByUserId(userId);
  }

  @Post('createSoundAddition')
  public async createSoundAddition(@Body() data: CreateAtDto) {
    return await this.additionTestProvider.createSoundAddition(data);
  }

  @Post('createVisualAddition')
  public async createVisualAddition(@Body() data: CreateAtDto) {
    return await this.additionTestProvider.createVisualAddition(data);
  }

  @Delete('delete/:id')
  public async delete(@Param('id') id: number) {
    return await this.additionTestProvider.delete(id);
  }
}
