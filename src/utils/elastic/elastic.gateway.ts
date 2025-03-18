import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ElasticResponseElement,
  ServerToClientEvents,
} from './elastic.gateway.types';
import { Inject } from '@nestjs/common';
import { ElasticUtil } from './elastic.util';
import { ElasticPcInputDto } from './dto/elastic-pc-input.dto';
import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { PcSourceDto } from './dto/pc-source.dto';

@WebSocketGateway(3080, {
  path: '/pwkSocket/',
  transports: ['websocket'],
})
export class ElasticGateway {
  constructor(@Inject(ElasticUtil) private readonly elasticUtil: ElasticUtil) {}

  @WebSocketServer()
  server: Server<ClientToServerEvents, ServerToClientEvents>;

  @SubscribeMessage('search')
  async handleSearch(
    client: Socket<ClientToServerEvents, ServerToClientEvents>,
    query: string,
  ) {
    try {
      const elasticResponse: SearchHit[] = await this.elasticUtil.getOne(
        new ElasticPcInputDto(),
        'professional-characteristics',
        query,
      );

      const res: ElasticResponseElement[] = [];
      elasticResponse.forEach((doc) => {
        const src = doc._source as PcSourceDto;
        res.push({
          id: Number(doc._id),
          name: src.name,
          description: src.description,
          pcType: src.pcType,
        });
      });

      client.emit('searchResults', res);
    } catch (e) {
      client.emit('error', `Search failed with error: ${e}`);
    }
  }
}
