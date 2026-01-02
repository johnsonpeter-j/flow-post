import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, Sparkles, Calendar, BarChart3, Users, Layers, Clock, CheckCircle2, AlertCircle, ArrowRight, X, ChevronRight, ChevronLeft, ChevronDown, Zap, Target, Palette, Video, Camera, PenTool, MessageSquare, Search, Bell, Settings, MoreHorizontal, TrendingUp, TrendingDown, Eye, Heart, Share2, MessageCircle, Filter, ArrowUpRight, Grip, Play, Image, FileText, Instagram, Facebook, Linkedin, Twitter, GripVertical, User, Mail, Phone, Briefcase, CheckSquare, Circle, AlertTriangle, Wand2, Clapperboard, PenLine, FolderKanban, Music, Link, Hash, Flame, Globe, ImagePlus, ExternalLink, Check, Building2, Upload } from 'lucide-react';

// Simulated database
const initialDB = {
  clients: [
    { 
      id: 'c1', 
      name: 'Brew & Co', 
      industry: 'Coffee Shop', 
      color: '#8B5A2B',
      logo: 'BC',
      description: 'Artisanal coffee roasters with 5 locations across the city',
      website: 'brewandco.com',
      contact: 'hello@brewandco.com'
    },
    { 
      id: 'c2', 
      name: 'FitFlow', 
      industry: 'Fitness App', 
      color: '#2D8B6F',
      logo: 'FF',
      description: 'AI-powered fitness coaching app for busy professionals',
      website: 'fitflow.app',
      contact: 'marketing@fitflow.app'
    },
    { 
      id: 'c3', 
      name: 'Luxe Interiors', 
      industry: 'Interior Design', 
      color: '#6B5B95',
      logo: 'LI',
      description: 'High-end residential and commercial interior design studio',
      website: 'luxeinteriors.co',
      contact: 'projects@luxeinteriors.co'
    },
  ],
  departments: [
    { id: 'd1', name: 'Project Managers', icon: 'folder', color: '#6366F1' },
    { id: 'd2', name: 'Creative Directors', icon: 'sparkles', color: '#EC4899' },
    { id: 'd3', name: 'Designers', icon: 'palette', color: '#F59E0B' },
    { id: 'd4', name: 'Video Editors', icon: 'clapperboard', color: '#EF4444' },
    { id: 'd5', name: 'Content Writers', icon: 'pen', color: '#8B5CF6' },
    { id: 'd6', name: 'Photography & Production', icon: 'camera', color: '#10B981' },
    { id: 'd7', name: 'AI Team', icon: 'wand', color: '#06B6D4' },
  ],
  team: [
    { id: 'u1', name: 'Taylor Kim', role: 'Senior PM', departmentId: 'd1', avatar: 'TK', color: '#6366F1' },
    { id: 'u2', name: 'Jordan Lee', role: 'PM', departmentId: 'd1', avatar: 'JL', color: '#818CF8' },
    { id: 'u3', name: 'Morgan Wells', role: 'Creative Director', departmentId: 'd2', avatar: 'MW', color: '#EC4899' },
    { id: 'u4', name: 'Alex Rivera', role: 'Lead Designer', departmentId: 'd3', avatar: 'AR', color: '#F59E0B' },
    { id: 'u5', name: 'Casey Park', role: 'UI Designer', departmentId: 'd3', avatar: 'CP', color: '#FBBF24' },
    { id: 'u6', name: 'Riley Chen', role: 'Motion Designer', departmentId: 'd3', avatar: 'RC', color: '#F97316' },
    { id: 'u7', name: 'Jamie Foster', role: 'Senior Editor', departmentId: 'd4', avatar: 'JF', color: '#EF4444' },
    { id: 'u8', name: 'Drew Martinez', role: 'Editor', departmentId: 'd4', avatar: 'DM', color: '#F87171' },
    { id: 'u9', name: 'Mike Johnson', role: 'Lead Copywriter', departmentId: 'd5', avatar: 'MJ', color: '#8B5CF6' },
    { id: 'u10', name: 'Sam Wilson', role: 'Copywriter', departmentId: 'd5', avatar: 'SW', color: '#A78BFA' },
    { id: 'u11', name: 'Sarah Chen', role: 'Lead Photographer', departmentId: 'd6', avatar: 'SC', color: '#10B981' },
    { id: 'u12', name: 'Chris Adams', role: 'Videographer', departmentId: 'd6', avatar: 'CA', color: '#34D399' },
    { id: 'u13', name: 'Avery Patel', role: 'AI Specialist', departmentId: 'd7', avatar: 'AP', color: '#06B6D4' },
    { id: 'u14', name: 'Quinn Roberts', role: 'Prompt Engineer', departmentId: 'd7', avatar: 'QR', color: '#22D3EE' },
  ],
  contentBriefs: [
    {
      id: 'br1',
      clientId: 'c1',
      concept: 'Behind the Beans',
      explanation: 'A documentary-style series showing the journey of coffee beans from farm to cup. Focus on the relationships with local farmers and the roasting process that makes Brew & Co unique.',
      mood: 'Warm, authentic, artisanal',
      moodTags: ['cozy', 'authentic', 'craftsmanship', 'warm tones'],
      references: [
        { type: 'link', url: 'https://instagram.com/bluebottlecoffee', title: 'Blue Bottle Instagram' },
        { type: 'link', url: 'https://vimeo.com/example', title: 'Coffee Documentary Reference' },
      ],
      contentType: 'video',
      category: 'trending',
      teamsInvolved: ['d4', 'd6', 'd5'],
      music: { type: 'acoustic', mood: 'warm', reference: 'Acoustic indie folk, similar to Bon Iver' },
      status: 'in-progress',
      currentStage: 'edit',
      createdAt: '2025-01-10',
      notes: [
        { id: 'bn1', authorId: 'u7', text: 'First draft edit complete. Running 4:30 - might need to trim', createdAt: '2025-01-14T15:00:00' },
        { id: 'bn2', authorId: 'u3', text: 'Love the pacing! Let\'s keep the farmer interview section - it\'s powerful', createdAt: '2025-01-15T10:30:00' },
      ]
    },
    {
      id: 'br2',
      clientId: 'c1',
      concept: 'Morning Rituals',
      explanation: 'User-generated content campaign encouraging customers to share their morning coffee rituals. Feature the best submissions on official channels.',
      mood: 'Relatable, everyday luxury, personal',
      moodTags: ['morning', 'routine', 'personal', 'lifestyle'],
      references: [
        { type: 'link', url: 'https://instagram.com/starbucks', title: 'Starbucks UGC Examples' },
      ],
      contentType: 'campaign',
      category: 'general',
      teamsInvolved: ['d1', 'd3', 'd5'],
      music: { type: 'lofi', mood: 'chill', reference: 'Lofi hip hop beats, morning vibes' },
      status: 'pending',
      currentStage: 'creative',
      createdAt: '2025-01-15',
      notes: [
        { id: 'bn3', authorId: 'u1', text: 'Need to finalize hashtag strategy before launch', createdAt: '2025-01-16T09:00:00' },
      ]
    },
    {
      id: 'br3',
      clientId: 'c2',
      concept: '30-Day Transform',
      explanation: 'Challenge campaign with daily workout videos and nutrition tips. Create a sense of community and accountability among participants.',
      mood: 'Energetic, motivational, inclusive',
      moodTags: ['energy', 'motivation', 'community', 'achievement'],
      references: [
        { type: 'link', url: 'https://youtube.com/blogilates', title: 'Blogilates Challenge Format' },
        { type: 'link', url: 'https://instagram.com/nike', title: 'Nike Training Content' },
      ],
      contentType: 'campaign',
      category: 'trending',
      teamsInvolved: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'],
      music: { type: 'electronic', mood: 'high-energy', reference: 'EDM workout mix, 120-140 BPM' },
      status: 'in-progress',
      currentStage: 'copy',
      createdAt: '2025-01-08',
      notes: [
        { id: 'bn4', authorId: 'u9', text: 'Day 1-10 copy complete. Working on motivational hooks for week 2', createdAt: '2025-01-13T14:00:00' },
        { id: 'bn5', authorId: 'u3', text: 'Great progress! Make sure to include rest day messaging', createdAt: '2025-01-14T11:00:00' },
        { id: 'bn6', authorId: 'u9', text: 'Good point - adding recovery content to days 7, 14, 21', createdAt: '2025-01-15T09:30:00' },
      ]
    },
    {
      id: 'br4',
      clientId: 'c3',
      concept: 'Space Stories',
      explanation: 'Before/after transformation series showcasing recent projects. Focus on the problem-solving aspect and how design choices impact daily life.',
      mood: 'Elegant, transformative, aspirational',
      moodTags: ['luxury', 'transformation', 'elegant', 'sophisticated'],
      references: [
        { type: 'link', url: 'https://instagram.com/archdigest', title: 'Architectural Digest' },
      ],
      contentType: 'carousel',
      category: 'general',
      teamsInvolved: ['d3', 'd5', 'd6'],
      music: { type: 'ambient', mood: 'sophisticated', reference: 'Minimalist piano, ambient soundscapes' },
      status: 'approved',
      currentStage: 'post',
      createdAt: '2025-01-12',
      notes: [
        { id: 'bn7', authorId: 'u1', text: 'Client loved it! Approved for posting next week', createdAt: '2025-01-16T16:00:00' },
      ]
    },
  ],
  contentBank: [
    // IDEAS (Idea Bank) - Brew & Co
    { id: 'cb1', clientId: 'c1', idea: 'Behind the scenes - coffee roasting process', type: 'video', stage: 'idea', priority: 'high', createdAt: '2025-01-15', scheduledFor: null, platforms: ['instagram', 'facebook'] },
    { id: 'cb15', clientId: 'c1', idea: 'Meet our farmers - origin story series', type: 'video', stage: 'idea', priority: 'medium', createdAt: '2025-01-16', scheduledFor: null, platforms: ['instagram', 'youtube'] },
    { id: 'cb16', clientId: 'c1', idea: 'Coffee brewing methods comparison', type: 'carousel', stage: 'idea', priority: 'low', createdAt: '2025-01-17', scheduledFor: null, platforms: ['instagram'] },
    { id: 'cb17', clientId: 'c1', idea: 'Staff picks: favorite drinks this month', type: 'reel', stage: 'idea', priority: 'medium', createdAt: '2025-01-17', scheduledFor: null, platforms: ['instagram', 'tiktok'] },
    { id: 'cb18', clientId: 'c1', idea: 'Cozy corner: customer reading nook feature', type: 'photo', stage: 'idea', priority: 'low', createdAt: '2025-01-16', scheduledFor: null, platforms: ['instagram'] },
    
    // IDEAS (Idea Bank) - FitFlow
    { id: 'cb19', clientId: 'c2', idea: 'User transformation story: Sarah lost 30lbs', type: 'video', stage: 'idea', priority: 'high', createdAt: '2025-01-16', scheduledFor: null, platforms: ['instagram', 'youtube'] },
    { id: 'cb20', clientId: 'c2', idea: 'Quick desk stretches for remote workers', type: 'reel', stage: 'idea', priority: 'medium', createdAt: '2025-01-17', scheduledFor: null, platforms: ['instagram', 'tiktok', 'linkedin'] },
    { id: 'cb21', clientId: 'c2', idea: 'Meal prep Sunday - healthy recipes', type: 'carousel', stage: 'idea', priority: 'medium', createdAt: '2025-01-15', scheduledFor: null, platforms: ['instagram', 'facebook'] },
    { id: 'cb22', clientId: 'c2', idea: 'Trainer spotlight: Coach Mike', type: 'video', stage: 'idea', priority: 'low', createdAt: '2025-01-14', scheduledFor: null, platforms: ['instagram'] },
    { id: 'cb23', clientId: 'c2', idea: 'Sleep hacks for better recovery', type: 'carousel', stage: 'idea', priority: 'medium', createdAt: '2025-01-17', scheduledFor: null, platforms: ['instagram', 'facebook'] },
    
    // IDEAS (Idea Bank) - Luxe Interiors
    { id: 'cb24', clientId: 'c3', idea: 'Color trends 2025: What\'s in and out', type: 'carousel', stage: 'idea', priority: 'high', createdAt: '2025-01-16', scheduledFor: null, platforms: ['instagram', 'linkedin'] },
    { id: 'cb25', clientId: 'c3', idea: 'Behind the design: Modern penthouse tour', type: 'video', stage: 'idea', priority: 'high', createdAt: '2025-01-17', scheduledFor: null, platforms: ['instagram', 'youtube'] },
    { id: 'cb26', clientId: 'c3', idea: 'Budget-friendly luxury: DIY styling tips', type: 'reel', stage: 'idea', priority: 'medium', createdAt: '2025-01-15', scheduledFor: null, platforms: ['instagram', 'tiktok'] },
    { id: 'cb27', clientId: 'c3', idea: 'Client testimonial: The Johnsons\' home', type: 'video', stage: 'idea', priority: 'medium', createdAt: '2025-01-14', scheduledFor: null, platforms: ['instagram', 'facebook'] },
    { id: 'cb28', clientId: 'c3', idea: 'Texture mixing masterclass', type: 'carousel', stage: 'idea', priority: 'low', createdAt: '2025-01-16', scheduledFor: null, platforms: ['instagram'] },
    
    // IN PROGRESS (already picked/in workflow)
    { id: 'cb2', clientId: 'c1', idea: 'Customer spotlight series', type: 'photo', stage: 'execution', priority: 'medium', createdAt: '2025-01-14', scheduledFor: '2025-01-22', platforms: ['instagram'],
      notes: [
        { id: 'cn1', authorId: 'u11', text: 'Reached out to 3 loyal customers for feature', createdAt: '2025-01-14T09:00:00' },
        { id: 'cn2', authorId: 'u1', text: 'Great picks! Let\'s prioritize the regular morning crowd', createdAt: '2025-01-14T11:30:00' },
      ]
    },
    { id: 'cb3', clientId: 'c2', idea: 'Transformation Tuesday testimonials', type: 'carousel', stage: 'approval', priority: 'high', createdAt: '2025-01-13', scheduledFor: '2025-01-21', platforms: ['instagram', 'facebook'],
      notes: [
        { id: 'cn3', authorId: 'u4', text: 'Designs ready for review - 5 slides with before/after', createdAt: '2025-01-15T14:00:00' },
        { id: 'cn4', authorId: 'u3', text: 'Love the layout! Can we add more contrast to the text?', createdAt: '2025-01-15T16:00:00' },
        { id: 'cn5', authorId: 'u4', text: 'Updated! Ready for final approval', createdAt: '2025-01-16T10:00:00' },
      ]
    },
    { id: 'cb4', clientId: 'c2', idea: '30-day challenge launch', type: 'campaign', stage: 'ready', priority: 'urgent', createdAt: '2025-01-12', scheduledFor: '2025-01-20', platforms: ['instagram', 'facebook', 'twitter'],
      notes: [
        { id: 'cn6', authorId: 'u1', text: 'All assets approved and scheduled. Launch on Monday!', createdAt: '2025-01-17T09:00:00' },
      ]
    },
    { id: 'cb10', clientId: 'c2', idea: 'Nutrition myth busters', type: 'carousel', stage: 'execution', priority: 'medium', createdAt: '2025-01-16', scheduledFor: '2025-01-25', platforms: ['instagram', 'facebook'],
      notes: [
        { id: 'cn7', authorId: 'u9', text: 'Research complete - focusing on 5 common myths', createdAt: '2025-01-16T13:00:00' },
      ]
    },
    { id: 'cb11', clientId: 'c3', idea: 'Client project reveal - Modern Loft', type: 'video', stage: 'approval', priority: 'high', createdAt: '2025-01-14', scheduledFor: '2025-01-28', platforms: ['instagram', 'youtube'],
      notes: [
        { id: 'cn8', authorId: 'u7', text: 'First cut done - 2:30 runtime. Waiting for client sign-off on shots', createdAt: '2025-01-15T17:00:00' },
        { id: 'cn9', authorId: 'u3', text: 'Client approved all shots. Proceed with color grading', createdAt: '2025-01-16T11:00:00' },
      ]
    },
    { id: 'cb12', clientId: 'c1', idea: 'Barista tips: Perfect latte art', type: 'reel', stage: 'ready', priority: 'medium', createdAt: '2025-01-13', scheduledFor: '2025-01-24', platforms: ['instagram', 'tiktok'],
      notes: []
    },
    { id: 'cb13', clientId: 'c1', idea: 'Weekend coffee specials', type: 'story', stage: 'execution', priority: 'low', createdAt: '2025-01-10', scheduledFor: '2025-01-11', platforms: ['instagram'],
      notes: []
    },
    
    // POSTED
    { id: 'cb5', clientId: 'c3', idea: 'Room makeover time-lapse', type: 'video', stage: 'posted', priority: 'medium', createdAt: '2025-01-10', scheduledFor: '2025-01-15', postedAt: '2025-01-15', platforms: ['instagram', 'facebook'] },
    { id: 'cb6', clientId: 'c1', idea: 'Morning brew ritual', type: 'photo', stage: 'posted', priority: 'medium', createdAt: '2025-01-08', scheduledFor: '2025-01-14', postedAt: '2025-01-14', platforms: ['instagram'] },
    { id: 'cb7', clientId: 'c2', idea: '5-minute workout challenge', type: 'reel', stage: 'posted', priority: 'high', createdAt: '2025-01-07', scheduledFor: '2025-01-13', postedAt: '2025-01-13', platforms: ['instagram', 'tiktok'] },
    { id: 'cb8', clientId: 'c1', idea: 'New seasonal blend announcement', type: 'carousel', stage: 'posted', priority: 'high', createdAt: '2025-01-06', scheduledFor: '2025-01-12', postedAt: '2025-01-14', platforms: ['facebook', 'instagram'] },
    { id: 'cb9', clientId: 'c3', idea: 'Design tips for small spaces', type: 'carousel', stage: 'posted', priority: 'medium', createdAt: '2025-01-05', scheduledFor: '2025-01-10', postedAt: '2025-01-10', platforms: ['linkedin', 'instagram'] },
    { id: 'cb14', clientId: 'c3', idea: 'Before & After: Kitchen remodel', type: 'carousel', stage: 'posted', priority: 'high', createdAt: '2025-01-03', scheduledFor: '2025-01-08', postedAt: '2025-01-11', platforms: ['instagram', 'facebook'] },
  ],
  tasks: [
    { id: 't1', contentId: 'cb2', type: 'photoshoot', assigneeId: 'u11', deadline: '2025-01-20', status: 'in-progress', description: 'Schedule with customer', 
      notes: [
        { id: 'n1', authorId: 'u11', text: 'Contacted customer, waiting for confirmation on timing', createdAt: '2025-01-16T10:30:00' },
        { id: 'n2', authorId: 'u1', text: 'Please prioritize this - client needs it by end of week', createdAt: '2025-01-16T14:15:00' },
      ]
    },
    { id: 't2', contentId: 'cb3', type: 'copywriting', assigneeId: 'u9', deadline: '2025-01-18', status: 'done', description: 'Completed captions',
      notes: [
        { id: 'n3', authorId: 'u9', text: 'First draft complete, ready for review', createdAt: '2025-01-15T16:00:00' },
        { id: 'n4', authorId: 'u3', text: 'Approved! Great work on the tone', createdAt: '2025-01-16T09:00:00' },
      ]
    },
    { id: 't3', contentId: 'cb4', type: 'design', assigneeId: 'u4', deadline: '2025-01-19', status: 'pending', description: 'Campaign graphics',
      notes: []
    },
  ],
  analytics: {
    'cb5': { views: 12400, likes: 892, shares: 156, comments: 45, reach: 28000, engagementRate: 7.2 },
    'cb6': { views: 8500, likes: 645, shares: 89, comments: 32, reach: 18500, engagementRate: 6.8 },
    'cb7': { views: 24600, likes: 1890, shares: 456, comments: 178, reach: 52000, engagementRate: 9.4 },
    'cb8': { views: 5200, likes: 312, shares: 67, comments: 28, reach: 12000, engagementRate: 5.1 },
    'cb9': { views: 3800, likes: 245, shares: 89, comments: 34, reach: 9500, engagementRate: 4.8 },
  }
};

const moodOptions = ['cozy', 'energetic', 'minimal', 'bold', 'playful', 'elegant', 'authentic', 'luxury', 'warm', 'cool', 'vibrant', 'muted', 'professional', 'casual', 'inspirational', 'educational'];
const contentTypes = ['video', 'photo', 'carousel', 'reel', 'story', 'campaign', 'live'];
const musicTypes = ['acoustic', 'electronic', 'lofi', 'ambient', 'pop', 'classical', 'none'];

