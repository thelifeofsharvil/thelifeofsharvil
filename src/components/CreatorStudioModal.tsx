import React, { useState, useRef } from 'react';
import {
  X,
  Plus,
  Trash2,
  Upload,
  Camera,
  Instagram,
  Lock,
  Sliders,
  RotateCcw,
  Check,
  Sparkles,
  Link,
  MapPin,
  Calendar,
  Layers,
  FileText,
} from 'lucide-react';
import { useCreator } from '../context/CreatorContext';
import { PhotoCategory } from '../types';

export const CreatorStudioModal: React.FC = () => {
  const {
    config,
    updateConfig,
    setHeroImage,
    photos,
    addPhoto,
    deletePhoto,
    clearAllPhotos,
    instagramPosts,
    addInstagramPost,
    deleteInstagramPost,
    exclusiveItems,
    addExclusiveItem,
    deleteExclusiveItem,
    isStudioOpen,
    closeStudio,
    resetToDefaults,
  } = useCreator();

  const [activeTab, setActiveTab] = useState<'profile' | 'photography' | 'instagram' | 'exclusive' | 'stats'>('photography');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // New photo form state
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCategory, setPhotoCategory] = useState('');
  const [photoLocation, setPhotoLocation] = useState('');
  const [photoDate, setPhotoDate] = useState('');
  const [photoCamera, setPhotoCamera] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const photoFileInputRef = useRef<HTMLInputElement>(null);

  const existingSections = Array.from(
    new Set(photos.map((p) => p.category?.trim()).filter(Boolean))
  );

  // New IG post form state
  const [igTitle, setIgTitle] = useState('');
  const [igType, setIgType] = useState<'reel' | 'post'>('reel');
  const [igThumbnail, setIgThumbnail] = useState('');
  const [igCaption, setIgCaption] = useState('');
  const [igUrl, setIgUrl] = useState('');
  const [igViews, setIgViews] = useState('');
  const igFileInputRef = useRef<HTMLInputElement>(null);

  // New Exclusive form state
  const [exTitle, setExTitle] = useState('');
  const [exUrl, setExUrl] = useState('');
  const [exType, setExType] = useState<'Unposted Photo' | 'Nature Shot' | 'Camera Roll' | 'Behind The Scenes' | 'Personal Photo'>('Unposted Photo');
  const [exNote, setExNote] = useState('');
  const [exDate, setExDate] = useState('');
  const exFileInputRef = useRef<HTMLInputElement>(null);

  const heroFileInputRef = useRef<HTMLInputElement>(null);

  if (!isStudioOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setHeroImage(event.target.result as string);
          showNotification('Hero photograph updated successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setIgThumbnail(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setExUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim() || !photoTitle.trim()) {
      alert('Please provide a title and photograph image');
      return;
    }

    addPhoto({
      title: photoTitle.trim(),
      url: photoUrl.trim(),
      category: photoCategory.trim() || 'General',
      location: photoLocation.trim() || 'Maharashtra, India',
      date: photoDate.trim() || '2026',
      camera: photoCamera.trim() || 'Sony Alpha 7IV',
      caption: photoCaption.trim() || 'Captured by Sharvil.',
      aspectRatio: 'portrait',
    });

    setPhotoTitle('');
    setPhotoUrl('');
    setPhotoCategory('');
    setPhotoLocation('');
    setPhotoDate('');
    setPhotoCamera('');
    setPhotoCaption('');
    showNotification('New photograph added to exhibition!');
  };

  const handleCreateIgPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!igThumbnail.trim() || !igTitle.trim()) {
      alert('Please provide a title and thumbnail');
      return;
    }

    addInstagramPost({
      title: igTitle.trim(),
      type: igType,
      thumbnail: igThumbnail.trim(),
      caption: igCaption.trim(),
      instagramUrl: igUrl.trim() || config.instagramUrl,
      likesOrViews: igViews.trim() || '50K views',
    });

    setIgTitle('');
    setIgThumbnail('');
    setIgCaption('');
    setIgUrl('');
    setIgViews('');
    showNotification('New Instagram content card added!');
  };

  const handleCreateExclusive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exUrl.trim() || !exTitle.trim()) {
      alert('Please provide a title and photo');
      return;
    }

    addExclusiveItem({
      title: exTitle.trim(),
      url: exUrl.trim(),
      type: exType,
      note: exNote.trim() || 'Unposted camera roll capture.',
      date: exDate.trim() || '2026',
    });

    setExTitle('');
    setExUrl('');
    setExNote('');
    setExDate('');
    showNotification('Exclusive item added to vault!');
  };

  return (
    <div
      id="creator-studio-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in"
    >
      <div
        id="creator-studio-panel"
        className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
      >
        {/* Studio Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-white text-black">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-['Syne'] text-lg font-bold text-white tracking-wide">
                Sharvil Creator Studio
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                Manage photography, content cards, hero visuals & social links
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={closeStudio}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert Toast */}
        {successNotice && (
          <div className="bg-emerald-950/80 border-b border-emerald-800/80 px-6 py-2.5 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-zinc-800 overflow-x-auto scrollbar-none bg-zinc-950">
          <button
            onClick={() => setActiveTab('photography')}
            className={`px-4 py-2.5 text-xs font-mono tracking-wider whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'photography'
                ? 'border-white text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>PHOTOGRAPHY ({photos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 text-xs font-mono tracking-wider whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-white text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>HERO & CONTACT</span>
          </button>

          <button
            onClick={() => setActiveTab('instagram')}
            className={`px-4 py-2.5 text-xs font-mono tracking-wider whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'instagram'
                ? 'border-white text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>REELS & CONTENT ({instagramPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('exclusive')}
            className={`px-4 py-2.5 text-xs font-mono tracking-wider whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'exclusive'
                ? 'border-white text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>EXCLUSIVE VAULT ({exclusiveItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2.5 text-xs font-mono tracking-wider whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'stats'
                ? 'border-white text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>STATS & ABOUT</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* TAB 1: PHOTOGRAPHY */}
          {activeTab === 'photography' && (
            <div className="space-y-8">
              {/* Add New Photograph Form */}
              <div className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    Add New Photograph to Exhibition
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500">EXHIBITION READY</span>
                </div>

                <form onSubmit={handleCreatePhoto} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        PHOTO TITLE *
                      </label>
                      <input
                        type="text"
                        required
                        value={photoTitle}
                        onChange={(e) => setPhotoTitle(e.target.value)}
                        placeholder="e.g. Whispers of the Valley"
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-mono text-zinc-400 block">
                          SECTION / CATEGORY NAME
                        </label>
                        <span className="text-[10px] font-mono text-zinc-500">
                          Add manually
                        </span>
                      </div>
                      <input
                        type="text"
                        value={photoCategory}
                        onChange={(e) => setPhotoCategory(e.target.value)}
                        placeholder="e.g. Street, Monsoon, Portraits, Travel..."
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                      />
                      {existingSections.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="text-[10px] font-mono text-zinc-500">Your sections:</span>
                          {existingSections.map((sec) => (
                            <button
                              key={sec}
                              type="button"
                              onClick={() => setPhotoCategory(sec)}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                                photoCategory === sec
                                  ? 'bg-white text-black font-semibold'
                                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                              }`}
                            >
                              {sec}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image Input: URL or File */}
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                      IMAGE SOURCE (PASTE URL OR UPLOAD FILE) *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="https://... or upload below"
                        className="flex-1 px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500 font-mono"
                      />
                      <input
                        ref={photoFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoFileUpload}
                      />
                      <button
                        type="button"
                        onClick={() => photoFileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        LOCATION
                      </label>
                      <input
                        type="text"
                        value={photoLocation}
                        onChange={(e) => setPhotoLocation(e.target.value)}
                        placeholder="e.g. Pawna Lake, Maharashtra"
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        DATE
                      </label>
                      <input
                        type="text"
                        value={photoDate}
                        onChange={(e) => setPhotoDate(e.target.value)}
                        placeholder="e.g. October 2025"
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        CAMERA / GEAR
                      </label>
                      <input
                        type="text"
                        value={photoCamera}
                        onChange={(e) => setPhotoCamera(e.target.value)}
                        placeholder="e.g. Sony A7IV • 35mm f/1.4"
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                      SHORT CAPTION
                    </label>
                    <input
                      type="text"
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      placeholder="Brief note or memory of what you couldn't ignore..."
                      className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2 text-xs font-mono uppercase font-semibold text-black bg-white hover:bg-zinc-200 rounded-full transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add To Photography Gallery</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Photos List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Existing Photographs ({photos.length})
                  </h4>
                  {photos.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Delete all existing photographs from the exhibition?')) {
                          clearAllPhotos();
                          showNotification('All exhibition photographs deleted.');
                        }
                      }}
                      className="text-[11px] font-mono text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete All ({photos.length})</span>
                    </button>
                  )}
                </div>

                {photos.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-zinc-800 rounded-xl bg-black/40">
                    <Camera className="w-8 h-8 text-zinc-600 mx-auto mb-2 opacity-60" />
                    <p className="text-xs text-zinc-300 font-mono">
                      No photographs in your exhibition yet.
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Use the form above to add your photos manually from your device or via image URL.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-12 h-12 rounded object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="overflow-hidden">
                            <p className="text-xs font-medium text-white truncate">
                              {photo.title}
                            </p>
                            <p className="text-[10px] font-mono text-zinc-400 truncate">
                              {photo.category} • {photo.location}
                            </p>
                            <p className="text-[10px] font-mono text-zinc-500 truncate">
                              {photo.camera}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove "${photo.title}"?`)) {
                              deletePhoto(photo.id);
                              showNotification('Photograph removed.');
                            }
                          }}
                          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & HERO */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              {/* Hero Image Section */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                  Main Hero Photograph (Sharvil's Photo)
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={config.heroImageUrl}
                    alt="Current Hero Visual"
                    className="w-20 h-20 rounded-xl object-cover border border-zinc-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-2 flex-1">
                    <p className="text-xs text-zinc-400">
                      Upload your natural photograph from your phone or camera to feature as the full-screen hero image.
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        ref={heroFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleHeroFileUpload}
                      />
                      <button
                        type="button"
                        onClick={() => heroFileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload My Photo</span>
                      </button>

                      <input
                        type="text"
                        value={config.heroImageUrl}
                        onChange={(e) => updateConfig({ heroImageUrl: e.target.value })}
                        placeholder="Or paste photo URL"
                        className="flex-1 px-3 py-1.5 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Creator Name & Subtext */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                    DISPLAY NAME
                  </label>
                  <input
                    type="text"
                    value={config.creatorName}
                    onChange={(e) => updateConfig({ creatorName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                    SUBTEXT PILL
                  </label>
                  <input
                    type="text"
                    value={config.heroSubtext}
                    onChange={(e) => updateConfig({ heroSubtext: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Main Tagline */}
              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                  MAIN TAGLINE
                </label>
                <input
                  type="text"
                  value={config.heroTagline}
                  onChange={(e) => updateConfig({ heroTagline: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none"
                />
              </div>

              {/* Instagram Handle & URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                    INSTAGRAM HANDLE
                  </label>
                  <input
                    type="text"
                    value={config.instagramHandle}
                    onChange={(e) => updateConfig({ instagramHandle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                    LOCATION / BASE
                  </label>
                  <input
                    type="text"
                    value={config.location || 'NAVI MUMBAI'}
                    onChange={(e) => updateConfig({ location: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none"
                    placeholder="NAVI MUMBAI"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                  INSTAGRAM PROFILE LINK
                </label>
                <input
                  type="text"
                  value={config.instagramUrl}
                  onChange={(e) => updateConfig({ instagramUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none"
                />
              </div>

              {/* Broadcast Channel Link */}
              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                  BROADCAST CHANNEL LINK
                </label>
                <input
                  type="text"
                  value={config.broadcastChannelUrl}
                  onChange={(e) => updateConfig({ broadcastChannelUrl: e.target.value })}
                  placeholder="https://ig.me/j/thelifeofsharvil/"
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none"
                />
              </div>

              {/* Professional Email */}
              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                  COLLABORATION / CONTACT EMAIL
                </label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => updateConfig({ email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: INSTAGRAM CONTENT */}
          {activeTab === 'instagram' && (
            <div className="space-y-6">
              {/* Add IG content card */}
              <div className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 space-y-4">
                <h3 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" />
                  Add Instagram Reel / Post Card
                </h3>

                <form onSubmit={handleCreateIgPost} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        TITLE *
                      </label>
                      <input
                        type="text"
                        required
                        value={igTitle}
                        onChange={(e) => setIgTitle(e.target.value)}
                        placeholder="e.g. 4AM Sunrise Chase"
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        TYPE
                      </label>
                      <select
                        value={igType}
                        onChange={(e) => setIgType(e.target.value as 'reel' | 'post')}
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white focus:outline-none"
                      >
                        <option value="reel">Instagram Reel</option>
                        <option value="post">Instagram Post</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                      THUMBNAIL IMAGE (URL OR FILE) *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={igThumbnail}
                        onChange={(e) => setIgThumbnail(e.target.value)}
                        placeholder="Paste image link or upload"
                        className="flex-1 px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono"
                      />
                      <input
                        ref={igFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleIgFileUpload}
                      />
                      <button
                        type="button"
                        onClick={() => igFileInputRef.current?.click()}
                        className="px-3 py-2 text-xs font-mono bg-zinc-800 text-zinc-200 rounded-lg"
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        POST/REEL LINK
                      </label>
                      <input
                        type="text"
                        value={igUrl}
                        onChange={(e) => setIgUrl(e.target.value)}
                        placeholder="https://www.instagram.com/p/..."
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        VIEWS OR LIKES DISPLAY
                      </label>
                      <input
                        type="text"
                        value={igViews}
                        onChange={(e) => setIgViews(e.target.value)}
                        placeholder="e.g. 84.5K views"
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                      SHORT CAPTION
                    </label>
                    <input
                      type="text"
                      value={igCaption}
                      onChange={(e) => setIgCaption(e.target.value)}
                      placeholder="Caption text as posted on IG..."
                      className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-mono uppercase font-semibold text-black bg-white rounded-full hover:bg-zinc-200"
                    >
                      + Add Instagram Card
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing IG Posts List */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Current Instagram Cards ({instagramPosts.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto">
                  {instagramPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-12 h-12 rounded object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-medium text-white truncate">{post.title}</p>
                          <p className="text-[10px] font-mono text-zinc-500">
                            {post.type.toUpperCase()} • {post.likesOrViews}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteInstagramPost(post.id)}
                        className="p-2 text-zinc-500 hover:text-red-400 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXCLUSIVE VAULT */}
          {activeTab === 'exclusive' && (
            <div className="space-y-6">
              {/* Add Exclusive item */}
              <div className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 space-y-4">
                <h3 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" />
                  Add Not On Instagram / Vault Item
                </h3>

                <form onSubmit={handleCreateExclusive} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        TITLE *
                      </label>
                      <input
                        type="text"
                        required
                        value={exTitle}
                        onChange={(e) => setExTitle(e.target.value)}
                        placeholder="e.g. Uncut Midnight Rooftop"
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        TYPE
                      </label>
                      <select
                        value={exType}
                        onChange={(e) => setExType(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white"
                      >
                        <option value="Unposted Photo">Unposted Photo</option>
                        <option value="Exclusive Nature Shot">Exclusive Nature Shot</option>
                        <option value="Camera Roll">Camera Roll</option>
                        <option value="Behind The Scenes">Behind The Scenes</option>
                        <option value="Personal Photo">Personal Photo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                      IMAGE (URL OR FILE) *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={exUrl}
                        onChange={(e) => setExUrl(e.target.value)}
                        placeholder="Paste image link or upload"
                        className="flex-1 px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white font-mono"
                      />
                      <input
                        ref={exFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleExFileUpload}
                      />
                      <button
                        type="button"
                        onClick={() => exFileInputRef.current?.click()}
                        className="px-3 py-2 text-xs font-mono bg-zinc-800 text-zinc-200 rounded-lg"
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        DATE / ROLL
                      </label>
                      <input
                        type="text"
                        value={exDate}
                        onChange={(e) => setExDate(e.target.value)}
                        placeholder="e.g. Feb 2026"
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        CONFIDENTIAL NOTE / WHY KEPT OFF FEED
                      </label>
                      <input
                        type="text"
                        value={exNote}
                        onChange={(e) => setExNote(e.target.value)}
                        placeholder="Personal note for those who unlock this..."
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-mono uppercase font-semibold text-black bg-white rounded-full hover:bg-zinc-200"
                    >
                      + Save to Vault
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Vault Items */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Current Vault Items ({exclusiveItems.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto">
                  {exclusiveItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-12 h-12 rounded object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-medium text-white truncate">{item.title}</p>
                          <p className="text-[10px] font-mono text-zinc-500 truncate">
                            {item.type} • {item.date}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteExclusiveItem(item.id)}
                        className="p-2 text-zinc-500 hover:text-red-400 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STATS & ABOUT */}
          {activeTab === 'stats' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                  ABOUT ME STATEMENT
                </label>
                <textarea
                  rows={4}
                  value={config.aboutText}
                  onChange={(e) => updateConfig({ aboutText: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-zinc-800 rounded-lg text-white focus:outline-none"
                />
              </div>

              <div className="border-t border-zinc-800 pt-4 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Interactive Statistic Cards
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Photos */}
                  <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">PHOTOS CARD</span>
                    <input
                      type="text"
                      value={config.stats.photosCount}
                      onChange={(e) =>
                        updateConfig({
                          stats: { ...config.stats, photosCount: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 text-xs bg-black/60 border border-zinc-800 rounded text-white"
                      placeholder="Count (e.g. 480+)"
                    />
                    <input
                      type="text"
                      value={config.stats.photosDesc}
                      onChange={(e) =>
                        updateConfig({
                          stats: { ...config.stats, photosDesc: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 text-[11px] bg-black/60 border border-zinc-800 rounded text-zinc-300"
                      placeholder="Description"
                    />
                  </div>

                  {/* Reels */}
                  <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">REELS CARD</span>
                    <input
                      type="text"
                      value={config.stats.reelsCount}
                      onChange={(e) =>
                        updateConfig({
                          stats: { ...config.stats, reelsCount: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 text-xs bg-black/60 border border-zinc-800 rounded text-white"
                      placeholder="Count (e.g. 120+)"
                    />
                    <input
                      type="text"
                      value={config.stats.reelsDesc}
                      onChange={(e) =>
                        updateConfig({
                          stats: { ...config.stats, reelsDesc: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 text-[11px] bg-black/60 border border-zinc-800 rounded text-zinc-300"
                      placeholder="Description"
                    />
                  </div>

                  {/* Places */}
                  <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">PLACES CARD</span>
                    <input
                      type="text"
                      value={config.stats.placesCount}
                      onChange={(e) =>
                        updateConfig({
                          stats: { ...config.stats, placesCount: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 text-xs bg-black/60 border border-zinc-800 rounded text-white"
                      placeholder="Count (e.g. 34+)"
                    />
                    <input
                      type="text"
                      value={config.stats.placesDesc}
                      onChange={(e) =>
                        updateConfig({
                          stats: { ...config.stats, placesDesc: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 text-[11px] bg-black/60 border border-zinc-800 rounded text-zinc-300"
                      placeholder="Description"
                    />
                  </div>

                  {/* Memories */}
                  <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">MEMORIES CARD</span>
                    <input
                      type="text"
                      value={config.stats.memoriesCount}
                      onChange={(e) =>
                        updateConfig({
                          stats: { ...config.stats, memoriesCount: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 text-xs bg-black/60 border border-zinc-800 rounded text-white"
                      placeholder="Count (e.g. ∞)"
                    />
                    <input
                      type="text"
                      value={config.stats.memoriesDesc}
                      onChange={(e) =>
                        updateConfig({
                          stats: { ...config.stats, memoriesDesc: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 text-[11px] bg-black/60 border border-zinc-800 rounded text-zinc-300"
                      placeholder="Description"
                    />
                  </div>
                </div>
              </div>

              {/* Reset to defaults */}
              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-zinc-300">Reset Content</p>
                  <p className="text-[11px] text-zinc-500">Restore default initial photography and settings</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Restore default curated data? Any custom added items will be replaced.')) {
                      resetToDefaults();
                      showNotification('Reset to defaults completed.');
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-red-400 border border-zinc-800 rounded-lg hover:bg-zinc-900"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Studio Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            Changes save automatically to your browser session
          </span>
          <button
            onClick={closeStudio}
            className="px-5 py-2 text-xs font-mono uppercase font-semibold text-black bg-white rounded-full hover:bg-zinc-200 transition-colors"
          >
            Done & View Site
          </button>
        </div>
      </div>
    </div>
  );
};
