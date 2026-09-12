import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SiteConfig,
  PhotoItem,
  InstagramContentItem,
  ExclusiveItem,
} from '../types';
import {
  INITIAL_CONFIG,
  INITIAL_PHOTOS,
  INITIAL_INSTAGRAM_POSTS,
  INITIAL_EXCLUSIVE_ITEMS,
} from '../data/initialData';

interface CreatorContextType {
  config: SiteConfig;
  photos: PhotoItem[];
  instagramPosts: InstagramContentItem[];
  exclusiveItems: ExclusiveItem[];
  
  // Lightbox
  activePhoto: PhotoItem | null;
  openLightbox: (photo: PhotoItem) => void;
  closeLightbox: () => void;
  nextPhoto: () => void;
  prevPhoto: () => void;

  // Studio Drawer / Modal
  isStudioOpen: boolean;
  openStudio: () => void;
  closeStudio: () => void;
  
  // Updates
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  setHeroImage: (url: string) => void;
  
  // Photos CRUD
  addPhoto: (photo: Omit<PhotoItem, 'id'>) => void;
  updatePhoto: (id: string, photo: Partial<PhotoItem>) => void;
  deletePhoto: (id: string) => void;
  clearAllPhotos: () => void;
  
  // Instagram CRUD
  addInstagramPost: (post: Omit<InstagramContentItem, 'id'>) => void;
  deleteInstagramPost: (id: string) => void;
  
  // Exclusive CRUD
  addExclusiveItem: (item: Omit<ExclusiveItem, 'id'>) => void;
  deleteExclusiveItem: (id: string) => void;
  
  // Reset
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  CONFIG: 'sharvil_site_config_v1',
  PHOTOS: 'sharvil_photos_v2',
  IG: 'sharvil_instagram_v1',
  EXCLUSIVE: 'sharvil_exclusive_v1',
};

const CreatorContext = createContext<CreatorContextType | undefined>(undefined);

export const CreatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfigState] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_CONFIG,
          ...parsed,
          location: parsed.location || 'NAVI MUMBAI',
        };
      }
    } catch (e) {
      console.error('Failed to load config from storage', e);
    }
    return INITIAL_CONFIG;
  });

  const [photos, setPhotosState] = useState<PhotoItem[]>(() => {
    try {
      // Clear legacy storage key if present
      localStorage.removeItem('sharvil_photos_v1');
      const saved = localStorage.getItem(STORAGE_KEYS.PHOTOS);
      if (saved) {
        const parsed: PhotoItem[] = JSON.parse(saved);
        // Remove explicitly deleted photo if present in user storage
        const cleaned = parsed.filter((p) => p.id !== 'photo-1789199920327-nl252');
        if (cleaned.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    } catch (e) {
      console.error('Failed to load photos from storage', e);
    }
    return INITIAL_PHOTOS;
  });

  const [instagramPosts, setInstagramPostsState] = useState<InstagramContentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IG);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load IG posts from storage', e);
    }
    return INITIAL_INSTAGRAM_POSTS;
  });

  const [exclusiveItems, setExclusiveItemsState] = useState<ExclusiveItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXCLUSIVE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load exclusive items from storage', e);
    }
    return INITIAL_EXCLUSIVE_ITEMS;
  });

  // Lightbox State
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save config to storage', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    } catch (e) {
      console.error('Failed to save photos to storage', e);
    }
  }, [photos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.IG, JSON.stringify(instagramPosts));
    } catch (e) {
      console.error('Failed to save IG posts to storage', e);
    }
  }, [instagramPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXCLUSIVE, JSON.stringify(exclusiveItems));
    } catch (e) {
      console.error('Failed to save exclusive items to storage', e);
    }
  }, [exclusiveItems]);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfigState(prev => ({ ...prev, ...newConfig }));
  };

  const setHeroImage = (url: string) => {
    setConfigState(prev => ({ ...prev, heroImageUrl: url }));
  };

  const addPhoto = (newPhoto: Omit<PhotoItem, 'id'>) => {
    const item: PhotoItem = {
      ...newPhoto,
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setPhotosState(prev => [item, ...prev]);
  };

  const updatePhoto = (id: string, updated: Partial<PhotoItem>) => {
    setPhotosState(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
    if (activePhoto && activePhoto.id === id) {
      setActivePhoto(prev => (prev ? { ...prev, ...updated } : null));
    }
  };

  const deletePhoto = (id: string) => {
    setPhotosState(prev => prev.filter(p => p.id !== id));
    if (activePhoto?.id === id) {
      setActivePhoto(null);
    }
  };

  const clearAllPhotos = () => {
    setPhotosState([]);
    setActivePhoto(null);
    try {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify([]));
    } catch (e) {
      console.error('Failed to clear photos in storage', e);
    }
  };

  const addInstagramPost = (post: Omit<InstagramContentItem, 'id'>) => {
    const item: InstagramContentItem = {
      ...post,
      id: `ig-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setInstagramPostsState(prev => [item, ...prev]);
  };

  const deleteInstagramPost = (id: string) => {
    setInstagramPostsState(prev => prev.filter(p => p.id !== id));
  };

  const addExclusiveItem = (item: Omit<ExclusiveItem, 'id'>) => {
    const newItem: ExclusiveItem = {
      ...item,
      id: `ex-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setExclusiveItemsState(prev => [newItem, ...prev]);
  };

  const deleteExclusiveItem = (id: string) => {
    setExclusiveItemsState(prev => prev.filter(p => p.id !== id));
  };

  const openLightbox = (photo: PhotoItem) => {
    setActivePhoto(photo);
  };

  const closeLightbox = () => {
    setActivePhoto(null);
  };

  const nextPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = photos.findIndex(p => p.id === activePhoto.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % photos.length;
    setActivePhoto(photos[nextIndex]);
  };

  const prevPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = photos.findIndex(p => p.id === activePhoto.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setActivePhoto(photos[prevIndex]);
  };

  const openStudio = () => setIsStudioOpen(true);
  const closeStudio = () => setIsStudioOpen(false);

  const resetToDefaults = () => {
    setConfigState(INITIAL_CONFIG);
    setPhotosState(INITIAL_PHOTOS);
    setInstagramPostsState(INITIAL_INSTAGRAM_POSTS);
    setExclusiveItemsState(INITIAL_EXCLUSIVE_ITEMS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.PHOTOS);
    localStorage.removeItem(STORAGE_KEYS.IG);
    localStorage.removeItem(STORAGE_KEYS.EXCLUSIVE);
  };

  return (
    <CreatorContext.Provider
      value={{
        config,
        photos,
        instagramPosts,
        exclusiveItems,
        activePhoto,
        openLightbox,
        closeLightbox,
        nextPhoto,
        prevPhoto,
        isStudioOpen,
        openStudio,
        closeStudio,
        updateConfig,
        setHeroImage,
        addPhoto,
        updatePhoto,
        deletePhoto,
        clearAllPhotos,
        addInstagramPost,
        deleteInstagramPost,
        addExclusiveItem,
        deleteExclusiveItem,
        resetToDefaults,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreator = () => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error('useCreator must be used within a CreatorProvider');
  }
  return context;
};
