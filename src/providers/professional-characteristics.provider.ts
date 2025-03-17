import { Inject, Injectable } from '@nestjs/common';
import { ProfessionalCharacteristics } from '../entities/professional-characteristics.entity';
import { ProfessionalCharacteristicNotFoundException } from '../exceptions/professions/professional-characteristic-not-found.exception';
import { CreateProfCharDto } from '../dto/professions/professional-characteristics/create-prof-char.dto';
import { DoubleRecordException } from '../exceptions/common/double-record.exception';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { UpdateProfCharDto } from '../dto/professions/professional-characteristics/update-prof-char.dto';
import { ElasticUtil } from '../utils/elastic/elastic.util';
import { CreateNewElasticPcDto } from '../utils/elastic/dto/create-new-elastic-pc.dto';
import { DeleteElasticDocDto } from '../utils/elastic/dto/delete-elastic-doc.dto';
import { UpdateElasticDocDto } from '../utils/elastic/dto/update-elastic-doc.dto';
import { UpdatedProfCharDataDto } from '../dto/professions/professional-characteristics/updated-prof-char-data.dto';

@Injectable()
export class ProfessionalCharacteristicsProvider {
  constructor(@Inject(ElasticUtil) private elasticUtil: ElasticUtil) {}

  private async checkNameUnique(name: string) {
    const profChar = await ProfessionalCharacteristics.findOne({
      where: {
        name: name,
      },
    });

    return profChar == null;
  }

  public async getPCByName(name: string) {
    const pc = await ProfessionalCharacteristics.findOne({
      where: {
        name: name,
      },
    });
    if (pc == null)
      throw new ProfessionalCharacteristicNotFoundException(name, 'name');

    return pc;
  }

  public async getAll() {
    return await ProfessionalCharacteristics.findAll();
  }

  public async getProfCharById(id: number) {
    const profChar = await ProfessionalCharacteristics.findOne({
      where: { id: id },
    });
    if (profChar == null)
      throw new ProfessionalCharacteristicNotFoundException(id, 'id');

    return profChar;
  }

  public async createProfChar(data: CreateProfCharDto) {
    if (!(await this.checkNameUnique(data.name))) {
      throw new DoubleRecordException(
        'Professional characteristic with this name already exists',
      );
    }

    const newProfChar = await ProfessionalCharacteristics.create({
      name: data.name,
      description: data.description,
      PCType: data.pcType,
    }).then(async (res: ProfessionalCharacteristics) => {
      const newDoc: CreateNewElasticPcDto = {
        index: 'professional-characteristics',
        id: res.id.toString(),
        name: res.name,
        description: res.description,
        PCType: res.PCType,
      };

      await this.elasticUtil.create(newDoc);
    });

    const res = {
      message: 'Professional characteristics created successfully.',
      profChar: newProfChar,
    };
    return new BasicSuccessfulResponse(res);
  }

  public async createPullOfProfChar(data: CreateProfCharDto[]) {
    for (const profChar of data) {
      await this.createProfChar(profChar);
    }

    return 'Professional characteristics created successfully.';
  }

  public async updateProfChar(data: UpdateProfCharDto) {
    await this.getProfCharById(data.id);
    const updatedData = data.updatedData;

    if (updatedData.name != null) {
      if (!(await this.checkNameUnique(updatedData.name))) {
        throw new DoubleRecordException(
          'Professional characteristic with this name already exists',
        );
      }
    }
    await ProfessionalCharacteristics.update(
      { ...updatedData },
      { where: { id: data.id } },
    ).then(async () => {
      const updatable: UpdateElasticDocDto<UpdatedProfCharDataDto> = {
        index: 'professional-characteristics',
        id: data.id.toString(),
        body: data.updatedData,
      };

      await this.elasticUtil.update<UpdatedProfCharDataDto>(updatable);
    });

    return new BasicSuccessfulResponse(await this.getProfCharById(data.id));
  }

  public async deleteProfChar(
    id: number,
  ): Promise<BasicSuccessfulResponse<string>> {
    const pc = await this.getProfCharById(id);
    await ProfessionalCharacteristics.destroy({ where: { id: id } }).then(
      async () => {
        const deletable: DeleteElasticDocDto = {
          index: 'professional-characteristics',
          id: pc.id.toString(),
        };
        await this.elasticUtil.delete(deletable);
      },
    );

    return new BasicSuccessfulResponse(
      'Professional characteristics deleted successfully.',
    );
  }
}
