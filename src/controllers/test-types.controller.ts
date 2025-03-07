import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TestTypesProvider } from '../providers/test-types.provider';
import { CreateTestTypeDto } from '../dto/test/test-types/create-test-type.dto';
import { UpdateTypeDto } from '../dto/test/test-types/update-type.dto';

@Controller('/testTypes')
export class TestTypesController {
  constructor(
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
  ) {}

  @Get('/getAll')
  async getAllTestTypes() {
    return await this.testTypesProvider.getAllTestTypes();
  }

  @Get('/getById/:id')
  async getTestTypeById(@Param('id') id: number) {
    return await this.testTypesProvider.getTypeById(id);
  }

  @Get('/getByName/:name')
  async getTestTypeByName(@Param('name') name: string) {
    return await this.testTypesProvider.getTypeByName(name);
  }

  @Post('create')
  async createTestType(@Body() data: CreateTestTypeDto) {
    return await this.testTypesProvider.createType(data);
  }

  @Patch('/update')
  async updateTestType(@Body() data: UpdateTypeDto) {
    return await this.testTypesProvider.updateType(data);
  }

  @Delete('/delete')
  async deleteTestType(@Body() data: { id: number }) {
    return await this.testTypesProvider.deleteType(data.id);
  }
}
