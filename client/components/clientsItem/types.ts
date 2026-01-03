import type { Client } from '../clients/types';

export interface Brief {
  id: string;
  clientId: string;
  concept: string;
  explanation: string;
  mood: string;
  moodTags: string[];
  references: Array<{ type: string; url: string; title: string }>;
  contentType: string;
  category: 'trending' | 'general';
  teamsInvolved: string[];
  music: { type: string; mood: string; reference: string };
  status: 'pending' | 'in-progress' | 'approved';
  currentStage?: string;
  notes?: Array<{
    id: string;
    authorId: string;
    text: string;
    createdAt: string;
  }>;
  createdAt?: string;
}

export interface ClientDetailsProps {
  client: Client;
  briefs: Brief[];
  content: any[];
}

export type TabType = 'briefs' | 'content' | 'calendar';






