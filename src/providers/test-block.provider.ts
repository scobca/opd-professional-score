import { Injectable } from '@nestjs/common';
import { TestBlock } from '../entities/test-blocks.entity';
import { TestBlockNotFoundException } from '../exceptions/test/test-blocks/test-block-not-found.exception';

@Injectable()
export class TestBlockProvider {
  public async getAllTestBlocks(): Promise<TestBlock[]> {
    return TestBlock.findAll();
  }

  public async getTestBlockById(id: number): Promise<TestBlock> {
    const block = await TestBlock.findOne({ where: { id: id } });
    if (block == null) throw new TestBlockNotFoundException(id, 'id');

    return block;
  }
}
