'use client';

import { useState } from 'react';
import {
  Zap,
  Sparkles,
  Camera,
  PenLine,
  Clapperboard,
  Palette,
  Target,
  Send,
  FileText,
  Settings,
  Circle,
  Check,
  ArrowRight,
  X,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import type { Department, TeamMember } from '@/data/mockData';

interface WorkflowStep {
  id: string;
  label: string;
  icon: string;
  department: string;
}

interface WorkflowTrackerProps {
  contentType: string;
  currentStage?: string;
  status: string;
  departments: Department[];
  team: TeamMember[];
  teamsInvolved: string[];
}

const workflowDefinitions: Record<string, WorkflowStep[]> = {
  video: [
    { id: 'idea', label: 'Idea', icon: 'Lightbulb', department: 'd1' },
    { id: 'creative', label: 'Creative Direction', icon: 'Sparkles', department: 'd2' },
    { id: 'shoot', label: 'Shoot', icon: 'Camera', department: 'd6' },
    { id: 'copy', label: 'Copy', icon: 'PenLine', department: 'd5' },
    { id: 'edit', label: 'Edit', icon: 'Clapperboard', department: 'd4' },
    { id: 'post', label: 'Post', icon: 'Send', department: 'd1' },
  ],
  reel: [
    { id: 'idea', label: 'Idea', icon: 'Lightbulb', department: 'd1' },
    { id: 'creative', label: 'Creative Direction', icon: 'Sparkles', department: 'd2' },
    { id: 'shoot', label: 'Shoot', icon: 'Camera', department: 'd6' },
    { id: 'copy', label: 'Copy', icon: 'PenLine', department: 'd5' },
    { id: 'edit', label: 'Edit', icon: 'Clapperboard', department: 'd4' },
    { id: 'post', label: 'Post', icon: 'Send', department: 'd1' },
  ],
  photo: [
    { id: 'idea', label: 'Idea', icon: 'Lightbulb', department: 'd1' },
    { id: 'creative', label: 'Creative Direction', icon: 'Sparkles', department: 'd2' },
    { id: 'copy', label: 'Copy', icon: 'PenLine', department: 'd5' },
    { id: 'design', label: 'Design', icon: 'Palette', department: 'd3' },
    { id: 'post', label: 'Post', icon: 'Send', department: 'd1' },
  ],
  carousel: [
    { id: 'idea', label: 'Idea', icon: 'Lightbulb', department: 'd1' },
    { id: 'creative', label: 'Creative Direction', icon: 'Sparkles', department: 'd2' },
    { id: 'copy', label: 'Copy', icon: 'PenLine', department: 'd5' },
    { id: 'design', label: 'Design', icon: 'Palette', department: 'd3' },
    { id: 'post', label: 'Post', icon: 'Send', department: 'd1' },
  ],
  story: [
    { id: 'idea', label: 'Idea', icon: 'Lightbulb', department: 'd1' },
    { id: 'creative', label: 'Creative Direction', icon: 'Sparkles', department: 'd2' },
    { id: 'copy', label: 'Copy', icon: 'PenLine', department: 'd5' },
    { id: 'design', label: 'Design', icon: 'Palette', department: 'd3' },
    { id: 'post', label: 'Post', icon: 'Send', department: 'd1' },
  ],
  campaign: [
    { id: 'idea', label: 'Idea', icon: 'Lightbulb', department: 'd1' },
    { id: 'creative', label: 'Creative Direction', icon: 'Sparkles', department: 'd2' },
    { id: 'strategy', label: 'Strategy', icon: 'Target', department: 'd1' },
    { id: 'copy', label: 'Copy', icon: 'PenLine', department: 'd5' },
    { id: 'design', label: 'Design', icon: 'Palette', department: 'd3' },
    { id: 'launch', label: 'Launch', icon: 'Zap', department: 'd1' },
  ],
  live: [
    { id: 'idea', label: 'Idea', icon: 'Lightbulb', department: 'd1' },
    { id: 'creative', label: 'Creative Direction', icon: 'Sparkles', department: 'd2' },
    { id: 'script', label: 'Script', icon: 'FileText', department: 'd5' },
    { id: 'setup', label: 'Setup', icon: 'Settings', department: 'd6' },
    { id: 'live', label: 'Go Live', icon: 'Zap', department: 'd1' },
  ],
};

export default function WorkflowTracker({
  contentType,
  currentStage,
  status,
  departments,
  team,
  teamsInvolved,
}: WorkflowTrackerProps) {
  const [selectedStep, setSelectedStep] = useState<{ id: string; index: number } | null>(null);
  const workflow = workflowDefinitions[contentType] || workflowDefinitions.photo;

  // Determine current stage index
  let activeIndex = 0;
  if (currentStage) {
    activeIndex = workflow.findIndex((w) => w.id === currentStage);
  } else if (status === 'approved') {
    activeIndex = workflow.length - 1;
  } else if (status === 'in-progress') {
    activeIndex = Math.floor(workflow.length / 2);
  } else if (status === 'pending') {
    activeIndex = 1;
  }

  if (activeIndex === -1) activeIndex = 0;

  const getIcon = (iconName: string, size = 16) => {
    switch (iconName) {
      case 'Lightbulb':
        return <Zap size={size} />;
      case 'Sparkles':
        return <Sparkles size={size} />;
      case 'Camera':
        return <Camera size={size} />;
      case 'PenLine':
        return <PenLine size={size} />;
      case 'Clapperboard':
        return <Clapperboard size={size} />;
      case 'Palette':
        return <Palette size={size} />;
      case 'Target':
        return <Target size={size} />;
      case 'Send':
        return <Send size={size} />;
      case 'FileText':
        return <FileText size={size} />;
      case 'Settings':
        return <Settings size={size} />;
      case 'Zap':
        return <Zap size={size} />;
      default:
        return <Circle size={size} />;
    }
  };

  const getTeamMembers = (deptId: string) => {
    return team.filter((m) => m.departmentId === deptId);
  };

  const getDepartment = (deptId: string) => {
    return departments.find((d) => d.id === deptId);
  };

  const handleStepClick = (step: WorkflowStep, index: number) => {
    if (selectedStep?.id === step.id) {
      setSelectedStep(null);
    } else {
      setSelectedStep({ id: step.id, index });
    }
  };

  return (
    <div className="workflow-tracker">
      <div className="workflow-steps flex items-center gap-2 flex-wrap">
        {workflow.map((step, index) => {
          const isCompleted = index < activeIndex;
          const isCurrent = index === activeIndex;
          const isPending = index > activeIndex;
          const isSelected = selectedStep?.id === step.id;

          return (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`workflow-step flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                  isCompleted
                    ? 'bg-[#D1FAE5] text-[#059669]'
                    : isCurrent
                    ? 'bg-[#DBEAFE] text-[#2563EB]'
                    : 'bg-[#F3F4F6] text-[#6B7280]'
                } ${isSelected ? 'ring-2 ring-[#111827]' : ''}`}
                onClick={() => handleStepClick(step, index)}
              >
                <div className="step-icon">{isCompleted ? <Check size={14} /> : getIcon(step.icon, 14)}</div>
                <span className="step-label text-sm font-medium">{step.label}</span>
                {isCurrent && <span className="current-indicator text-xs bg-[#2563EB] text-white px-1.5 py-0.5 rounded">Current</span>}
              </div>
              {index < workflow.length - 1 && (
                <div className={`workflow-connector ${isCompleted ? 'text-[#059669]' : 'text-[#D1D5DB]'}`}>
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="workflow-progress-bar mt-3 h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
        <div
          className="progress-fill h-full bg-[#2563EB] transition-all duration-300"
          style={{ width: `${((activeIndex + 1) / workflow.length) * 100}%` }}
        />
      </div>

      {selectedStep && (
        <div className="workflow-team-panel mt-4 bg-white border border-[#E5E7EB] rounded-xl p-4">
          <div className="team-panel-header flex justify-between items-center mb-3">
            <div className="panel-step-info flex items-center gap-3">
              <span
                className="panel-step-icon w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ background: getDepartment(workflow.find((s) => s.id === selectedStep.id)?.department || '')?.color }}
              >
                {getIcon(workflow.find((s) => s.id === selectedStep.id)?.icon || '', 14)}
              </span>
              <div>
                <h5 className="font-semibold text-[#111827]">{workflow.find((s) => s.id === selectedStep.id)?.label}</h5>
                <span className="panel-dept-name text-xs text-[#6B7280]">
                  {getDepartment(workflow.find((s) => s.id === selectedStep.id)?.department || '')?.name}
                </span>
              </div>
            </div>
            <button className="panel-close text-[#9CA3AF] hover:text-[#6B7280]" onClick={() => setSelectedStep(null)}>
              <X size={14} />
            </button>
          </div>
          <div className="team-panel-members space-y-2">
            {getTeamMembers(workflow.find((s) => s.id === selectedStep.id)?.department || '').map((member) => (
              <div key={member.id} className="panel-member flex items-center gap-3 p-2 rounded-lg hover:bg-[#F9FAFB]">
                <div className="panel-member-avatar w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold" style={{ background: member.color }}>
                  {member.avatar}
                </div>
                <div className="panel-member-info flex-1">
                  <span className="panel-member-name block text-sm font-medium text-[#111827]">{member.name}</span>
                  <span className="panel-member-role block text-xs text-[#6B7280]">{member.role}</span>
                </div>
                <button className="panel-member-action text-[#9CA3AF] hover:text-[#6B7280]">
                  <MessageSquare size={14} />
                </button>
              </div>
            ))}
          </div>
          {selectedStep.index === activeIndex && (
            <div className="team-panel-status mt-3 flex items-center gap-2 text-xs text-[#D97706] bg-[#FEF3C7] px-3 py-2 rounded-lg">
              <AlertCircle size={14} />
              <span>This stage is currently in progress</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}





