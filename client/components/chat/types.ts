export interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string | { message: string; suggestions?: string[] };
  timestamp?: Date;
}


