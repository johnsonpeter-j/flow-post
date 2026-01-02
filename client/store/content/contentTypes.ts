export interface ContentItem {
  id: string;
  clientId: string;
  idea: string;
  type: string;
  stage: string;
  priority: string;
  createdAt: string;
  scheduledFor: string | null;
  platforms: string[];
  notes?: Array<{
    id: string;
    authorId: string;
    text: string;
    createdAt: string;
  }>;
  postedAt?: string;
}

export interface ContentState {
  contentBank: ContentItem[];
}


