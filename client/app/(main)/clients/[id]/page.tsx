'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'next/navigation';
import ClientHeader from '@/components/clientsItem/ClientHeader';
import ClientTabs from '@/components/clientsItem/ClientTabs';
import BriefsTab from '@/components/clientsItem/BriefsTab';
import ContentLibraryTab from '@/components/clientsItem/ContentLibraryTab';
import ClientCalendarTab from '@/components/clientsItem/ClientCalendarTab';
import BriefDetailModal from '@/components/clientsItem/BriefDetailModal';
import ClientNotFound from '@/components/clientsItem/ClientNotFound';
import type { TabType, Brief } from '@/components/clientsItem/types';
import type { Client } from '@/components/clients/types';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getClients } from '@/store/client/clientThunk';
import type { Client as ApiClient } from '@/store/client/clientTypes';
import { mockBriefs, mockContentBank, mockDepartments, mockTeam } from '@/data/mockData';

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
  postedAt?: string;
}

export default function ClientDetailsPage() {
  const params = useParams();
  const clientId = params.id as string;
  const filterRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { clients: apiClients, getClients: getClientsState } = useAppSelector((state) => state.client);
  
  // Use mock data as reference for briefs, contentBank, departments, and team (local state)
  const [allBriefs, setAllBriefs] = useState<Brief[]>(mockBriefs);
  const [allContentBank, setAllContentBank] = useState<ContentItem[]>(mockContentBank);
  
  // Fetch clients from API on mount if not already loaded
  useEffect(() => {
    if (apiClients.length === 0 && !getClientsState.isLoading) {
      dispatch(getClients());
    }
  }, [dispatch, apiClients.length, getClientsState.isLoading]);
  
  // Map API clients to component Client type
  const clients: Client[] = useMemo(() => {
    return apiClients.map((apiClient: ApiClient) => ({
      id: apiClient._id,
      name: apiClient.name,
      industry: apiClient.businessType,
      color: apiClient.brandColor || '#6B7280',
      logo: apiClient.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase(),
      description: apiClient.description || '',
      website: apiClient.website || '',
      contact: apiClient.mail || '',
    }));
  }, [apiClients]);
  
  // Local state management functions
  const addBrief = (brief: Brief) => {
    setAllBriefs((prev) => [...prev, brief]);
  };
  
  const addBriefNote = (briefId: string, note: { authorId: string; text: string }) => {
    const newNote = {
      id: `bn${Date.now()}`,
      authorId: note.authorId,
      text: note.text,
      createdAt: new Date().toISOString(),
    };
    setAllBriefs((prev) =>
      prev.map((brief) =>
        brief.id === briefId
          ? { ...brief, notes: [...(brief.notes || []), newNote] }
          : brief
      )
    );
  };
  
  const addContent = (content: ContentItem) => {
    setAllContentBank((prev) => [...prev, content]);
  };
  
  const deleteContent = (contentId: string) => {
    setAllContentBank((prev) => prev.filter((c) => c.id !== contentId));
  };
  
  const updateContentStage = (contentId: string, stage: string) => {
    setAllContentBank((prev) =>
      prev.map((content) => (content.id === contentId ? { ...content, stage } : content))
    );
  };
  
  const scheduleContent = (contentId: string, scheduledFor: string) => {
    setAllContentBank((prev) =>
      prev.map((content) => (content.id === contentId ? { ...content, scheduledFor } : content))
    );
  };

  const [activeTab, setActiveTab] = useState<TabType>('briefs');
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [newBrief, setNewBrief] = useState<NewBrief>({
    concept: '',
    explanation: '',
    mood: '',
    moodTags: [],
    references: [],
    contentType: 'video',
    category: 'general',
    teamsInvolved: [],
    music: { type: 'none', mood: '', reference: '' },
  });

  // Find client by ID
  const client = clients.find((c) => c.id === clientId);
  const clientBriefs = allBriefs.filter((b) => b.clientId === clientId);
  const clientContent = allContentBank.filter((c) => c.clientId === clientId);

  // Close filter dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredBriefs = clientBriefs.filter((brief) => {
    if (filterType !== 'all' && brief.contentType !== filterType) return false;
    if (filterStatus !== 'all' && brief.status !== filterStatus) return false;
    if (filterCategory !== 'all' && brief.category !== filterCategory) return false;
    return true;
  });

  const saveBrief = () => {
    if (!newBrief.concept || !client) return;
    const brief: Brief = {
      ...newBrief,
      id: `br${Date.now()}`,
      clientId: client.id,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      currentStage: undefined,
      notes: [],
    };
    addBrief(brief);
    setIsCreating(false);
    setNewBrief({
      concept: '',
      explanation: '',
      mood: '',
      moodTags: [],
      references: [],
      contentType: 'video',
      category: 'general',
      teamsInvolved: [],
      music: { type: 'none', mood: '', reference: '' },
    });
  };

  const handleAddBriefNote = (briefId: string, note: { authorId: string; text: string }) => {
    addBriefNote(briefId, note);
    // Update selected brief if it's the same one
    if (selectedBrief?.id === briefId) {
      const updatedBrief = allBriefs.find((b) => b.id === briefId);
      if (updatedBrief) {
        setSelectedBrief(updatedBrief);
      }
    }
  };

  const handleAddIdea = (idea: { idea: string; type: string; platforms: string[] }) => {
    if (!client) return;
    const newIdea: ContentItem = {
      id: `cb${Date.now()}`,
      clientId: client.id,
      idea: idea.idea,
      type: idea.type,
      stage: 'idea',
      priority: 'medium',
      createdAt: new Date().toISOString().split('T')[0],
      scheduledFor: null,
      platforms: idea.platforms,
      notes: [],
    };
    addContent(newIdea);
  };

  const handleDeleteIdea = (ideaId: string) => {
    deleteContent(ideaId);
  };

  const handleCreateBriefFromIdea = (idea: ContentItem) => {
    setNewBrief({
      concept: idea.idea,
      explanation: '',
      mood: '',
      moodTags: [],
      references: [],
      contentType: idea.type as any,
      category: 'general',
      teamsInvolved: [],
      music: { type: 'none', mood: '', reference: '' },
    });
    // Move the idea from 'idea' stage to 'execution'
    updateContentStage(idea.id, 'execution');
    setIsCreating(true);
    setActiveTab('briefs');
  };

  const handleScheduleContent = (contentId: string, date: string) => {
    scheduleContent(contentId, date);
  };

  // Show nothing while clients are being fetched
  if (getClientsState.isLoading) {
    return null; // Could show a loading spinner here
  }
  
  // Show not found only after clients have finished loading
  if (!client) {
    return <ClientNotFound />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <ClientHeader
        client={client}
        briefsCount={clientBriefs.length}
        contentCount={clientContent.length}
        publishedCount={clientContent.filter((c) => c.stage === 'posted').length}
      />

      <ClientTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'briefs' && (
        <BriefsTab
          briefs={clientBriefs}
          filteredBriefs={filteredBriefs}
          filterType={filterType}
          filterStatus={filterStatus}
          filterCategory={filterCategory}
          onFilterTypeChange={setFilterType}
          onFilterStatusChange={setFilterStatus}
          onFilterCategoryChange={setFilterCategory}
          onBriefClick={setSelectedBrief}
          isCreating={isCreating}
          newBrief={newBrief}
          onBriefChange={setNewBrief}
          onSaveBrief={saveBrief}
          onCancelBrief={() => {
            setIsCreating(false);
            setNewBrief({
              concept: '',
              explanation: '',
              mood: '',
              moodTags: [],
              references: [],
              contentType: 'video',
              category: 'general',
              teamsInvolved: [],
              music: { type: 'none', mood: '', reference: '' },
            });
          }}
          onCreateBrief={() => setIsCreating(true)}
        />
      )}

      {activeTab === 'content' && (
        <ContentLibraryTab
          client={client}
          clientContent={clientContent}
          onCreateBrief={handleCreateBriefFromIdea}
          onAddIdea={handleAddIdea}
          onDeleteIdea={handleDeleteIdea}
        />
      )}

      {activeTab === 'calendar' && (
        <ClientCalendarTab
          client={client}
          clientContent={clientContent}
          onScheduleContent={handleScheduleContent}
        />
      )}

      <BriefDetailModal
        brief={selectedBrief}
        onClose={() => setSelectedBrief(null)}
        departments={mockDepartments}
        team={mockTeam}
        onAddNote={handleAddBriefNote}
      />
    </div>
  );
}
