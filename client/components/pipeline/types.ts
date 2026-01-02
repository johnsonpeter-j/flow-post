export const stages = ['idea', 'execution', 'approval', 'ready', 'posted'] as const;
export type Stage = typeof stages[number];

export interface StageConfig {
  label: string;
  color: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}


