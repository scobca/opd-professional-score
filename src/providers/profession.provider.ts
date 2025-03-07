import { Inject, Injectable } from '@nestjs/common';
import { Profession } from '../entities/professions.entity';
import { ProfessionNotFoundException } from '../exceptions/professions/profession-not-found.exception';
import { CreateProfessionDto } from '../dto/professions/create-profession.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { UpdateProfessionDto } from '../dto/professions/update-profession.dto';
import { ArchiveProfessionsStrategy } from '../strategies/archive-professions.strategy';

@Injectable()
export class ProfessionProvider {
  constructor(
    @Inject(ArchiveProfessionsStrategy)
    private archiveProfessionsStrategy: ArchiveProfessionsStrategy,
  ) {}

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
    const profession = await Profession.create({ ...data, archived: true });

    const res = {
      message: 'Profession created successfully.',
      profession: await this.getProfessionById(profession.id),
    };
    return new BasicSuccessfulResponse(res);
  }

  public async createPullOfProfessions(data: CreateProfessionDto[]) {
    for (const profession of data) {
      await Profession.create({ ...profession, archived: true });
    }

    const res = {
      message: 'Profession created successfully.',
    };
    return new BasicSuccessfulResponse(res);
  }

  public async updateProfession(
    data: UpdateProfessionDto,
  ): Promise<BasicSuccessfulResponse<Profession>> {
    const profession = await this.getProfessionById(data.id);
    const updatedData = data.updatedData;

    await Profession.update({ ...updatedData }, { where: { id: data.id } });
    await this.archiveProfessionsStrategy.setArchiveStatus(data.id);

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
