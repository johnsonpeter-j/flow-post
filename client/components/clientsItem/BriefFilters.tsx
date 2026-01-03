'use client';

import { useState, useEffect, useRef } from 'react';
import { Filter, ChevronDown, X, Video, Camera, Layers, Play, Circle, Target, Zap, Flame, Globe } from 'lucide-react';
import { contentTypes } from './constants';

interface BriefFiltersProps {
  filterType: string;
  filterCategory: string;
  onFilterTypeChange: (type: string) => void;
  onFilterCategoryChange: (category: string) => void;
}

export default function BriefFilters({
  filterType,
  filterCategory,
  onFilterTypeChange,
  onFilterCategoryChange,
}: BriefFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      case 'live':
        return <Zap size={12} />;
      default:
        return null;
    }
  };

  const activeFilterCount = [filterType, filterCategory].filter((f) => f !== 'all').length;

  return (
    <div className="relative" ref={filterRef}>
      <button
        className={`flex items-center gap-1.5 py-2 px-3 bg-white border rounded-lg text-[0.8rem] text-[#6B7280] cursor-pointer transition-all ${
          filterType !== 'all' || filterCategory !== 'all'
            ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#3B82F6]'
            : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]'
        }`}
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter size={14} />
        <span>Filter</span>
        {activeFilterCount > 0 && (
          <span className="bg-[#3B82F6] text-white text-[0.65rem] font-semibold py-0.5 px-1.5 rounded-[10px] ml-0.5">
            {activeFilterCount}
          </span>
        )}
        <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </button>

      {showFilters && (
        <div className="absolute top-full right-0 mt-1.5 bg-white border border-[#E5E7EB] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-[100] min-w-[240px] overflow-hidden">
          <div className="p-3.5 border-b border-[#F3F4F6]">
            <label className="text-[0.65rem] font-semibold text-[#9CA3AF] uppercase tracking-wide block mb-2">
              Content Type
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                className={`flex items-center gap-1.5 py-1.5 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-[0.75rem] text-[#6B7280] cursor-pointer transition-all capitalize ${
                  filterType === 'all'
                    ? 'bg-[#111827] border-[#111827] text-white'
                    : 'hover:border-[#D1D5DB] hover:bg-[#F3F4F6]'
                }`}
                onClick={() => onFilterTypeChange('all')}
              >
                All Types
              </button>
              {contentTypes.map((type) => (
                <button
                  key={type}
                  className={`flex items-center gap-1.5 py-1.5 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-[0.75rem] text-[#6B7280] cursor-pointer transition-all capitalize ${
                    filterType === type
                      ? 'bg-[#111827] border-[#111827] text-white'
                      : 'hover:border-[#D1D5DB] hover:bg-[#F3F4F6]'
                  }`}
                  onClick={() => onFilterTypeChange(type)}
                >
                  {getContentTypeIcon(type)}
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="p-3.5 border-b border-[#F3F4F6]">
            <label className="text-[0.65rem] font-semibold text-[#9CA3AF] uppercase tracking-wide block mb-2">
              Category
            </label>
            <div className="flex gap-2">
              <button
                className={`flex items-center gap-1.5 py-2.5 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[0.8rem] text-[#6B7280] cursor-pointer flex-1 justify-center transition-all ${
                  filterCategory === 'all'
                    ? 'bg-[#111827] border-[#111827] text-white'
                    : 'hover:border-[#D1D5DB]'
                }`}
                onClick={() => onFilterCategoryChange('all')}
              >
                All Categories
              </button>
              <button
                className={`flex items-center gap-1.5 py-2.5 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[0.8rem] text-[#6B7280] cursor-pointer flex-1 justify-center transition-all ${
                  filterCategory === 'trending'
                    ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#D97706]'
                    : 'hover:border-[#D1D5DB]'
                }`}
                onClick={() => onFilterCategoryChange('trending')}
              >
                <Flame size={12} />
                Trending
              </button>
              <button
                className={`flex items-center gap-1.5 py-2.5 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[0.8rem] text-[#6B7280] cursor-pointer flex-1 justify-center transition-all ${
                  filterCategory === 'general'
                    ? 'bg-[#DBEAFE] border-[#3B82F6] text-[#2563EB]'
                    : 'hover:border-[#D1D5DB]'
                }`}
                onClick={() => onFilterCategoryChange('general')}
              >
                <Globe size={12} />
                General
              </button>
            </div>
          </div>
          {(filterType !== 'all' || filterCategory !== 'all') && (
            <div className="p-3.5 border-t border-[#F3F4F6]">
              <button
                className="flex items-center gap-1.5 text-[0.75rem] text-[#6B7280] hover:text-[#111827] transition-colors"
                onClick={() => {
                  onFilterTypeChange('all');
                  onFilterCategoryChange('all');
                }}
              >
                <X size={12} />
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}






