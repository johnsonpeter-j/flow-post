export interface ContentBrief {
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
  concept?: string;
  explanation?: string;
  mood?: string;
  moodTags?: string[];
  references?: Array<{
    type: string;
    url: string;
    title: string;
  }>;
  contentType?: string;
  category?: 'trending' | 'general';
  teamsInvolved?: Array<{
    _id: string;
    name: string;
  }>;
  music?: {
    type?: string;
    mood?: string;
    reference?: string;
  };
  status?: 'pending' | 'in-progress' | 'approved';
  currentStage?: string;
  notes?: Array<{
    _id?: string;
    authorId?: {
      _id: string;
      name: string;
      email: string;
    };
    text: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContentBriefData {
  clientId: string;
  concept?: string;
  explanation?: string;
  mood?: string;
  moodTags?: string[];
  references?: Array<{
    type: string;
    url: string;
    title: string;
  }>;
  contentType?: string;
  category?: 'trending' | 'general';
  teamsInvolved?: string[];
  music?: {
    type?: string;
    mood?: string;
    reference?: string;
  };
  status?: 'pending' | 'in-progress' | 'approved';
  currentStage?: string;
  notes?: Array<{
    authorId: string;
    text: string;
  }>;
}

export interface UpdateContentBriefData {
  concept?: string;
  explanation?: string;
  mood?: string;
  moodTags?: string[];
  references?: Array<{
    type: string;
    url: string;
    title: string;
  }>;
  contentType?: string;
  category?: 'trending' | 'general';
  teamsInvolved?: string[];
  music?: {
    type?: string;
    mood?: string;
    reference?: string;
  };
  status?: 'pending' | 'in-progress' | 'approved';
  currentStage?: string;
  notes?: Array<{
    authorId: string;
    text: string;
  }>;
}

export interface ContentBriefState {
  contentBriefs: ContentBrief[];
  selectedContentBrief: ContentBrief | null;
  getContentBriefs: {
    isLoading: boolean;
    error: string | null;
  };
  getContentBrief: {
    isLoading: boolean;
    error: string | null;
  };
  createContentBrief: {
    isLoading: boolean;
    error: string | null;
  };
  updateContentBrief: {
    isLoading: boolean;
    error: string | null;
  };
  deleteContentBrief: {
    isLoading: boolean;
    error: string | null;
  };
}


