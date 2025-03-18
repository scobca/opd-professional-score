import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { NotExistsException } from '../../exceptions/common/not-exists.exception';
import { CreateNewElasticPcDto } from './dto/create-new-elastic-pc.dto';
import { DismissCreatingDocumentException } from '../../exceptions/elastic/dismiss-creating-document.exception';
import { UpdateElasticDocDto } from './dto/update-elastic-doc.dto';
import { DeleteElasticDocDto } from './dto/delete-elastic-doc.dto';

@Injectable()
export class ElasticUtil {
  constructor(
    @Inject(ElasticsearchService) private ess: ElasticsearchService,
  ) {}

  // Return all documents if field "index" parameter equals void string and sort documents for index if field "index" not void
  async getAllDocuments(index: string) {
    try {
      const res = await this.ess.search({
        index,
        body: {
          query: { match_all: {} },
        },
      });

      return res.hits.hits;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err.meta.statusCode == 404) {
        throw new NotExistsException(`Topic with name ${index} not exists`);
      } else {
        throw err;
      }
    }
  }

  // Universal model for searching documents
  async getOne<T>(classDTO: T, index: string, query: string) {
    const excessVar: string[] = ['id', 'index'];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const fields: string[] = Object.keys(classDTO).filter(
      (el: string) => !excessVar.includes(el),
    );

    const docs = await this.ess.search({
      index: index,
      size: 100,
      query: {
        multi_match: {
          query: `${query}`,
          fields: fields,
          fuzziness: 1.5,
          fuzzy_transpositions: true,
          lenient: true,
          max_expansions: 200,
          auto_generate_synonyms_phrase_query: true,
          slop: 10,
        },
      },
    });

    return docs.hits.hits;
  }

  async create(data: CreateNewElasticPcDto) {
    try {
      return await this.ess.index({
        index: data.index,
        id: data.id,
        body: {
          name: data.name,
          description: data.description,
          pcType: data.PCType,
        },
      });
    } catch (err) {
      throw new DismissCreatingDocumentException('Error', err);
    }
  }

  async update<T>(data: UpdateElasticDocDto<T>) {
    try {
      return await this.ess.update({
        index: data.index,
        id: data.id,
        body: {
          doc: data.body,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async delete(data: DeleteElasticDocDto) {
    try {
      return await this.ess.delete({
        index: data.index,
        id: data.id,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
