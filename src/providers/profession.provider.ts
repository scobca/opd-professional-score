import { Injectable } from '@nestjs/common';
import { Profession } from '../entities/professions.entity';
import { ProfessionNotFoundException } from '../exceptions/professions/profession-not-found.exception';
import { CreateProfessionDto } from '../dto/professions/create-profession.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { UpdateProfessionDto } from '../dto/professions/update-profession.dto';

@Injectable()
export class ProfessionProvider {
  constructor() {}

  public async getAll(): Promise<Profession[]> {
    return await Profession.findAll();
  }

  public async getProfessionById(id: number): Promise<Profession> {
    const profession = await Profession.findOne({
      where: { id: id },
    });
    if (profession == null) throw new ProfessionNotFoundException(id, 'id');

    return profession;
  }

  public async createProfession(
    data: CreateProfessionDto,
  ): Promise<BasicSuccessfulResponse<Profession>> {
    const profession = await Profession.create({ ...data });

    const res = {
      message: 'Profession created successfully.',
      profession: await this.getProfessionById(profession.id),
    };
    return new BasicSuccessfulResponse(res);
  }

  public async updateProfession(
    data: UpdateProfessionDto,
  ): Promise<BasicSuccessfulResponse<Profession>> {
    const profession = await this.getProfessionById(data.id);
    const updatedData = data.updatedData;

    await Profession.update({ ...updatedData }, { where: { id: data.id } });

    const res = {
      message: 'Profession updated successfully.',
      profession: await this.getProfessionById(profession.id),
    };
    return new BasicSuccessfulResponse(res);
  }

  public async deleteProfessionById(
    id: number,
  ): Promise<BasicSuccessfulResponse<string>> {
    await this.getProfessionById(id);
    await Profession.destroy({ where: { id: id } });

    return new BasicSuccessfulResponse('Profession deleted successfully');
  }
}
