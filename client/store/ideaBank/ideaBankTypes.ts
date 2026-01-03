export interface IdeaBank {
  _id: string;
  clientId: {
    _id: string;
    name: string;
    businessType: string;
  };
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  idea?: string;
  type?: string;
  stage?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  scheduledFor?: string | null;
  platforms?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateIdeaBankData {
  clientId: string;
  idea?: string;
  type?: string;
  stage?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  scheduledFor?: string | null;
  platforms?: string[];
}

export interface UpdateIdeaBankData {
  idea?: string;
  type?: string;
  stage?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  scheduledFor?: string | null;
  platforms?: string[];
}

export interface IdeaBankState {
  ideaBankItems: IdeaBank[];
  selectedIdeaBankItem: IdeaBank | null;
  getIdeaBankItems: {
    isLoading: boolean;
    error: string | null;
  };
  getIdeaBankItem: {
    isLoading: boolean;
    error: string | null;
  };
  createIdeaBankItem: {
    isLoading: boolean;
    error: string | null;
  };
  updateIdeaBankItem: {
    isLoading: boolean;
    error: string | null;
  };
  deleteIdeaBankItem: {
    isLoading: boolean;
    error: string | null;
  };
}


