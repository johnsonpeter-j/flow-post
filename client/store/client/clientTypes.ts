export interface Client {
  _id: string;
  name: string;
  businessType: string;
  description: string;
  website: string;
  mail: string;
  phone: string;
  brandColor: string;
  createdAt: string;
  updatedAt: string;
  briefStats?: {
    total: number;
    ready: number;
    posted: number;
  };
}

export interface CreateClientData {
  name: string;
  businessType: string;
  description?: string;
  website?: string;
  mail: string;
  phone?: string;
  brandColor?: string;
}

export interface UpdateClientData {
  name?: string;
  businessType?: string;
  description?: string;
  website?: string;
  mail?: string;
  phone?: string;
  brandColor?: string;
}

export interface ClientState {
  clients: Client[];
  selectedClient: Client | null;
  getClients: {
    isLoading: boolean;
    error: string | null;
  };
  getClient: {
    isLoading: boolean;
    error: string | null;
  };
  createClient: {
    isLoading: boolean;
    error: string | null;
  };
  updateClient: {
    isLoading: boolean;
    error: string | null;
  };
  deleteClient: {
    isLoading: boolean;
    error: string | null;
  };
}

