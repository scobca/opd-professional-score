import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from './elastic.gateway.types';
import { ProfessionalCharacteristics } from '../../entities/professional-characteristics.entity';

@WebSocketGateway(3080, {
  path: '/pwkSocket/',
  transports: ['websocket'],
})
export class ElasticGateway {
  @WebSocketServer()
  server: Server<ClientToServerEvents, ServerToClientEvents>;

  afterInit() {
    console.log('Elastic Gateway started');
    this.server.on('connection', () => {
      console.log('Клиент подключен');
    });
  }

  @SubscribeMessage('search')
  async handleSearch(
    client: Socket<ClientToServerEvents, ServerToClientEvents>,
    query: string,
  ) {
    try {
      const res = await ProfessionalCharacteristics.findAll();
      client.emit('searchResults', res);
    } catch (e) {
      console.error(e);
      client.emit('error', 'Search failed');
    }
  }
}