// Workflow definitions based on content type with team mappings
const workflowDefinitions = {
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

// ============ WORKFLOW TRACKER COMPONENT ============
const WorkflowTracker = ({ contentType, currentStage, status, db, teamsInvolved }) => {
  const [selectedStep, setSelectedStep] = useState(null);
  const workflow = workflowDefinitions[contentType] || workflowDefinitions.photo;
  
  // Determine current stage index based on status or currentStage
  let activeIndex = 0;
  if (currentStage) {
    activeIndex = workflow.findIndex(w => w.id === currentStage);
  } else if (status === 'approved') {
    activeIndex = workflow.length - 1;
  } else if (status === 'in-progress') {
    activeIndex = Math.floor(workflow.length / 2);
  } else if (status === 'pending') {
    activeIndex = 1;
  }
  
  if (activeIndex === -1) activeIndex = 0;

  const getIcon = (iconName, size = 16) => {
    switch(iconName) {
      case 'Lightbulb': return <Zap size={size} />;
      case 'Sparkles': return <Sparkles size={size} />;
      case 'Camera': return <Camera size={size} />;
      case 'PenLine': return <PenLine size={size} />;
      case 'Clapperboard': return <Clapperboard size={size} />;
      case 'Palette': return <Palette size={size} />;
      case 'Target': return <Target size={size} />;
      case 'Send': return <Send size={size} />;
      case 'FileText': return <FileText size={size} />;
      case 'Settings': return <Settings size={size} />;
      case 'Zap': return <Zap size={size} />;
      default: return <Circle size={size} />;
    }
  };

  const getTeamMembers = (deptId) => {
    if (!db) return [];
    return db.team.filter(m => m.departmentId === deptId);
  };

  const getDepartment = (deptId) => {
    if (!db) return null;
    return db.departments.find(d => d.id === deptId);
  };

  const handleStepClick = (step, index) => {
    if (selectedStep?.id === step.id) {
      setSelectedStep(null);
    } else {
      setSelectedStep({ ...step, index });
    }
  };

  return (
    <div className="workflow-tracker">
      <div className="workflow-steps">
        {workflow.map((step, index) => {
          const isCompleted = index < activeIndex;
          const isCurrent = index === activeIndex;
          const isPending = index > activeIndex;
          const isSelected = selectedStep?.id === step.id;
          
          return (
            <React.Fragment key={step.id}>
              <div 
                className={`workflow-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isPending ? 'pending' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleStepClick(step, index)}
              >
                <div className="step-icon">
                  {isCompleted ? <Check size={14} /> : getIcon(step.icon, 14)}
                </div>
                <span className="step-label">{step.label}</span>
                {isCurrent && <span className="current-indicator">Current</span>}
              </div>
              {index < workflow.length - 1 && (
                <div className={`workflow-connector ${isCompleted ? 'completed' : ''}`}>
                  <ArrowRight size={14} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="workflow-progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((activeIndex + 1) / workflow.length) * 100}%` }}
        />
      </div>

      {selectedStep && db && (
        <div className="workflow-team-panel">
          <div className="team-panel-header">
            <div className="panel-step-info">
              <span className="panel-step-icon" style={{ background: getDepartment(selectedStep.department)?.color }}>
                {getIcon(selectedStep.icon, 14)}
              </span>
              <div>
                <h5>{selectedStep.label}</h5>
                <span className="panel-dept-name">{getDepartment(selectedStep.department)?.name}</span>
              </div>
            </div>
            <button className="panel-close" onClick={() => setSelectedStep(null)}><X size={14} /></button>
          </div>
          <div className="team-panel-members">
            {getTeamMembers(selectedStep.department).map(member => (
              <div key={member.id} className="panel-member">
                <div className="panel-member-avatar" style={{ background: member.color }}>{member.avatar}</div>
                <div className="panel-member-info">
                  <span className="panel-member-name">{member.name}</span>
                  <span className="panel-member-role">{member.role}</span>
                </div>
                <button className="panel-member-action">
                  <MessageSquare size={14} />
                </button>
              </div>
            ))}
          </div>
          {selectedStep.index === activeIndex && (
            <div className="team-panel-status">
              <AlertCircle size={14} />
              <span>This stage is currently in progress</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============ CLIENTS LIST VIEW ============
const ClientsListView = ({ db, setDb, setSelectedClient, setActiveView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', industry: '', description: '', website: '', contact: '', color: '#6B7280' });

  const filteredClients = db.clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getClientStats = (clientId) => {
    const content = db.contentBank.filter(c => c.clientId === clientId);
    const briefs = db.contentBriefs.filter(b => b.clientId === clientId);
    const posted = content.filter(c => c.stage === 'posted').length;
    return { content: content.length, briefs: briefs.length, posted };
  };

  const colorOptions = ['#8B5A2B', '#2D8B6F', '#6B5B95', '#E74C3C', '#3498DB', '#F39C12', '#1ABC9C', '#9B59B6', '#34495E', '#E91E63'];

  const handleAddClient = () => {
    if (!newClient.name) return;
    const client = {
      id: `c${Date.now()}`,
      ...newClient,
      logo: newClient.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase(),
    };
    setDb(prev => ({ ...prev, clients: [...prev.clients, client] }));
    setNewClient({ name: '', industry: '', description: '', website: '', contact: '', color: '#6B7280' });
    setIsAddingClient(false);
  };

  return (
    <div className="clients-list-view">
      <div className="view-header">
        <div className="view-title"><Building2 size={20} /><span>Clients</span><span className="team-count">{db.clients.length}</span></div>
        <div className="view-actions">
          <div className="search-box">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="action-btn primary" onClick={() => setIsAddingClient(true)}>
            <Plus size={16} />Add Client
          </button>
        </div>
      </div>

      <div className="clients-grid">
        {filteredClients.map(client => {
          const stats = getClientStats(client.id);
          return (
            <div 
              key={client.id} 
              className="client-card"
              onClick={() => { setSelectedClient(client); setActiveView('client'); }}
            >
              <div className="client-card-header">
                <div className="client-card-logo" style={{ background: client.color }}>{client.logo}</div>
                <div className="client-card-info">
                  <h3>{client.name}</h3>
                  <span className="client-card-industry">{client.industry}</span>
                </div>
              </div>
              <p className="client-card-desc">{client.description}</p>
              <div className="client-card-stats">
                <div className="client-card-stat">
                  <span className="stat-num">{stats.briefs}</span>
                  <span className="stat-label">Briefs</span>
                </div>
                <div className="client-card-stat">
                  <span className="stat-num">{stats.content}</span>
                  <span className="stat-label">Content</span>
                </div>
                <div className="client-card-stat">
                  <span className="stat-num">{stats.posted}</span>
                  <span className="stat-label">Posted</span>
                </div>
              </div>
              <div className="client-card-footer">
                <a href="#" className="client-card-link"><Globe size={12} />{client.website}</a>
              </div>
            </div>
          );
        })}

        {/* Add Client Card */}
        <div className="client-card add-card" onClick={() => setIsAddingClient(true)}>
          <Plus size={32} />
          <span>Add New Client</span>
        </div>
      </div>

      {/* Add Client Modal */}
      {isAddingClient && (
        <div className="modal-overlay" onClick={() => setIsAddingClient(false)}>
          <div className="add-client-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Client</h3>
              <button className="close-btn" onClick={() => setIsAddingClient(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Client Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter client name"
                  value={newClient.name}
                  onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Industry</label>
                <input 
                  type="text" 
                  placeholder="e.g., Fitness App, Coffee Shop"
                  value={newClient.industry}
                  onChange={(e) => setNewClient(prev => ({ ...prev, industry: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Brief description of the client"
                  value={newClient.description}
                  onChange={(e) => setNewClient(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="form-row two-col">
                <div className="form-group">
                  <label>Website</label>
                  <input 
                    type="text" 
                    placeholder="example.com"
                    value={newClient.website}
                    onChange={(e) => setNewClient(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Contact Email</label>
                  <input 
                    type="email" 
                    placeholder="contact@example.com"
                    value={newClient.contact}
                    onChange={(e) => setNewClient(prev => ({ ...prev, contact: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Brand Color</label>
                <div className="color-picker">
                  {colorOptions.map(color => (
                    <button 
                      key={color}
                      className={`color-option ${newClient.color === color ? 'selected' : ''}`}
                      style={{ background: color }}
                      onClick={() => setNewClient(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsAddingClient(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddClient} disabled={!newClient.name}>
                <Check size={16} />Add Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============ CLIENT DROPDOWN COMPONENT ============
const ClientDropdown = ({ clients, selectedClient, onSelect, placeholder = "All Clients" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedClientData = clients.find(c => c.id === selectedClient);

  return (
    <div className="client-dropdown" ref={dropdownRef}>
      <button className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        {selectedClientData ? (
          <>
            <span className="dropdown-dot" style={{ background: selectedClientData.color }} />
            <span className="dropdown-text">{selectedClientData.name}</span>
          </>
        ) : (
          <>
            <Building2 size={14} />
            <span className="dropdown-text">{placeholder}</span>
          </>
        )}
        <ChevronDown size={14} className={`dropdown-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-search">
            <Search size={14} />
            <input 
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className="dropdown-options">
            <div 
              className={`dropdown-option ${!selectedClient ? 'selected' : ''}`}
              onClick={() => { onSelect(null); setIsOpen(false); setSearchQuery(''); }}
            >
              <Building2 size={14} />
              <span>All Clients</span>
            </div>
            {filteredClients.map(client => (
              <div 
                key={client.id}
                className={`dropdown-option ${selectedClient === client.id ? 'selected' : ''}`}
                onClick={() => { onSelect(client.id); setIsOpen(false); setSearchQuery(''); }}
              >
                <span className="dropdown-dot" style={{ background: client.color }} />
                <span>{client.name}</span>
                <span className="dropdown-industry">{client.industry}</span>
              </div>
            ))}
            {filteredClients.length === 0 && (
              <div className="dropdown-empty">No clients found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============ CLIENT DETAILS VIEW ============
const ClientDetailsView = ({ db, setDb, selectedClient, setSelectedClient }) => {
  const [activeTab, setActiveTab] = useState('briefs');
  const [selectedBrief, setSelectedBrief] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [briefNewNote, setBriefNewNote] = useState('');
  const [briefNoteAuthor, setBriefNoteAuthor] = useState('');
  const filterRef = useRef(null);
  const [newBrief, setNewBrief] = useState({
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

  const client = selectedClient;
  const clientBriefs = db.contentBriefs.filter(b => b.clientId === client?.id);
  const clientContent = db.contentBank.filter(c => c.clientId === client?.id);

  const getMemberById = (memberId) => db.team.find(m => m.id === memberId);

  const formatNoteTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' at ' + 
           date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const addBriefNote = (briefId) => {
    if (!briefNewNote.trim() || !briefNoteAuthor) return;
    const note = {
      id: `bn${Date.now()}`,
      authorId: briefNoteAuthor,
      text: briefNewNote.trim(),
      createdAt: new Date().toISOString(),
    };
    setDb(prev => ({
      ...prev,
      contentBriefs: prev.contentBriefs.map(b => 
        b.id === briefId 
          ? { ...b, notes: [...(b.notes || []), note] }
          : b
      )
    }));
    // Update selectedBrief to reflect new note
    setSelectedBrief(prev => prev ? { ...prev, notes: [...(prev.notes || []), note] } : prev);
    setBriefNewNote('');
  };

  // Filter briefs based on selected filters
  const filteredBriefs = clientBriefs.filter(brief => {
    if (filterType !== 'all' && brief.contentType !== filterType) return false;
    if (filterStatus !== 'all' && brief.status !== filterStatus) return false;
    if (filterCategory !== 'all' && brief.category !== filterCategory) return false;
    return true;
  });

  // Get unique values for filter options
  const typeOptions = [...new Set(clientBriefs.map(b => b.contentType))];
  const statusOptions = [...new Set(clientBriefs.map(b => b.status))];
  
  const activeFilterCount = [filterType, filterStatus, filterCategory].filter(f => f !== 'all').length;

  const clearFilters = () => {
    setFilterType('all');
    setFilterStatus('all');
    setFilterCategory('all');
  };

  // Close filter dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTeam = (deptId) => {
    setNewBrief(prev => ({
      ...prev,
      teamsInvolved: prev.teamsInvolved.includes(deptId)
        ? prev.teamsInvolved.filter(id => id !== deptId)
        : [...prev.teamsInvolved, deptId]
    }));
  };

  const toggleMoodTag = (tag) => {
    setNewBrief(prev => ({
      ...prev,
      moodTags: prev.moodTags.includes(tag)
        ? prev.moodTags.filter(t => t !== tag)
        : [...prev.moodTags, tag]
    }));
  };

  const addReference = () => {
    const url = prompt('Enter reference URL:');
    if (url) {
      const title = prompt('Enter reference title:');
      setNewBrief(prev => ({
        ...prev,
        references: [...prev.references, { type: 'link', url, title: title || url }]
      }));
    }
  };

  const saveBrief = () => {
    const brief = {
      ...newBrief,
      id: `br${Date.now()}`,
      clientId: client.id,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setDb(prev => ({
      ...prev,
      contentBriefs: [...prev.contentBriefs, brief]
    }));
    setIsCreating(false);
    setNewBrief({
      concept: '', explanation: '', mood: '', moodTags: [], references: [],
      contentType: 'video', category: 'general', teamsInvolved: [],
      music: { type: 'none', mood: '', reference: '' },
    });
  };

  if (!client) {
    return (
      <div className="client-details-view">
        <div className="no-client">
          <Building2 size={48} />
          <h3>Select a client</h3>
          <p>Choose a client from the sidebar to view details and content briefs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="client-details-view">
      <div className="client-header">
        <div className="client-hero">
          <div className="client-logo" style={{ background: client.color }}>{client.logo}</div>
          <div className="client-info">
            <h1>{client.name}</h1>
            <span className="client-industry-tag">{client.industry}</span>
            <p className="client-desc">{client.description}</p>
            <div className="client-links">
              <a href="#" className="client-link"><Globe size={14} />{client.website}</a>
              <a href="#" className="client-link"><Mail size={14} />{client.contact}</a>
            </div>
          </div>
        </div>
        <div className="client-stats">
          <div className="client-stat">
            <span className="stat-num">{clientBriefs.length}</span>
            <span className="stat-label">Briefs</span>
          </div>
          <div className="client-stat">
            <span className="stat-num">{clientContent.length}</span>
            <span className="stat-label">Content</span>
          </div>
          <div className="client-stat">
            <span className="stat-num">{clientContent.filter(c => c.stage === 'posted').length}</span>
            <span className="stat-label">Published</span>
          </div>
        </div>
      </div>

      <div className="client-tabs">
        <button className={`tab-btn ${activeTab === 'briefs' ? 'active' : ''}`} onClick={() => setActiveTab('briefs')}>
          Content Briefs
        </button>
        <button className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
          Idea Bank
        </button>
        <button className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
          Calendar
        </button>
      </div>

      {activeTab === 'briefs' && (
        <div className="briefs-section">
          <div className="briefs-header">
            <h2>Content Briefs <span className="briefs-count">{filteredBriefs.length}{(filterType !== 'all' || filterCategory !== 'all') && ` of ${clientBriefs.length}`}</span></h2>
            <div className="briefs-actions">
              {/* Filter Dropdown - for Type and Category only now */}
              <div className="filter-dropdown" ref={filterRef}>
                <button 
                  className={`filter-trigger ${(filterType !== 'all' || filterCategory !== 'all') ? 'has-filters' : ''}`} 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={14} />
                  <span>Filter</span>
                  {(filterType !== 'all' || filterCategory !== 'all') && <span className="filter-badge">{[filterType, filterCategory].filter(f => f !== 'all').length}</span>}
                  <ChevronDown size={14} className={`filter-chevron ${showFilters ? 'open' : ''}`} />
                </button>
                
                {showFilters && (
                  <div className="filter-menu">
                    <div className="filter-section">
                      <label>Content Type</label>
                      <div className="filter-options">
                        <button 
                          className={`filter-option ${filterType === 'all' ? 'active' : ''}`}
                          onClick={() => setFilterType('all')}
                        >
                          All Types
                        </button>
                        {['video', 'photo', 'carousel', 'reel', 'story', 'campaign', 'live'].map(type => (
                          <button 
                            key={type}
                            className={`filter-option ${filterType === type ? 'active' : ''}`}
                            onClick={() => setFilterType(type)}
                          >
                            {type === 'video' && <Video size={12} />}
                            {type === 'photo' && <Camera size={12} />}
                            {type === 'carousel' && <Layers size={12} />}
                            {type === 'reel' && <Play size={12} />}
                            {type === 'story' && <Circle size={12} />}
                            {type === 'campaign' && <Target size={12} />}
                            {type === 'live' && <Zap size={12} />}
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="filter-section">
                      <label>Category</label>
                      <div className="filter-options">
                        <button 
                          className={`filter-option ${filterCategory === 'all' ? 'active' : ''}`}
                          onClick={() => setFilterCategory('all')}
                        >
                          All Categories
                        </button>
                        <button 
                          className={`filter-option ${filterCategory === 'trending' ? 'active' : ''}`}
                          onClick={() => setFilterCategory('trending')}
                        >
                          <Flame size={12} />
                          Trending
                        </button>
                        <button 
                          className={`filter-option ${filterCategory === 'general' ? 'active' : ''}`}
                          onClick={() => setFilterCategory('general')}
                        >
                          <Globe size={12} />
                          General
                        </button>
                      </div>
                    </div>
                    
                    {(filterType !== 'all' || filterCategory !== 'all') && (
                      <div className="filter-footer">
                        <button className="clear-filters-btn" onClick={() => { setFilterType('all'); setFilterCategory('all'); }}>
                          <X size={12} />
                          Clear filters
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <button className="action-btn primary" onClick={() => setIsCreating(true)}>
                <Plus size={16} />New Brief
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="status-tabs">
            <button 
              className={`status-tab ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All
              <span className="status-tab-count">{clientBriefs.length}</span>
            </button>
            <button 
              className={`status-tab ${filterStatus === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterStatus('pending')}
            >
              <span className="status-dot-sm pending" />
              Pending
              <span className="status-tab-count">{clientBriefs.filter(b => b.status === 'pending').length}</span>
            </button>
            <button 
              className={`status-tab ${filterStatus === 'in-progress' ? 'active' : ''}`}
              onClick={() => setFilterStatus('in-progress')}
            >
              <span className="status-dot-sm in-progress" />
              In Progress
              <span className="status-tab-count">{clientBriefs.filter(b => b.status === 'in-progress').length}</span>
            </button>
            <button 
              className={`status-tab ${filterStatus === 'approved' ? 'active' : ''}`}
              onClick={() => setFilterStatus('approved')}
            >
              <span className="status-dot-sm approved" />
              Approved
              <span className="status-tab-count">{clientBriefs.filter(b => b.status === 'approved').length}</span>
            </button>
          </div>

          {/* Active Type/Category Filters Display */}
          {(filterType !== 'all' || filterCategory !== 'all') && (
            <div className="active-filters">
              {filterType !== 'all' && (
                <span className="active-filter-tag">
                  Type: {filterType}
                  <button onClick={() => setFilterType('all')}><X size={12} /></button>
                </span>
              )}
              {filterCategory !== 'all' && (
                <span className="active-filter-tag">
                  Category: {filterCategory}
                  <button onClick={() => setFilterCategory('all')}><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {isCreating && (
            <div className="brief-creator">
              <div className="creator-header">
                <h3>New Content Brief</h3>
                <button className="close-btn" onClick={() => setIsCreating(false)}><X size={18} /></button>
              </div>

              <div className="creator-form">
                <div className="form-row">
                  <div className="form-group full">
                    <label>Concept Title</label>
                    <input 
                      type="text" 
                      placeholder="Give this brief a memorable name..."
                      value={newBrief.concept}
                      onChange={(e) => setNewBrief(prev => ({ ...prev, concept: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full">
                    <label>Explanation</label>
                    <textarea 
                      placeholder="Describe the concept in detail. What's the story? What message should it convey?"
                      value={newBrief.explanation}
                      onChange={(e) => setNewBrief(prev => ({ ...prev, explanation: e.target.value }))}
                      rows={4}
                    />
                  </div>
                </div>

                <div className="form-row two-col">
                  <div className="form-group">
                    <label>Content Type</label>
                    <div className="type-selector">
                      {contentTypes.map(type => (
                        <button 
                          key={type}
                          className={`type-btn ${newBrief.contentType === type ? 'active' : ''}`}
                          onClick={() => setNewBrief(prev => ({ ...prev, contentType: type }))}
                        >
                          {type === 'video' && <Video size={14} />}
                          {type === 'photo' && <Camera size={14} />}
                          {type === 'carousel' && <Layers size={14} />}
                          {type === 'reel' && <Play size={14} />}
                          {type === 'story' && <Circle size={14} />}
                          {type === 'campaign' && <Target size={14} />}
                          {type === 'live' && <Zap size={14} />}
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <div className="category-selector">
                      <button 
                        className={`category-btn ${newBrief.category === 'trending' ? 'active trending' : ''}`}
                        onClick={() => setNewBrief(prev => ({ ...prev, category: 'trending' }))}
                      >
                        <Flame size={14} />Trending
                      </button>
                      <button 
                        className={`category-btn ${newBrief.category === 'general' ? 'active general' : ''}`}
                        onClick={() => setNewBrief(prev => ({ ...prev, category: 'general' }))}
                      >
                        <Globe size={14} />General
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full">
                    <label>Mood Description</label>
                    <input 
                      type="text" 
                      placeholder="Describe the overall feeling... (e.g., Warm, authentic, artisanal)"
                      value={newBrief.mood}
                      onChange={(e) => setNewBrief(prev => ({ ...prev, mood: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full">
                    <label>Mood Tags</label>
                    <div className="mood-tags">
                      {moodOptions.map(tag => (
                        <button 
                          key={tag}
                          className={`mood-tag ${newBrief.moodTags.includes(tag) ? 'active' : ''}`}
                          onClick={() => toggleMoodTag(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full">
                    <label>References</label>
                    <div className="references-list">
                      {newBrief.references.map((ref, i) => (
                        <div key={i} className="reference-item">
                          <Link size={14} />
                          <span>{ref.title}</span>
                          <button onClick={() => setNewBrief(prev => ({
                            ...prev,
                            references: prev.references.filter((_, idx) => idx !== i)
                          }))}><X size={12} /></button>
                        </div>
                      ))}
                      <button className="add-reference-btn" onClick={addReference}>
                        <Plus size={14} />Add Reference
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full">
                    <label>Teams Involved</label>
                    <div className="teams-selector">
                      {db.departments.map(dept => (
                        <button 
                          key={dept.id}
                          className={`team-btn ${newBrief.teamsInvolved.includes(dept.id) ? 'active' : ''}`}
                          onClick={() => toggleTeam(dept.id)}
                          style={newBrief.teamsInvolved.includes(dept.id) ? { borderColor: dept.color, background: `${dept.color}10` } : {}}
                        >
                          {newBrief.teamsInvolved.includes(dept.id) && <Check size={12} style={{ color: dept.color }} />}
                          <span style={newBrief.teamsInvolved.includes(dept.id) ? { color: dept.color } : {}}>{dept.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-row two-col">
                  <div className="form-group">
                    <label>Music Type</label>
                    <select 
                      value={newBrief.music.type}
                      onChange={(e) => setNewBrief(prev => ({ ...prev, music: { ...prev.music, type: e.target.value } }))}
                    >
                      {musicTypes.map(type => (
                        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Music Mood</label>
                    <input 
                      type="text" 
                      placeholder="e.g., upbeat, calm, inspirational"
                      value={newBrief.music.mood}
                      onChange={(e) => setNewBrief(prev => ({ ...prev, music: { ...prev.music, mood: e.target.value } }))}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full">
                    <label>Music Reference</label>
                    <input 
                      type="text" 
                      placeholder="Artist, song, or style reference..."
                      value={newBrief.music.reference}
                      onChange={(e) => setNewBrief(prev => ({ ...prev, music: { ...prev.music, reference: e.target.value } }))}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button className="cancel-btn" onClick={() => setIsCreating(false)}>Cancel</button>
                  <button className="save-btn" onClick={saveBrief} disabled={!newBrief.concept}>
                    <Check size={16} />Create Brief
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="briefs-grid">
            {filteredBriefs.length === 0 ? (
              <div className="no-briefs-message">
                <FileText size={32} />
                <h4>No briefs found</h4>
                <p>{activeFilterCount > 0 ? 'Try adjusting your filters' : 'Create your first content brief'}</p>
                {activeFilterCount > 0 && (
                  <button className="clear-filters-inline" onClick={clearFilters}>Clear filters</button>
                )}
              </div>
            ) : (
              filteredBriefs.map(brief => (
              <div key={brief.id} className="brief-card" onClick={() => setSelectedBrief(brief)}>
                <div className="brief-card-header">
                  <span className={`brief-status ${brief.status}`}>{brief.status}</span>
                  <span className={`brief-category ${brief.category}`}>
                    {brief.category === 'trending' ? <Flame size={12} /> : <Globe size={12} />}
                    {brief.category}
                  </span>
                </div>
                <h3>{brief.concept}</h3>
                <p>{brief.explanation.substring(0, 100)}...</p>
                <div className="brief-meta">
                  <span className="brief-type">
                    {brief.contentType === 'video' && <Video size={12} />}
                    {brief.contentType === 'photo' && <Camera size={12} />}
                    {brief.contentType === 'carousel' && <Layers size={12} />}
                    {brief.contentType === 'campaign' && <Target size={12} />}
                    {brief.contentType}
                  </span>
                  <span className="brief-teams">{brief.teamsInvolved.length} teams</span>
                  {(brief.notes || []).length > 0 && (
                    <span className="brief-notes-count">
                      <MessageSquare size={12} />
                      {(brief.notes || []).length}
                    </span>
                  )}
                </div>
                <div className="brief-mood-tags">
                  {brief.moodTags.slice(0, 3).map(tag => (
                    <span key={tag} className="mood-chip">{tag}</span>
                  ))}
                </div>
              </div>
            )))}
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <ContentLibraryTab 
          db={db} 
          setDb={setDb} 
          client={client} 
          clientContent={clientContent}
          onCreateBrief={(idea) => {
            // Move the idea from 'idea' stage to 'execution'
            setDb(prev => ({
              ...prev,
              contentBank: prev.contentBank.map(c => 
                c.id === idea.id ? { ...c, stage: 'execution' } : c
              )
            }));
            // Pre-fill the new brief form with the idea
            setNewBrief(prev => ({
              ...prev,
              concept: idea.idea,
              contentType: idea.type || 'video',
              sourceIdeaId: idea.id,
            }));
            setIsCreating(true);
            setActiveTab('briefs');
          }}
        />
      )}

      {activeTab === 'calendar' && (
        <ClientCalendarTab db={db} setDb={setDb} client={client} />
      )}

      {selectedBrief && (
        <div className="brief-modal-overlay" onClick={() => setSelectedBrief(null)}>
          <div className="brief-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <h2>{selectedBrief.concept}</h2>
                <span className={`brief-status ${selectedBrief.status}`}>{selectedBrief.status}</span>
              </div>
              <button className="close-btn" onClick={() => setSelectedBrief(null)}><X size={20} /></button>
            </div>
            
            <div className="modal-content">
              {/* Workflow Progress Tracker */}
              <div className="modal-section workflow-section">
                <h4>Workflow Progress</h4>
                <WorkflowTracker contentType={selectedBrief.contentType} currentStage={selectedBrief.currentStage} status={selectedBrief.status} db={db} teamsInvolved={selectedBrief.teamsInvolved} />
              </div>

              <div className="modal-section">
                <h4>Explanation</h4>
                <p>{selectedBrief.explanation}</p>
              </div>

              <div className="modal-row">
                <div className="modal-section">
                  <h4>Content Type</h4>
                  <div className="detail-tag">
                    {selectedBrief.contentType === 'video' && <Video size={14} />}
                    {selectedBrief.contentType === 'photo' && <Camera size={14} />}
                    {selectedBrief.contentType === 'carousel' && <Layers size={14} />}
                    {selectedBrief.contentType === 'campaign' && <Target size={14} />}
                    {selectedBrief.contentType}
                  </div>
                </div>
                <div className="modal-section">
                  <h4>Category</h4>
                  <div className={`detail-tag ${selectedBrief.category}`}>
                    {selectedBrief.category === 'trending' ? <Flame size={14} /> : <Globe size={14} />}
                    {selectedBrief.category}
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h4>Mood</h4>
                <p className="mood-text">{selectedBrief.mood}</p>
                <div className="mood-tags-display">
                  {selectedBrief.moodTags.map(tag => (
                    <span key={tag} className="mood-chip">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h4>References</h4>
                <div className="references-display">
                  {selectedBrief.references.map((ref, i) => (
                    <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer" className="reference-link">
                      <ExternalLink size={14} />{ref.title}
                    </a>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h4>Teams Involved</h4>
                <div className="teams-display">
                  {selectedBrief.teamsInvolved.map(deptId => {
                    const dept = db.departments.find(d => d.id === deptId);
                    return (
                      <span key={deptId} className="team-chip" style={{ background: `${dept?.color}15`, color: dept?.color, borderColor: dept?.color }}>
                        {dept?.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="modal-section">
                <h4>Music</h4>
                <div className="music-display">
                  <div className="music-icon"><Music size={18} /></div>
                  <div className="music-info">
                    <span className="music-type">{selectedBrief.music.type}</span>
                    <span className="music-mood">{selectedBrief.music.mood}</span>
                    <p className="music-reference">{selectedBrief.music.reference}</p>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="modal-section notes-section">
                <h4><MessageSquare size={14} /> Notes ({(selectedBrief.notes || []).length})</h4>
                
                {(selectedBrief.notes || []).length > 0 && (
                  <div className="modal-notes-list">
                    {(selectedBrief.notes || []).map(note => {
                      const author = getMemberById(note.authorId);
                      return (
                        <div key={note.id} className="modal-note-item">
                          <div className="modal-note-avatar" style={{ background: author?.color || '#6B7280' }}>
                            {author?.avatar || '?'}
                          </div>
                          <div className="modal-note-content">
                            <div className="modal-note-meta">
                              <span className="modal-note-author">{author?.name || 'Unknown'}</span>
                              <span className="modal-note-time">{formatNoteTime(note.createdAt)}</span>
                            </div>
                            <p className="modal-note-text">{note.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="modal-add-note">
                  <div className="modal-note-input-row">
                    <select 
                      className="modal-note-author-select"
                      value={briefNoteAuthor}
                      onChange={(e) => setBriefNoteAuthor(e.target.value)}
                    >
                      <option value="">Select your name...</option>
                      {db.team.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-note-input-row">
                    <textarea 
                      placeholder="Add a note..."
                      value={briefNewNote}
                      onChange={(e) => setBriefNewNote(e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="modal-note-actions">
                    <button 
                      className="modal-save-note-btn" 
                      onClick={() => addBriefNote(selectedBrief.id)}
                      disabled={!briefNewNote.trim() || !briefNoteAuthor}
                    >
                      <Send size={14} />
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============ TEAM VIEW (Compact) ============
const TeamView = ({ db, clients, setDb }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedDepts, setExpandedDepts] = useState(db.departments.map(d => d.id));
  const [expandedTask, setExpandedTask] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');
  
  const getTasksForMember = (memberId) => db.tasks.filter(t => t.assigneeId === memberId);
  const getTaskStats = (memberId) => {
    const tasks = getTasksForMember(memberId);
    return { total: tasks.length, pending: tasks.filter(t => t.status === 'pending').length, inProgress: tasks.filter(t => t.status === 'in-progress').length, done: tasks.filter(t => t.status === 'done').length };
  };
  const getDeptStats = (deptId) => {
    const members = db.team.filter(m => m.departmentId === deptId);
    let total = 0, done = 0;
    members.forEach(m => { const stats = getTaskStats(m.id); total += stats.total; done += stats.done; });
    return { total, done, members: members.length };
  };
  const isOverdue = (deadline) => new Date(deadline) < new Date('2025-01-17');
  const toggleDept = (deptId) => setExpandedDepts(prev => prev.includes(deptId) ? prev.filter(id => id !== deptId) : [...prev, deptId]);

  const getDeptIcon = (iconName) => {
    switch(iconName) {
      case 'folder': return <FolderKanban size={16} />;
      case 'sparkles': return <Sparkles size={16} />;
      case 'palette': return <Palette size={16} />;
      case 'clapperboard': return <Clapperboard size={16} />;
      case 'pen': return <PenLine size={16} />;
      case 'camera': return <Camera size={16} />;
      case 'wand': return <Wand2 size={16} />;
      default: return <Users size={16} />;
    }
  };

  const filteredTasks = selectedMember ? getTasksForMember(selectedMember.id).filter(t => filterStatus === 'all' || t.status === filterStatus) : [];
  const updateTaskStatus = (taskId, newStatus) => setDb(prev => ({ ...prev, tasks: prev.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t) }));

  const toggleTaskExpand = (taskId) => {
    if (expandedTask === taskId) {
      setExpandedTask(null);
      setNewNote('');
      setNoteAuthor('');
    } else {
      setExpandedTask(taskId);
      setNewNote('');
      setNoteAuthor(selectedMember?.id || '');
    }
  };

  const addNote = (taskId) => {
    if (!newNote.trim() || !noteAuthor) return;
    const note = {
      id: `n${Date.now()}`,
      authorId: noteAuthor,
      text: newNote.trim(),
      createdAt: new Date().toISOString(),
    };
    setDb(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => 
        t.id === taskId 
          ? { ...t, notes: [...(t.notes || []), note] }
          : t
      )
    }));
    setNewNote('');
  };

  const getMemberById = (memberId) => db.team.find(m => m.id === memberId);

  const formatNoteTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' at ' + 
           date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="team-view">
      <div className="view-header">
        <div className="view-title"><Users size={20} /><span>Team</span><span className="team-count">{db.team.length}</span></div>
        <div className="view-actions"><button className="action-btn primary"><Plus size={16} />Add Member</button></div>
      </div>
      <div className="team-layout">
        <div className="team-list">
          {db.departments.map(dept => {
            const members = db.team.filter(m => m.departmentId === dept.id);
            const deptStats = getDeptStats(dept.id);
            const isExpanded = expandedDepts.includes(dept.id);
            return (
              <div key={dept.id} className="dept-section">
                <div className="dept-header" onClick={() => toggleDept(dept.id)}>
                  <div className="dept-info"><span className="dept-icon" style={{ color: dept.color }}>{getDeptIcon(dept.icon)}</span><span className="dept-name">{dept.name}</span><span className="dept-count">{members.length}</span></div>
                  <div className="dept-meta"><span className="dept-tasks">{deptStats.done}/{deptStats.total}</span><ChevronDown size={16} className={`dept-chevron ${isExpanded ? 'expanded' : ''}`} /></div>
                </div>
                {isExpanded && (
                  <div className="dept-members">
                    {members.map(member => {
                      const stats = getTaskStats(member.id);
                      const isSelected = selectedMember?.id === member.id;
                      const hasOverdue = getTasksForMember(member.id).some(t => t.status !== 'done' && isOverdue(t.deadline));
                      return (
                        <div key={member.id} className={`member-card ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedMember(isSelected ? null : member)}>
                          <div className="member-avatar" style={{ background: member.color }}>{member.avatar}</div>
                          <div className="member-info"><span className="member-name">{member.name}</span><span className="member-role">{member.role}</span></div>
                          <div className="member-stats">
                            {stats.inProgress > 0 && <span className="stat-badge active">{stats.inProgress}</span>}
                            {stats.pending > 0 && <span className="stat-badge pending">{stats.pending}</span>}
                            {hasOverdue && <span className="stat-badge overdue">!</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="team-detail">
          {selectedMember ? (
            <>
              <div className="detail-header">
                <div className="detail-member">
                  <div className="detail-avatar" style={{ background: selectedMember.color }}>{selectedMember.avatar}</div>
                  <div className="detail-info"><h2>{selectedMember.name}</h2><span className="detail-role">{selectedMember.role}</span></div>
                </div>
                <div className="detail-summary">
                  <div className="summary-item"><span className="summary-num">{getTaskStats(selectedMember.id).total}</span><span className="summary-label">Total</span></div>
                  <div className="summary-item"><span className="summary-num active">{getTaskStats(selectedMember.id).inProgress}</span><span className="summary-label">Active</span></div>
                  <div className="summary-item"><span className="summary-num done">{getTaskStats(selectedMember.id).done}</span><span className="summary-label">Done</span></div>
                </div>
              </div>
              <div className="detail-filters">
                {['all', 'pending', 'in-progress', 'done'].map(status => (
                  <button key={status} className={`filter-btn ${filterStatus === status ? 'active' : ''}`} onClick={() => setFilterStatus(status)}>{status === 'in-progress' ? 'Active' : status.charAt(0).toUpperCase() + status.slice(1)}</button>
                ))}
              </div>
              <div className="task-list">
                {filteredTasks.length === 0 ? <div className="no-tasks"><CheckSquare size={32} /><p>No tasks</p></div> : (
                  filteredTasks.map(task => {
                    const content = db.contentBank.find(c => c.id === task.contentId);
                    const client = clients.find(c => c.id === content?.clientId);
                    const overdue = task.status !== 'done' && isOverdue(task.deadline);
                    const isExpanded = expandedTask === task.id;
                    const taskNotes = task.notes || [];
                    return (
                      <div key={task.id} className={`task-card ${overdue ? 'overdue' : ''} ${isExpanded ? 'expanded' : ''}`}>
                        <div className="task-card-main">
                          <button className={`status-btn ${task.status}`} onClick={() => updateTaskStatus(task.id, task.status === 'pending' ? 'in-progress' : task.status === 'in-progress' ? 'done' : 'pending')}>
                            {task.status === 'done' ? <CheckCircle2 size={18} /> : task.status === 'in-progress' ? <div className="status-progress" /> : <Circle size={18} />}
                          </button>
                          <div className="task-content" onClick={() => toggleTaskExpand(task.id)}>
                            <div className="task-header"><span className="task-client" style={{ background: `${client?.color}15`, color: client?.color }}>{client?.name}</span><span className="task-type">{task.type}</span></div>
                            <p className="task-idea">{content?.idea}</p>
                            <div className="task-footer">
                              <span className={`task-deadline ${overdue ? 'overdue' : ''}`}><Clock size={12} />{new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              <span className="task-notes-count">
                                <MessageSquare size={12} />
                                {taskNotes.length}
                              </span>
                            </div>
                          </div>
                          <button className={`expand-btn ${isExpanded ? 'expanded' : ''}`} onClick={() => toggleTaskExpand(task.id)}>
                            <ChevronDown size={16} />
                          </button>
                        </div>
                        
                        {isExpanded && (
                          <div className="task-notes-section">
                            <div className="notes-header">
                              <h4><MessageSquare size={14} /> Notes ({taskNotes.length})</h4>
                            </div>
                            
                            {taskNotes.length > 0 && (
                              <div className="notes-list">
                                {taskNotes.map(note => {
                                  const author = getMemberById(note.authorId);
                                  return (
                                    <div key={note.id} className="note-item">
                                      <div className="note-author-avatar" style={{ background: author?.color || '#6B7280' }}>
                                        {author?.avatar || '?'}
                                      </div>
                                      <div className="note-content">
                                        <div className="note-meta">
                                          <span className="note-author-name">{author?.name || 'Unknown'}</span>
                                          <span className="note-time">{formatNoteTime(note.createdAt)}</span>
                                        </div>
                                        <p className="note-text">{note.text}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            
                            <div className="add-note-form">
                              <div className="note-input-row">
                                <select 
                                  className="note-author-select"
                                  value={noteAuthor}
                                  onChange={(e) => setNoteAuthor(e.target.value)}
                                >
                                  <option value="">Select name...</option>
                                  {db.team.map(member => (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="note-input-row">
                                <textarea 
                                  placeholder="Add a note..."
                                  value={newNote}
                                  onChange={(e) => setNewNote(e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div className="note-actions">
                                <button 
                                  className="save-note-btn" 
                                  onClick={() => addNote(task.id)}
                                  disabled={!newNote.trim() || !noteAuthor}
                                >
                                  <Send size={14} />
                                  Add Note
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : <div className="no-selection"><Users size={40} /><h3>Select a team member</h3></div>}
        </div>
      </div>
    </div>
  );
};

// ============ SIMPLIFIED OTHER VIEWS ============
const PipelineView = ({ db, clients, selectedClient, setDb }) => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [filterClient, setFilterClient] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');
  
  const stages = ['idea', 'execution', 'approval', 'ready', 'posted'];
  const stageConfig = { 
    idea: { label: 'Ideas', color: '#F59E0B', icon: Zap }, 
    execution: { label: 'Production', color: '#3B82F6', icon: Clapperboard }, 
    approval: { label: 'Approval', color: '#8B5CF6', icon: CheckSquare }, 
    ready: { label: 'Ready', color: '#10B981', icon: CheckCircle2 }, 
    posted: { label: 'Published', color: '#6B7280', icon: Send } 
  };
  const filteredContent = filterClient ? db.contentBank.filter(c => c.clientId === filterClient) : db.contentBank;

  const getContentType = (type) => {
    switch(type) {
      case 'video': return { icon: Video, label: 'Video' };
      case 'photo': return { icon: Camera, label: 'Photo' };
      case 'carousel': return { icon: Layers, label: 'Carousel' };
      case 'reel': return { icon: Play, label: 'Reel' };
      case 'story': return { icon: Circle, label: 'Story' };
      case 'campaign': return { icon: Target, label: 'Campaign' };
      default: return { icon: FileText, label: type };
    }
  };

  const getMemberById = (memberId) => db.team.find(m => m.id === memberId);

  const formatNoteTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' at ' + 
           date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const addNote = (contentId) => {
    if (!newNote.trim() || !noteAuthor) return;
    const note = {
      id: `cn${Date.now()}`,
      authorId: noteAuthor,
      text: newNote.trim(),
      createdAt: new Date().toISOString(),
    };
    setDb(prev => ({
      ...prev,
      contentBank: prev.contentBank.map(c => 
        c.id === contentId 
          ? { ...c, notes: [...(c.notes || []), note] }
          : c
      )
    }));
    // Update selectedContent to reflect new note
    setSelectedContent(prev => prev ? { ...prev, notes: [...(prev.notes || []), note] } : prev);
    setNewNote('');
  };

  const moveContent = (contentId, newStage) => {
    setDb(prev => ({
      ...prev,
      contentBank: prev.contentBank.map(c => 
        c.id === contentId ? { ...c, stage: newStage } : c
      )
    }));
    if (selectedContent?.id === contentId) {
      setSelectedContent(prev => ({ ...prev, stage: newStage }));
    }
  };

  const getNextStage = (currentStage) => {
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;
  };

  const getPrevStage = (currentStage) => {
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex > 0 ? stages[currentIndex - 1] : null;
  };

  return (
    <div className="pipeline-view">
      <div className="view-header">
        <div className="view-title"><Layers size={20} /><span>Pipeline</span></div>
        <div className="view-actions">
          <ClientDropdown 
            clients={clients} 
            selectedClient={filterClient} 
            onSelect={setFilterClient}
          />
        </div>
      </div>
      <div className="pipeline-board">
        {stages.map(stage => {
          const stageContent = filteredContent.filter(c => c.stage === stage);
          const StageIcon = stageConfig[stage].icon;
          return (
            <div key={stage} className="pipeline-column">
              <div className="column-header">
                <div className="column-title-row">
                  <StageIcon size={14} style={{ color: stageConfig[stage].color }} />
                  <span className="column-title" style={{ color: stageConfig[stage].color }}>{stageConfig[stage].label}</span>
                </div>
                <span className="column-count">{stageContent.length}</span>
              </div>
              <div className="column-content">
                {stageContent.map(content => {
                  const client = clients.find(cl => cl.id === content.clientId);
                  const TypeInfo = getContentType(content.type);
                  return (
                    <div 
                      key={content.id} 
                      className="pipeline-card"
                      onClick={() => setSelectedContent(content)}
                    >
                      <div className="pipeline-card-header">
                        <span className="card-client" style={{ background: `${client?.color}15`, color: client?.color }}>{client?.name}</span>
                        <span className={`card-priority ${content.priority}`}>{content.priority}</span>
                      </div>
                      <p className="card-idea">{content.idea}</p>
                      <div className="pipeline-card-footer">
                        <span className="card-type">
                          <TypeInfo.icon size={12} />
                          {TypeInfo.label}
                        </span>
                        {content.scheduledFor && (
                          <span className="card-date">
                            <Calendar size={12} />
                            {new Date(content.scheduledFor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                        {(content.notes || []).length > 0 && (
                          <span className="card-notes-count">
                            <MessageSquare size={12} />
                            {(content.notes || []).length}
                          </span>
                        )}
                      </div>
                      {content.platforms && (
                        <div className="pipeline-card-platforms">
                          {content.platforms.includes('instagram') && <Instagram size={12} />}
                          {content.platforms.includes('facebook') && <Facebook size={12} />}
                          {content.platforms.includes('linkedin') && <Linkedin size={12} />}
                          {content.platforms.includes('twitter') && <Twitter size={12} />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Detail Modal */}
      {selectedContent && (
        <div className="pipeline-modal-overlay" onClick={() => setSelectedContent(null)}>
          <div className="pipeline-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <h2>{selectedContent.idea}</h2>
                <span className={`stage-badge ${selectedContent.stage}`} style={{ background: `${stageConfig[selectedContent.stage].color}15`, color: stageConfig[selectedContent.stage].color }}>
                  {stageConfig[selectedContent.stage].label}
                </span>
              </div>
              <button className="close-btn" onClick={() => setSelectedContent(null)}><X size={20} /></button>
            </div>
            
            <div className="modal-content">
              {/* Workflow Progress */}
              <div className="modal-section workflow-section">
                <h4>Workflow Progress</h4>
                <div className="pipeline-workflow">
                  {stages.map((stage, index) => {
                    const isCompleted = stages.indexOf(selectedContent.stage) > index;
                    const isCurrent = selectedContent.stage === stage;
                    const StageIcon = stageConfig[stage].icon;
                    return (
                      <React.Fragment key={stage}>
                        <div 
                          className={`pipeline-workflow-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                          onClick={() => moveContent(selectedContent.id, stage)}
                        >
                          <div className="pipeline-step-icon" style={isCurrent ? { background: stageConfig[stage].color } : {}}>
                            {isCompleted ? <Check size={14} /> : <StageIcon size={14} />}
                          </div>
                          <span className="pipeline-step-label">{stageConfig[stage].label}</span>
                        </div>
                        {index < stages.length - 1 && (
                          <div className={`pipeline-workflow-connector ${isCompleted ? 'completed' : ''}`}>
                            <ArrowRight size={14} />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Client Info */}
              <div className="modal-section">
                <h4>Client</h4>
                <div className="modal-client-info">
                  {(() => {
                    const client = clients.find(c => c.id === selectedContent.clientId);
                    return (
                      <>
                        <div className="modal-client-logo" style={{ background: client?.color }}>{client?.logo}</div>
                        <div>
                          <span className="modal-client-name">{client?.name}</span>
                          <span className="modal-client-industry">{client?.industry}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="modal-row">
                <div className="modal-section">
                  <h4>Content Type</h4>
                  <div className="detail-tag">
                    {(() => {
                      const TypeInfo = getContentType(selectedContent.type);
                      return (
                        <>
                          <TypeInfo.icon size={14} />
                          {TypeInfo.label}
                        </>
                      );
                    })()}
                  </div>
                </div>
                <div className="modal-section">
                  <h4>Priority</h4>
                  <div className={`detail-tag priority-tag ${selectedContent.priority}`}>
                    {selectedContent.priority === 'urgent' && <AlertTriangle size={14} />}
                    {selectedContent.priority}
                  </div>
                </div>
              </div>

              {selectedContent.scheduledFor && (
                <div className="modal-section">
                  <h4>Scheduled For</h4>
                  <div className="detail-tag">
                    <Calendar size={14} />
                    {new Date(selectedContent.scheduledFor).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              )}

              <div className="modal-section">
                <h4>Platforms</h4>
                <div className="platforms-display">
                  {selectedContent.platforms?.map(platform => (
                    <span key={platform} className={`platform-chip ${platform}`}>
                      {platform === 'instagram' && <Instagram size={14} />}
                      {platform === 'facebook' && <Facebook size={14} />}
                      {platform === 'linkedin' && <Linkedin size={14} />}
                      {platform === 'twitter' && <Twitter size={14} />}
                      {platform === 'tiktok' && <Play size={14} />}
                      {platform === 'youtube' && <Play size={14} />}
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div className="modal-section notes-section">
                <h4><MessageSquare size={14} /> Notes ({(selectedContent.notes || []).length})</h4>
                
                {(selectedContent.notes || []).length > 0 && (
                  <div className="modal-notes-list">
                    {(selectedContent.notes || []).map(note => {
                      const author = getMemberById(note.authorId);
                      return (
                        <div key={note.id} className="modal-note-item">
                          <div className="modal-note-avatar" style={{ background: author?.color || '#6B7280' }}>
                            {author?.avatar || '?'}
                          </div>
                          <div className="modal-note-content">
                            <div className="modal-note-meta">
                              <span className="modal-note-author">{author?.name || 'Unknown'}</span>
                              <span className="modal-note-time">{formatNoteTime(note.createdAt)}</span>
                            </div>
                            <p className="modal-note-text">{note.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="modal-add-note">
                  <div className="modal-note-input-row">
                    <select 
                      className="modal-note-author-select"
                      value={noteAuthor}
                      onChange={(e) => setNoteAuthor(e.target.value)}
                    >
                      <option value="">Select your name...</option>
                      {db.team.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-note-input-row">
                    <textarea 
                      placeholder="Add a note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="modal-note-actions">
                    <button 
                      className="modal-save-note-btn" 
                      onClick={() => addNote(selectedContent.id)}
                      disabled={!newNote.trim() || !noteAuthor}
                    >
                      <Send size={14} />
                      Add Note
                    </button>
                  </div>
                </div>
              </div>

              {/* Stage Actions */}
              <div className="modal-actions">
                {getPrevStage(selectedContent.stage) && (
                  <button 
                    className="stage-action-btn prev"
                    onClick={() => moveContent(selectedContent.id, getPrevStage(selectedContent.stage))}
                  >
                    <ChevronLeft size={16} />
                    Move to {stageConfig[getPrevStage(selectedContent.stage)].label}
                  </button>
                )}
                {getNextStage(selectedContent.stage) && (
                  <button 
                    className="stage-action-btn next"
                    onClick={() => moveContent(selectedContent.id, getNextStage(selectedContent.stage))}
                  >
                    Move to {stageConfig[getNextStage(selectedContent.stage)].label}
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============ CONTENT LIBRARY TAB (Idea Bank) ============
const ContentLibraryTab = ({ db, setDb, client, clientContent, onCreateBrief }) => {
  const [isAddingIdea, setIsAddingIdea] = useState(false);
  const [newIdea, setNewIdea] = useState({ idea: '', type: 'video', platforms: ['instagram'] });
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Ideas are items in "idea" stage that haven't been picked yet
  const ideas = clientContent.filter(c => c.stage === 'idea');
  const pickedIdeas = clientContent.filter(c => c.stage !== 'idea' && c.stage !== 'posted');

  // Filter ideas
  const filteredIdeas = ideas.filter(idea => {
    if (filterType !== 'all' && idea.type !== filterType) return false;
    if (searchQuery && !idea.idea.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleAddIdea = () => {
    if (!newIdea.idea.trim()) return;
    const idea = {
      id: `cb${Date.now()}`,
      clientId: client.id,
      idea: newIdea.idea,
      type: newIdea.type,
      stage: 'idea',
      priority: 'medium',
      createdAt: new Date().toISOString().split('T')[0],
      scheduledFor: null,
      platforms: newIdea.platforms,
    };
    setDb(prev => ({
      ...prev,
      contentBank: [...prev.contentBank, idea]
    }));
    setNewIdea({ idea: '', type: 'video', platforms: ['instagram'] });
    setIsAddingIdea(false);
  };

  const handleDeleteIdea = (ideaId) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      setDb(prev => ({
        ...prev,
        contentBank: prev.contentBank.filter(c => c.id !== ideaId)
      }));
    }
  };

  const togglePlatform = (platform) => {
    setNewIdea(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const platformOptions = ['instagram', 'facebook', 'linkedin', 'twitter', 'tiktok', 'youtube'];
  const typeOptions = ['video', 'photo', 'carousel', 'reel', 'story', 'campaign'];

  return (
    <div className="content-library-section">
      <div className="library-header">
        <div className="library-title">
          <h2>Idea Bank</h2>
          <span className="library-count">{filteredIdeas.length} ideas</span>
        </div>
        <div className="library-actions">
          <div className="library-search">
            <Search size={14} />
            <input 
              type="text" 
              placeholder="Search ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="type-filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            {typeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button className="action-btn primary" onClick={() => setIsAddingIdea(true)}>
            <Plus size={16} />Add Idea
          </button>
        </div>
      </div>

      {/* Add Idea Form */}
      {isAddingIdea && (
        <div className="add-idea-card">
          <div className="add-idea-header">
            <h3>New Idea</h3>
            <button className="close-btn" onClick={() => setIsAddingIdea(false)}><X size={16} /></button>
          </div>
          <div className="add-idea-form">
            <div className="form-group">
              <label>Idea Description</label>
              <textarea 
                placeholder="Describe your content idea..."
                value={newIdea.idea}
                onChange={(e) => setNewIdea(prev => ({ ...prev, idea: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="form-row two-col">
              <div className="form-group">
                <label>Content Type</label>
                <select 
                  value={newIdea.type}
                  onChange={(e) => setNewIdea(prev => ({ ...prev, type: e.target.value }))}
                >
                  {typeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Platforms</label>
                <div className="platform-toggles">
                  {platformOptions.map(platform => (
                    <button
                      key={platform}
                      className={`platform-toggle ${newIdea.platforms.includes(platform) ? 'active' : ''}`}
                      onClick={() => togglePlatform(platform)}
                    >
                      {platform === 'instagram' && <Instagram size={14} />}
                      {platform === 'facebook' && <Facebook size={14} />}
                      {platform === 'linkedin' && <Linkedin size={14} />}
                      {platform === 'twitter' && <Twitter size={14} />}
                      {platform === 'tiktok' && <span className="platform-text">TT</span>}
                      {platform === 'youtube' && <Play size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="add-idea-actions">
              <button className="cancel-btn" onClick={() => setIsAddingIdea(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddIdea} disabled={!newIdea.idea.trim()}>
                <Plus size={14} />Add Idea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ideas Grid */}
      <div className="ideas-grid">
        {filteredIdeas.length === 0 ? (
          <div className="no-ideas-message">
            <Zap size={32} />
            <h4>No ideas yet</h4>
            <p>{searchQuery || filterType !== 'all' ? 'Try adjusting your filters' : 'Add your first content idea to get started'}</p>
            {!searchQuery && filterType === 'all' && (
              <button className="add-idea-inline" onClick={() => setIsAddingIdea(true)}>
                <Plus size={14} />Add Idea
              </button>
            )}
          </div>
        ) : (
          filteredIdeas.map(idea => (
              <div key={idea.id} className="idea-card">
                <div className="idea-card-header">
                  <span className="idea-type">
                    {idea.type === 'video' && <Video size={12} />}
                    {idea.type === 'photo' && <Camera size={12} />}
                    {idea.type === 'carousel' && <Layers size={12} />}
                    {idea.type === 'reel' && <Play size={12} />}
                    {idea.type === 'story' && <Circle size={12} />}
                    {idea.type === 'campaign' && <Target size={12} />}
                    {idea.type}
                  </span>
                  <span className={`priority-badge ${idea.priority}`}>
                    {idea.priority}
                  </span>
                </div>
                <p className="idea-text">{idea.idea}</p>
                <div className="idea-platforms">
                  {idea.platforms?.map(p => (
                    <span key={p} className={`platform-icon ${p}`}>
                      {p === 'instagram' && <Instagram size={12} />}
                      {p === 'facebook' && <Facebook size={12} />}
                      {p === 'linkedin' && <Linkedin size={12} />}
                      {p === 'twitter' && <Twitter size={12} />}
                      {p === 'tiktok' && <span className="tt-icon">TT</span>}
                      {p === 'youtube' && <Play size={12} />}
                    </span>
                  ))}
                </div>
                <div className="idea-card-footer">
                  <span className="idea-date">
                    <Calendar size={12} />
                    {new Date(idea.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="idea-actions">
                    <button 
                      className="idea-action-btn delete"
                      onClick={(e) => { e.stopPropagation(); handleDeleteIdea(idea.id); }}
                      title="Delete idea"
                    >
                      <X size={14} />
                    </button>
                    <button 
                      className="idea-action-btn pick"
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
        <div className="picked-summary">
          <h3>In Progress ({pickedIdeas.length})</h3>
          <p className="picked-summary-text">These ideas have moved past the idea stage</p>
          <div className="picked-ideas-list">
            {pickedIdeas.slice(0, 5).map(idea => (
              <div key={idea.id} className="picked-idea-item">
                <span className={`stage-badge ${idea.stage}`}>{idea.stage}</span>
                <span className="picked-idea-text">{idea.idea}</span>
              </div>
            ))}
            {pickedIdeas.length > 5 && (
              <span className="more-picked">+{pickedIdeas.length - 5} more</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============ CLIENT CALENDAR TAB ============
const ClientCalendarTab = ({ db, setDb, client }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [draggedContent, setDraggedContent] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date(2025, 0, 17); // Current date in the app
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      const prevDate = new Date(year, month, -startingDay + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  };

  const clientContent = db.contentBank.filter(c => c.clientId === client.id);
  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return clientContent.filter(c => c.scheduledFor === dateStr);
  };
  const unscheduledContent = clientContent.filter(c => !c.scheduledFor && c.stage !== 'posted' && c.stage !== 'idea');

  // Get post status: 'on-time', 'late', 'missed', 'upcoming', 'pending'
  const getPostStatus = (content) => {
    const scheduledDate = new Date(content.scheduledFor);
    
    if (content.stage === 'posted' && content.postedAt) {
      const postedDate = new Date(content.postedAt);
      if (postedDate <= scheduledDate) {
        return 'on-time'; // Posted on or before scheduled date
      } else {
        return 'late'; // Posted after scheduled date
      }
    } else if (scheduledDate < today && content.stage !== 'posted') {
      return 'missed'; // Scheduled date passed but not posted
    } else if (scheduledDate.toDateString() === today.toDateString()) {
      return 'due-today'; // Due today
    } else {
      return 'upcoming'; // Scheduled for future
    }
  };

  // Calculate stats for the legend
  const postedContent = clientContent.filter(c => c.stage === 'posted' && c.scheduledFor);
  const onTimeCount = postedContent.filter(c => {
    const scheduled = new Date(c.scheduledFor);
    const posted = new Date(c.postedAt);
    return posted <= scheduled;
  }).length;
  const lateCount = postedContent.filter(c => {
    const scheduled = new Date(c.scheduledFor);
    const posted = new Date(c.postedAt);
    return posted > scheduled;
  }).length;
  const missedCount = clientContent.filter(c => {
    if (!c.scheduledFor || c.stage === 'posted') return false;
    return new Date(c.scheduledFor) < today;
  }).length;

  const days = getDaysInMonth(currentDate);
  const navigateMonth = (direction) => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  const isToday = (date) => date.toDateString() === today.toDateString();
  const formatDateString = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const handleDragStart = (e, content) => { setDraggedContent(content); e.dataTransfer.effectAllowed = 'move'; };
  const handleDragOver = (e, date) => { e.preventDefault(); setDragOverDate(formatDateString(date)); };
  const handleDragLeave = () => setDragOverDate(null);
  const handleDrop = (e, date) => {
    e.preventDefault();
    const dateStr = formatDateString(date);
    if (draggedContent) {
      setDb(prev => ({ ...prev, contentBank: prev.contentBank.map(c => c.id === draggedContent.id ? { ...c, scheduledFor: dateStr } : c) }));
    }
    setDraggedContent(null);
    setDragOverDate(null);
  };

  return (
    <div className="client-calendar-tab">
      <div className="calendar-tab-header">
        <div className="month-nav">
          <button className="nav-btn" onClick={() => navigateMonth(-1)}><ChevronLeft size={18} /></button>
          <span className="current-month">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <button className="nav-btn" onClick={() => navigateMonth(1)}><ChevronRight size={18} /></button>
        </div>
        <div className="calendar-legend">
          <span className="legend-item on-time"><CheckCircle2 size={12} /> On time ({onTimeCount})</span>
          <span className="legend-item late"><AlertCircle size={12} /> Late ({lateCount})</span>
          <span className="legend-item missed"><X size={12} /> Missed ({missedCount})</span>
        </div>
      </div>
      
      <div className="calendar-tab-layout">
        <div className="calendar-tab-main">
          <div className="calendar-header">
            {dayNames.map(day => <div key={day} className="day-header">{day}</div>)}
          </div>
          <div className="calendar-body compact">
            {days.map((day, index) => {
              const events = getEventsForDate(day.date);
              const dateStr = formatDateString(day.date);
              const isDragOver = dragOverDate === dateStr;
              return (
                <div 
                  key={index} 
                  className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${isToday(day.date) ? 'today' : ''} ${isDragOver ? 'drag-over' : ''}`}
                  onDragOver={(e) => handleDragOver(e, day.date)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, day.date)}
                >
                  <span className="day-number">{day.date.getDate()}</span>
                  <div className="day-events">
                    {events.slice(0, 2).map((content, i) => {
                      const status = getPostStatus(content);
                      return (
                        <div 
                          key={i} 
                          className={`day-event post ${status}`}
                          style={{ borderLeftColor: client.color }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, content)}
                        >
                          <span className="event-text">{content.idea.substring(0, 12)}...</span>
                          <span className={`event-status-icon ${status}`}>
                            {status === 'on-time' && <CheckCircle2 size={10} />}
                            {status === 'late' && <AlertCircle size={10} />}
                            {status === 'missed' && <X size={10} />}
                            {status === 'due-today' && <Clock size={10} />}
                          </span>
                        </div>
                      );
                    })}
                    {events.length > 2 && <span className="more-events">+{events.length - 2}</span>}
                  </div>
                  {isDragOver && <div className="drop-indicator"><Plus size={12} /></div>}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="calendar-tab-sidebar">
          <div className="sidebar-section">
            <h3><span>Unscheduled</span><span className="section-count">{unscheduledContent.length}</span></h3>
            <div className="unscheduled-list">
              {unscheduledContent.map(content => (
                <div 
                  key={content.id} 
                  className="unscheduled-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, content)}
                  style={{ borderLeftColor: client.color }}
                >
                  <p className="unscheduled-idea">{content.idea}</p>
                  <span className="unscheduled-stage">{content.stage}</span>
                </div>
              ))}
              {unscheduledContent.length === 0 && <p className="empty-text">All content scheduled!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ CALENDAR VIEW ============
const CalendarView = ({ db, clients, selectedClient, setDb }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [draggedContent, setDraggedContent] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);
  const [toast, setToast] = useState(null);
  const [filterClient, setFilterClient] = useState(null);
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      const prevDate = new Date(year, month, -startingDay + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  };
  
  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const events = [];
    db.contentBank.forEach(content => {
      if (content.scheduledFor === dateStr) {
        if (!filterClient || content.clientId === filterClient) {
          const client = clients.find(c => c.id === content.clientId);
          events.push({ type: 'post', content, client });
        }
      }
    });
    db.tasks.forEach(task => {
      if (task.deadline === dateStr && task.status !== 'done') {
        const content = db.contentBank.find(c => c.id === task.contentId);
        if (!filterClient || content?.clientId === filterClient) {
          events.push({ type: 'deadline', task, content });
        }
      }
    });
    return events;
  };

  const unscheduledContent = db.contentBank.filter(c => 
    !c.scheduledFor && c.stage !== 'posted' && c.stage !== 'idea' &&
    (!filterClient || c.clientId === filterClient)
  );

  const scheduledContent = db.contentBank
    .filter(c => c.scheduledFor && (!filterClient || c.clientId === filterClient))
    .sort((a, b) => new Date(a.scheduledFor) - new Date(b.scheduledFor))
    .slice(0, 5);

  const days = getDaysInMonth(currentDate);
  const navigateMonth = (direction) => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  const isToday = (date) => date.toDateString() === new Date(2025, 0, 17).toDateString();
  const formatDateString = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const handleDragStart = (e, content) => { setDraggedContent(content); e.dataTransfer.effectAllowed = 'move'; };
  const handleDragOver = (e, date) => { e.preventDefault(); setDragOverDate(formatDateString(date)); };
  const handleDragLeave = () => setDragOverDate(null);
  const handleDrop = (e, date) => {
    e.preventDefault();
    const dateStr = formatDateString(date);
    if (draggedContent) {
      setDb(prev => ({ ...prev, contentBank: prev.contentBank.map(c => c.id === draggedContent.id ? { ...c, scheduledFor: dateStr } : c) }));
      const client = clients.find(c => c.id === draggedContent.clientId);
      setToast({ message: `Scheduled for ${new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`, client });
      setTimeout(() => setToast(null), 2500);
    }
    setDraggedContent(null);
    setDragOverDate(null);
  };
  const handleDragEnd = () => { setDraggedContent(null); setDragOverDate(null); };

  return (
    <div className="calendar-view">
      <div className="view-header">
        <div className="view-title"><Calendar size={20} /><span>Content Calendar</span></div>
        <div className="view-actions">
          <ClientDropdown 
            clients={clients} 
            selectedClient={filterClient} 
            onSelect={setFilterClient}
          />
          <div className="month-nav">
            <button className="nav-btn" onClick={() => navigateMonth(-1)}><ChevronLeft size={18} /></button>
            <span className="current-month">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
            <button className="nav-btn" onClick={() => navigateMonth(1)}><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
      
      <div className="calendar-layout">
        <div className="calendar-main">
          <div className="calendar-grid">
            <div className="calendar-header">
              {dayNames.map(day => <div key={day} className="day-header">{day}</div>)}
            </div>
            <div className="calendar-body">
              {days.map((day, index) => {
                const events = getEventsForDate(day.date);
                const dateStr = formatDateString(day.date);
                const isDragOver = dragOverDate === dateStr;
                return (
                  <div 
                    key={index} 
                    className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${isToday(day.date) ? 'today' : ''} ${isDragOver ? 'drag-over' : ''}`}
                    onDragOver={(e) => handleDragOver(e, day.date)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, day.date)}
                  >
                    <span className="day-number">{day.date.getDate()}</span>
                    <div className="day-events">
                      {events.slice(0, 2).map((event, i) => (
                        <div 
                          key={i} 
                          className={`day-event ${event.type} ${draggedContent?.id === event.content?.id ? 'dragging' : ''}`}
                          style={event.type === 'post' ? { borderLeftColor: event.client?.color } : {}}
                          draggable={event.type === 'post'}
                          onDragStart={(e) => event.type === 'post' && handleDragStart(e, event.content)}
                          onDragEnd={handleDragEnd}
                        >
                          {event.type === 'post' ? (
                            <span className="event-title">{event.content.idea.substring(0, 18)}...</span>
                          ) : (
                            <span className="event-title">📌 {event.task.type}</span>
                          )}
                        </div>
                      ))}
                      {events.length > 2 && <span className="more-events">+{events.length - 2}</span>}
                    </div>
                    {isDragOver && <div className="drop-indicator"><Plus size={14} />Drop</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="calendar-sidebar">
          {unscheduledContent.length > 0 && (
            <div className="sidebar-section">
              <h3><span>Unscheduled</span><span className="section-count">{unscheduledContent.length}</span></h3>
              <p className="sidebar-hint">Drag to calendar</p>
              <div className="unscheduled-list">
                {unscheduledContent.map(content => {
                  const client = clients.find(c => c.id === content.clientId);
                  return (
                    <div 
                      key={content.id} 
                      className={`unscheduled-item ${draggedContent?.id === content.id ? 'dragging' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, content)}
                      onDragEnd={handleDragEnd}
                      style={{ borderLeftColor: client?.color }}
                    >
                      <span className="unscheduled-client" style={{ color: client?.color }}>{client?.name}</span>
                      <p className="unscheduled-idea">{content.idea}</p>
                      <span className="unscheduled-stage">{content.stage}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="sidebar-section">
            <h3>Upcoming</h3>
            <div className="upcoming-list">
              {scheduledContent.map(content => {
                const client = clients.find(c => c.id === content.clientId);
                return (
                  <div 
                    key={content.id} 
                    className={`upcoming-item ${draggedContent?.id === content.id ? 'dragging' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, content)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="upcoming-date">
                      <span className="upcoming-day">{new Date(content.scheduledFor).getDate()}</span>
                      <span className="upcoming-month">{monthNames[new Date(content.scheduledFor).getMonth()].substring(0, 3)}</span>
                    </div>
                    <div className="upcoming-content">
                      <span className="upcoming-client" style={{ color: client?.color }}>{client?.name}</span>
                      <p className="upcoming-idea">{content.idea}</p>
                    </div>
                    <GripVertical size={14} className="upcoming-grip" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {toast && (
        <div className="toast" style={{ borderLeftColor: toast.client?.color }}>
          <CheckCircle2 size={16} /><span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

// ============ ANALYTICS VIEW ============
const AnalyticsView = ({ db, clients, selectedClient }) => {
  const [filterClient, setFilterClient] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [timeRange, setTimeRange] = useState('7days');
  
  // Filter content by client
  const filteredContent = filterClient 
    ? db.contentBank.filter(c => c.clientId === filterClient)
    : db.contentBank;
  
  const postedContent = filteredContent.filter(c => c.stage === 'posted');
  const scheduledContent = filteredContent.filter(c => c.scheduledFor && c.stage !== 'posted');
  
  // This month stats
  const currentMonth = new Date(2025, 0, 1); // January 2025
  const thisMonthContent = filteredContent.filter(c => {
    if (c.scheduledFor) {
      const date = new Date(c.scheduledFor);
      return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
    }
    return false;
  });
  const thisMonthPlanned = thisMonthContent.length;
  const thisMonthPosted = thisMonthContent.filter(c => c.stage === 'posted').length;
  
  // Calculate totals
  const totalViews = Object.values(db.analytics).reduce((sum, a) => sum + a.views, 0);
  const totalLikes = Object.values(db.analytics).reduce((sum, a) => sum + a.likes, 0);
  const totalShares = Object.values(db.analytics).reduce((sum, a) => sum + a.shares, 0);
  const totalReach = Object.values(db.analytics).reduce((sum, a) => sum + a.reach, 0);
  const totalComments = Object.values(db.analytics).reduce((sum, a) => sum + a.comments, 0);
  const avgEngagement = Object.keys(db.analytics).length > 0 
    ? Object.values(db.analytics).reduce((sum, a) => sum + a.engagementRate, 0) / Object.keys(db.analytics).length 
    : 0;
  
  // Weekly data for charts
  const weeklyData = [
    { day: 'Mon', views: 8200, engagement: 6.2, posts: 2 },
    { day: 'Tue', views: 12400, engagement: 7.8, posts: 1 },
    { day: 'Wed', views: 9800, engagement: 5.9, posts: 3 },
    { day: 'Thu', views: 15600, engagement: 8.4, posts: 2 },
    { day: 'Fri', views: 11200, engagement: 7.1, posts: 1 },
    { day: 'Sat', views: 18900, engagement: 9.2, posts: 2 },
    { day: 'Sun', views: 14300, engagement: 8.0, posts: 1 },
  ];
  const maxViews = Math.max(...weeklyData.map(d => d.views));

  // Mock post-level analytics
  const postAnalytics = [
    { id: 'cb5', clientId: 'c3', idea: 'Room makeover time-lapse', type: 'video', postedAt: '2025-01-15', platform: 'instagram', views: 12400, likes: 892, shares: 156, comments: 45, reach: 28000, engagementRate: 7.2, saves: 234 },
    { id: 'cb6', clientId: 'c1', idea: 'Morning brew ritual', type: 'photo', postedAt: '2025-01-14', platform: 'instagram', views: 8500, likes: 645, shares: 89, comments: 32, reach: 18500, engagementRate: 6.8, saves: 156 },
    { id: 'cb7', clientId: 'c2', idea: '5-minute workout challenge', type: 'reel', postedAt: '2025-01-13', platform: 'instagram', views: 24600, likes: 1890, shares: 456, comments: 178, reach: 52000, engagementRate: 9.4, saves: 890 },
    { id: 'cb8', clientId: 'c1', idea: 'New seasonal blend announcement', type: 'carousel', postedAt: '2025-01-12', platform: 'facebook', views: 5200, likes: 312, shares: 67, comments: 28, reach: 12000, engagementRate: 5.1, saves: 45 },
    { id: 'cb9', clientId: 'c3', idea: 'Design tips for small spaces', type: 'carousel', postedAt: '2025-01-10', platform: 'linkedin', views: 3800, likes: 245, shares: 89, comments: 34, reach: 9500, engagementRate: 4.8, saves: 178 },
  ];

  const filteredPostAnalytics = filterClient 
    ? postAnalytics.filter(p => p.clientId === filterClient)
    : postAnalytics;

  const getClientColor = (clientId) => clients.find(c => c.id === clientId)?.color || '#6B7280';
  const getClientName = (clientId) => clients.find(c => c.id === clientId)?.name || 'Unknown';

  return (
    <div className="analytics-view">
      <div className="view-header">
        <div className="view-title"><BarChart3 size={20} /><span>Analytics Overview</span></div>
        <div className="view-actions">
          <ClientDropdown 
            clients={clients} 
            selectedClient={filterClient} 
            onSelect={setFilterClient}
          />
          <select className="time-select" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
          <button className="action-btn"><ArrowUpRight size={16} />Export</button>
        </div>
      </div>
      
      <div className="analytics-grid">
        {/* Monthly Progress Card */}
        <div className="monthly-progress-card">
          <div className="monthly-header">
            <h3>January 2025</h3>
            <span className="monthly-label">Content Progress</span>
          </div>
          <div className="monthly-stats">
            <div className="monthly-stat">
              <div className="monthly-circle planned">
                <span className="monthly-num">{thisMonthPlanned}</span>
              </div>
              <span className="monthly-stat-label">Planned</span>
            </div>
            <div className="monthly-progress-arrow">
              <ArrowRight size={20} />
            </div>
            <div className="monthly-stat">
              <div className="monthly-circle posted">
                <span className="monthly-num">{thisMonthPosted}</span>
              </div>
              <span className="monthly-stat-label">Posted</span>
            </div>
            <div className="monthly-stat completion">
              <div className="completion-ring">
                <svg viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeDasharray={`${thisMonthPlanned > 0 ? (thisMonthPosted / thisMonthPlanned) * 100 : 0}, 100`}
                  />
                </svg>
                <span className="completion-percent">{thisMonthPlanned > 0 ? Math.round((thisMonthPosted / thisMonthPlanned) * 100) : 0}%</span>
              </div>
              <span className="monthly-stat-label">Completion</span>
            </div>
          </div>
          <div className="monthly-bar">
            <div className="monthly-bar-fill" style={{ width: `${thisMonthPlanned > 0 ? (thisMonthPosted / thisMonthPlanned) * 100 : 0}%` }} />
          </div>
          <div className="monthly-footer">
            <span>{thisMonthPosted} of {thisMonthPlanned} posts published</span>
            <span>{thisMonthPlanned - thisMonthPosted} remaining</span>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="stats-row">
          <div className="stat-card large">
            <div className="stat-icon"><Eye size={20} /></div>
            <div className="stat-info">
              <span className="stat-value">{(totalViews / 1000).toFixed(1)}K</span>
              <span className="stat-label">Total Views</span>
            </div>
            <div className="stat-trend up"><TrendingUp size={14} />+12.5%</div>
          </div>
          <div className="stat-card large">
            <div className="stat-icon"><Heart size={20} /></div>
            <div className="stat-info">
              <span className="stat-value">{(totalLikes / 1000).toFixed(1)}K</span>
              <span className="stat-label">Total Likes</span>
            </div>
            <div className="stat-trend up"><TrendingUp size={14} />+8.3%</div>
          </div>
          <div className="stat-card large">
            <div className="stat-icon"><Share2 size={20} /></div>
            <div className="stat-info">
              <span className="stat-value">{totalShares}</span>
              <span className="stat-label">Shares</span>
            </div>
            <div className="stat-trend up"><TrendingUp size={14} />+24.1%</div>
          </div>
          <div className="stat-card large">
            <div className="stat-icon"><MessageCircle size={20} /></div>
            <div className="stat-info">
              <span className="stat-value">{totalComments}</span>
              <span className="stat-label">Comments</span>
            </div>
            <div className="stat-trend up"><TrendingUp size={14} />+15.7%</div>
          </div>
          <div className="stat-card large highlight">
            <div className="stat-icon"><Target size={20} /></div>
            <div className="stat-info">
              <span className="stat-value">{avgEngagement.toFixed(1)}%</span>
              <span className="stat-label">Avg. Engagement</span>
            </div>
            <div className="stat-trend up"><TrendingUp size={14} />+3.2%</div>
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="charts-row">
          <div className="chart-card">
            <h3>Views This Week</h3>
            <div className="bar-chart">
              {weeklyData.map((data, i) => (
                <div key={i} className="bar-group">
                  <div className="bar-container">
                    <div className="bar" style={{ height: `${(data.views / maxViews) * 100}%` }}>
                      <span className="bar-value">{(data.views / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                  <span className="bar-label">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-card">
            <h3>Engagement Rate</h3>
            <div className="engagement-chart">
              {weeklyData.map((data, i) => (
                <div key={i} className="engagement-row">
                  <span className="engagement-day">{data.day}</span>
                  <div className="engagement-bar-container">
                    <div className="engagement-bar" style={{ width: `${(data.engagement / 10) * 100}%` }} />
                  </div>
                  <span className="engagement-value">{data.engagement}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Post-Level Analytics */}
        <div className="post-analytics-section">
          <div className="section-header">
            <h3>Post Performance</h3>
            <span className="post-count">{filteredPostAnalytics.length} posts</span>
          </div>
          <div className="post-analytics-table">
            <div className="post-table-header">
              <div className="col-post">Post</div>
              <div className="col-platform">Platform</div>
              <div className="col-date">Date</div>
              <div className="col-metric">Views</div>
              <div className="col-metric">Likes</div>
              <div className="col-metric">Comments</div>
              <div className="col-metric">Shares</div>
              <div className="col-metric">Saves</div>
              <div className="col-engagement">Engagement</div>
            </div>
            {filteredPostAnalytics.map((post) => (
              <div 
                key={post.id} 
                className={`post-table-row ${selectedPost?.id === post.id ? 'selected' : ''}`}
                onClick={() => setSelectedPost(selectedPost?.id === post.id ? null : post)}
              >
                <div className="col-post">
                  <div className="post-type-icon">
                    {post.type === 'video' && <Video size={16} />}
                    {post.type === 'photo' && <Camera size={16} />}
                    {post.type === 'carousel' && <Layers size={16} />}
                    {post.type === 'reel' && <Play size={16} />}
                  </div>
                  <div className="post-info">
                    <span className="post-client-tag" style={{ background: `${getClientColor(post.clientId)}15`, color: getClientColor(post.clientId) }}>
                      {getClientName(post.clientId)}
                    </span>
                    <span className="post-idea">{post.idea}</span>
                  </div>
                </div>
                <div className="col-platform">
                  <div className={`platform-badge ${post.platform}`}>
                    {post.platform === 'instagram' && <Instagram size={14} />}
                    {post.platform === 'facebook' && <Facebook size={14} />}
                    {post.platform === 'linkedin' && <Linkedin size={14} />}
                    {post.platform === 'twitter' && <Twitter size={14} />}
                  </div>
                </div>
                <div className="col-date">{new Date(post.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <div className="col-metric">{(post.views / 1000).toFixed(1)}K</div>
                <div className="col-metric">{post.likes.toLocaleString()}</div>
                <div className="col-metric">{post.comments}</div>
                <div className="col-metric">{post.shares}</div>
                <div className="col-metric">{post.saves}</div>
                <div className="col-engagement">
                  <span className={`engagement-badge ${post.engagementRate >= 7 ? 'high' : post.engagementRate >= 5 ? 'medium' : 'low'}`}>
                    {post.engagementRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Post Detail */}
        {selectedPost && (
          <div className="post-detail-card">
            <div className="post-detail-header">
              <div className="post-detail-info">
                <span className="post-client-tag large" style={{ background: `${getClientColor(selectedPost.clientId)}15`, color: getClientColor(selectedPost.clientId) }}>
                  {getClientName(selectedPost.clientId)}
                </span>
                <h4>{selectedPost.idea}</h4>
                <div className="post-meta">
                  <span className={`platform-badge ${selectedPost.platform}`}>
                    {selectedPost.platform === 'instagram' && <Instagram size={14} />}
                    {selectedPost.platform}
                  </span>
                  <span className="post-date">{new Date(selectedPost.postedAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              <button className="close-btn" onClick={() => setSelectedPost(null)}><X size={18} /></button>
            </div>
            <div className="post-detail-stats">
              <div className="detail-stat">
                <Eye size={18} />
                <div>
                  <span className="detail-stat-value">{selectedPost.views.toLocaleString()}</span>
                  <span className="detail-stat-label">Views</span>
                </div>
              </div>
              <div className="detail-stat">
                <Users size={18} />
                <div>
                  <span className="detail-stat-value">{selectedPost.reach.toLocaleString()}</span>
                  <span className="detail-stat-label">Reach</span>
                </div>
              </div>
              <div className="detail-stat">
                <Heart size={18} />
                <div>
                  <span className="detail-stat-value">{selectedPost.likes.toLocaleString()}</span>
                  <span className="detail-stat-label">Likes</span>
                </div>
              </div>
              <div className="detail-stat">
                <MessageCircle size={18} />
                <div>
                  <span className="detail-stat-value">{selectedPost.comments}</span>
                  <span className="detail-stat-label">Comments</span>
                </div>
              </div>
              <div className="detail-stat">
                <Share2 size={18} />
                <div>
                  <span className="detail-stat-value">{selectedPost.shares}</span>
                  <span className="detail-stat-label">Shares</span>
                </div>
              </div>
              <div className="detail-stat highlight">
                <Target size={18} />
                <div>
                  <span className="detail-stat-value">{selectedPost.engagementRate}%</span>
                  <span className="detail-stat-label">Engagement</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Platform Breakdown */}
        <div className="content-row">
          <div className="content-card">
            <h3>Top Performing Content</h3>
            <div className="top-content-list">
              {filteredPostAnalytics.slice(0, 3).map(post => (
                <div key={post.id} className="top-content-item">
                  <div className="content-preview">{post.type === 'video' || post.type === 'reel' ? <Video size={20} /> : <Image size={20} />}</div>
                  <div className="content-details">
                    <span className="content-client" style={{ color: getClientColor(post.clientId) }}>{getClientName(post.clientId)}</span>
                    <p className="content-title">{post.idea}</p>
                    <div className="content-metrics">
                      <span><Eye size={12} /> {(post.views / 1000).toFixed(1)}K</span>
                      <span><Heart size={12} /> {post.likes}</span>
                      <span><MessageCircle size={12} /> {post.comments}</span>
                    </div>
                  </div>
                  <div className="content-engagement">
                    <span className="engagement-rate">{post.engagementRate}%</span>
                    <span className="engagement-label">engagement</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="content-card">
            <h3>Platform Breakdown</h3>
            <div className="platform-list">
              <div className="platform-item">
                <div className="platform-icon instagram"><Instagram size={18} /></div>
                <div className="platform-info"><span className="platform-name">Instagram</span><span className="platform-posts">8 posts</span></div>
                <div className="platform-stats"><span className="platform-reach">52K reach</span><span className="platform-engagement">7.8% eng.</span></div>
              </div>
              <div className="platform-item">
                <div className="platform-icon facebook"><Facebook size={18} /></div>
                <div className="platform-info"><span className="platform-name">Facebook</span><span className="platform-posts">6 posts</span></div>
                <div className="platform-stats"><span className="platform-reach">38K reach</span><span className="platform-engagement">5.2% eng.</span></div>
              </div>
              <div className="platform-item">
                <div className="platform-icon linkedin"><Linkedin size={18} /></div>
                <div className="platform-info"><span className="platform-name">LinkedIn</span><span className="platform-posts">3 posts</span></div>
                <div className="platform-stats"><span className="platform-reach">12K reach</span><span className="platform-engagement">4.1% eng.</span></div>
              </div>
              <div className="platform-item">
                <div className="platform-icon twitter"><Twitter size={18} /></div>
                <div className="platform-info"><span className="platform-name">Twitter</span><span className="platform-posts">4 posts</span></div>
                <div className="platform-stats"><span className="platform-reach">15K reach</span><span className="platform-engagement">3.8% eng.</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ PROBLEMS VIEW ============
const ProblemsView = ({ db, clients, setDb, setActiveView, setSelectedClient }) => {
  const today = new Date('2025-01-17'); // Current date in the app
  const [expandedItem, setExpandedItem] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');

  const getMemberById = (memberId) => db.team.find(m => m.id === memberId);

  const formatNoteTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' at ' + 
           date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const toggleExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
    setNewNote('');
    setNoteAuthor('');
  };

  const addNoteToContent = (contentId) => {
    if (!newNote.trim() || !noteAuthor) return;
    const note = {
      id: `cn${Date.now()}`,
      authorId: noteAuthor,
      text: newNote.trim(),
      createdAt: new Date().toISOString(),
    };
    setDb(prev => ({
      ...prev,
      contentBank: prev.contentBank.map(c => 
        c.id === contentId 
          ? { ...c, notes: [...(c.notes || []), note] }
          : c
      )
    }));
    setNewNote('');
  };

  const addNoteToTask = (taskId) => {
    if (!newNote.trim() || !noteAuthor) return;
    const note = {
      id: `n${Date.now()}`,
      authorId: noteAuthor,
      text: newNote.trim(),
      createdAt: new Date().toISOString(),
    };
    setDb(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => 
        t.id === taskId 
          ? { ...t, notes: [...(t.notes || []), note] }
          : t
      )
    }));
    setNewNote('');
  };
  
  // 1. OVERDUE TASKS - tasks past deadline not marked done
  const overdueTasks = db.tasks.filter(task => {
    const deadline = new Date(task.deadline);
    return deadline < today && task.status !== 'done';
  }).map(task => {
    const content = db.contentBank.find(c => c.id === task.contentId);
    const client = clients.find(c => c.id === content?.clientId);
    const assignee = db.team.find(m => m.id === task.assigneeId);
    const daysOverdue = Math.ceil((today - new Date(task.deadline)) / (1000 * 60 * 60 * 24));
    return { ...task, content, client, assignee, daysOverdue };
  });

  // 2. STALLED CONTENT - content stuck in execution/approval for more than 3 days
  const stalledContent = db.contentBank.filter(content => {
    if (content.stage === 'idea' || content.stage === 'posted' || content.stage === 'ready') return false;
    const createdDate = new Date(content.createdAt);
    const daysSinceCreated = Math.ceil((today - createdDate) / (1000 * 60 * 60 * 24));
    return daysSinceCreated > 4; // Stalled if in execution/approval for more than 4 days
  }).map(content => {
    const client = clients.find(c => c.id === content.clientId);
    const daysSinceCreated = Math.ceil((today - new Date(content.createdAt)) / (1000 * 60 * 60 * 24));
    return { ...content, client, daysStalled: daysSinceCreated };
  });

  // 3. URGENT ITEMS NOT DONE - urgent priority items not yet posted
  const urgentItems = db.contentBank.filter(content => 
    content.priority === 'urgent' && content.stage !== 'posted'
  ).map(content => {
    const client = clients.find(c => c.id === content.clientId);
    return { ...content, client };
  });

  // 4. MISSED POSTS - scheduled date passed but not posted
  const missedPosts = db.contentBank.filter(content => {
    if (!content.scheduledFor || content.stage === 'posted') return false;
    const scheduledDate = new Date(content.scheduledFor);
    return scheduledDate < today;
  }).map(content => {
    const client = clients.find(c => c.id === content.clientId);
    const daysMissed = Math.ceil((today - new Date(content.scheduledFor)) / (1000 * 60 * 60 * 24));
    return { ...content, client, daysMissed };
  });

  // 5. PENDING APPROVALS - content waiting in approval stage
  const pendingApprovals = db.contentBank.filter(content => 
    content.stage === 'approval'
  ).map(content => {
    const client = clients.find(c => c.id === content.clientId);
    const daysSinceCreated = Math.ceil((today - new Date(content.createdAt)) / (1000 * 60 * 60 * 24));
    return { ...content, client, daysWaiting: daysSinceCreated };
  });

  // 6. WORKLOAD ISSUES - team members with too many active tasks (3+)
  const workloadIssues = db.team.map(member => {
    const activeTasks = db.tasks.filter(t => t.assigneeId === member.id && t.status !== 'done');
    const overdueTasks = activeTasks.filter(t => new Date(t.deadline) < today);
    return { ...member, activeTasks: activeTasks.length, overdueTasks: overdueTasks.length };
  }).filter(member => member.activeTasks >= 3 || member.overdueTasks > 0);

  // 7. BRIEFS WITHOUT PROGRESS - briefs stuck in pending status
  const stalledBriefs = db.contentBriefs.filter(brief => 
    brief.status === 'pending'
  ).map(brief => {
    const client = clients.find(c => c.id === brief.clientId);
    const daysSinceCreated = Math.ceil((today - new Date(brief.createdAt)) / (1000 * 60 * 60 * 24));
    return { ...brief, client, daysWaiting: daysSinceCreated };
  }).filter(brief => brief.daysWaiting > 2);

  const totalProblems = overdueTasks.length + stalledContent.length + urgentItems.length + 
                        missedPosts.length + pendingApprovals.length + workloadIssues.length + stalledBriefs.length;

  const getContentType = (type) => {
    switch(type) {
      case 'video': return { icon: Video, label: 'Video' };
      case 'photo': return { icon: Camera, label: 'Photo' };
      case 'carousel': return { icon: Layers, label: 'Carousel' };
      case 'reel': return { icon: Play, label: 'Reel' };
      case 'story': return { icon: Circle, label: 'Story' };
      case 'campaign': return { icon: Target, label: 'Campaign' };
      default: return { icon: FileText, label: type };
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setDb(prev => ({ ...prev, tasks: prev.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t) }));
  };

  const moveToReady = (contentId) => {
    setDb(prev => ({
      ...prev,
      contentBank: prev.contentBank.map(c => c.id === contentId ? { ...c, stage: 'ready' } : c)
    }));
  };

  const moveToPosted = (contentId) => {
    setDb(prev => ({
      ...prev,
      contentBank: prev.contentBank.map(c => c.id === contentId ? { ...c, stage: 'posted', postedAt: today.toISOString().split('T')[0] } : c)
    }));
  };

  return (
    <div className="problems-view">
      <div className="view-header">
        <div className="view-title">
          <AlertTriangle size={20} />
          <span>Problems</span>
          <span className="problems-total-count">{totalProblems}</span>
        </div>
        <div className="problems-summary">
          {totalProblems === 0 ? (
            <span className="all-clear">✓ All clear! No immediate issues.</span>
          ) : (
            <span className="issues-found">{totalProblems} issue{totalProblems !== 1 ? 's' : ''} need attention</span>
          )}
        </div>
      </div>

      <div className="problems-content">
        {totalProblems === 0 ? (
          <div className="no-problems">
            <CheckCircle2 size={48} />
            <h3>Everything looks good!</h3>
            <p>No overdue tasks, missed posts, or stalled content. Keep up the great work!</p>
          </div>
        ) : (
          <div className="problems-grid">
            {/* OVERDUE TASKS */}
            {overdueTasks.length > 0 && (
              <div className="problem-section urgent">
                <div className="problem-section-header">
                  <div className="problem-icon urgent"><Clock size={16} /></div>
                  <h3>Overdue Tasks</h3>
                  <span className="problem-count">{overdueTasks.length}</span>
                </div>
                <div className="problem-items">
                  {overdueTasks.map(task => {
                    const isExpanded = expandedItem === `task-${task.id}`;
                    const taskNotes = task.notes || [];
                    return (
                      <div key={task.id} className={`problem-item ${isExpanded ? 'expanded' : ''}`}>
                        <div className="problem-item-compact" onClick={() => toggleExpand(`task-${task.id}`)}>
                          <div className="problem-item-header">
                            <span className="problem-client" style={{ background: `${task.client?.color}15`, color: task.client?.color }}>
                              {task.client?.name}
                            </span>
                            <span className="problem-overdue">{task.daysOverdue}d overdue</span>
                          </div>
                          <p className="problem-item-title">{task.content?.idea}</p>
                          <div className="problem-item-meta">
                            <span className="problem-type">{task.type}</span>
                            <span className="problem-assignee">
                              <span className="assignee-avatar" style={{ background: task.assignee?.color }}>{task.assignee?.avatar}</span>
                              {task.assignee?.name}
                            </span>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="problem-item-expanded">
                            <div className="expanded-section">
                              <h4>Task Details</h4>
                              <div className="expanded-details">
                                <div className="detail-row"><span>Type:</span><span>{task.type}</span></div>
                                <div className="detail-row"><span>Deadline:</span><span>{new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
                                <div className="detail-row"><span>Status:</span><span className={`status-tag ${task.status}`}>{task.status}</span></div>
                                <div className="detail-row"><span>Assignee:</span><span>{task.assignee?.name}</span></div>
                              </div>
                            </div>
                            <div className="expanded-section">
                              <h4>Notes ({taskNotes.length})</h4>
                              {taskNotes.length > 0 && (
                                <div className="expanded-notes">
                                  {taskNotes.map(note => {
                                    const author = getMemberById(note.authorId);
                                    return (
                                      <div key={note.id} className="expanded-note">
                                        <span className="note-avatar" style={{ background: author?.color }}>{author?.avatar}</span>
                                        <div className="note-body">
                                          <div className="note-header"><span>{author?.name}</span><span>{formatNoteTime(note.createdAt)}</span></div>
                                          <p>{note.text}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              <div className="add-note-inline">
                                <select value={noteAuthor} onChange={(e) => setNoteAuthor(e.target.value)}>
                                  <option value="">Select name...</option>
                                  {db.team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                                <input placeholder="Add a note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                                <button onClick={() => addNoteToTask(task.id)} disabled={!newNote.trim() || !noteAuthor}><Send size={12} /></button>
                              </div>
                            </div>
                            <div className="expanded-actions">
                              <button className="problem-action-btn complete" onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, 'done'); }}>
                                <CheckCircle2 size={14} /> Mark Done
                              </button>
                            </div>
                          </div>
                        )}
                        {!isExpanded && (
                          <div className="problem-item-actions">
                            <button className="problem-action-btn complete" onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, 'done'); }}>
                              <CheckCircle2 size={14} /> Done
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MISSED POSTS */}
            {missedPosts.length > 0 && (
              <div className="problem-section urgent">
                <div className="problem-section-header">
                  <div className="problem-icon urgent"><Calendar size={16} /></div>
                  <h3>Missed Post Dates</h3>
                  <span className="problem-count">{missedPosts.length}</span>
                </div>
                <div className="problem-items">
                  {missedPosts.map(content => {
                    const TypeInfo = getContentType(content.type);
                    const isExpanded = expandedItem === `missed-${content.id}`;
                    const contentNotes = content.notes || [];
                    return (
                      <div key={content.id} className={`problem-item ${isExpanded ? 'expanded' : ''}`}>
                        <div className="problem-item-compact" onClick={() => toggleExpand(`missed-${content.id}`)}>
                          <div className="problem-item-header">
                            <span className="problem-client" style={{ background: `${content.client?.color}15`, color: content.client?.color }}>
                              {content.client?.name}
                            </span>
                            <span className="problem-overdue">{content.daysMissed}d late</span>
                          </div>
                          <p className="problem-item-title">{content.idea}</p>
                          <div className="problem-item-meta">
                            <span className="problem-type"><TypeInfo.icon size={12} /> {TypeInfo.label}</span>
                            <span className="problem-stage">{content.stage}</span>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="problem-item-expanded">
                            <div className="expanded-section">
                              <h4>Content Details</h4>
                              <div className="expanded-details">
                                <div className="detail-row"><span>Type:</span><span>{TypeInfo.label}</span></div>
                                <div className="detail-row"><span>Stage:</span><span className={`status-tag ${content.stage}`}>{content.stage}</span></div>
                                <div className="detail-row"><span>Scheduled:</span><span>{new Date(content.scheduledFor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
                                <div className="detail-row"><span>Priority:</span><span className={`priority-tag ${content.priority}`}>{content.priority}</span></div>
                              </div>
                              {content.platforms && (
                                <div className="expanded-platforms">
                                  {content.platforms.map(p => <span key={p} className={`platform-mini ${p}`}>{p}</span>)}
                                </div>
                              )}
                            </div>
                            <div className="expanded-section">
                              <h4>Notes ({contentNotes.length})</h4>
                              {contentNotes.length > 0 && (
                                <div className="expanded-notes">
                                  {contentNotes.map(note => {
                                    const author = getMemberById(note.authorId);
                                    return (
                                      <div key={note.id} className="expanded-note">
                                        <span className="note-avatar" style={{ background: author?.color }}>{author?.avatar}</span>
                                        <div className="note-body">
                                          <div className="note-header"><span>{author?.name}</span><span>{formatNoteTime(note.createdAt)}</span></div>
                                          <p>{note.text}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              <div className="add-note-inline">
                                <select value={noteAuthor} onChange={(e) => setNoteAuthor(e.target.value)}>
                                  <option value="">Select name...</option>
                                  {db.team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                                <input placeholder="Add a note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                                <button onClick={() => addNoteToContent(content.id)} disabled={!newNote.trim() || !noteAuthor}><Send size={12} /></button>
                              </div>
                            </div>
                            <div className="expanded-actions">
                              <button className="problem-action-btn" onClick={(e) => { e.stopPropagation(); moveToPosted(content.id); }}>
                                <Send size={14} /> Post Now
                              </button>
                            </div>
                          </div>
                        )}
                        {!isExpanded && (
                          <div className="problem-item-actions">
                            <button className="problem-action-btn" onClick={(e) => { e.stopPropagation(); moveToPosted(content.id); }}>
                              <Send size={14} /> Post
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* URGENT ITEMS */}
            {urgentItems.length > 0 && (
              <div className="problem-section warning">
                <div className="problem-section-header">
                  <div className="problem-icon warning"><AlertTriangle size={16} /></div>
                  <h3>Urgent Priority Items</h3>
                  <span className="problem-count">{urgentItems.length}</span>
                </div>
                <div className="problem-items">
                  {urgentItems.map(content => {
                    const TypeInfo = getContentType(content.type);
                    const isExpanded = expandedItem === `urgent-${content.id}`;
                    const contentNotes = content.notes || [];
                    return (
                      <div key={content.id} className={`problem-item ${isExpanded ? 'expanded' : ''}`}>
                        <div className="problem-item-compact" onClick={() => toggleExpand(`urgent-${content.id}`)}>
                          <div className="problem-item-header">
                            <span className="problem-client" style={{ background: `${content.client?.color}15`, color: content.client?.color }}>
                              {content.client?.name}
                            </span>
                            <span className="problem-priority urgent">URGENT</span>
                          </div>
                          <p className="problem-item-title">{content.idea}</p>
                          <div className="problem-item-meta">
                            <span className="problem-type"><TypeInfo.icon size={12} /> {TypeInfo.label}</span>
                            <span className="problem-stage">{content.stage}</span>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="problem-item-expanded">
                            <div className="expanded-section">
                              <h4>Content Details</h4>
                              <div className="expanded-details">
                                <div className="detail-row"><span>Type:</span><span>{TypeInfo.label}</span></div>
                                <div className="detail-row"><span>Stage:</span><span className={`status-tag ${content.stage}`}>{content.stage}</span></div>
                                {content.scheduledFor && <div className="detail-row"><span>Scheduled:</span><span>{new Date(content.scheduledFor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>}
                                <div className="detail-row"><span>Created:</span><span>{new Date(content.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
                              </div>
                              {content.platforms && (
                                <div className="expanded-platforms">
                                  {content.platforms.map(p => <span key={p} className={`platform-mini ${p}`}>{p}</span>)}
                                </div>
                              )}
                            </div>
                            <div className="expanded-section">
                              <h4>Notes ({contentNotes.length})</h4>
                              {contentNotes.length > 0 && (
                                <div className="expanded-notes">
                                  {contentNotes.map(note => {
                                    const author = getMemberById(note.authorId);
                                    return (
                                      <div key={note.id} className="expanded-note">
                                        <span className="note-avatar" style={{ background: author?.color }}>{author?.avatar}</span>
                                        <div className="note-body">
                                          <div className="note-header"><span>{author?.name}</span><span>{formatNoteTime(note.createdAt)}</span></div>
                                          <p>{note.text}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              <div className="add-note-inline">
                                <select value={noteAuthor} onChange={(e) => setNoteAuthor(e.target.value)}>
                                  <option value="">Select name...</option>
                                  {db.team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                                <input placeholder="Add a note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                                <button onClick={() => addNoteToContent(content.id)} disabled={!newNote.trim() || !noteAuthor}><Send size={12} /></button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PENDING APPROVALS */}
            {pendingApprovals.length > 0 && (
              <div className="problem-section info">
                <div className="problem-section-header">
                  <div className="problem-icon info"><CheckSquare size={16} /></div>
                  <h3>Awaiting Approval</h3>
                  <span className="problem-count">{pendingApprovals.length}</span>
                </div>
                <div className="problem-items">
                  {pendingApprovals.map(content => {
                    const TypeInfo = getContentType(content.type);
                    const isExpanded = expandedItem === `approval-${content.id}`;
                    const contentNotes = content.notes || [];
                    return (
                      <div key={content.id} className={`problem-item ${isExpanded ? 'expanded' : ''}`}>
                        <div className="problem-item-compact" onClick={() => toggleExpand(`approval-${content.id}`)}>
                          <div className="problem-item-header">
                            <span className="problem-client" style={{ background: `${content.client?.color}15`, color: content.client?.color }}>
                              {content.client?.name}
                            </span>
                            <span className="problem-waiting">{content.daysWaiting}d waiting</span>
                          </div>
                          <p className="problem-item-title">{content.idea}</p>
                          <div className="problem-item-meta">
                            <span className="problem-type"><TypeInfo.icon size={12} /> {TypeInfo.label}</span>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="problem-item-expanded">
                            <div className="expanded-section">
                              <h4>Content Details</h4>
                              <div className="expanded-details">
                                <div className="detail-row"><span>Type:</span><span>{TypeInfo.label}</span></div>
                                <div className="detail-row"><span>Priority:</span><span className={`priority-tag ${content.priority}`}>{content.priority}</span></div>
                                {content.scheduledFor && <div className="detail-row"><span>Scheduled:</span><span>{new Date(content.scheduledFor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>}
                                <div className="detail-row"><span>Created:</span><span>{new Date(content.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
                              </div>
                              {content.platforms && (
                                <div className="expanded-platforms">
                                  {content.platforms.map(p => <span key={p} className={`platform-mini ${p}`}>{p}</span>)}
                                </div>
                              )}
                            </div>
                            <div className="expanded-section">
                              <h4>Notes ({contentNotes.length})</h4>
                              {contentNotes.length > 0 && (
                                <div className="expanded-notes">
                                  {contentNotes.map(note => {
                                    const author = getMemberById(note.authorId);
                                    return (
                                      <div key={note.id} className="expanded-note">
                                        <span className="note-avatar" style={{ background: author?.color }}>{author?.avatar}</span>
                                        <div className="note-body">
                                          <div className="note-header"><span>{author?.name}</span><span>{formatNoteTime(note.createdAt)}</span></div>
                                          <p>{note.text}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              <div className="add-note-inline">
                                <select value={noteAuthor} onChange={(e) => setNoteAuthor(e.target.value)}>
                                  <option value="">Select name...</option>
                                  {db.team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                                <input placeholder="Add a note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                                <button onClick={() => addNoteToContent(content.id)} disabled={!newNote.trim() || !noteAuthor}><Send size={12} /></button>
                              </div>
                            </div>
                            <div className="expanded-actions">
                              <button className="problem-action-btn approve" onClick={(e) => { e.stopPropagation(); moveToReady(content.id); }}>
                                <Check size={14} /> Approve
                              </button>
                            </div>
                          </div>
                        )}
                        {!isExpanded && (
                          <div className="problem-item-actions">
                            <button className="problem-action-btn approve" onClick={(e) => { e.stopPropagation(); moveToReady(content.id); }}>
                              <Check size={14} /> Approve
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STALLED CONTENT */}
            {stalledContent.length > 0 && (
              <div className="problem-section warning">
                <div className="problem-section-header">
                  <div className="problem-icon warning"><Layers size={16} /></div>
                  <h3>Stalled Content</h3>
                  <span className="problem-count">{stalledContent.length}</span>
                </div>
                <div className="problem-items">
                  {stalledContent.map(content => {
                    const TypeInfo = getContentType(content.type);
                    const isExpanded = expandedItem === `stalled-${content.id}`;
                    const contentNotes = content.notes || [];
                    return (
                      <div key={content.id} className={`problem-item ${isExpanded ? 'expanded' : ''}`}>
                        <div className="problem-item-compact" onClick={() => toggleExpand(`stalled-${content.id}`)}>
                          <div className="problem-item-header">
                            <span className="problem-client" style={{ background: `${content.client?.color}15`, color: content.client?.color }}>
                              {content.client?.name}
                            </span>
                            <span className="problem-stalled">{content.daysStalled}d in {content.stage}</span>
                          </div>
                          <p className="problem-item-title">{content.idea}</p>
                          <div className="problem-item-meta">
                            <span className="problem-type"><TypeInfo.icon size={12} /> {TypeInfo.label}</span>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="problem-item-expanded">
                            <div className="expanded-section">
                              <h4>Content Details</h4>
                              <div className="expanded-details">
                                <div className="detail-row"><span>Type:</span><span>{TypeInfo.label}</span></div>
                                <div className="detail-row"><span>Stage:</span><span className={`status-tag ${content.stage}`}>{content.stage}</span></div>
                                <div className="detail-row"><span>Priority:</span><span className={`priority-tag ${content.priority}`}>{content.priority}</span></div>
                                {content.scheduledFor && <div className="detail-row"><span>Scheduled:</span><span>{new Date(content.scheduledFor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>}
                              </div>
                              {content.platforms && (
                                <div className="expanded-platforms">
                                  {content.platforms.map(p => <span key={p} className={`platform-mini ${p}`}>{p}</span>)}
                                </div>
                              )}
                            </div>
                            <div className="expanded-section">
                              <h4>Notes ({contentNotes.length})</h4>
                              {contentNotes.length > 0 && (
                                <div className="expanded-notes">
                                  {contentNotes.map(note => {
                                    const author = getMemberById(note.authorId);
                                    return (
                                      <div key={note.id} className="expanded-note">
                                        <span className="note-avatar" style={{ background: author?.color }}>{author?.avatar}</span>
                                        <div className="note-body">
                                          <div className="note-header"><span>{author?.name}</span><span>{formatNoteTime(note.createdAt)}</span></div>
                                          <p>{note.text}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              <div className="add-note-inline">
                                <select value={noteAuthor} onChange={(e) => setNoteAuthor(e.target.value)}>
                                  <option value="">Select name...</option>
                                  {db.team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                                <input placeholder="Add a note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                                <button onClick={() => addNoteToContent(content.id)} disabled={!newNote.trim() || !noteAuthor}><Send size={12} /></button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* WORKLOAD ISSUES */}
            {workloadIssues.length > 0 && (
              <div className="problem-section info">
                <div className="problem-section-header">
                  <div className="problem-icon info"><Users size={16} /></div>
                  <h3>Workload Concerns</h3>
                  <span className="problem-count">{workloadIssues.length}</span>
                </div>
                <div className="problem-items">
                  {workloadIssues.map(member => (
                    <div key={member.id} className="problem-item workload">
                      <div className="problem-item-compact">
                        <div className="workload-member">
                          <span className="workload-avatar" style={{ background: member.color }}>{member.avatar}</span>
                          <div className="workload-info">
                            <span className="workload-name">{member.name}</span>
                            <span className="workload-role">{member.role}</span>
                          </div>
                        </div>
                        <div className="workload-stats">
                          <span className="workload-stat active">{member.activeTasks} active</span>
                          {member.overdueTasks > 0 && (
                            <span className="workload-stat overdue">{member.overdueTasks} overdue</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STALLED BRIEFS */}
            {stalledBriefs.length > 0 && (
              <div className="problem-section info">
                <div className="problem-section-header">
                  <div className="problem-icon info"><FileText size={16} /></div>
                  <h3>Briefs Needing Attention</h3>
                  <span className="problem-count">{stalledBriefs.length}</span>
                </div>
                <div className="problem-items">
                  {stalledBriefs.map(brief => {
                    const isExpanded = expandedItem === `brief-${brief.id}`;
                    const briefNotes = brief.notes || [];
                    return (
                      <div key={brief.id} className={`problem-item ${isExpanded ? 'expanded' : ''}`}>
                        <div className="problem-item-compact" onClick={() => toggleExpand(`brief-${brief.id}`)}>
                          <div className="problem-item-header">
                            <span className="problem-client" style={{ background: `${brief.client?.color}15`, color: brief.client?.color }}>
                              {brief.client?.name}
                            </span>
                            <span className="problem-waiting">{brief.daysWaiting}d pending</span>
                          </div>
                          <p className="problem-item-title">{brief.concept}</p>
                          <div className="problem-item-meta">
                            <span className="problem-type">{brief.contentType}</span>
                            <span className="problem-teams">{brief.teamsInvolved.length} teams</span>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="problem-item-expanded">
                            <div className="expanded-section">
                              <h4>Brief Details</h4>
                              <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.5, marginBottom: 12 }}>{brief.explanation}</p>
                              <div className="expanded-details">
                                <div className="detail-row"><span>Type:</span><span>{brief.contentType}</span></div>
                                <div className="detail-row"><span>Category:</span><span>{brief.category}</span></div>
                                <div className="detail-row"><span>Status:</span><span className={`status-tag ${brief.status}`}>{brief.status}</span></div>
                                <div className="detail-row"><span>Created:</span><span>{new Date(brief.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
                              </div>
                            </div>
                            <div className="expanded-section">
                              <h4>Notes ({briefNotes.length})</h4>
                              {briefNotes.length > 0 && (
                                <div className="expanded-notes">
                                  {briefNotes.map(note => {
                                    const author = getMemberById(note.authorId);
                                    return (
                                      <div key={note.id} className="expanded-note">
                                        <span className="note-avatar" style={{ background: author?.color }}>{author?.avatar}</span>
                                        <div className="note-body">
                                          <div className="note-header"><span>{author?.name}</span><span>{formatNoteTime(note.createdAt)}</span></div>
                                          <p>{note.text}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatView = ({ db }) => {
  const [messages, setMessages] = useState([{ id: 1, type: 'ai', content: { message: "Hello! I'm your social media assistant. How can I help you today?", suggestions: ['Show pipeline', 'What\'s due?', 'Team workload', 'Add new idea'] }}]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', content: input }, { id: Date.now() + 1, type: 'ai', content: { message: "I can help you with that! Use the sidebar to navigate to different sections, or ask me about your content pipeline, team tasks, or analytics.", suggestions: ['Pipeline', 'Calendar', 'Team', 'Analytics'] }}]);
    setInput('');
  };
  const handleSuggestion = (s) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', content: s }, { id: Date.now() + 1, type: 'ai', content: { message: `Sure! Click on "${s}" in the sidebar to view that section. Is there anything specific you'd like to know?`, suggestions: ['Show recent content', 'Pending tasks', 'Performance report'] }}]);
  };

  return (
    <div className="chat-view">
      <div className="messages-container">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <div className="message-content">
              {msg.type === 'user' ? msg.content : (
                <div className="ai-bubble">
                  <div className="ai-text">{msg.content.message}</div>
                  {msg.content.suggestions && (
                    <div className="suggestions">
                      {msg.content.suggestions.map((s, i) => (<button key={i} className="suggestion-chip" onClick={() => handleSuggestion(s)}>{s}</button>))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <div className="input-container">
          <input placeholder="Ask me anything..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
          <button className="send-btn" onClick={handleSend}><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
};

// ============ BULK UPLOAD VIEW ============
const BulkUploadView = ({ db, setDb, clients }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [mappedData, setMappedData] = useState([]);
  const [selectedClient, setSelectedClient] = useState(clients[0]?.id || '');
  const [importType, setImportType] = useState('content'); // content, briefs, tasks
  const [step, setStep] = useState(1); // 1: upload, 2: preview, 3: confirm
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv', 'application/pdf'];
    const extension = file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(file.type) && !['xlsx', 'xls', 'csv', 'pdf'].includes(extension)) {
      alert('Please upload an Excel (.xlsx, .xls, .csv) or PDF file');
      return;
    }
    
    setUploadedFile(file);
    setProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockParsedData = generateMockParsedData(file, extension);
      setParsedData(mockParsedData);
      setMappedData(mockParsedData.rows);
      setProcessing(false);
      setStep(2);
    }, 1500);
  };

  const generateMockParsedData = (file, extension) => {
    // Simulate AI-parsed data from file
    if (extension === 'pdf') {
      return {
        source: 'pdf',
        fileName: file.name,
        detectedType: 'content_brief',
        columns: ['concept', 'explanation', 'contentType', 'mood', 'teams'],
        rows: [
          { concept: 'Summer Collection Launch', explanation: 'Showcase new summer products with beach vibes and lifestyle shots', contentType: 'campaign', mood: 'vibrant, energetic, fun', teams: 'Design, Photography' },
          { concept: 'Customer Testimonials', explanation: 'Video series featuring real customer stories and transformations', contentType: 'video', mood: 'authentic, emotional, inspiring', teams: 'Video, Content Writers' },
          { concept: 'Behind the Scenes', explanation: 'Day-in-the-life content showing team culture and processes', contentType: 'reel', mood: 'casual, fun, relatable', teams: 'Photography, Video' },
        ]
      };
    }
    
    return {
      source: 'excel',
      fileName: file.name,
      detectedType: 'content_bank',
      columns: ['idea', 'type', 'stage', 'priority', 'platforms', 'scheduledFor'],
      rows: [
        { idea: 'Product feature highlight - New dashboard', type: 'carousel', stage: 'idea', priority: 'high', platforms: 'instagram, linkedin', scheduledFor: '' },
        { idea: 'Team celebration post', type: 'photo', stage: 'idea', priority: 'medium', platforms: 'instagram, facebook', scheduledFor: '2025-02-01' },
        { idea: 'Tutorial: Getting started guide', type: 'video', stage: 'idea', priority: 'high', platforms: 'youtube, instagram', scheduledFor: '' },
        { idea: 'Industry news commentary', type: 'carousel', stage: 'idea', priority: 'low', platforms: 'linkedin, twitter', scheduledFor: '2025-01-28' },
        { idea: 'User spotlight series #5', type: 'video', stage: 'idea', priority: 'medium', platforms: 'instagram, facebook', scheduledFor: '' },
      ]
    };
  };

  const updateMappedRow = (index, field, value) => {
    setMappedData(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
  };

  const removeRow = (index) => {
    setMappedData(prev => prev.filter((_, i) => i !== index));
  };

  const handleImport = () => {
    setProcessing(true);
    
    setTimeout(() => {
      if (importType === 'content') {
        const newContent = mappedData.map((row, i) => ({
          id: `cb_import_${Date.now()}_${i}`,
          clientId: selectedClient,
          idea: row.idea || row.concept,
          type: row.type || row.contentType || 'photo',
          stage: row.stage || 'idea',
          priority: row.priority || 'medium',
          platforms: (row.platforms || 'instagram').split(',').map(p => p.trim()),
          scheduledFor: row.scheduledFor || null,
          createdAt: new Date().toISOString().split('T')[0],
        }));
        
        setDb(prev => ({
          ...prev,
          contentBank: [...prev.contentBank, ...newContent]
        }));
      } else if (importType === 'briefs') {
        const newBriefs = mappedData.map((row, i) => ({
          id: `br_import_${Date.now()}_${i}`,
          clientId: selectedClient,
          concept: row.concept,
          explanation: row.explanation,
          mood: row.mood,
          moodTags: (row.mood || '').split(',').map(t => t.trim().toLowerCase()),
          references: [],
          contentType: row.contentType || 'campaign',
          category: 'general',
          teamsInvolved: [],
          music: { type: 'none', mood: '', reference: '' },
          status: 'pending',
          currentStage: 'idea',
          createdAt: new Date().toISOString().split('T')[0],
        }));
        
        setDb(prev => ({
          ...prev,
          contentBriefs: [...prev.contentBriefs, ...newBriefs]
        }));
      }
      
      setProcessing(false);
      setStep(3);
    }, 1000);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setParsedData(null);
    setMappedData([]);
    setStep(1);
  };

  return (
    <div className="bulk-upload-view">
      <div className="view-header">
        <div className="view-title">
          <Upload size={20} />
          <span>Bulk Import</span>
        </div>
        {step > 1 && step < 3 && (
          <button className="action-btn" onClick={resetUpload}>
            <X size={16} /> Start Over
          </button>
        )}
      </div>

      <div className="upload-content">
        {/* Step Indicator */}
        <div className="upload-steps">
          <div className={`upload-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-num">{step > 1 ? <Check size={14} /> : '1'}</div>
            <span>Upload File</span>
          </div>
          <div className="step-line" />
          <div className={`upload-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-num">{step > 2 ? <Check size={14} /> : '2'}</div>
            <span>Preview & Map</span>
          </div>
          <div className="step-line" />
          <div className={`upload-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-num">3</div>
            <span>Complete</span>
          </div>
        </div>

        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="upload-step-content">
            <div className="upload-options">
              <div className="option-card">
                <h4>Import Type</h4>
                <div className="import-type-selector">
                  <button 
                    className={`import-type-btn ${importType === 'content' ? 'active' : ''}`}
                    onClick={() => setImportType('content')}
                  >
                    <Layers size={18} />
                    <span>Content Ideas</span>
                    <p>Import to content bank</p>
                  </button>
                  <button 
                    className={`import-type-btn ${importType === 'briefs' ? 'active' : ''}`}
                    onClick={() => setImportType('briefs')}
                  >
                    <FileText size={18} />
                    <span>Content Briefs</span>
                    <p>Import detailed briefs</p>
                  </button>
                </div>
              </div>

              <div className="option-card">
                <h4>Select Client</h4>
                <div className="client-selector">
                  {clients.map(client => (
                    <button
                      key={client.id}
                      className={`client-select-btn ${selectedClient === client.id ? 'active' : ''}`}
                      onClick={() => setSelectedClient(client.id)}
                      style={selectedClient === client.id ? { borderColor: client.color, background: `${client.color}10` } : {}}
                    >
                      <span className="client-select-dot" style={{ background: client.color }} />
                      {client.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div 
              className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv,.pdf"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <div className="upload-zone-content">
                <div className="upload-icon">
                  <Upload size={32} />
                </div>
                <h3>Drop your file here</h3>
                <p>or click to browse</p>
                <div className="supported-formats">
                  <span><FileText size={14} /> Excel (.xlsx, .csv)</span>
                  <span><FileText size={14} /> PDF</span>
                </div>
              </div>
            </div>

            <div className="upload-templates">
              <h4>Download Templates</h4>
              <div className="template-links">
                <button className="template-btn">
                  <FileText size={16} />
                  Content Bank Template (.xlsx)
                </button>
                <button className="template-btn">
                  <FileText size={16} />
                  Content Brief Template (.xlsx)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Processing Overlay */}
        {processing && (
          <div className="processing-overlay">
            <div className="processing-content">
              <div className="processing-spinner" />
              <h3>AI is processing your file...</h3>
              <p>Extracting and mapping data</p>
            </div>
          </div>
        )}

        {/* Step 2: Preview & Map */}
        {step === 2 && parsedData && (
          <div className="upload-step-content">
            <div className="parsed-info">
              <div className="parsed-file">
                <FileText size={20} />
                <div>
                  <span className="file-name">{parsedData.fileName}</span>
                  <span className="file-meta">
                    {parsedData.source.toUpperCase()} • {mappedData.length} items detected
                  </span>
                </div>
              </div>
              <div className="ai-badge">
                <Sparkles size={14} />
                AI Parsed
              </div>
            </div>

            <div className="preview-table-container">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    {importType === 'content' ? (
                      <>
                        <th>Idea</th>
                        <th style={{ width: '100px' }}>Type</th>
                        <th style={{ width: '100px' }}>Stage</th>
                        <th style={{ width: '100px' }}>Priority</th>
                        <th style={{ width: '140px' }}>Platforms</th>
                        <th style={{ width: '120px' }}>Schedule</th>
                      </>
                    ) : (
                      <>
                        <th>Concept</th>
                        <th>Explanation</th>
                        <th style={{ width: '100px' }}>Type</th>
                        <th style={{ width: '140px' }}>Mood</th>
                      </>
                    )}
                    <th style={{ width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {mappedData.map((row, index) => (
                    <tr key={index}>
                      <td className="row-num">{index + 1}</td>
                      {importType === 'content' ? (
                        <>
                          <td>
                            <input 
                              type="text" 
                              value={row.idea || ''} 
                              onChange={(e) => updateMappedRow(index, 'idea', e.target.value)}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <select 
                              value={row.type || 'photo'} 
                              onChange={(e) => updateMappedRow(index, 'type', e.target.value)}
                              className="table-select"
                            >
                              <option value="video">Video</option>
                              <option value="photo">Photo</option>
                              <option value="carousel">Carousel</option>
                              <option value="reel">Reel</option>
                              <option value="story">Story</option>
                            </select>
                          </td>
                          <td>
                            <select 
                              value={row.stage || 'idea'} 
                              onChange={(e) => updateMappedRow(index, 'stage', e.target.value)}
                              className="table-select"
                            >
                              <option value="idea">Idea</option>
                              <option value="execution">Execution</option>
                              <option value="approval">Approval</option>
                              <option value="ready">Ready</option>
                            </select>
                          </td>
                          <td>
                            <select 
                              value={row.priority || 'medium'} 
                              onChange={(e) => updateMappedRow(index, 'priority', e.target.value)}
                              className="table-select"
                            >
                              <option value="urgent">Urgent</option>
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                            </select>
                          </td>
                          <td>
                            <input 
                              type="text" 
                              value={row.platforms || ''} 
                              onChange={(e) => updateMappedRow(index, 'platforms', e.target.value)}
                              className="table-input"
                              placeholder="instagram, facebook"
                            />
                          </td>
                          <td>
                            <input 
                              type="date" 
                              value={row.scheduledFor || ''} 
                              onChange={(e) => updateMappedRow(index, 'scheduledFor', e.target.value)}
                              className="table-input"
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <input 
                              type="text" 
                              value={row.concept || ''} 
                              onChange={(e) => updateMappedRow(index, 'concept', e.target.value)}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input 
                              type="text" 
                              value={row.explanation || ''} 
                              onChange={(e) => updateMappedRow(index, 'explanation', e.target.value)}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <select 
                              value={row.contentType || 'campaign'} 
                              onChange={(e) => updateMappedRow(index, 'contentType', e.target.value)}
                              className="table-select"
                            >
                              <option value="video">Video</option>
                              <option value="photo">Photo</option>
                              <option value="carousel">Carousel</option>
                              <option value="reel">Reel</option>
                              <option value="campaign">Campaign</option>
                            </select>
                          </td>
                          <td>
                            <input 
                              type="text" 
                              value={row.mood || ''} 
                              onChange={(e) => updateMappedRow(index, 'mood', e.target.value)}
                              className="table-input"
                              placeholder="e.g., warm, energetic"
                            />
                          </td>
                        </>
                      )}
                      <td>
                        <button className="remove-row-btn" onClick={() => removeRow(index)}>
                          <X size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="preview-actions">
              <button className="action-btn" onClick={resetUpload}>
                Cancel
              </button>
              <button className="action-btn primary" onClick={handleImport}>
                <Check size={16} />
                Import {mappedData.length} Items
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <div className="upload-step-content">
            <div className="upload-success">
              <div className="success-icon">
                <CheckCircle2 size={48} />
              </div>
              <h2>Import Complete!</h2>
              <p>{mappedData.length} items have been added to your {importType === 'content' ? 'content bank' : 'content briefs'}.</p>
              <div className="success-actions">
                <button className="action-btn" onClick={resetUpload}>
                  <Plus size={16} />
                  Import More
                </button>
                <button className="action-btn primary">
                  <ArrowRight size={16} />
                  View {importType === 'content' ? 'Pipeline' : 'Briefs'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============ MAIN APP ============
export default function SocialMediaTracker() {
  const [db, setDb] = useState(initialDB);
  const [activeView, setActiveView] = useState('problems');
  const [selectedClient, setSelectedClient] = useState(null);

  // Calculate problem count for nav badge
  const today = new Date('2025-01-17');
  const problemCount = (() => {
    const overdueTasks = db.tasks.filter(t => new Date(t.deadline) < today && t.status !== 'done').length;
    const missedPosts = db.contentBank.filter(c => c.scheduledFor && c.stage !== 'posted' && new Date(c.scheduledFor) < today).length;
    const urgentItems = db.contentBank.filter(c => c.priority === 'urgent' && c.stage !== 'posted').length;
    const pendingApprovals = db.contentBank.filter(c => c.stage === 'approval').length;
    return overdueTasks + missedPosts + urgentItems + pendingApprovals;
  })();

  const renderView = () => {
    switch (activeView) {
      case 'problems': return <ProblemsView db={db} clients={db.clients} setDb={setDb} setActiveView={setActiveView} setSelectedClient={setSelectedClient} />;
      case 'pipeline': return <PipelineView db={db} clients={db.clients} selectedClient={selectedClient} setDb={setDb} />;
      case 'calendar': return <CalendarView db={db} clients={db.clients} selectedClient={selectedClient} setDb={setDb} />;
      case 'analytics': return <AnalyticsView db={db} clients={db.clients} selectedClient={selectedClient} />;
      case 'team': return <TeamView db={db} clients={db.clients} setDb={setDb} />;
      case 'client': return <ClientDetailsView db={db} setDb={setDb} selectedClient={selectedClient} setSelectedClient={setSelectedClient} />;
      case 'clients': return <ClientsListView db={db} setDb={setDb} setSelectedClient={setSelectedClient} setActiveView={setActiveView} />;
      case 'upload': return <BulkUploadView db={db} setDb={setDb} clients={db.clients} />;
      default: return <ChatView db={db} />;
    }
  };

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .app-container { min-height: 100vh; background: #FAFAFA; font-family: 'DM Sans', sans-serif; color: #1F2937; display: flex; overflow: hidden; }
        
        /* SIDEBAR */
        .sidebar { width: 220px; background: #FFFFFF; border-right: 1px solid #E5E7EB; padding: 16px 10px; display: flex; flex-direction: column; flex-shrink: 0; }
        .logo-section { padding: 0 10px; margin-bottom: 24px; }
        .logo { font-size: 1.15rem; font-weight: 700; color: #111827; }
        .tagline { font-size: 0.65rem; color: #9CA3AF; margin-top: 2px; }
        .nav-section { margin-bottom: 24px; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px; cursor: pointer; transition: all 0.15s; color: #6B7280; font-size: 0.85rem; font-weight: 500; }
        .nav-item:hover { background: #F3F4F6; color: #374151; }
        .nav-item.active { background: #F3F4F6; color: #111827; }
        .nav-item.has-problems { color: #DC2626; }
        .nav-item.has-problems:hover { color: #B91C1C; }
        .nav-item.has-problems.active { color: #DC2626; background: #FEE2E2; }
        .nav-problem-badge { background: #DC2626; color: #FFFFFF; font-size: 0.65rem; font-weight: 600; padding: 2px 6px; border-radius: 8px; margin-left: auto; }
        .section-title { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 1px; color: #9CA3AF; padding: 0 10px; margin-bottom: 8px; font-weight: 600; }

        /* PROBLEMS VIEW */
        .problems-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .problems-view .view-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; border-bottom: 1px solid #E5E7EB; background: #FFFFFF; }
        .problems-total-count { background: #DC2626; color: #FFFFFF; font-size: 0.7rem; font-weight: 600; padding: 3px 8px; border-radius: 10px; margin-left: 6px; }
        .problems-summary .all-clear { color: #059669; font-size: 0.8rem; font-weight: 500; }
        .problems-summary .issues-found { color: #DC2626; font-size: 0.8rem; font-weight: 500; }
        .problems-content { flex: 1; overflow-y: auto; padding: 16px; background: #F9FAFB; }
        .no-problems { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #059669; text-align: center; }
        .no-problems svg { margin-bottom: 16px; opacity: 0.6; }
        .no-problems h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 8px; }
        .no-problems p { font-size: 0.9rem; color: #6B7280; }
        .problems-grid { display: flex; flex-direction: column; gap: 16px; }
        
        .problem-section { background: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; }
        .problem-section.urgent { border-left: 4px solid #DC2626; }
        .problem-section.warning { border-left: 4px solid #F59E0B; }
        .problem-section.info { border-left: 4px solid #3B82F6; }
        .problem-section-header { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #F3F4F6; }
        .problem-icon { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .problem-icon.urgent { background: #FEE2E2; color: #DC2626; }
        .problem-icon.warning { background: #FEF3C7; color: #D97706; }
        .problem-icon.info { background: #DBEAFE; color: #2563EB; }
        .problem-section-header h3 { flex: 1; font-size: 0.85rem; font-weight: 600; color: #111827; }
        .problem-count { background: #F3F4F6; color: #374151; font-size: 0.7rem; font-weight: 600; padding: 3px 8px; border-radius: 10px; }
        
        .problem-items { padding: 10px; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; }
        .problem-item { display: flex; flex-direction: column; padding: 0; border-radius: 8px; border: 1px solid #F3F4F6; background: #FAFAFA; transition: all 0.2s; cursor: pointer; overflow: hidden; }
        .problem-item:hover { background: #F3F4F6; border-color: #E5E7EB; }
        .problem-item.expanded { grid-column: 1 / -1; background: #FFFFFF; border-color: #D1D5DB; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .problem-item-compact { padding: 12px; }
        .problem-item-main { flex: 1; }
        .problem-item-header { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; flex-wrap: wrap; }
        .problem-client { font-size: 0.6rem; font-weight: 600; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
        .problem-overdue { font-size: 0.6rem; font-weight: 600; color: #DC2626; background: #FEE2E2; padding: 2px 6px; border-radius: 4px; }
        .problem-waiting { font-size: 0.6rem; font-weight: 500; color: #6B7280; }
        .problem-stalled { font-size: 0.6rem; font-weight: 500; color: #D97706; background: #FEF3C7; padding: 2px 6px; border-radius: 4px; }
        .problem-priority { font-size: 0.55rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
        .problem-priority.urgent { background: #DC2626; color: #FFFFFF; }
        .problem-item-title { font-size: 0.8rem; font-weight: 500; color: #111827; margin-bottom: 6px; line-height: 1.4; }
        .problem-item:not(.expanded) .problem-item-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .problem-item-meta { display: flex; flex-wrap: wrap; gap: 8px; }
        .problem-type { display: flex; align-items: center; gap: 3px; font-size: 0.65rem; color: #6B7280; }
        .problem-stage { font-size: 0.65rem; color: #6B7280; text-transform: capitalize; }
        .problem-date { display: flex; align-items: center; gap: 3px; font-size: 0.65rem; color: #6B7280; }
        .problem-teams { font-size: 0.65rem; color: #6B7280; }
        .problem-assignee { display: flex; align-items: center; gap: 4px; font-size: 0.65rem; color: #6B7280; }
        .assignee-avatar { width: 16px; height: 16px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 0.5rem; font-weight: 600; }
        
        .problem-item-actions { padding: 8px 12px; border-top: 1px solid #F3F4F6; }
        .problem-action-btn { display: flex; align-items: center; justify-content: center; gap: 4px; width: 100%; padding: 6px 10px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.7rem; font-weight: 500; color: #374151; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .problem-action-btn:hover { background: #F3F4F6; border-color: #D1D5DB; }
        .problem-action-btn.complete { color: #059669; border-color: #A7F3D0; background: #ECFDF5; }
        .problem-action-btn.complete:hover { background: #D1FAE5; }
        .problem-action-btn.approve { color: #2563EB; border-color: #BFDBFE; background: #EFF6FF; }
        .problem-action-btn.approve:hover { background: #DBEAFE; }
        
        /* Expanded Problem Card */
        .problem-item-expanded { padding: 16px; border-top: 1px solid #E5E7EB; background: #F9FAFB; }
        .expanded-section { margin-bottom: 16px; }
        .expanded-section:last-child { margin-bottom: 0; }
        .expanded-section h4 { font-size: 0.75rem; font-weight: 600; color: #374151; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .expanded-details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .detail-row { display: flex; justify-content: space-between; font-size: 0.75rem; padding: 6px 10px; background: #FFFFFF; border-radius: 6px; border: 1px solid #E5E7EB; }
        .detail-row span:first-child { color: #6B7280; }
        .detail-row span:last-child { color: #111827; font-weight: 500; }
        .status-tag { padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; text-transform: capitalize; }
        .status-tag.execution { background: #DBEAFE; color: #2563EB; }
        .status-tag.approval { background: #F3E8FF; color: #7C3AED; }
        .status-tag.ready { background: #D1FAE5; color: #059669; }
        .status-tag.pending, .status-tag.in-progress { background: #FEF3C7; color: #D97706; }
        .priority-tag { padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; text-transform: capitalize; }
        .priority-tag.urgent { background: #FEE2E2; color: #DC2626; }
        .priority-tag.high { background: #FEF3C7; color: #D97706; }
        .priority-tag.medium { background: #DBEAFE; color: #2563EB; }
        .priority-tag.low { background: #F3F4F6; color: #6B7280; }
        .expanded-platforms { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .platform-mini { font-size: 0.65rem; padding: 3px 8px; border-radius: 4px; text-transform: capitalize; }
        .platform-mini.instagram { background: #FCE7F3; color: #DB2777; }
        .platform-mini.facebook { background: #DBEAFE; color: #2563EB; }
        .platform-mini.twitter { background: #E0F2FE; color: #0284C7; }
        .platform-mini.linkedin { background: #DBEAFE; color: #1D4ED8; }
        .platform-mini.tiktok { background: #F3F4F6; color: #111827; }
        .platform-mini.youtube { background: #FEE2E2; color: #DC2626; }
        
        .expanded-notes { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; max-height: 150px; overflow-y: auto; }
        .expanded-note { display: flex; gap: 8px; }
        .note-avatar { width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 0.6rem; font-weight: 600; flex-shrink: 0; }
        .note-body { flex: 1; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 6px; padding: 8px 10px; }
        .note-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .note-header span:first-child { font-size: 0.7rem; font-weight: 600; color: #111827; }
        .note-header span:last-child { font-size: 0.6rem; color: #9CA3AF; }
        .note-body p { font-size: 0.75rem; color: #374151; margin: 0; line-height: 1.4; }
        
        .add-note-inline { display: flex; gap: 6px; }
        .add-note-inline select { flex: 0 0 120px; padding: 6px 8px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.7rem; font-family: inherit; }
        .add-note-inline input { flex: 1; padding: 6px 10px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.75rem; font-family: inherit; }
        .add-note-inline input::placeholder { color: #9CA3AF; }
        .add-note-inline button { padding: 6px 10px; background: #111827; border: none; border-radius: 6px; color: #FFFFFF; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .add-note-inline button:disabled { opacity: 0.5; cursor: not-allowed; }
        .add-note-inline button:hover:not(:disabled) { background: #1F2937; }
        
        .expanded-actions { display: flex; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #E5E7EB; }
        .expanded-actions .problem-action-btn { flex: 1; }
        
        .problem-item.workload { padding: 12px; }
        .workload-member { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .workload-avatar { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: 600; font-size: 0.75rem; }
        .workload-info { display: flex; flex-direction: column; }
        .workload-name { font-size: 0.8rem; font-weight: 600; color: #111827; }
        .workload-role { font-size: 0.65rem; color: #6B7280; }
        .workload-stats { display: flex; gap: 6px; flex-wrap: wrap; }
        .workload-stat { font-size: 0.65rem; font-weight: 500; padding: 3px 8px; border-radius: 4px; }
        .workload-stat.active { background: #FEF3C7; color: #D97706; }
        .workload-stat.overdue { background: #FEE2E2; color: #DC2626; }

        /* CLIENT DROPDOWN */
        .client-dropdown { position: relative; }
        .dropdown-trigger { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.8rem; color: #374151; cursor: pointer; font-family: inherit; min-width: 160px; }
        .dropdown-trigger:hover { border-color: #D1D5DB; background: #F9FAFB; }
        .dropdown-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .dropdown-text { flex: 1; text-align: left; }
        .dropdown-chevron { color: #9CA3AF; transition: transform 0.2s; }
        .dropdown-chevron.open { transform: rotate(180deg); }
        .dropdown-menu { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 10px; box-shadow: 0 10px 40px rgba(0,0,0,0.12); z-index: 100; overflow: hidden; min-width: 220px; }
        .dropdown-search { padding: 8px; border-bottom: 1px solid #E5E7EB; display: flex; align-items: center; gap: 8px; }
        .dropdown-search svg { color: #9CA3AF; flex-shrink: 0; }
        .dropdown-search input { flex: 1; border: none; outline: none; font-size: 0.8rem; color: #111827; font-family: inherit; background: transparent; }
        .dropdown-search input::placeholder { color: #9CA3AF; }
        .dropdown-options { max-height: 240px; overflow-y: auto; padding: 4px; }
        .dropdown-option { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 6px; cursor: pointer; transition: all 0.1s; }
        .dropdown-option:hover { background: #F3F4F6; }
        .dropdown-option.selected { background: #EFF6FF; }
        .dropdown-option span { font-size: 0.8rem; color: #374151; }
        .dropdown-industry { color: #9CA3AF !important; font-size: 0.7rem !important; margin-left: auto; }
        .dropdown-empty { padding: 20px; text-align: center; font-size: 0.8rem; color: #9CA3AF; }

        /* CLIENTS LIST VIEW */
        .clients-list-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .search-box { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; }
        .search-box svg { color: #9CA3AF; }
        .search-box input { border: none; outline: none; background: transparent; font-size: 0.8rem; color: #111827; font-family: inherit; width: 160px; }
        .search-box input::placeholder { color: #9CA3AF; }
        .clients-grid { flex: 1; padding: 20px; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; align-content: start; }
        .client-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.15s; }
        .client-card:hover { border-color: #D1D5DB; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transform: translateY(-2px); }
        .client-card.add-card { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; border-style: dashed; color: #9CA3AF; min-height: 200px; }
        .client-card.add-card:hover { border-color: #6B7280; color: #6B7280; background: #F9FAFB; }
        .client-card.add-card span { font-size: 0.85rem; font-weight: 500; }
        .client-card-header { display: flex; gap: 14px; margin-bottom: 12px; }
        .client-card-logo { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: 700; font-size: 1rem; flex-shrink: 0; }
        .client-card-info h3 { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 2px; }
        .client-card-industry { font-size: 0.7rem; color: #6B7280; background: #F3F4F6; padding: 2px 8px; border-radius: 8px; }
        .client-card-desc { font-size: 0.8rem; color: #6B7280; line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .client-card-stats { display: flex; gap: 20px; padding: 12px 0; border-top: 1px solid #F3F4F6; border-bottom: 1px solid #F3F4F6; margin-bottom: 12px; }
        .client-card-stat { text-align: center; }
        .client-card-stat .stat-num { font-size: 1.25rem; font-weight: 700; color: #111827; display: block; }
        .client-card-stat .stat-label { font-size: 0.65rem; color: #9CA3AF; }
        .client-card-footer { }
        .client-card-link { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: #6B7280; text-decoration: none; }
        .client-card-link:hover { color: #111827; }

        /* ADD CLIENT MODAL */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 200; }
        .add-client-modal { background: #FFFFFF; border-radius: 16px; width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto; }
        .add-client-modal .modal-header { padding: 20px 24px; border-bottom: 1px solid #E5E7EB; display: flex; justify-content: space-between; align-items: center; }
        .add-client-modal .modal-header h3 { font-size: 1.1rem; font-weight: 600; color: #111827; }
        .add-client-modal .modal-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
        .add-client-modal .modal-footer { padding: 16px 24px; border-top: 1px solid #E5E7EB; display: flex; justify-content: flex-end; gap: 10px; }
        .color-picker { display: flex; gap: 8px; flex-wrap: wrap; }
        .color-option { width: 32px; height: 32px; border-radius: 8px; border: 2px solid transparent; cursor: pointer; transition: all 0.15s; }
        .color-option:hover { transform: scale(1.1); }
        .color-option.selected { border-color: #111827; box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #111827; }

        /* MAIN */
        .main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .view-header { padding: 14px 20px; background: #FFFFFF; border-bottom: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .view-title { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: 600; color: #111827; }
        .view-title svg { color: #6B7280; }
        .view-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .team-count { font-size: 0.7rem; color: #9CA3AF; background: #F3F4F6; padding: 3px 8px; border-radius: 10px; }
        .action-btn { display: flex; align-items: center; gap: 5px; padding: 7px 12px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 6px; color: #6B7280; font-size: 0.75rem; font-weight: 500; cursor: pointer; font-family: inherit; }
        .action-btn:hover { background: #F9FAFB; }
        .action-btn.primary { background: #111827; border-color: #111827; color: #FFFFFF; }

        /* CLIENT DETAILS */
        .client-details-view { flex: 1; overflow-y: auto; }
        .no-client { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #9CA3AF; }
        .no-client svg { margin-bottom: 12px; opacity: 0.4; }
        .no-client h3 { color: #6B7280; margin-bottom: 4px; }
        
        .client-header { background: #FFFFFF; border-bottom: 1px solid #E5E7EB; padding: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
        .client-hero { display: flex; gap: 20px; }
        .client-logo { width: 72px; height: 72px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: 700; font-size: 1.5rem; }
        .client-info h1 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 4px; }
        .client-industry-tag { font-size: 0.7rem; background: #F3F4F6; color: #6B7280; padding: 4px 10px; border-radius: 12px; font-weight: 500; }
        .client-desc { font-size: 0.85rem; color: #6B7280; margin-top: 8px; max-width: 400px; line-height: 1.5; }
        .client-links { display: flex; gap: 16px; margin-top: 12px; }
        .client-link { font-size: 0.75rem; color: #6B7280; text-decoration: none; display: flex; align-items: center; gap: 4px; }
        .client-link:hover { color: #111827; }
        .client-stats { display: flex; gap: 24px; }
        .client-stat { text-align: center; }
        .client-stat .stat-num { font-size: 1.75rem; font-weight: 700; color: #111827; display: block; }
        .client-stat .stat-label { font-size: 0.65rem; color: #9CA3AF; text-transform: uppercase; }

        .client-tabs { background: #FFFFFF; border-bottom: 1px solid #E5E7EB; padding: 0 24px; display: flex; gap: 4px; }
        .tab-btn { padding: 12px 16px; background: none; border: none; font-size: 0.85rem; font-weight: 500; color: #6B7280; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; font-family: inherit; }
        .tab-btn:hover { color: #374151; }
        .tab-btn.active { color: #111827; border-bottom-color: #111827; }

        .briefs-section { padding: 24px; }

        /* BRIEF CREATOR */
        .brief-creator { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
        .creator-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #F3F4F6; }
        .creator-header h3 { font-size: 1rem; font-weight: 600; color: #111827; }
        .close-btn { background: none; border: none; color: #9CA3AF; cursor: pointer; padding: 4px; }
        .close-btn:hover { color: #6B7280; }

        .creator-form { display: flex; flex-direction: column; gap: 20px; }
        .form-row { display: flex; gap: 16px; }
        .form-row.two-col .form-group { flex: 1; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group.full { flex: 1; }
        .form-group label { font-size: 0.75rem; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px; }
        .form-group input, .form-group textarea, .form-group select { padding: 10px 12px; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.85rem; font-family: inherit; color: #111827; resize: none; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #9CA3AF; }
        .form-group input::placeholder, .form-group textarea::placeholder { color: #9CA3AF; }

        .type-selector { display: flex; flex-wrap: wrap; gap: 6px; }
        .type-btn { display: flex; align-items: center; gap: 5px; padding: 8px 12px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.75rem; color: #6B7280; cursor: pointer; font-family: inherit; text-transform: capitalize; }
        .type-btn:hover { border-color: #D1D5DB; }
        .type-btn.active { background: #111827; border-color: #111827; color: #FFFFFF; }

        .category-selector { display: flex; gap: 8px; }
        .category-btn { display: flex; align-items: center; gap: 6px; padding: 10px 16px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.8rem; color: #6B7280; cursor: pointer; font-family: inherit; flex: 1; justify-content: center; }
        .category-btn:hover { border-color: #D1D5DB; }
        .category-btn.active.trending { background: #FEF3C7; border-color: #F59E0B; color: #D97706; }
        .category-btn.active.general { background: #DBEAFE; border-color: #3B82F6; color: #2563EB; }

        .mood-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .mood-tag { padding: 6px 12px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 16px; font-size: 0.7rem; color: #6B7280; cursor: pointer; font-family: inherit; }
        .mood-tag:hover { border-color: #D1D5DB; }
        .mood-tag.active { background: #111827; border-color: #111827; color: #FFFFFF; }

        .references-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .reference-item { display: flex; align-items: center; gap: 6px; padding: 6px 10px; background: #F3F4F6; border-radius: 6px; font-size: 0.75rem; color: #374151; }
        .reference-item button { background: none; border: none; color: #9CA3AF; cursor: pointer; padding: 2px; }
        .add-reference-btn { display: flex; align-items: center; gap: 4px; padding: 6px 12px; background: none; border: 1px dashed #D1D5DB; border-radius: 6px; font-size: 0.75rem; color: #6B7280; cursor: pointer; font-family: inherit; }
        .add-reference-btn:hover { border-color: #9CA3AF; color: #374151; }

        .teams-selector { display: flex; flex-wrap: wrap; gap: 8px; }
        .team-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.75rem; color: #6B7280; cursor: pointer; font-family: inherit; }
        .team-btn:hover { border-color: #D1D5DB; }
        .team-btn.active { background: transparent; }

        .form-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 16px; border-top: 1px solid #F3F4F6; }
        .cancel-btn { padding: 10px 20px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.85rem; color: #6B7280; cursor: pointer; font-family: inherit; }
        .save-btn { display: flex; align-items: center; gap: 6px; padding: 10px 20px; background: #111827; border: none; border-radius: 8px; font-size: 0.85rem; color: #FFFFFF; cursor: pointer; font-family: inherit; }
        .save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* BRIEFS GRID */
        .briefs-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .briefs-header h2 { font-size: 1.1rem; font-weight: 600; color: #111827; display: flex; align-items: center; gap: 8px; }
        .briefs-count { font-size: 0.75rem; font-weight: 500; color: #9CA3AF; }
        .briefs-actions { display: flex; align-items: center; gap: 10px; }
        
        /* Filter Dropdown */
        .filter-dropdown { position: relative; }
        .filter-trigger { display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.8rem; color: #6B7280; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .filter-trigger:hover { border-color: #D1D5DB; background: #F9FAFB; }
        .filter-trigger.has-filters { border-color: #3B82F6; background: #EFF6FF; color: #3B82F6; }
        .filter-badge { background: #3B82F6; color: #FFFFFF; font-size: 0.65rem; font-weight: 600; padding: 2px 6px; border-radius: 10px; margin-left: 2px; }
        .filter-chevron { transition: transform 0.2s; color: #9CA3AF; }
        .filter-chevron.open { transform: rotate(180deg); }
        .filter-menu { position: absolute; top: calc(100% + 6px); right: 0; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.12); z-index: 100; min-width: 240px; overflow: hidden; }
        .filter-section { padding: 12px 14px; border-bottom: 1px solid #F3F4F6; }
        .filter-section:last-child { border-bottom: none; }
        .filter-section label { font-size: 0.65rem; font-weight: 600; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px; }
        .filter-options { display: flex; flex-wrap: wrap; gap: 6px; }
        .filter-option { display: flex; align-items: center; gap: 5px; padding: 6px 10px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.75rem; color: #6B7280; cursor: pointer; font-family: inherit; text-transform: capitalize; transition: all 0.15s; }
        .filter-option:hover { border-color: #D1D5DB; background: #F3F4F6; }
        .filter-option.active { background: #111827; border-color: #111827; color: #FFFFFF; }
        .filter-option .status-dot { width: 8px; height: 8px; border-radius: 50%; }
        .filter-option .status-dot.pending { background: #F59E0B; }
        .filter-option .status-dot.in-progress { background: #3B82F6; }
        .filter-option .status-dot.approved { background: #10B981; }
        .filter-footer { padding: 10px 14px; background: #F9FAFB; border-top: 1px solid #E5E7EB; }
        .clear-filters-btn { display: flex; align-items: center; gap: 6px; padding: 6px 10px; background: none; border: none; font-size: 0.75rem; color: #DC2626; cursor: pointer; font-family: inherit; }
        .clear-filters-btn:hover { text-decoration: underline; }
        
        /* Active Filters */
        .active-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .active-filter-tag { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 6px; font-size: 0.75rem; color: #2563EB; }
        .active-filter-tag button { background: none; border: none; color: #3B82F6; cursor: pointer; padding: 0; display: flex; align-items: center; }
        .active-filter-tag button:hover { color: #1D4ED8; }
        
        /* Status Tabs */
        .status-tabs { display: flex; gap: 6px; margin-bottom: 20px; padding: 4px; background: #F3F4F6; border-radius: 10px; width: fit-content; }
        .status-tab { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: transparent; border: none; border-radius: 8px; font-size: 0.8rem; font-weight: 500; color: #6B7280; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .status-tab:hover { color: #374151; background: rgba(255,255,255,0.5); }
        .status-tab.active { background: #FFFFFF; color: #111827; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .status-tab-count { font-size: 0.7rem; font-weight: 600; padding: 2px 6px; border-radius: 10px; background: #E5E7EB; color: #6B7280; }
        .status-tab.active .status-tab-count { background: #111827; color: #FFFFFF; }
        .status-dot-sm { width: 8px; height: 8px; border-radius: 50%; }
        .status-dot-sm.pending { background: #F59E0B; }
        .status-dot-sm.in-progress { background: #3B82F6; }
        .status-dot-sm.approved { background: #10B981; }
        
        /* No Briefs Message */
        .no-briefs-message { grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; background: #F9FAFB; border-radius: 12px; border: 1px dashed #E5E7EB; color: #9CA3AF; text-align: center; }
        .no-briefs-message svg { margin-bottom: 12px; opacity: 0.4; }
        .no-briefs-message h4 { font-size: 1rem; font-weight: 600; color: #6B7280; margin-bottom: 4px; }
        .no-briefs-message p { font-size: 0.85rem; color: #9CA3AF; margin-bottom: 12px; }
        .clear-filters-inline { padding: 8px 16px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.8rem; color: #374151; cursor: pointer; font-family: inherit; }
        .clear-filters-inline:hover { background: #F3F4F6; }
        
        .briefs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        .brief-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.15s; }
        .brief-card:hover { border-color: #D1D5DB; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .brief-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .brief-status { font-size: 0.65rem; font-weight: 600; padding: 3px 8px; border-radius: 10px; text-transform: capitalize; }
        .brief-status.pending { background: #FEF3C7; color: #D97706; }
        .brief-status.in-progress { background: #DBEAFE; color: #2563EB; }
        .brief-status.approved { background: #D1FAE5; color: #059669; }
        .brief-category { display: flex; align-items: center; gap: 4px; font-size: 0.65rem; color: #6B7280; }
        .brief-category.trending { color: #F59E0B; }
        .brief-card h3 { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 8px; }
        .brief-card p { font-size: 0.8rem; color: #6B7280; line-height: 1.5; margin-bottom: 12px; }
        .brief-meta { display: flex; gap: 12px; margin-bottom: 12px; }
        .brief-type, .brief-teams { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #9CA3AF; }
        .brief-notes-count { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #3B82F6; margin-left: auto; }
        .brief-mood-tags { display: flex; gap: 4px; flex-wrap: wrap; }
        .mood-chip { font-size: 0.6rem; padding: 3px 8px; background: #F3F4F6; color: #6B7280; border-radius: 10px; }

        /* BRIEF MODAL */
        .brief-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .brief-modal { background: #FFFFFF; border-radius: 16px; width: 90%; max-width: 640px; max-height: 90vh; overflow-y: auto; }
        .modal-header { padding: 20px 24px; border-bottom: 1px solid #E5E7EB; display: flex; justify-content: space-between; align-items: flex-start; }
        .modal-title { display: flex; align-items: center; gap: 12px; }
        .modal-title h2 { font-size: 1.25rem; font-weight: 600; color: #111827; }
        .modal-content { padding: 24px; display: flex; flex-direction: column; gap: 24px; }
        .modal-section h4 { font-size: 0.7rem; font-weight: 600; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .modal-section p { font-size: 0.9rem; color: #374151; line-height: 1.6; }
        .modal-row { display: flex; gap: 24px; }
        .modal-row .modal-section { flex: 1; }
        .detail-tag { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: #F3F4F6; border-radius: 8px; font-size: 0.85rem; color: #374151; text-transform: capitalize; }
        .detail-tag.trending { background: #FEF3C7; color: #D97706; }
        .detail-tag.general { background: #DBEAFE; color: #2563EB; }
        .mood-text { font-size: 0.9rem; color: #374151; margin-bottom: 12px; }
        .mood-tags-display { display: flex; flex-wrap: wrap; gap: 6px; }
        .references-display { display: flex; flex-direction: column; gap: 8px; }
        .reference-link { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #F9FAFB; border-radius: 8px; font-size: 0.85rem; color: #374151; text-decoration: none; }
        .reference-link:hover { background: #F3F4F6; }
        .teams-display { display: flex; flex-wrap: wrap; gap: 8px; }
        .team-chip { font-size: 0.75rem; padding: 6px 12px; border-radius: 8px; border: 1px solid; font-weight: 500; }
        .music-display { display: flex; gap: 14px; padding: 16px; background: #F9FAFB; border-radius: 12px; }
        .music-icon { width: 48px; height: 48px; background: #FFFFFF; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #6B7280; }
        .music-info { flex: 1; }
        .music-type { font-size: 0.85rem; font-weight: 600; color: #111827; text-transform: capitalize; }
        .music-mood { font-size: 0.75rem; color: #6B7280; margin-left: 8px; }
        .music-reference { font-size: 0.8rem; color: #6B7280; margin-top: 4px; }

        /* WORKFLOW TRACKER */
        .workflow-section { background: #F9FAFB; border-radius: 12px; padding: 16px; margin-bottom: 8px; }
        .workflow-tracker { }
        .workflow-steps { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 4px; }
        .workflow-step { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; min-width: 60px; max-width: 90px; }
        .workflow-step .step-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #E5E7EB; color: #9CA3AF; transition: all 0.2s; }
        .workflow-step.completed .step-icon { background: #10B981; color: #FFFFFF; }
        .workflow-step.current .step-icon { background: #3B82F6; color: #FFFFFF; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2); }
        .workflow-step.pending .step-icon { background: #F3F4F6; color: #D1D5DB; }
        .workflow-step .step-label { font-size: 0.65rem; color: #6B7280; text-align: center; font-weight: 500; line-height: 1.2; }
        .workflow-step.completed .step-label { color: #059669; }
        .workflow-step.current .step-label { color: #2563EB; font-weight: 600; }
        .workflow-step.pending .step-label { color: #9CA3AF; }
        .workflow-step .current-indicator { font-size: 0.55rem; background: #DBEAFE; color: #2563EB; padding: 2px 6px; border-radius: 8px; font-weight: 600; }
        .workflow-connector { display: flex; align-items: center; justify-content: center; color: #D1D5DB; margin-top: 10px; }
        .workflow-connector.completed { color: #10B981; }
        .workflow-progress-bar { height: 4px; background: #E5E7EB; border-radius: 2px; overflow: hidden; }
        .workflow-progress-bar .progress-fill { height: 100%; background: linear-gradient(90deg, #10B981, #3B82F6); border-radius: 2px; transition: width 0.3s ease; }
        
        /* Workflow Step Clickable */
        .workflow-step { cursor: pointer; transition: all 0.15s; }
        .workflow-step:hover .step-icon { transform: scale(1.1); }
        .workflow-step.selected .step-icon { box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3); }
        
        /* Workflow Team Panel */
        .workflow-team-panel { margin-top: 16px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; animation: slideDown 0.2s ease; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .team-panel-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: #F9FAFB; border-bottom: 1px solid #E5E7EB; }
        .panel-step-info { display: flex; align-items: center; gap: 10px; }
        .panel-step-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; }
        .panel-step-info h5 { font-size: 0.85rem; font-weight: 600; color: #111827; margin: 0; }
        .panel-dept-name { font-size: 0.7rem; color: #6B7280; }
        .panel-close { background: none; border: none; color: #9CA3AF; cursor: pointer; padding: 4px; border-radius: 4px; }
        .panel-close:hover { background: #E5E7EB; color: #374151; }
        .team-panel-members { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .panel-member { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; transition: all 0.15s; }
        .panel-member:hover { background: #F3F4F6; }
        .panel-member-avatar { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: 600; font-size: 0.75rem; }
        .panel-member-info { flex: 1; }
        .panel-member-name { font-size: 0.85rem; font-weight: 500; color: #111827; display: block; }
        .panel-member-role { font-size: 0.7rem; color: #6B7280; }
        .panel-member-action { width: 32px; height: 32px; border-radius: 6px; border: 1px solid #E5E7EB; background: #FFFFFF; color: #6B7280; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .panel-member-action:hover { background: #3B82F6; border-color: #3B82F6; color: #FFFFFF; }
        .team-panel-status { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #FEF3C7; border-top: 1px solid #FDE68A; color: #92400E; font-size: 0.75rem; }
        .team-panel-status svg { flex-shrink: 0; }

        /* CONTENT SECTION */
        .content-section { padding: 24px; }
        .content-list { display: flex; flex-direction: column; gap: 8px; }
        .content-item { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 10px; }
        .content-item:hover { border-color: #D1D5DB; }
        .content-type-icon { width: 40px; height: 40px; background: #F3F4F6; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #6B7280; }
        .content-info { flex: 1; }
        .content-info p { font-size: 0.85rem; color: #111827; margin-bottom: 4px; }
        .content-stage { font-size: 0.65rem; padding: 3px 8px; border-radius: 10px; text-transform: capitalize; background: #F3F4F6; color: #6B7280; }
        .content-stage.posted { background: #D1FAE5; color: #059669; }
        .content-stage.ready { background: #DBEAFE; color: #2563EB; }
        .content-platforms { display: flex; gap: 6px; color: #9CA3AF; }

        /* CONTENT LIBRARY / IDEA BANK */
        .content-library-section { padding: 24px; }
        .library-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
        .library-title { display: flex; align-items: center; gap: 10px; }
        .library-title h2 { font-size: 1.1rem; font-weight: 600; color: #111827; margin: 0; }
        .library-count { font-size: 0.75rem; color: #6B7280; background: #F3F4F6; padding: 4px 10px; border-radius: 12px; }
        .library-actions { display: flex; align-items: center; gap: 10px; }
        .library-search { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; }
        .library-search svg { color: #9CA3AF; }
        .library-search input { border: none; outline: none; background: transparent; font-size: 0.8rem; color: #111827; font-family: inherit; width: 140px; }
        .library-search input::placeholder { color: #9CA3AF; }
        .type-filter-select { padding: 8px 12px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.8rem; color: #374151; font-family: inherit; cursor: pointer; text-transform: capitalize; }
        
        /* Add Idea Card */
        .add-idea-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
        .add-idea-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #F3F4F6; }
        .add-idea-header h3 { font-size: 0.95rem; font-weight: 600; color: #111827; margin: 0; }
        .add-idea-form { display: flex; flex-direction: column; gap: 14px; }
        .add-idea-form .form-group label { font-size: 0.7rem; font-weight: 600; color: #6B7280; text-transform: uppercase; margin-bottom: 6px; display: block; }
        .add-idea-form textarea { width: 100%; padding: 10px 12px; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.85rem; font-family: inherit; resize: none; }
        .add-idea-form textarea:focus { outline: none; border-color: #9CA3AF; }
        .add-idea-form select { width: 100%; padding: 10px 12px; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.85rem; font-family: inherit; }
        .platform-toggles { display: flex; gap: 6px; flex-wrap: wrap; }
        .platform-toggle { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; color: #9CA3AF; cursor: pointer; transition: all 0.15s; }
        .platform-toggle:hover { border-color: #D1D5DB; color: #6B7280; }
        .platform-toggle.active { background: #111827; border-color: #111827; color: #FFFFFF; }
        .platform-toggle .platform-text { font-size: 0.65rem; font-weight: 700; }
        .add-idea-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 10px; border-top: 1px solid #F3F4F6; }
        
        /* Ideas Grid */
        .ideas-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
        .idea-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 14px; transition: all 0.15s; }
        .idea-card:hover { border-color: #D1D5DB; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transform: translateY(-2px); }
        .idea-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .idea-type { display: flex; align-items: center; gap: 5px; font-size: 0.7rem; color: #6B7280; background: #F3F4F6; padding: 4px 8px; border-radius: 6px; text-transform: capitalize; }
        .priority-badge { font-size: 0.6rem; font-weight: 600; padding: 3px 8px; border-radius: 10px; text-transform: capitalize; }
        .priority-badge.high { background: #FEE2E2; color: #DC2626; }
        .priority-badge.medium { background: #FEF3C7; color: #D97706; }
        .priority-badge.low { background: #E5E7EB; color: #6B7280; }
        .priority-badge.urgent { background: #DC2626; color: #FFFFFF; }
        .idea-text { font-size: 0.85rem; color: #374151; line-height: 1.5; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .idea-platforms { display: flex; gap: 6px; margin-bottom: 12px; }
        .idea-platforms .platform-icon { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background: #F3F4F6; border-radius: 6px; color: #6B7280; }
        .idea-platforms .platform-icon.instagram { color: #E1306C; }
        .idea-platforms .platform-icon.facebook { color: #1877F2; }
        .idea-platforms .platform-icon.linkedin { color: #0A66C2; }
        .idea-platforms .platform-icon.twitter { color: #1DA1F2; }
        .idea-platforms .tt-icon { font-size: 0.55rem; font-weight: 700; }
        .idea-card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #F3F4F6; }
        .idea-date { display: flex; align-items: center; gap: 5px; font-size: 0.7rem; color: #9CA3AF; }
        .idea-actions { display: flex; gap: 6px; }
        .idea-action-btn { display: flex; align-items: center; gap: 4px; padding: 6px 10px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.7rem; color: #6B7280; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .idea-action-btn:hover { background: #F3F4F6; }
        .idea-action-btn.delete:hover { background: #FEE2E2; border-color: #FECACA; color: #DC2626; }
        .idea-action-btn.pick { background: #111827; border-color: #111827; color: #FFFFFF; }
        .idea-action-btn.pick:hover { background: #1F2937; }
        
        /* No Ideas Message */
        .no-ideas-message { grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; background: #F9FAFB; border-radius: 12px; border: 1px dashed #E5E7EB; color: #9CA3AF; text-align: center; }
        .no-ideas-message svg { margin-bottom: 12px; opacity: 0.4; }
        .no-ideas-message h4 { font-size: 1rem; font-weight: 600; color: #6B7280; margin-bottom: 4px; }
        .no-ideas-message p { font-size: 0.85rem; color: #9CA3AF; margin-bottom: 16px; }
        .add-idea-inline { display: flex; align-items: center; gap: 6px; padding: 10px 18px; background: #111827; border: none; border-radius: 8px; font-size: 0.85rem; color: #FFFFFF; cursor: pointer; font-family: inherit; }
        
        /* Picked Summary */
        .picked-summary { margin-top: 32px; padding: 20px; background: #F9FAFB; border-radius: 12px; }
        .picked-summary h3 { font-size: 0.9rem; font-weight: 600; color: #374151; margin-bottom: 4px; }
        .picked-summary-text { font-size: 0.75rem; color: #9CA3AF; margin-bottom: 14px; }
        .picked-ideas-list { display: flex; flex-direction: column; gap: 8px; }
        .picked-idea-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: #FFFFFF; border-radius: 8px; }
        .picked-idea-item .stage-badge { font-size: 0.6rem; font-weight: 600; padding: 3px 8px; border-radius: 8px; text-transform: capitalize; background: #E5E7EB; color: #6B7280; }
        .picked-idea-item .stage-badge.execution { background: #DBEAFE; color: #2563EB; }
        .picked-idea-item .stage-badge.approval { background: #FEF3C7; color: #D97706; }
        .picked-idea-item .stage-badge.ready { background: #D1FAE5; color: #059669; }
        .picked-idea-item .stage-badge.posted { background: #111827; color: #FFFFFF; }
        .picked-idea-text { font-size: 0.8rem; color: #374151; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .more-picked { font-size: 0.75rem; color: #6B7280; padding: 8px 12px; }

        /* CLIENT CALENDAR TAB */
        .client-calendar-tab { padding: 24px; }
        .calendar-tab-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .calendar-tab-layout { display: flex; gap: 24px; }
        .calendar-tab-main { flex: 1; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; }
        .calendar-tab-sidebar { width: 260px; flex-shrink: 0; }
        .calendar-body.compact { grid-template-rows: repeat(6, minmax(70px, 1fr)); }
        .calendar-body.compact .calendar-day { min-height: 70px; }
        .empty-text { font-size: 0.8rem; color: #9CA3AF; text-align: center; padding: 20px; }
        
        /* Calendar Legend */
        .calendar-legend { display: flex; gap: 16px; }
        .legend-item { display: flex; align-items: center; gap: 5px; font-size: 0.7rem; font-weight: 500; padding: 4px 10px; border-radius: 6px; }
        .legend-item.on-time { color: #059669; background: #D1FAE5; }
        .legend-item.late { color: #D97706; background: #FEF3C7; }
        .legend-item.missed { color: #DC2626; background: #FEE2E2; }
        
        /* Calendar Event Status */
        .day-event.post { display: flex; align-items: center; justify-content: space-between; gap: 4px; }
        .day-event .event-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
        .day-event .event-status-icon { flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; border-radius: 50%; }
        .day-event .event-status-icon.on-time { color: #059669; background: #D1FAE5; }
        .day-event .event-status-icon.late { color: #D97706; background: #FEF3C7; }
        .day-event .event-status-icon.missed { color: #DC2626; background: #FEE2E2; }
        .day-event .event-status-icon.due-today { color: #2563EB; background: #DBEAFE; }
        .day-event .event-status-icon.upcoming { display: none; }
        
        /* Event card background tints */
        .day-event.post.on-time { background: #ECFDF5; }
        .day-event.post.late { background: #FFFBEB; }
        .day-event.post.missed { background: #FEF2F2; border-left-color: #DC2626 !important; }
        .day-event.post.due-today { background: #EFF6FF; }

        /* TEAM VIEW */
        .team-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .team-layout { flex: 1; display: flex; overflow: hidden; }
        .team-list { width: 320px; background: #FFFFFF; border-right: 1px solid #E5E7EB; overflow-y: auto; }
        .dept-section { border-bottom: 1px solid #F3F4F6; }
        .dept-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; cursor: pointer; }
        .dept-header:hover { background: #FAFAFA; }
        .dept-info { display: flex; align-items: center; gap: 10px; }
        .dept-name { font-size: 0.8rem; font-weight: 600; color: #374151; }
        .dept-count { font-size: 0.65rem; background: #F3F4F6; color: #6B7280; padding: 2px 6px; border-radius: 8px; }
        .dept-meta { display: flex; align-items: center; gap: 10px; }
        .dept-tasks { font-size: 0.65rem; color: #9CA3AF; }
        .dept-chevron { color: #9CA3AF; transition: transform 0.2s; }
        .dept-chevron.expanded { transform: rotate(180deg); }
        .dept-members { padding: 4px 8px 12px; }
        .member-card { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; cursor: pointer; margin-bottom: 2px; }
        .member-card:hover { background: #F9FAFB; }
        .member-card.selected { background: #F3F4F6; }
        .member-avatar { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: 600; font-size: 0.7rem; }
        .member-info { flex: 1; }
        .member-name { font-size: 0.8rem; font-weight: 500; color: #111827; display: block; }
        .member-role { font-size: 0.65rem; color: #9CA3AF; }
        .member-stats { display: flex; gap: 4px; }
        .stat-badge { font-size: 0.6rem; font-weight: 700; padding: 2px 6px; border-radius: 6px; }
        .stat-badge.active { background: #DBEAFE; color: #2563EB; }
        .stat-badge.pending { background: #FEF3C7; color: #D97706; }
        .stat-badge.overdue { background: #FEE2E2; color: #DC2626; }
        .team-detail { flex: 1; padding: 20px; overflow-y: auto; background: #FAFAFA; }
        .no-selection { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #9CA3AF; }
        .no-selection svg { margin-bottom: 12px; opacity: 0.4; }
        .no-selection h3 { color: #6B7280; }
        .detail-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; }
        .detail-member { display: flex; gap: 14px; }
        .detail-avatar { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: 700; font-size: 1rem; }
        .detail-info h2 { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 2px; }
        .detail-role { font-size: 0.75rem; color: #6B7280; }
        .detail-summary { display: flex; gap: 16px; }
        .summary-item { text-align: center; }
        .summary-num { font-size: 1.25rem; font-weight: 700; color: #111827; display: block; }
        .summary-num.active { color: #3B82F6; }
        .summary-num.done { color: #10B981; }
        .summary-label { font-size: 0.6rem; color: #9CA3AF; text-transform: uppercase; }
        .detail-filters { display: flex; gap: 6px; margin-bottom: 16px; }
        .filter-btn { padding: 6px 12px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.75rem; color: #6B7280; cursor: pointer; font-family: inherit; }
        .filter-btn.active { background: #111827; border-color: #111827; color: #FFFFFF; }
        .task-list { display: flex; flex-direction: column; gap: 8px; }
        .no-tasks { text-align: center; padding: 40px; color: #9CA3AF; }
        .no-tasks svg { margin-bottom: 8px; opacity: 0.4; }
        .task-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 10px; transition: all 0.2s; }
        .task-card.overdue { border-color: #FECACA; background: #FEF2F2; }
        .task-card.expanded { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .task-card-main { display: flex; gap: 12px; padding: 12px; align-items: flex-start; }
        .status-btn { width: 22px; height: 22px; border: none; background: transparent; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
        .status-btn.pending { color: #D1D5DB; }
        .status-btn.in-progress { color: #3B82F6; }
        .status-btn.done { color: #10B981; }
        .status-progress { width: 16px; height: 16px; border: 2px solid #3B82F6; border-radius: 50%; border-right-color: transparent; }
        .task-content { flex: 1; cursor: pointer; }
        .task-header { display: flex; gap: 6px; margin-bottom: 6px; }
        .task-client { font-size: 0.6rem; font-weight: 600; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
        .task-type { font-size: 0.6rem; padding: 2px 6px; background: #F3F4F6; color: #6B7280; border-radius: 4px; }
        .task-idea { font-size: 0.85rem; color: #111827; font-weight: 500; margin-bottom: 6px; }
        .task-footer { display: flex; align-items: center; gap: 12px; }
        .task-deadline { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #6B7280; }
        .task-deadline.overdue { color: #DC2626; }
        .task-notes-count { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #9CA3AF; }
        .expand-btn { width: 28px; height: 28px; border: none; background: #F3F4F6; border-radius: 6px; color: #6B7280; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
        .expand-btn:hover { background: #E5E7EB; color: #374151; }
        .expand-btn.expanded { background: #111827; color: #FFFFFF; transform: rotate(180deg); }
        
        /* Task Notes Section */
        .task-notes-section { border-top: 1px solid #E5E7EB; padding: 14px; background: #FAFAFA; border-radius: 0 0 10px 10px; animation: slideDown 0.2s ease; }
        @keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 500px; } }
        .notes-header { margin-bottom: 12px; }
        .notes-header h4 { font-size: 0.8rem; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 6px; margin: 0; }
        .notes-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }
        .note-item { display: flex; gap: 10px; }
        .note-author-avatar { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 0.7rem; font-weight: 600; flex-shrink: 0; }
        .note-content { flex: 1; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px 12px; }
        .note-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .note-author-name { font-size: 0.75rem; font-weight: 600; color: #111827; }
        .note-time { font-size: 0.65rem; color: #9CA3AF; }
        .note-text { font-size: 0.8rem; color: #374151; line-height: 1.5; margin: 0; }
        
        /* Add Note Form */
        .add-note-form { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 10px; padding: 12px; }
        .note-input-row { margin-bottom: 10px; }
        .note-input-row:last-of-type { margin-bottom: 0; }
        .note-author-select { width: 100%; padding: 8px 10px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.8rem; font-family: inherit; color: #374151; background: #FFFFFF; cursor: pointer; }
        .note-author-select:focus { outline: none; border-color: #3B82F6; }
        .add-note-form textarea { width: 100%; padding: 10px 12px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.8rem; font-family: inherit; color: #374151; resize: none; }
        .add-note-form textarea:focus { outline: none; border-color: #3B82F6; }
        .add-note-form textarea::placeholder { color: #9CA3AF; }
        .note-actions { display: flex; justify-content: flex-end; margin-top: 10px; }
        .save-note-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: #111827; border: none; border-radius: 6px; font-size: 0.8rem; color: #FFFFFF; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .save-note-btn:hover { background: #1F2937; }
        .save-note-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* PIPELINE */
        .pipeline-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .pipeline-board { flex: 1; display: flex; gap: 12px; padding: 16px 20px; overflow-x: auto; }
        .pipeline-column { min-width: 260px; max-width: 260px; background: #F3F4F6; border-radius: 12px; display: flex; flex-direction: column; }
        .column-header { padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; }
        .column-title-row { display: flex; align-items: center; gap: 8px; }
        .column-title { font-size: 0.85rem; font-weight: 600; }
        .column-count { font-size: 0.65rem; background: #E5E7EB; color: #374151; padding: 2px 8px; border-radius: 10px; font-weight: 600; }
        .column-content { flex: 1; padding: 8px 10px 14px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
        .pipeline-card { background: #FFFFFF; border-radius: 10px; padding: 14px; cursor: pointer; transition: all 0.15s; border: 1px solid transparent; }
        .pipeline-card:hover { border-color: #D1D5DB; box-shadow: 0 4px 12px rgba(0,0,0,0.06); transform: translateY(-1px); }
        .pipeline-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .pipeline-card .card-client { font-size: 0.6rem; font-weight: 600; padding: 3px 8px; border-radius: 6px; text-transform: uppercase; }
        .pipeline-card .card-priority { font-size: 0.55rem; font-weight: 600; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; background: #F3F4F6; color: #6B7280; }
        .pipeline-card .card-priority.urgent { background: #FEE2E2; color: #DC2626; }
        .pipeline-card .card-priority.high { background: #FEF3C7; color: #D97706; }
        .pipeline-card .card-priority.medium { background: #E0E7FF; color: #4F46E5; }
        .pipeline-card .card-priority.low { background: #F3F4F6; color: #6B7280; }
        .pipeline-card .card-idea { font-size: 0.85rem; color: #111827; line-height: 1.5; font-weight: 500; margin-bottom: 10px; }
        .pipeline-card-footer { display: flex; gap: 12px; align-items: center; }
        .pipeline-card .card-type { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #6B7280; }
        .pipeline-card .card-date { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #6B7280; }
        .pipeline-card .card-notes-count { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #3B82F6; margin-left: auto; }
        .pipeline-card-platforms { display: flex; gap: 6px; margin-top: 10px; padding-top: 10px; border-top: 1px solid #F3F4F6; color: #9CA3AF; }

        /* PIPELINE MODAL */
        .pipeline-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .pipeline-modal { background: #FFFFFF; border-radius: 16px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
        .pipeline-modal .modal-header { padding: 20px 24px; border-bottom: 1px solid #E5E7EB; display: flex; justify-content: space-between; align-items: flex-start; }
        .pipeline-modal .modal-title { flex: 1; }
        .pipeline-modal .modal-title h2 { font-size: 1.15rem; font-weight: 600; color: #111827; margin-bottom: 8px; line-height: 1.4; }
        .stage-badge { font-size: 0.7rem; font-weight: 600; padding: 4px 10px; border-radius: 8px; display: inline-flex; align-items: center; gap: 4px; }
        .pipeline-modal .modal-content { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        
        /* Pipeline Workflow in Modal */
        .pipeline-workflow { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 4px; }
        .pipeline-workflow-step { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; min-width: 50px; max-width: 80px; cursor: pointer; transition: all 0.15s; }
        .pipeline-workflow-step:hover .pipeline-step-icon { transform: scale(1.1); }
        .pipeline-step-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #E5E7EB; color: #9CA3AF; transition: all 0.2s; }
        .pipeline-workflow-step.completed .pipeline-step-icon { background: #10B981; color: #FFFFFF; }
        .pipeline-workflow-step.current .pipeline-step-icon { color: #FFFFFF; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2); }
        .pipeline-step-label { font-size: 0.6rem; color: #6B7280; text-align: center; font-weight: 500; }
        .pipeline-workflow-step.completed .pipeline-step-label { color: #059669; }
        .pipeline-workflow-step.current .pipeline-step-label { color: #2563EB; font-weight: 600; }
        .pipeline-workflow-connector { display: flex; align-items: center; justify-content: center; color: #D1D5DB; margin-top: 10px; }
        .pipeline-workflow-connector.completed { color: #10B981; }
        
        /* Modal Client Info */
        .modal-client-info { display: flex; align-items: center; gap: 12px; padding: 12px; background: #F9FAFB; border-radius: 10px; }
        .modal-client-logo { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: 700; font-size: 0.9rem; }
        .modal-client-name { font-size: 0.9rem; font-weight: 600; color: #111827; display: block; }
        .modal-client-industry { font-size: 0.75rem; color: #6B7280; }
        
        /* Priority Tag */
        .detail-tag.priority-tag { text-transform: uppercase; font-weight: 600; font-size: 0.75rem; }
        .detail-tag.priority-tag.urgent { background: #FEE2E2; color: #DC2626; }
        .detail-tag.priority-tag.high { background: #FEF3C7; color: #D97706; }
        .detail-tag.priority-tag.medium { background: #E0E7FF; color: #4F46E5; }
        .detail-tag.priority-tag.low { background: #F3F4F6; color: #6B7280; }
        
        /* Platforms Display */
        .platforms-display { display: flex; flex-wrap: wrap; gap: 8px; }
        .platform-chip { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 500; text-transform: capitalize; }
        .platform-chip.instagram { background: linear-gradient(135deg, rgba(131, 58, 180, 0.1), rgba(225, 48, 108, 0.1)); color: #C13584; }
        .platform-chip.facebook { background: rgba(24, 119, 242, 0.1); color: #1877F2; }
        .platform-chip.linkedin { background: rgba(10, 102, 194, 0.1); color: #0A66C2; }
        .platform-chip.twitter { background: rgba(29, 161, 242, 0.1); color: #1DA1F2; }
        .platform-chip.tiktok { background: rgba(0, 0, 0, 0.05); color: #010101; }
        .platform-chip.youtube { background: rgba(255, 0, 0, 0.1); color: #FF0000; }
        
        /* Modal Notes Section */
        .notes-section { background: #F9FAFB; border-radius: 12px; padding: 16px; }
        .notes-section h4 { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; color: #374151; margin: 0 0 12px 0; }
        .modal-notes-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; max-height: 200px; overflow-y: auto; }
        .modal-note-item { display: flex; gap: 10px; }
        .modal-note-avatar { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 0.7rem; font-weight: 600; flex-shrink: 0; }
        .modal-note-content { flex: 1; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px 12px; }
        .modal-note-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .modal-note-author { font-size: 0.75rem; font-weight: 600; color: #111827; }
        .modal-note-time { font-size: 0.65rem; color: #9CA3AF; }
        .modal-note-text { font-size: 0.8rem; color: #374151; line-height: 1.5; margin: 0; }
        .modal-add-note { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 10px; padding: 12px; }
        .modal-note-input-row { margin-bottom: 10px; }
        .modal-note-input-row:last-of-type { margin-bottom: 0; }
        .modal-note-author-select { width: 100%; padding: 8px 10px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.8rem; font-family: inherit; color: #374151; background: #FFFFFF; cursor: pointer; }
        .modal-note-author-select:focus { outline: none; border-color: #3B82F6; }
        .modal-add-note textarea { width: 100%; padding: 10px 12px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.8rem; font-family: inherit; color: #374151; resize: none; }
        .modal-add-note textarea:focus { outline: none; border-color: #3B82F6; }
        .modal-add-note textarea::placeholder { color: #9CA3AF; }
        .modal-note-actions { display: flex; justify-content: flex-end; margin-top: 10px; }
        .modal-save-note-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: #111827; border: none; border-radius: 6px; font-size: 0.8rem; color: #FFFFFF; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .modal-save-note-btn:hover { background: #1F2937; }
        .modal-save-note-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        /* Modal Actions */
        .modal-actions { display: flex; gap: 10px; justify-content: flex-end; padding-top: 16px; border-top: 1px solid #E5E7EB; }
        .stage-action-btn { display: flex; align-items: center; gap: 6px; padding: 10px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .stage-action-btn.prev { background: #FFFFFF; border: 1px solid #E5E7EB; color: #6B7280; }
        .stage-action-btn.prev:hover { background: #F3F4F6; border-color: #D1D5DB; }
        .stage-action-btn.next { background: #111827; border: 1px solid #111827; color: #FFFFFF; }
        .stage-action-btn.next:hover { background: #1F2937; }

        /* CALENDAR VIEW */
        .calendar-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }
        .month-nav { display: flex; align-items: center; gap: 10px; }
        .nav-btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 6px; color: #6B7280; cursor: pointer; }
        .nav-btn:hover { background: #F3F4F6; }
        .current-month { font-weight: 600; color: #111827; min-width: 130px; text-align: center; font-size: 0.9rem; }
        .calendar-layout { flex: 1; display: flex; overflow: hidden; }
        .calendar-main { flex: 1; padding: 16px 20px; overflow: hidden; display: flex; flex-direction: column; }
        .calendar-grid { flex: 1; display: flex; flex-direction: column; min-height: 0; }
        .calendar-header { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 6px; }
        .day-header { padding: 8px; text-align: center; font-size: 0.7rem; font-weight: 600; color: #6B7280; text-transform: uppercase; }
        .calendar-body { flex: 1; display: grid; grid-template-columns: repeat(7, 1fr); grid-template-rows: repeat(6, 1fr); gap: 1px; background: #E5E7EB; border-radius: 10px; overflow: hidden; }
        .calendar-day { background: #FFFFFF; padding: 6px; min-height: 80px; display: flex; flex-direction: column; position: relative; transition: all 0.15s; }
        .calendar-day.other-month { background: #FAFAFA; }
        .calendar-day.other-month .day-number { color: #D1D5DB; }
        .calendar-day.today { background: #F0F9FF; }
        .calendar-day.today .day-number { background: #111827; color: #FFFFFF; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .calendar-day.drag-over { background: #E0E7FF; box-shadow: inset 0 0 0 2px #6366F1; }
        .day-number { font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 4px; }
        .day-events { flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
        .day-event { padding: 2px 5px; border-radius: 3px; font-size: 0.6rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: grab; transition: all 0.15s; }
        .day-event:active { cursor: grabbing; }
        .day-event.post { background: #F3F4F6; border-left: 2px solid; color: #374151; }
        .day-event.post:hover { background: #E5E7EB; }
        .day-event.deadline { background: #FEF3C7; color: #92400E; cursor: default; }
        .day-event.dragging { opacity: 0.4; }
        .event-title { overflow: hidden; text-overflow: ellipsis; }
        .more-events { font-size: 0.55rem; color: #9CA3AF; padding: 2px; }
        .drop-indicator { position: absolute; inset: 4px; background: rgba(99, 102, 241, 0.1); border: 2px dashed #6366F1; border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; color: #6366F1; font-size: 0.6rem; font-weight: 600; pointer-events: none; }
        .calendar-sidebar { width: 280px; background: #FFFFFF; border-left: 1px solid #E5E7EB; padding: 16px; overflow-y: auto; flex-shrink: 0; }
        .sidebar-section { margin-bottom: 24px; }
        .sidebar-section h3 { font-size: 0.8rem; font-weight: 600; color: #111827; margin-bottom: 4px; display: flex; align-items: center; justify-content: space-between; }
        .section-count { font-size: 0.65rem; background: #F3F4F6; color: #6B7280; padding: 2px 6px; border-radius: 8px; }
        .sidebar-hint { font-size: 0.65rem; color: #9CA3AF; margin-bottom: 10px; }
        .unscheduled-list { display: flex; flex-direction: column; gap: 6px; }
        .unscheduled-item { padding: 10px; background: #FAFAFA; border-radius: 8px; border-left: 3px solid; cursor: grab; transition: all 0.15s; }
        .unscheduled-item:hover { background: #F3F4F6; transform: translateX(2px); }
        .unscheduled-item:active { cursor: grabbing; }
        .unscheduled-item.dragging { opacity: 0.4; transform: rotate(2deg); }
        .unscheduled-client { font-size: 0.6rem; font-weight: 600; text-transform: uppercase; }
        .unscheduled-idea { font-size: 0.75rem; color: #374151; margin-top: 4px; line-height: 1.4; }
        .unscheduled-stage { font-size: 0.6rem; color: #9CA3AF; text-transform: capitalize; margin-top: 6px; display: inline-block; background: #E5E7EB; padding: 2px 6px; border-radius: 4px; }
        .upcoming-list { display: flex; flex-direction: column; gap: 8px; }
        .upcoming-item { display: flex; gap: 10px; align-items: flex-start; padding: 8px; border-radius: 8px; cursor: grab; transition: all 0.15s; }
        .upcoming-item:hover { background: #F9FAFB; }
        .upcoming-item:active { cursor: grabbing; }
        .upcoming-item.dragging { opacity: 0.4; }
        .upcoming-date { width: 40px; height: 40px; background: #F3F4F6; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
        .upcoming-day { font-size: 0.95rem; font-weight: 700; color: #111827; line-height: 1; }
        .upcoming-month { font-size: 0.55rem; color: #6B7280; text-transform: uppercase; }
        .upcoming-content { flex: 1; min-width: 0; }
        .upcoming-client { font-size: 0.6rem; font-weight: 600; text-transform: uppercase; }
        .upcoming-idea { font-size: 0.75rem; color: #374151; margin-top: 2px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .upcoming-grip { color: #D1D5DB; flex-shrink: 0; }
        .toast { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid; border-radius: 8px; padding: 10px 16px; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); animation: slideUp 0.3s ease; z-index: 100; }
        .toast svg { color: #10B981; flex-shrink: 0; }
        .toast span { font-size: 0.8rem; color: #374151; }
        @keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

        /* ANALYTICS VIEW */
        .analytics-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .time-select { padding: 7px 12px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.75rem; color: #374151; font-family: inherit; cursor: pointer; }
        .analytics-grid { flex: 1; padding: 16px 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
        .stats-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 4px; }
        .stat-card.large { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
        .stat-card.large.highlight { background: linear-gradient(135deg, #F0F9FF, #E0F2FE); border-color: #BAE6FD; }
        .stat-icon { width: 36px; height: 36px; background: #F3F4F6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6B7280; }
        .stat-card.large.highlight .stat-icon { background: #FFFFFF; color: #0284C7; }
        .stat-info .stat-value { font-size: 1.5rem; font-weight: 700; color: #111827; display: block; }
        .stat-info .stat-label { font-size: 0.7rem; color: #6B7280; }
        .stat-trend { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; font-weight: 600; }
        .stat-trend.up { color: #059669; }
        .stat-trend.down { color: #DC2626; }
        .charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 4px; }
        .chart-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 10px; padding: 16px; }
        .chart-card h3 { font-size: 0.85rem; font-weight: 600; color: #111827; margin-bottom: 16px; }
        .bar-chart { display: flex; justify-content: space-between; align-items: flex-end; height: 160px; padding-top: 24px; }
        .bar-group { display: flex; flex-direction: column; align-items: center; flex: 1; }
        .bar-container { height: 120px; display: flex; align-items: flex-end; width: 100%; justify-content: center; }
        .bar { width: 28px; background: linear-gradient(180deg, #6B7280, #9CA3AF); border-radius: 4px 4px 0 0; position: relative; transition: all 0.3s; }
        .bar:hover { background: linear-gradient(180deg, #374151, #6B7280); }
        .bar-value { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.65rem; font-weight: 600; color: #6B7280; white-space: nowrap; }
        .bar-label { margin-top: 8px; font-size: 0.65rem; color: #9CA3AF; }
        .engagement-chart { display: flex; flex-direction: column; gap: 10px; }
        .engagement-row { display: flex; align-items: center; gap: 10px; }
        .engagement-day { font-size: 0.7rem; color: #6B7280; width: 28px; }
        .engagement-bar-container { flex: 1; height: 8px; background: #F3F4F6; border-radius: 4px; overflow: hidden; }
        .engagement-bar { height: 100%; background: linear-gradient(90deg, #6B7280, #374151); border-radius: 4px; }
        .engagement-value { font-size: 0.7rem; font-weight: 600; color: #374151; width: 36px; text-align: right; }
        .content-row { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; }
        .content-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 10px; padding: 16px; }
        .content-card h3 { font-size: 0.85rem; font-weight: 600; color: #111827; margin-bottom: 14px; }
        .top-content-list { display: flex; flex-direction: column; gap: 10px; }
        .top-content-item { display: flex; gap: 12px; padding: 10px; background: #FAFAFA; border-radius: 8px; }
        .content-preview { width: 44px; height: 44px; background: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6B7280; flex-shrink: 0; }
        .content-details { flex: 1; min-width: 0; }
        .content-client { font-size: 0.6rem; font-weight: 600; text-transform: uppercase; }
        .content-title { font-size: 0.8rem; color: #374151; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .content-metrics { display: flex; gap: 12px; margin-top: 6px; }
        .content-metrics span { display: flex; align-items: center; gap: 3px; font-size: 0.65rem; color: #6B7280; }
        .content-engagement { display: flex; flex-direction: column; align-items: flex-end; justify-content: center; }
        .engagement-rate { font-size: 1.1rem; font-weight: 700; color: #111827; }
        .engagement-label { font-size: 0.6rem; color: #9CA3AF; }
        .platform-list { display: flex; flex-direction: column; gap: 10px; }
        .platform-item { display: flex; align-items: center; gap: 10px; padding: 10px; background: #FAFAFA; border-radius: 8px; }
        .platform-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; }
        .platform-icon.instagram { background: linear-gradient(135deg, #833AB4, #E1306C, #F77737); }
        .platform-icon.facebook { background: #1877F2; }
        .platform-icon.linkedin { background: #0A66C2; }
        .platform-icon.twitter { background: #1DA1F2; }
        .platform-info { flex: 1; }
        .platform-name { font-size: 0.8rem; font-weight: 600; color: #111827; display: block; }
        .platform-posts { font-size: 0.65rem; color: #9CA3AF; }
        .platform-stats { text-align: right; }
        .platform-reach { font-size: 0.75rem; font-weight: 600; color: #374151; display: block; }
        .platform-engagement { font-size: 0.65rem; color: #6B7280; }

        /* Monthly Progress Card */
        .monthly-progress-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; margin-bottom: 4px; }
        .monthly-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .monthly-header h3 { font-size: 1.1rem; font-weight: 700; color: #111827; }
        .monthly-label { font-size: 0.75rem; color: #6B7280; background: #F3F4F6; padding: 4px 10px; border-radius: 12px; }
        .monthly-stats { display: flex; align-items: center; justify-content: center; gap: 32px; margin-bottom: 20px; }
        .monthly-stat { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .monthly-circle { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .monthly-circle.planned { background: #DBEAFE; }
        .monthly-circle.posted { background: #D1FAE5; }
        .monthly-num { font-size: 1.5rem; font-weight: 700; color: #111827; }
        .monthly-stat-label { font-size: 0.75rem; color: #6B7280; font-weight: 500; }
        .monthly-progress-arrow { color: #D1D5DB; }
        .monthly-stat.completion { }
        .completion-ring { width: 64px; height: 64px; position: relative; }
        .completion-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        .completion-percent { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 700; color: #10B981; }
        .monthly-bar { height: 8px; background: #E5E7EB; border-radius: 4px; overflow: hidden; margin-bottom: 12px; }
        .monthly-bar-fill { height: 100%; background: linear-gradient(90deg, #10B981, #059669); border-radius: 4px; transition: width 0.3s; }
        .monthly-footer { display: flex; justify-content: space-between; font-size: 0.75rem; color: #6B7280; }

        /* Post Analytics Table */
        .post-analytics-section { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; }
        .section-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #E5E7EB; }
        .section-header h3 { font-size: 0.95rem; font-weight: 600; color: #111827; }
        .post-count { font-size: 0.75rem; color: #6B7280; background: #F3F4F6; padding: 4px 10px; border-radius: 12px; }
        .post-analytics-table { overflow-x: auto; }
        .post-table-header { display: grid; grid-template-columns: 2fr 80px 80px 70px 70px 70px 70px 70px 90px; gap: 8px; padding: 12px 16px; background: #F9FAFB; border-bottom: 1px solid #E5E7EB; font-size: 0.65rem; font-weight: 600; color: #6B7280; text-transform: uppercase; }
        .post-table-row { display: grid; grid-template-columns: 2fr 80px 80px 70px 70px 70px 70px 70px 90px; gap: 8px; padding: 12px 16px; border-bottom: 1px solid #F3F4F6; align-items: center; cursor: pointer; transition: all 0.15s; }
        .post-table-row:hover { background: #F9FAFB; }
        .post-table-row.selected { background: #EFF6FF; }
        .post-table-row:last-child { border-bottom: none; }
        .col-post { display: flex; align-items: center; gap: 10px; }
        .post-type-icon { width: 36px; height: 36px; background: #F3F4F6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6B7280; flex-shrink: 0; }
        .post-info { min-width: 0; }
        .post-client-tag { font-size: 0.6rem; font-weight: 600; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 2px; }
        .post-client-tag.large { font-size: 0.7rem; padding: 4px 10px; border-radius: 6px; }
        .post-idea { font-size: 0.8rem; color: #374151; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .col-platform { }
        .platform-badge { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; }
        .platform-badge.instagram { background: linear-gradient(135deg, #833AB4, #E1306C, #F77737); }
        .platform-badge.facebook { background: #1877F2; }
        .platform-badge.linkedin { background: #0A66C2; }
        .platform-badge.twitter { background: #1DA1F2; }
        .col-date { font-size: 0.75rem; color: #6B7280; }
        .col-metric { font-size: 0.8rem; font-weight: 500; color: #374151; }
        .col-engagement { }
        .engagement-badge { font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 12px; }
        .engagement-badge.high { background: #D1FAE5; color: #059669; }
        .engagement-badge.medium { background: #FEF3C7; color: #D97706; }
        .engagement-badge.low { background: #FEE2E2; color: #DC2626; }

        /* Post Detail Card */
        .post-detail-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; animation: slideDown 0.2s ease; }
        .post-detail-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #F3F4F6; }
        .post-detail-info h4 { font-size: 1rem; font-weight: 600; color: #111827; margin: 6px 0 8px; }
        .post-meta { display: flex; align-items: center; gap: 12px; }
        .post-date { font-size: 0.8rem; color: #6B7280; }
        .post-detail-stats { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
        .detail-stat { display: flex; align-items: center; gap: 12px; padding: 14px; background: #F9FAFB; border-radius: 10px; }
        .detail-stat svg { color: #6B7280; }
        .detail-stat.highlight { background: linear-gradient(135deg, #EFF6FF, #DBEAFE); }
        .detail-stat.highlight svg { color: #3B82F6; }
        .detail-stat-value { font-size: 1.1rem; font-weight: 700; color: #111827; display: block; }
        .detail-stat-label { font-size: 0.7rem; color: #6B7280; }

        .placeholder-view { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #9CA3AF; }
        .placeholder-view svg { margin-bottom: 12px; opacity: 0.4; }
        .placeholder-view h3 { color: #6B7280; }

        /* CHAT VIEW */
        .chat-view { flex: 1; display: flex; flex-direction: column; background: #FFFFFF; overflow: hidden; }
        .messages-container { flex: 1; overflow-y: auto; padding: 20px; background: #FAFAFA; }
        .message { margin-bottom: 16px; animation: fadeIn 0.25s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .message.user { display: flex; justify-content: flex-end; }
        .message.user .message-content { background: #111827; color: #FFFFFF; border-radius: 16px 16px 4px 16px; padding: 10px 14px; max-width: 70%; font-size: 0.85rem; }
        .ai-bubble { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 14px 16px; max-width: 85%; }
        .ai-text { font-size: 0.85rem; line-height: 1.6; color: #374151; }
        .suggestions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .suggestion-chip { padding: 6px 12px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 16px; font-size: 0.75rem; color: #4B5563; cursor: pointer; font-family: inherit; font-weight: 500; transition: all 0.15s; }
        .suggestion-chip:hover { background: #F3F4F6; border-color: #D1D5DB; }
        .input-area { padding: 14px 20px 20px; background: #FFFFFF; border-top: 1px solid #F3F4F6; }
        .input-container { display: flex; align-items: center; gap: 10px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 10px; padding: 5px 5px 5px 14px; }
        .input-container:focus-within { border-color: #9CA3AF; background: #FFFFFF; }
        .input-container input { flex: 1; background: transparent; border: none; outline: none; font-size: 0.85rem; color: #1F2937; font-family: inherit; }
        .input-container input::placeholder { color: #9CA3AF; }
        .send-btn { width: 36px; height: 36px; border-radius: 8px; background: #111827; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; transition: background 0.15s; }
        .send-btn:hover { background: #1F2937; }

        /* BULK UPLOAD VIEW */
        .bulk-upload-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .upload-content { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
        
        /* Upload Steps Indicator */
        .upload-steps { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 20px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; }
        .upload-step { display: flex; align-items: center; gap: 8px; }
        .upload-step .step-num { width: 28px; height: 28px; border-radius: 50%; background: #F3F4F6; color: #9CA3AF; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; }
        .upload-step span { font-size: 0.85rem; color: #9CA3AF; font-weight: 500; }
        .upload-step.active .step-num { background: #3B82F6; color: #FFFFFF; }
        .upload-step.active span { color: #111827; }
        .upload-step.completed .step-num { background: #10B981; color: #FFFFFF; }
        .upload-step.completed span { color: #059669; }
        .step-line { width: 40px; height: 2px; background: #E5E7EB; }
        
        .upload-step-content { display: flex; flex-direction: column; gap: 20px; }
        
        /* Upload Options */
        .upload-options { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .option-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; }
        .option-card h4 { font-size: 0.8rem; font-weight: 600; color: #374151; margin-bottom: 12px; }
        .import-type-selector { display: flex; gap: 10px; }
        .import-type-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 12px; background: #F9FAFB; border: 2px solid #E5E7EB; border-radius: 10px; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .import-type-btn:hover { border-color: #D1D5DB; }
        .import-type-btn.active { border-color: #3B82F6; background: #EFF6FF; }
        .import-type-btn svg { color: #6B7280; }
        .import-type-btn.active svg { color: #3B82F6; }
        .import-type-btn span { font-size: 0.85rem; font-weight: 600; color: #374151; }
        .import-type-btn p { font-size: 0.7rem; color: #9CA3AF; margin: 0; }
        .client-selector { display: flex; flex-wrap: wrap; gap: 8px; }
        .client-select-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.8rem; color: #374151; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .client-select-btn:hover { border-color: #D1D5DB; }
        .client-select-btn.active { border-width: 2px; }
        .client-select-dot { width: 8px; height: 8px; border-radius: 50%; }
        
        /* Upload Zone */
        .upload-zone { background: #FFFFFF; border: 2px dashed #D1D5DB; border-radius: 16px; padding: 48px; cursor: pointer; transition: all 0.2s; }
        .upload-zone:hover { border-color: #9CA3AF; background: #FAFAFA; }
        .upload-zone.drag-active { border-color: #3B82F6; background: #EFF6FF; }
        .upload-zone-content { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .upload-icon { width: 64px; height: 64px; background: #F3F4F6; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #6B7280; margin-bottom: 16px; }
        .upload-zone.drag-active .upload-icon { background: #DBEAFE; color: #3B82F6; }
        .upload-zone h3 { font-size: 1.1rem; font-weight: 600; color: #111827; margin-bottom: 4px; }
        .upload-zone p { font-size: 0.85rem; color: #6B7280; margin-bottom: 16px; }
        .supported-formats { display: flex; gap: 16px; }
        .supported-formats span { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: #9CA3AF; }
        
        /* Upload Templates */
        .upload-templates { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; }
        .upload-templates h4 { font-size: 0.8rem; font-weight: 600; color: #374151; margin-bottom: 12px; }
        .template-links { display: flex; gap: 10px; }
        .template-btn { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 0.8rem; color: #374151; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .template-btn:hover { background: #F3F4F6; border-color: #D1D5DB; }
        
        /* Processing Overlay */
        .processing-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.9); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .processing-content { text-align: center; }
        .processing-spinner { width: 48px; height: 48px; border: 3px solid #E5E7EB; border-top-color: #3B82F6; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .processing-content h3 { font-size: 1.1rem; font-weight: 600; color: #111827; margin-bottom: 4px; }
        .processing-content p { font-size: 0.85rem; color: #6B7280; }
        
        /* Parsed Info */
        .parsed-info { display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 14px 16px; }
        .parsed-file { display: flex; align-items: center; gap: 12px; }
        .parsed-file svg { color: #6B7280; }
        .file-name { font-size: 0.9rem; font-weight: 600; color: #111827; display: block; }
        .file-meta { font-size: 0.75rem; color: #6B7280; }
        .ai-badge { display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: linear-gradient(135deg, #EEF2FF, #E0E7FF); border-radius: 16px; font-size: 0.75rem; font-weight: 600; color: #4F46E5; }
        
        /* Preview Table */
        .preview-table-container { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; }
        .preview-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .preview-table th { background: #F9FAFB; padding: 12px 10px; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB; font-size: 0.7rem; text-transform: uppercase; }
        .preview-table td { padding: 8px 10px; border-bottom: 1px solid #F3F4F6; vertical-align: middle; }
        .preview-table tr:last-child td { border-bottom: none; }
        .preview-table tr:hover { background: #FAFAFA; }
        .row-num { color: #9CA3AF; font-size: 0.75rem; text-align: center; }
        .table-input { width: 100%; padding: 6px 8px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.8rem; font-family: inherit; color: #111827; }
        .table-input:focus { outline: none; border-color: #3B82F6; }
        .table-select { padding: 6px 8px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 0.8rem; font-family: inherit; color: #111827; background: #FFFFFF; cursor: pointer; }
        .table-select:focus { outline: none; border-color: #3B82F6; }
        .remove-row-btn { width: 28px; height: 28px; border: none; background: transparent; color: #D1D5DB; cursor: pointer; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .remove-row-btn:hover { background: #FEE2E2; color: #DC2626; }
        
        /* Preview Actions */
        .preview-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 8px; }
        
        /* Upload Success */
        .upload-success { text-align: center; padding: 48px 24px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 16px; }
        .success-icon { width: 80px; height: 80px; background: #D1FAE5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: #059669; }
        .upload-success h2 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 8px; }
        .upload-success p { font-size: 0.95rem; color: #6B7280; margin-bottom: 24px; }
        .success-actions { display: flex; gap: 12px; justify-content: center; }

        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }
      `}</style>
      
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo">FlowPost</div>
          <div className="tagline">Social Media Command</div>
        </div>
        
        <nav className="nav-section">
          <div className={`nav-item ${activeView === 'problems' ? 'active' : ''} ${problemCount > 0 ? 'has-problems' : ''}`} onClick={() => setActiveView('problems')}>
            <AlertTriangle size={17} />
            Problems
            {problemCount > 0 && <span className="nav-problem-badge">{problemCount}</span>}
          </div>
          <div className={`nav-item ${activeView === 'chat' ? 'active' : ''}`} onClick={() => setActiveView('chat')}><MessageSquare size={17} />Chat</div>
          <div className={`nav-item ${activeView === 'pipeline' ? 'active' : ''}`} onClick={() => setActiveView('pipeline')}><Layers size={17} />Pipeline</div>
          <div className={`nav-item ${activeView === 'calendar' ? 'active' : ''}`} onClick={() => setActiveView('calendar')}><Calendar size={17} />Calendar</div>
          <div className={`nav-item ${activeView === 'team' ? 'active' : ''}`} onClick={() => setActiveView('team')}><Users size={17} />Team</div>
          <div className={`nav-item ${activeView === 'analytics' ? 'active' : ''}`} onClick={() => setActiveView('analytics')}><BarChart3 size={17} />Analytics</div>
          <div className={`nav-item ${activeView === 'clients' ? 'active' : ''}`} onClick={() => setActiveView('clients')}><Building2 size={17} />Clients</div>
          <div className={`nav-item ${activeView === 'upload' ? 'active' : ''}`} onClick={() => setActiveView('upload')}><Upload size={17} />Import</div>
        </nav>
      </aside>
      
      <main className="main-content">{renderView()}</main>
    </div>
  );
}
