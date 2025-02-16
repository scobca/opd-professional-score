import { Inject, Injectable } from '@nestjs/common';
import { Profession } from '../entities/professions.entity';
import { ProfessionNotFoundException } from '../exceptions/professions/profession-not-found.exception';
import { UserProvider } from './user.provider';
import { CreateProfessionDto } from '../dto/professions/create-profession.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { ProfessionalCharacteristicsProvider } from './professional-characteristics.provider';
import { ProfessionToProfessionalCharacteristics } from '../entities/profession-to-professional-characteristics.entity';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { UpdateProfessionDto } from '../dto/professions/update-profession.dto';

@Injectable()
export class ProfessionProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(ProfessionalCharacteristicsProvider)
    private profCharProvider: ProfessionalCharacteristicsProvider,
  ) {}

  public async getAll(): Promise<Profession[]> {
    return await Profession.findAll({ include: [ProfessionalCharacteristics] });
  }

  public async getProfessionById(id: number): Promise<Profession> {
    const profession = await Profession.findOne({
      where: { id: id },
      include: [ProfessionalCharacteristics],
    });
    if (profession == null) throw new ProfessionNotFoundException(id, 'id');

    return profession;
  }

  public async getProfessionByAuthorId(
    id: number,
  ): Promise<Profession[] | null> {
    await this.userProvider.getUserById(id);
    return await Profession.findAll({
      where: { authorId: id },
      include: [ProfessionalCharacteristics],
    });
  }

  public async createProfession(
    data: CreateProfessionDto,
    authorId: number,
  ): Promise<BasicSuccessfulResponse<Profession>> {
    const profession = await Profession.create({ ...data, authorId });

    await Promise.all(
      data.profChar.map(async (char) => {
        await this.profCharProvider.getProfCharById(char.profCharId);
        await ProfessionToProfessionalCharacteristics.create({
          professionId: profession.id,
          professionalCharacteristicsId: char.profCharId,
        });
      }),
    );

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

    if (updatedData.newProfChar != null) {
      await Promise.all(
        updatedData.newProfChar.map(async (char) => {
          await this.profCharProvider.getProfCharById(char.profCharId);
          await ProfessionToProfessionalCharacteristics.create({
            professionId: profession.id,
            professionalCharacteristicsId: char.profCharId,
          });
        }),
      );
    }

    if (updatedData.removableProfChar != null) {
      await Promise.all(
        updatedData.removableProfChar.map(async (char) => {
          await this.profCharProvider.getProfCharById(char.profCharId);
          await ProfessionToProfessionalCharacteristics.destroy({
            where: {
              professionId: data.id,
              professionalCharacteristicsId: char.profCharId,
            },
          });
        }),
      );
    }

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
