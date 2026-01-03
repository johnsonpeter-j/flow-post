import type { Message } from './types';
import type { ContentItem } from '@/types/contentItem';
import type { Task } from '@/store/tasks/tasksTypes';
import type { Brief } from '@/components/clientsItem/types';
import type { Client } from '@/components/clients/types';

interface ChatAIData {
  contentBank: ContentItem[];
  briefs: Brief[];
  tasks: Task[];
  clients: Client[];
}

export function generateAIResponse(
  userMessage: string,
  data: ChatAIData
): { message: string; suggestions?: string[] } {
  const { contentBank, briefs, tasks, clients } = data;
  const lowerMessage = userMessage.toLowerCase();

  // Pipeline related
  if (lowerMessage.includes('pipeline') || lowerMessage.includes('content')) {
    const inProgress = contentBank.filter((c) => c.stage !== 'idea' && c.stage !== 'posted').length;
    const ready = contentBank.filter((c) => c.stage === 'ready').length;
    return {
      message: `Your content pipeline has ${inProgress} items in progress and ${ready} items ready to post. Would you like to see more details?`,
      suggestions: ['Show ready content', 'View pipeline', 'Check approvals'],
    };
  }

  // Due/Tasks related
  if (lowerMessage.includes('due') || lowerMessage.includes('task') || lowerMessage.includes('deadline')) {
    const overdue = tasks.filter((t) => new Date(t.deadline) < new Date() && t.status !== 'done').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    return {
      message: `You have ${overdue} overdue tasks and ${pending} pending tasks. Check the Problems page for details.`,
      suggestions: ['View problems', 'Show tasks', 'Team workload'],
    };
  }

  // Team related
  if (lowerMessage.includes('team') || lowerMessage.includes('workload')) {
    return {
      message: 'I can help you check team workload and assignments. Navigate to the Team page for detailed information.',
      suggestions: ['View team', 'Check workload', 'Assign tasks'],
    };
  }

  // Analytics related
  if (lowerMessage.includes('analytics') || lowerMessage.includes('performance') || lowerMessage.includes('stats')) {
    const posted = contentBank.filter((c) => c.stage === 'posted').length;
    return {
      message: `You have ${posted} posted items. Visit the Analytics page for detailed performance metrics and insights.`,
      suggestions: ['View analytics', 'Performance report', 'Engagement stats'],
    };
  }

  // Client related
  if (lowerMessage.includes('client')) {
    return {
      message: `You're managing ${clients.length} clients. Would you like to view a specific client or see the full list?`,
      suggestions: ['View clients', 'Client details', 'Add client'],
    };
  }

  // Briefs related
  if (lowerMessage.includes('brief')) {
    const pending = briefs.filter((b) => b.status === 'pending').length;
    return {
      message: `You have ${briefs.length} content briefs, with ${pending} pending. Check the Clients page to view and manage them.`,
      suggestions: ['View briefs', 'Create brief', 'Pending briefs'],
    };
  }

  // Default response
  return {
    message: "I can help you with that! Use the sidebar to navigate to different sections, or ask me about your content pipeline, team tasks, or analytics.",
    suggestions: ['Pipeline', 'Calendar', 'Team', 'Analytics'],
  };
}





