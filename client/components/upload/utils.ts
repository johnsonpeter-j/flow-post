export const generateMockParsedData = (file: File, extension: string): any => {
  // Simulate AI-parsed data from file
  if (extension === 'pdf') {
    return {
      source: 'pdf',
      fileName: file.name,
      detectedType: 'content_brief',
      columns: ['concept', 'explanation', 'contentType', 'mood', 'teams'],
      rows: [
        {
          concept: 'Summer Collection Launch',
          explanation: 'Showcase new summer products with beach vibes and lifestyle shots',
          contentType: 'campaign',
          mood: 'vibrant, energetic, fun',
          teams: 'Design, Photography',
        },
        {
          concept: 'Customer Testimonials',
          explanation: 'Video series featuring real customer stories and transformations',
          contentType: 'video',
          mood: 'authentic, emotional, inspiring',
          teams: 'Video, Content Writers',
        },
        {
          concept: 'Behind the Scenes',
          explanation: 'Day-in-the-life content showing team culture and processes',
          contentType: 'reel',
          mood: 'casual, fun, relatable',
          teams: 'Photography, Video',
        },
      ],
    };
  }

  return {
    source: 'excel',
    fileName: file.name,
    detectedType: 'content_bank',
    columns: ['idea', 'type', 'stage', 'priority', 'platforms', 'scheduledFor'],
    rows: [
      {
        idea: 'Product feature highlight - New dashboard',
        type: 'carousel',
        stage: 'idea',
        priority: 'high',
        platforms: 'instagram, linkedin',
        scheduledFor: '',
      },
      {
        idea: 'Team celebration post',
        type: 'photo',
        stage: 'idea',
        priority: 'medium',
        platforms: 'instagram, facebook',
        scheduledFor: '2025-02-01',
      },
      {
        idea: 'Tutorial: Getting started guide',
        type: 'video',
        stage: 'idea',
        priority: 'high',
        platforms: 'youtube, instagram',
        scheduledFor: '',
      },
      {
        idea: 'Industry news commentary',
        type: 'carousel',
        stage: 'idea',
        priority: 'low',
        platforms: 'linkedin, twitter',
        scheduledFor: '2025-01-28',
      },
      {
        idea: 'User spotlight series #5',
        type: 'video',
        stage: 'idea',
        priority: 'medium',
        platforms: 'instagram, facebook',
        scheduledFor: '',
      },
    ],
  };
};

export const handleDownloadTemplate = (type: 'content' | 'briefs') => {
  // Create CSV template content
  let csvContent = '';
  let filename = '';

  if (type === 'content') {
    filename = 'content-bank-template.csv';
    csvContent = 'idea,type,stage,priority,platforms,scheduledFor\n';
    csvContent += 'Product feature highlight - New dashboard,carousel,idea,high,"instagram, linkedin",\n';
    csvContent += 'Team celebration post,photo,idea,medium,"instagram, facebook",2025-02-01\n';
  } else {
    filename = 'content-brief-template.csv';
    csvContent = 'concept,explanation,contentType,mood\n';
    csvContent += 'Summer Collection Launch,Showcase new summer products with beach vibes,campaign,"vibrant, energetic, fun"\n';
    csvContent += 'Customer Testimonials,Video series featuring real customer stories,video,"authentic, emotional, inspiring"\n';
  }

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

