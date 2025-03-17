import { ProfessionalCharacteristics } from '../../entities/professional-characteristics.entity';

export interface ClientToServerEvents {
  search: (query: string) => void;
}

export interface ServerToClientEvents {
  searchResults: (
    data: ProfessionalCharacteristics[],
  ) => ProfessionalCharacteristics[];
  error: (message: string) => void;
}

export interface SocketData {
  userId: string;
}
