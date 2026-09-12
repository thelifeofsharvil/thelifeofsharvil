export type PhotoCategory = string;

export interface PhotoItem {
  id: string;
  title: string;
  url: string;
  category: string;
  location: string;
  date: string;
  camera: string;
  caption: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  featured?: boolean;
}

export interface InstagramContentItem {
  id: string;
  type: 'reel' | 'post';
  title: string;
  thumbnail: string;
  videoPreviewUrl?: string;
  caption: string;
  instagramUrl: string;
  likesOrViews?: string;
  date?: string;
}

export interface ExclusiveItem {
  id: string;
  title: string;
  url: string;
  type: 'Unposted Photo' | 'Nature Shot' | 'Exclusive Nature Shot' | 'Camera Roll' | 'Behind The Scenes' | 'Personal Photo';
  note: string;
  date: string;
  unlockedByDefault?: boolean;
}

export interface CreatorStats {
  photosCount: string;
  photosLabel: string;
  photosDesc: string;
  reelsCount: string;
  reelsLabel: string;
  reelsDesc: string;
  placesCount: string;
  placesLabel: string;
  placesDesc: string;
  memoriesCount: string;
  memoriesLabel: string;
  memoriesDesc: string;
}

export interface SiteConfig {
  creatorName: string;
  instagramHandle: string;
  instagramUrl: string;
  broadcastChannelUrl: string;
  email: string;
  location?: string;
  heroImageUrl: string;
  heroTagline: string;
  heroSubtext: string;
  aboutText: string;
  stats: CreatorStats;
}
