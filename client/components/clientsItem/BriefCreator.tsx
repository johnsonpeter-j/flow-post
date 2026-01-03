'use client';

import { useState, useEffect } from 'react';
import { X, Check, Video, Camera, Layers, Play, Circle, Target, Zap, Flame, Globe, Link as LinkIcon, Plus } from 'lucide-react';
import { moodOptions, contentTypes, musicTypes } from './constants';
import axiosInstance from '@/lib/axios';

interface NewBrief {
  concept: string;
  explanation: string;
  mood: string;
  moodTags: string[];
  references: Array<{ type: string; url: string; title: string }>;
  contentType: string;
  category: 'trending' | 'general';
  teamsInvolved: string[];
  music: { type: string; mood: string; reference: string };
}

interface BriefCreatorProps {
  newBrief: NewBrief;
  onBriefChange: (brief: NewBrief) => void;
  onSave: () => void;
  onCancel: () => void;
}

interface DepartmentWithUsers {
  _id: string;
  id: string;
  name: string;
  users: Array<{
    _id: string;
    id: string;
    name: string;
  }>;
}

export default function BriefCreator({ newBrief, onBriefChange, onSave, onCancel }: BriefCreatorProps) {
  const [departments, setDepartments] = useState<DepartmentWithUsers[]>([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setIsLoadingDepartments(true);
        const response = await axiosInstance.get('/departments/with-users');
        setDepartments(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
        setDepartments([]);
      } finally {
        setIsLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  const toggleTeam = (deptId: string) => {
    onBriefChange({
      ...newBrief,
      teamsInvolved: newBrief.teamsInvolved.includes(deptId)
        ? newBrief.teamsInvolved.filter((id) => id !== deptId)
        : [...newBrief.teamsInvolved, deptId],
    });
  };

  const toggleMoodTag = (tag: string) => {
    onBriefChange({
      ...newBrief,
      moodTags: newBrief.moodTags.includes(tag)
        ? newBrief.moodTags.filter((t) => t !== tag)
        : [...newBrief.moodTags, tag],
    });
  };

  const addReference = () => {
    const url = prompt('Enter reference URL:');
    if (url) {
      const title = prompt('Enter reference title:');
      onBriefChange({
        ...newBrief,
        references: [...newBrief.references, { type: 'link', url, title: title || url }],
      });
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={14} />;
      case 'photo':
        return <Camera size={14} />;
      case 'carousel':
        return <Layers size={14} />;
      case 'reel':
        return <Play size={14} />;
      case 'story':
        return <Circle size={14} />;
      case 'campaign':
        return <Target size={14} />;
      case 'live':
        return <Zap size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 mb-6">
      <div className="creator-header flex justify-between items-center mb-5 pb-4 border-b border-[#F3F4F6]">
        <h3 className="text-base font-semibold text-[#111827]">New Content Brief</h3>
        <button className="close-btn text-[#9CA3AF] hover:text-[#6B7280] transition-colors" onClick={onCancel}>
          <X size={18} />
        </button>
      </div>

      <div className="creator-form flex flex-col gap-5">
        <div className="form-row">
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">Concept Title</label>
            <input
              type="text"
              placeholder="Give this brief a memorable name..."
              value={newBrief.concept}
              onChange={(e) => onBriefChange({ ...newBrief, concept: e.target.value })}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">Explanation</label>
            <textarea
              placeholder="Describe the concept in detail. What's the story? What message should it convey?"
              value={newBrief.explanation}
              onChange={(e) => onBriefChange({ ...newBrief, explanation: e.target.value })}
              rows={4}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF] resize-none"
            />
          </div>
        </div>

        <div className="form-row two-col flex gap-4">
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">Content Type</label>
            <div className="type-selector flex flex-wrap gap-1.5">
              {contentTypes.map((type) => (
                <button
                  key={type}
                  className={`type-btn flex items-center gap-1.5 py-2 px-3 rounded-md text-[0.75rem] cursor-pointer transition-all capitalize ${
                    newBrief.contentType === type
                      ? 'bg-[#111827] border-[#111827] text-white'
                      : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                  }`}
                  onClick={() => onBriefChange({ ...newBrief, contentType: type })}
                >
                  {getContentTypeIcon(type)}
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">Category</label>
            <div className="category-selector flex gap-2">
              <button
                className={`category-btn flex items-center gap-1.5 py-2.5 px-4 rounded-lg text-[0.8rem] cursor-pointer flex-1 justify-center transition-all ${
                  newBrief.category === 'trending'
                    ? 'bg-[#FEF3C7] border border-[#F59E0B] text-[#D97706]'
                    : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                }`}
                onClick={() => onBriefChange({ ...newBrief, category: 'trending' })}
              >
                <Flame size={14} />
                Trending
              </button>
              <button
                className={`category-btn flex items-center gap-1.5 py-2.5 px-4 rounded-lg text-[0.8rem] cursor-pointer flex-1 justify-center transition-all ${
                  newBrief.category === 'general'
                    ? 'bg-[#DBEAFE] border border-[#3B82F6] text-[#2563EB]'
                    : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                }`}
                onClick={() => onBriefChange({ ...newBrief, category: 'general' })}
              >
                <Globe size={14} />
                General
              </button>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">Mood Description</label>
            <input
              type="text"
              placeholder="Describe the overall feeling... (e.g., Warm, authentic, artisanal)"
              value={newBrief.mood}
              onChange={(e) => onBriefChange({ ...newBrief, mood: e.target.value })}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">Mood Tags</label>
            <div className="mood-tags flex flex-wrap gap-1.5">
              {moodOptions.map((tag) => (
                <button
                  key={tag}
                  className={`mood-tag py-1.5 px-3 rounded-2xl text-[0.7rem] cursor-pointer transition-all ${
                    newBrief.moodTags.includes(tag)
                      ? 'bg-[#111827] border border-[#111827] text-white'
                      : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                  }`}
                  onClick={() => toggleMoodTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">References</label>
            <div className="references-list flex flex-wrap gap-2">
              {newBrief.references.map((ref, i) => (
                <div key={i} className="reference-item flex items-center gap-1.5 py-1 px-2 bg-[#F3F4F6] rounded-md text-[0.75rem] text-[#374151]">
                  <LinkIcon size={14} />
                  <span>{ref.title}</span>
                  <button
                    onClick={() =>
                      onBriefChange({
                        ...newBrief,
                        references: newBrief.references.filter((_, idx) => idx !== i),
                      })
                    }
                    className="text-[#9CA3AF] hover:text-[#6B7280]"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <button
                className="add-reference-btn flex items-center gap-1 py-1.5 px-3 border border-dashed border-[#D1D5DB] rounded-md text-[0.75rem] text-[#6B7280] cursor-pointer hover:border-[#9CA3AF] hover:text-[#374151] transition-colors"
                onClick={addReference}
              >
                <Plus size={14} />
                Add Reference
              </button>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">Teams Involved</label>
            <div className="teams-selector flex flex-wrap gap-2">
              {isLoadingDepartments ? (
                <div className="text-[0.75rem] text-[#6B7280]">Loading departments...</div>
              ) : departments.length === 0 ? (
                <div className="text-[0.75rem] text-[#6B7280]">No departments found</div>
              ) : (
                departments.map((dept) => {
                  // Generate a consistent color based on department ID
                  const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'];
                  const colorIndex = parseInt(dept._id.slice(-1), 16) % colors.length;
                  const deptColor = colors[colorIndex];

                  return (
                    <button
                      key={dept.id}
                      className={`team-btn flex items-center gap-1.5 py-2 px-3.5 rounded-lg text-[0.75rem] cursor-pointer transition-all ${
                        newBrief.teamsInvolved.includes(dept.id)
                          ? 'border-2'
                          : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                      }`}
                      style={
                        newBrief.teamsInvolved.includes(dept.id)
                          ? { borderColor: deptColor, background: `${deptColor}10`, color: deptColor }
                          : {}
                      }
                      onClick={() => toggleTeam(dept.id)}
                    >
                      {newBrief.teamsInvolved.includes(dept.id) && <Check size={12} style={{ color: deptColor }} />}
                      <span>{dept.name}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="form-row two-col flex gap-4">
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">Music Type</label>
            <select
              value={newBrief.music.type}
              onChange={(e) => onBriefChange({ ...newBrief, music: { ...newBrief.music, type: e.target.value } })}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF]"
            >
              {musicTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">Music Mood</label>
            <input
              type="text"
              placeholder="e.g., upbeat, calm, inspirational"
              value={newBrief.music.mood}
              onChange={(e) => onBriefChange({ ...newBrief, music: { ...newBrief.music, mood: e.target.value } })}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1 flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">Music Reference</label>
            <input
              type="text"
              placeholder="Artist, song, or style reference..."
              value={newBrief.music.reference}
              onChange={(e) => onBriefChange({ ...newBrief, music: { ...newBrief.music, reference: e.target.value } })}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div className="form-actions flex justify-end gap-2.5 pt-4 border-t border-[#F3F4F6]">
          <button
            className="cancel-btn py-2.5 px-5 bg-white border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#6B7280] cursor-pointer hover:bg-[#F9FAFB] transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="save-btn flex items-center gap-1.5 py-2.5 px-5 bg-[#111827] border-none rounded-lg text-[0.85rem] text-white cursor-pointer hover:bg-[#1F2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSave}
            disabled={!newBrief.concept}
          >
            <Check size={16} />
            Create Brief
          </button>
        </div>
      </div>
    </div>
  );
}



