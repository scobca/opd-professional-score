import { Injectable } from '@nestjs/common';
import { TestTypes } from '../entities/test-types.entity';
import { TestTypeNotFoundException } from '../exceptions/test/test-types/test-type-not-found.exception';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { CreateTestTypeDto } from '../dto/test/test-types/create-test-type.dto';
import { DoubleRecordException } from '../exceptions/common/double-record.exception';
import { UpdateTypeDto } from '../dto/test/test-types/update-type.dto';

@Injectable()
export class TestTypesProvider {
  public async getAllTestTypes(): Promise<TestTypes[]> {
    return await TestTypes.findAll();
  }

  public async getTypeById(id: number): Promise<TestTypes | null> {
    const type = await TestTypes.findOne({ where: { id: id } });
    if (type == null) throw new TestTypeNotFoundException(id, 'id');

    return type;
  }

  public async getTypeByName(name: string): Promise<TestTypes | null> {
    const type = await TestTypes.findOne({ where: { name: name } });
    if (type == null) throw new TestTypeNotFoundException(name, 'name');

    return type;
  }

  public async createType(
    data: CreateTestTypeDto,
  ): Promise<BasicSuccessfulResponse<TestTypes>> {
    const _ = await TestTypes.findOne({ where: { name: data.name } });
    if (_ != null) throw new DoubleRecordException('Type already exists');

    const type = await TestTypes.create({
      name: data.name,
      description: data.description,
    });
    return new BasicSuccessfulResponse<TestTypes>(type);
  }

  public async updateType(
    data: UpdateTypeDto,
  ): Promise<BasicSuccessfulResponse<TestTypes>> {
    await this.getTypeById(data.id);
    const updatedData: Partial<TestTypes> = data.updatedData;

    await TestTypes.update({ ...updatedData }, { where: { id: data.id } });
    const res = {
      message: 'Test type successfully updated',
      testType: await this.getTypeById(data.id),
    };
    return new BasicSuccessfulResponse(res);
  }

  public async deleteType(
    id: number,
  ): Promise<BasicSuccessfulResponse<string>> {
    await this.getTypeById(id);
    await TestTypes.destroy({
      where: { id: id },
    });

    return new BasicSuccessfulResponse<string>(
      'Test type successfully deleted',
    );
  }
}
