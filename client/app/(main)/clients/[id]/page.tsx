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
import { getClient } from '@/store/client/clientThunk';
import { createContentBrief, getContentBriefs } from '@/store/contentBrief/contentBriefThunk';
import { getIdeaBankItems } from '@/store/ideaBank/ideaBankThunk';
import type { Client as ApiClient } from '@/store/client/clientTypes';
import type { CreateContentBriefData } from '@/store/contentBrief/contentBriefTypes';
import type { ContentBrief } from '@/store/contentBrief/contentBriefTypes';
import type { IdeaBank } from '@/store/ideaBank/ideaBankTypes';
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
  const { selectedClient, getClient: getClientState } = useAppSelector((state) => state.client);
  const { createContentBrief: createBriefState, contentBriefs, getContentBriefs: getContentBriefsState } = useAppSelector((state) => state.contentBrief);
  const { ideaBankItems, getIdeaBankItems: getIdeaBankItemsState } = useAppSelector((state) => state.ideaBank);
  
  // Use mock data as reference for briefs, contentBank, departments, and team (local state)
  const [allBriefs, setAllBriefs] = useState<Brief[]>(mockBriefs);
  const [allContentBank, setAllContentBank] = useState<ContentItem[]>(mockContentBank);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Fetch current client from API on mount
  useEffect(() => {
    if (clientId && (!selectedClient || selectedClient._id !== clientId) && !getClientState.isLoading) {
      dispatch(getClient(clientId));
    }
  }, [dispatch, clientId, selectedClient, getClientState.isLoading]);
  
  // Map API client to component Client type
  const client: Client | undefined = useMemo(() => {
    if (!selectedClient) return undefined;
    return {
      id: selectedClient._id,
      name: selectedClient.name,
      industry: selectedClient.businessType,
      color: selectedClient.brandColor || '#6B7280',
      logo: selectedClient.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase(),
      description: selectedClient.description || '',
      website: selectedClient.website || '',
      contact: selectedClient.mail || '',
    };
  }, [selectedClient]);
  
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
  
  // Fetch data based on active tab
  useEffect(() => {
    if (!clientId) return;
    
    if (activeTab === 'briefs') {
      // Fetch content briefs for this client
      dispatch(getContentBriefs(clientId));
    } else if (activeTab === 'content') {
      // Fetch idea bank items for this client
      dispatch(getIdeaBankItems(clientId));
    }
    // Calendar tab is left for now as per requirements
  }, [dispatch, clientId, activeTab]);

  // Map API content briefs to component Brief type and update local state
  useEffect(() => {
    if (activeTab === 'briefs' && contentBriefs.length > 0) {
      const mappedBriefs: Brief[] = contentBriefs.map((brief: ContentBrief) => ({
        id: brief._id,
        clientId: brief.clientId._id,
        concept: brief.concept || '',
        explanation: brief.explanation || '',
        mood: brief.mood || '',
        moodTags: brief.moodTags || [],
        references: brief.references || [],
        contentType: brief.contentType || 'video',
        category: brief.category || 'general',
        teamsInvolved: Array.isArray(brief.teamsInvolved) 
          ? brief.teamsInvolved.map((team: any) => typeof team === 'string' ? team : team._id || team.id)
          : [],
        music: {
          type: brief.music?.type || 'none',
          mood: brief.music?.mood || '',
          reference: brief.music?.reference || '',
        },
        status: brief.status || 'pending',
        currentStage: brief.currentStage,
        notes: brief.notes?.map((note: any) => ({
          id: note._id || `note-${Date.now()}`,
          authorId: typeof note.authorId === 'string' ? note.authorId : note.authorId?._id || '',
          text: note.text || '',
          createdAt: note.createdAt || new Date().toISOString(),
        })) || [],
        createdAt: brief.createdAt,
      }));
      setAllBriefs(mappedBriefs);
    }
  }, [contentBriefs, activeTab]);

  // Map API idea bank items to component ContentItem type and update local state
  useEffect(() => {
    if (activeTab === 'content' && ideaBankItems.length > 0) {
      const mappedContent: ContentItem[] = ideaBankItems.map((item: IdeaBank) => ({
        id: item._id,
        clientId: item.clientId._id,
        idea: item.idea || '',
        type: item.type || 'photo',
        stage: item.stage || 'idea',
        priority: item.priority || 'medium',
        createdAt: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        scheduledFor: item.scheduledFor || null,
        platforms: item.platforms || [],
        notes: [],
      }));
      setAllContentBank(mappedContent);
    }
  }, [ideaBankItems, activeTab]);

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

  const validateBriefForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!newBrief.concept.trim()) {
      errors.concept = 'Concept is required';
    }

    if (!newBrief.contentType.trim()) {
      errors.contentType = 'Content type is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveBrief = async () => {
    setValidationErrors({});
    
    if (!validateBriefForm() || !client) {
      return;
    }

    try {
      const briefData: CreateContentBriefData = {
        clientId: client.id,
        concept: newBrief.concept.trim(),
        explanation: newBrief.explanation.trim() || undefined,
        mood: newBrief.mood.trim() || undefined,
        moodTags: newBrief.moodTags.length > 0 ? newBrief.moodTags : undefined,
        references: newBrief.references.length > 0 ? newBrief.references : undefined,
        contentType: newBrief.contentType.trim(),
        category: newBrief.category,
        teamsInvolved: newBrief.teamsInvolved.length > 0 ? newBrief.teamsInvolved : undefined,
        music: newBrief.music.type !== 'none' ? newBrief.music : undefined,
        status: 'pending',
      };

      await dispatch(createContentBrief(briefData)).unwrap();
      
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
      setValidationErrors({});
    } catch (error) {
      console.error('Failed to create content brief:', error);
    }
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

  // Show nothing while client is being fetched
  if (getClientState.isLoading) {
    return <div className="flex-1 flex items-center justify-center">Loading client...</div>;
  }
  
  // Show not found only after client has finished loading
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
