'use client';

import { useState } from 'react';
import {
  Plus,
  X,
  Search,
  Zap,
  Video,
  Camera,
  Layers,
  Play,
  Circle,
  Target,
  Calendar,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from 'lucide-react';
import type { Client } from '@/components/clients/types';

interface ContentItem {
  id: string;
  clientId: string;
  idea: string;
  type: string;
  stage: string;
  priority: string;
  createdAt: string;
  scheduledFor: string | null;
  platforms: string[];
  notes?: any[];
}

interface ContentLibraryTabProps {
  client: Client;
  clientContent: ContentItem[];
  onCreateBrief: (idea: ContentItem) => void;
  onAddIdea: (idea: { idea: string; type: string; platforms: string[] }) => void;
  onDeleteIdea: (ideaId: string) => void;
}

const typeOptions = ['video', 'photo', 'carousel', 'reel', 'story', 'campaign'];
const platformOptions = ['instagram', 'facebook', 'linkedin', 'twitter', 'tiktok', 'youtube'];

export default function ContentLibraryTab({
  client,
  clientContent,
  onCreateBrief,
  onAddIdea,
  onDeleteIdea,
}: ContentLibraryTabProps) {
  const [isAddingIdea, setIsAddingIdea] = useState(false);
  const [newIdea, setNewIdea] = useState({ idea: '', type: 'video', platforms: ['instagram'] });
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Ideas are items in "idea" stage that haven't been picked yet
  const ideas = clientContent.filter((c) => c.stage === 'idea');
  const pickedIdeas = clientContent.filter((c) => c.stage !== 'idea' && c.stage !== 'posted');

  // Filter ideas
  const filteredIdeas = ideas.filter((idea) => {
    if (filterType !== 'all' && idea.type !== filterType) return false;
    if (searchQuery && !idea.idea.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleAddIdea = () => {
    if (!newIdea.idea.trim()) return;
    onAddIdea(newIdea);
    setNewIdea({ idea: '', type: 'video', platforms: ['instagram'] });
    setIsAddingIdea(false);
  };

  const handleDeleteIdea = (ideaId: string) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      onDeleteIdea(ideaId);
    }
  };

  const togglePlatform = (platform: string) => {
    setNewIdea((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={12} />;
      case 'photo':
        return <Camera size={12} />;
      case 'carousel':
        return <Layers size={12} />;
      case 'reel':
        return <Play size={12} />;
      case 'story':
        return <Circle size={12} />;
      case 'campaign':
        return <Target size={12} />;
      default:
        return null;
    }
  };

  return (
    <div className="content-library-section p-6">
      <div className="library-header flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="library-title flex items-center gap-2">
          <h2 className="text-[1.1rem] font-semibold text-[#111827]">Idea Bank</h2>
          <span className="library-count text-[0.75rem] font-medium text-[#9CA3AF]">{filteredIdeas.length} ideas</span>
        </div>
        <div className="library-actions flex items-center gap-3 flex-wrap">
          <div className="library-search flex items-center gap-2 py-2 px-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
            <Search size={14} className="text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none outline-none bg-transparent text-[0.8rem] text-[#111827] w-40 placeholder:text-[#9CA3AF]"
            />
          </div>
          <select
            className="type-filter-select py-2 px-3 bg-white border border-[#E5E7EB] rounded-lg text-[0.75rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF]"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            className="action-btn primary flex items-center gap-1.5 py-1.75 px-3 bg-[#111827] border border-[#111827] rounded-md text-white text-[0.75rem] font-medium cursor-pointer hover:bg-[#1F2937] transition-colors"
            onClick={() => setIsAddingIdea(true)}
          >
            <Plus size={16} />
            Add Idea
          </button>
        </div>
      </div>

      {/* Add Idea Form */}
      {isAddingIdea && (
        <div className="add-idea-card bg-white border border-[#E5E7EB] rounded-xl p-4 mb-5">
          <div className="add-idea-header flex justify-between items-center mb-3.5 pb-2.5 border-b border-[#F3F4F6]">
            <h3 className="text-[0.95rem] font-semibold text-[#111827]">New Idea</h3>
            <button className="close-btn text-[#9CA3AF] hover:text-[#6B7280] transition-colors" onClick={() => setIsAddingIdea(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="add-idea-form flex flex-col gap-3.5">
            <div className="form-group flex flex-col gap-1.5">
              <label className="text-[0.7rem] font-semibold text-[#6B7280] uppercase">Idea Description</label>
              <textarea
                placeholder="Describe your content idea..."
                value={newIdea.idea}
                onChange={(e) => setNewIdea((prev) => ({ ...prev, idea: e.target.value }))}
                rows={3}
                className="w-full py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF] resize-none"
              />
            </div>
            <div className="form-row two-col flex gap-4">
              <div className="form-group flex-1 flex flex-col gap-1.5">
                <label className="text-[0.7rem] font-semibold text-[#6B7280] uppercase">Content Type</label>
                <select
                  value={newIdea.type}
                  onChange={(e) => setNewIdea((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF]"
                >
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group flex-1 flex flex-col gap-1.5">
                <label className="text-[0.7rem] font-semibold text-[#6B7280] uppercase">Platforms</label>
                <div className="platform-toggles flex flex-wrap gap-1.5">
                  {platformOptions.map((platform) => (
                    <button
                      key={platform}
                      className={`platform-toggle w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
                        newIdea.platforms.includes(platform)
                          ? 'bg-[#111827] border-[#111827] text-white'
                          : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                      }`}
                      onClick={() => togglePlatform(platform)}
                    >
                      {platform === 'instagram' && <Instagram size={14} />}
                      {platform === 'facebook' && <Facebook size={14} />}
                      {platform === 'linkedin' && <Linkedin size={14} />}
                      {platform === 'twitter' && <Twitter size={14} />}
                      {platform === 'tiktok' && <span className="platform-text text-[0.6rem] font-semibold">TT</span>}
                      {platform === 'youtube' && <Play size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="add-idea-actions flex justify-end gap-2.5 pt-2.5 border-t border-[#F3F4F6]">
              <button
                className="cancel-btn py-2 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#6B7280] cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                onClick={() => setIsAddingIdea(false)}
              >
                Cancel
              </button>
              <button
                className="save-btn flex items-center gap-1.5 py-2 px-4 bg-[#111827] border-none rounded-lg text-[0.85rem] text-white cursor-pointer hover:bg-[#1F2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddIdea}
                disabled={!newIdea.idea.trim()}
              >
                <Plus size={14} />
                Add Idea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ideas Grid */}
      <div className="ideas-grid grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {filteredIdeas.length === 0 ? (
          <div className="col-span-full no-ideas-message flex flex-col items-center justify-center py-12 text-center text-[#9CA3AF]">
            <Zap size={32} className="mb-4 opacity-40" />
            <h4 className="text-[#6B7280] mb-1">No ideas yet</h4>
            <p className="text-sm">
              {searchQuery || filterType !== 'all' ? 'Try adjusting your filters' : 'Add your first content idea to get started'}
            </p>
            {!searchQuery && filterType === 'all' && (
              <button
                className="add-idea-inline flex items-center gap-1.5 py-2.5 px-4.5 bg-[#111827] border-none rounded-lg text-[0.85rem] text-white cursor-pointer hover:bg-[#1F2937] transition-colors mt-3"
                onClick={() => setIsAddingIdea(true)}
              >
                <Plus size={14} />
                Add Idea
              </button>
            )}
          </div>
        ) : (
          filteredIdeas.map((idea) => (
            <div key={idea.id} className="idea-card bg-white border border-[#E5E7EB] rounded-xl p-4 transition-all duration-150 hover:border-[#D1D5DB] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="idea-card-header flex justify-between items-center mb-3">
                <span className="idea-type flex items-center gap-1 text-[0.7rem] text-[#6B7280]">
                  {getContentTypeIcon(idea.type)}
                  {idea.type}
                </span>
                <span
                  className={`priority-badge text-[0.65rem] font-semibold px-2 py-0.5 rounded-md capitalize ${
                    idea.priority === 'high' || idea.priority === 'urgent'
                      ? 'bg-[#FEE2E2] text-[#DC2626]'
                      : idea.priority === 'medium'
                      ? 'bg-[#FEF3C7] text-[#D97706]'
                      : 'bg-[#F3F4F6] text-[#6B7280]'
                  }`}
                >
                  {idea.priority}
                </span>
              </div>
              <p className="idea-text text-[0.8rem] text-[#6B7280] leading-relaxed mb-3">{idea.idea}</p>
              <div className="idea-platforms flex flex-wrap gap-1.5 mb-3">
                {idea.platforms?.map((p) => (
                  <span key={p} className={`platform-icon ${p} w-6 h-6 rounded flex items-center justify-center text-[#6B7280]`}>
                    {p === 'instagram' && <Instagram size={12} />}
                    {p === 'facebook' && <Facebook size={12} />}
                    {p === 'linkedin' && <Linkedin size={12} />}
                    {p === 'twitter' && <Twitter size={12} />}
                    {p === 'tiktok' && <span className="tt-icon text-[0.5rem] font-semibold">TT</span>}
                    {p === 'youtube' && <Play size={12} />}
                  </span>
                ))}
              </div>
              <div className="idea-card-footer flex justify-between items-center">
                <span className="idea-date flex items-center gap-1 text-[0.7rem] text-[#6B7280]">
                  <Calendar size={12} />
                  {new Date(idea.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <div className="idea-actions flex gap-1.5">
                  <button
                    className="idea-action-btn delete w-7 h-7 rounded-md bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] cursor-pointer hover:bg-[#FEE2E2] hover:border-[#FECACA] hover:text-[#DC2626] transition-all flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteIdea(idea.id);
                    }}
                    title="Delete idea"
                  >
                    <X size={14} />
                  </button>
                  <button
                    className="idea-action-btn pick flex items-center gap-1 py-1.5 px-2.5 bg-[#111827] border border-[#111827] rounded-md text-white text-[0.7rem] cursor-pointer hover:bg-[#1F2937] transition-colors"
                    onClick={() => onCreateBrief(idea)}
                    title="Create brief from this idea"
                  >
                    <ArrowRight size={14} />
                    Pick
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Picked Ideas Summary */}
      {pickedIdeas.length > 0 && (
        <div className="picked-summary mt-8 bg-white border border-[#E5E7EB] rounded-xl p-5">
          <h3 className="text-base font-semibold text-[#111827] mb-1">In Progress ({pickedIdeas.length})</h3>
          <p className="picked-summary-text text-[0.75rem] text-[#6B7280] mb-3">These ideas have moved past the idea stage</p>
          <div className="picked-ideas-list flex flex-col gap-2">
            {pickedIdeas.slice(0, 5).map((idea) => (
              <div key={idea.id} className="picked-idea-item flex items-center gap-2 py-2 px-3 bg-[#F9FAFB] rounded-lg">
                <span
                  className={`stage-badge text-[0.65rem] font-semibold px-2 py-0.5 rounded-md capitalize ${
                    idea.stage === 'execution'
                      ? 'bg-[#DBEAFE] text-[#2563EB]'
                      : idea.stage === 'approval'
                      ? 'bg-[#F3E8FF] text-[#7C3AED]'
                      : idea.stage === 'ready'
                      ? 'bg-[#D1FAE5] text-[#059669]'
                      : 'bg-[#F3F4F6] text-[#6B7280]'
                  }`}
                >
                  {idea.stage}
                </span>
                <span className="picked-idea-text text-[0.8rem] text-[#374151] flex-1">{idea.idea}</span>
              </div>
            ))}
            {pickedIdeas.length > 5 && (
              <span className="more-picked text-[0.75rem] text-[#9CA3AF] text-center py-2">+{pickedIdeas.length - 5} more</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


