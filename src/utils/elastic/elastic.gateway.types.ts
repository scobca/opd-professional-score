import { PcTypesEnum } from '../../config/enums/pc-types.enum';

export interface ClientToServerEvents {
  search: (query: string) => void;
}

export interface ServerToClientEvents {
  searchResults: (data: ElasticResponseElement[]) => void;
  error: (message: string) => void;
}

export interface SocketData {
  userId: string;
}

export interface ElasticResponseElement {
  id: number;
  name: string;
  description: string;
  pcType: PcTypesEnum;
}
