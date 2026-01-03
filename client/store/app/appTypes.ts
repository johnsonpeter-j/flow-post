import type { Client } from '@/components/clients/types';
import type { Department, TeamMember } from '@/data/mockData';

export interface AppState {
  clients: Client[];
  departments: Department[];
  team: TeamMember[];
  selectedClientId: string | null;
}





