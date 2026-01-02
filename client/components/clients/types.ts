export interface Client {
  id: string;
  name: string;
  industry: string;
  color: string;
  logo: string;
  description: string;
  website: string;
  contact: string;
}

export interface ClientStats {
  briefs: number;
  content: number;
  posted: number;
}

export interface NewClient {
  name: string;
  industry: string;
  description: string;
  website: string;
  contact: string;
  color: string;
}



