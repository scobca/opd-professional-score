import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TestTypesProvider } from '../providers/test-types.provider';
import { CreateTestTypeDto } from '../dto/test/test-types/create-test-type.dto';
import { UpdateTypeDto } from '../dto/test/test-types/update-type.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('/testTypes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TestTypesController {
  constructor(
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
  ) {}

  @Get('/getAll')
  async getAllTestTypes() {
    return await this.testTypesProvider.getAllTestTypes();
  }

  @Get('/getById')
  async getTestTypeById(@Body() data: { id: number }) {
    return await this.testTypesProvider.getTypeById(data.id);
  }

  @Get('/getByName')
  async getTestTypeByName(@Body() data: { name: string }) {
    return await this.testTypesProvider.getTypeByName(data.name);
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
