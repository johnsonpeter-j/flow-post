export interface AnalyticsData {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  reach: number;
  engagementRate: number;
}

export interface PostAnalytics {
  id: string;
  clientId: string;
  idea: string;
  type: string;
  postedAt: string;
  platform: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  reach: number;
  engagementRate: number;
  saves: number;
}

export interface WeeklyData {
  day: string;
  views: number;
  engagement: number;
  posts: number;
}





