"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Star,
  Shield,
  Share2,
  QrCode,
  ChevronRight,
  CheckCircle2,
  Calendar,
  HardDrive,
  Smartphone,
  Users,
  MessageSquare,
  ThumbsUp,
  Clock,
  Package,
  Cpu,
  Globe,
  Info,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */
export interface AppDetails {
  id: string;
  name: string;
  developer: string;
  icon: string;
  iconBg: string;
  rating: number;
  totalReviews: number;
  totalDownloads: string;
  size: string;
  ageRating: string;
  androidVersion: string;
  category: string;
  packageName: string;
  version: string;
  releaseDate: string;
  updatedDate: string;
  description: string;
  screenshots: Screenshot[];
  versions: AppVersion[];
  reviews: Review[];
  permissions: number;
  sha1Signature: string;
  minScreen: string;
  supportedCpu: string;
  isTrusted: boolean;
}

export interface Screenshot {
  id: string;
  url: string;
  label: string;
}

export interface AppVersion {
  version: string;
  date: string;
  downloads: string;
  size: string;
  isLatest: boolean;
  isVerified: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

/* ═══════════════════════════════════════════════════════════
   SAMPLE DATA (VidMate-style for demo)
   ═══════════════════════════════════════════════════════════ */
export const sampleAppDetails: AppDetails = {
  id: "vidmate-1",
  name: "VidMate",
  developer: "VidMate Studio",
  icon: "▶️",
  iconBg: "bg-gradient-to-br from-red-500 to-orange-500",
  rating: 4.47,
  totalReviews: 53,
  totalDownloads: "1M+",
  size: "34.5MB",
  ageRating: "PEGI 3",
  androidVersion: "5.1+",
  category: "Video Players & Editors",
  packageName: "com.video.fun.app",
  version: "6.0102",
  releaseDate: "2026-06-28",
  updatedDate: "12/5/2026",
  description: `VidMate app is a free video downloader for Android that works with many different social platforms, including YouTube, TikTok, WhatsApp, among others.

With VidMate, you'll be able to download any multimedia material (videos, pictures, or audio files) to your Android device at no cost. Just with a couple of taps, you can get that amazing YouTube music video, useful Facebook tutorials, or popular TikTok recipes or choreographies in just a few seconds. With this amazing feature, you'll be able to play them later without using any allowance of your data plan. This is a great way of saving data and money while having your favorite content available at all times.

Once you download the VidMate app, you'll realize it's compatible with a lot of different and popular platforms, including YouTube, TikTok, Facebook, WhatsApp Status, Dailymotion, Vimeo, Twitter, LiveLeak, Instagram... You've got almost everything. Also, VidMate works on Internet browsers, so feel free to watch, enjoy and download your favorite content directly from your browser.

VidMate is an extremely easy-to-use tool. You'll realize that a tutorial is not needed and, once you download it and open it, you'll easily understand the way VidMate works and you'll start downloading videos, pictures, and songs in a matter of seconds. The experience is so smooth that you can download several videos at the same time. This way you'll save some time and, as said, a lot of data from your mobile data plan! You can also, pause and resume the download process in case you're Wi-Fi connection is interrupted for any reason. These downloads take place in the background, but you'll always be able to check the progress at any time.

The amount of formats you can download videos on is amazing, from lower-resolution 2K clips to amazing 4K ones, VidMate will for sure meet your quality requirements and adapt to your needs. This option is not only crucial for you to manage your device memory but also to enjoy the content in the best way possible on your device. VidMate offers an automatic system to adjust videos to best suit your screen size. This way you can relax and let VidMate make this decision for you!

VidMate app also works with other types of content apart from videos, including pictures and audio. You can download high-resolution pictures and memes very quickly but also songs in a lot of formats, including mp3! If you were worried about using too much data to listen to your favorite playlist, you can just download those songs at a very high speed via WiFi to enjoy them without using your allowance!`,
  screenshots: [
    { id: "s1", url: "/api/placeholder/200/400", label: "Support 1000+ Sites" },
    { id: "s2", url: "/api/placeholder/200/400", label: "Audio & Video Download In High Quality" },
    { id: "s3", url: "/api/placeholder/200/400", label: "Smoother & Faster" },
    { id: "s4", url: "/api/placeholder/200/400", label: "Videos Improved" },
    { id: "s5", url: "/api/placeholder/200/400", label: "Download Top Movies" },
    { id: "s6", url: "/api/placeholder/200/400", label: "Support Batch Downloads" },
    { id: "s7", url: "/api/placeholder/200/400", label: "Reading Video Player" },
    { id: "s8", url: "/api/placeholder/200/400", label: "Categorize Your Downloaded Files" },
  ],
  versions: [
    { version: "6.0102", date: "12/5/2026", downloads: "1M", size: "34.5 MB", isLatest: true, isVerified: true },
    { version: "5.3485", date: "30/7/2026", downloads: "1M", size: "33.5 MB", isLatest: false, isVerified: true },
    { version: "5.3431", date: "3/12/2025", downloads: "1M", size: "33 MB", isLatest: false, isVerified: true },
    { version: "5.3241", date: "12/6/2025", downloads: "1M", size: "31.5 MB", isLatest: false, isVerified: true },
    { version: "5.0498", date: "28/10/2022", downloads: "850K", size: "29 MB", isLatest: false, isVerified: true },
  ],
  reviews: [
    { id: "r1", userName: "TechMaster_2024", userAvatar: "👨‍💻", rating: 5, date: "924 days ago", comment: "Good", likes: 24 },
    { id: "r2", userName: "Darlington", userAvatar: "🧑‍💼", rating: 5, date: "1290 days ago", comment: "good", likes: 18 },
    { id: "r3", userName: "denno", userAvatar: "👤", rating: 4, date: "459 days ago", comment: "I give it one star....to me it's boring It's too slow despite having good Internet connection and a good phone.....its high time they check on that and I will improve my rating.", likes: 12 },
    { id: "r4", userName: "Luaye", userAvatar: "👩", rating: 5, date: "478 days ago", comment: "good app", likes: 8 },
    { id: "r5", userName: "fahadzeb", userAvatar: "👨", rating: 5, date: "924 days ago", comment: "nice", likes: 6 },
    { id: "r6", userName: "HTOOSAN", userAvatar: "🧔", rating: 5, date: "1059 days ago", comment: "VERY VERY GOOD 👍👍👍 VIDMATE 🎉", likes: 15 },
  ],
  permissions: 31,
  sha1Signature: "1B:B9:14:17:6F:EB:71:9E:72:18:E0:FE:4A:7E:22:F8:8B:EC:7E:3C",
  minScreen: "SMALL",
  supportedCpu: "arm64-v7a, arm64-v8a",
  isTrusted: true,
};

/* ═══════════════════════════════════════════════════════════
   STAR RATING COMPONENT
   ═══════════════════════════════════════════════════════════ */
function StarRating({ rating, size = "sm", showValue = false }: { rating: number; size?: "sm" | "md" | "lg"; showValue?: boolean }) {
  const stars = [1, 2, 3, 4, 5];
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : size === "md" ? "w-5 h-5" : "w-6 h-6";
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars.map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="font-semibold text-lg ml-1">{rating.toFixed(2)}</span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCREENSHOT CARD COMPONENT
   ═══════════════════════════════════════════════════════════ */
function ScreenshotCard({ screenshot }: { screenshot: Screenshot }) {
  return (
    <div className="flex-shrink-0 w-[140px] group cursor-pointer">
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 aspect-[9/19] shadow-md ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02] group-hover:ring-orange-300/50">
        {/* Simulated phone frame */}
        <div className="absolute inset-0 flex flex-col">
          {/* Phone notch area */}
          <div className="h-4 bg-black/80 flex items-center justify-center">
            <div className="w-12 h-1.5 bg-black rounded-full" />
          </div>
          {/* Screen content area - gradient placeholder */}
          <div className={`flex-1 ${screenshot.iconBg || 'bg-gradient-to-br from-orange-400 to-red-500'} flex items-center justify-center p-2`}>
            <span className="text-white/90 text-xs font-medium text-center leading-tight">{screenshot.label}</span>
          </div>
          {/* Home indicator */}
          <div className="h-3 bg-black/80 flex items-center justify-center">
            <div className="w-8 h-1 bg-white/50 rounded-full" />
          </div>
        </div>
        {/* Label overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6">
          <p className="text-white text-[9px] font-medium line-clamp-2 leading-tight">{screenshot.label}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   REVIEW ITEM COMPONENT
   ═══════════════════════════════════════════════════════════ */
function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-start gap-3">
        {/* User Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-lg shadow-sm">
          {review.userAvatar}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* User Info Row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate max-w-[150px]">
              {review.userName}
            </span>
            <StarRating rating={review.rating} size="sm" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
          </div>
          
          {/* Comment */}
          <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
            {review.comment}
          </p>
          
          {/* Actions */}
          <div className="mt-2 flex items-center gap-3">
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-500 transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{review.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   VERSION ROW COMPONENT
   ═══════════════════════════════════════════════════════════ */
function VersionRow({ version, onDownload }: { version: AppVersion; onDownload: (v: string) => void }) {
  return (
    <div className={`flex items-center gap-4 py-4 px-4 rounded-xl transition-colors ${
      version.isLatest 
        ? 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/10 border border-orange-200/50 dark:border-orange-800/30' 
        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
    }`}>
      {/* App Icon */}
      <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl shadow-lg ${version.isLatest ? 'ring-2 ring-orange-300' : ''}`}>
        ▶️
      </div>
      
      {/* Version Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base text-gray-900 dark:text-gray-100">{version.version}</span>
          {version.isVerified && (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          )}
          {version.isLatest && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] px-1.5 py-0">LATEST</Badge>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span>{version.date}</span>
          <span>•</span>
          <span>{version.downloads} downloads</span>
          <span>•</span>
          <span>{version.size} Size</span>
        </div>
      </div>
      
      {/* Download Button */}
      <Button 
        onClick={() => onDownload(version.version)}
        variant="ghost"
        className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20 font-semibold text-sm"
      >
        DOWNLOAD
      </Button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INFO FIELD COMPONENT
   ═══════════════════════════════════════════════════════════ */
function InfoField({ label, value, icon: Icon }: { label: string; value: string | React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-center gap-2 sm:w-40 flex-shrink-0">
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}:</span>
      </div>
      <span className="text-sm text-gray-900 dark:text-gray-100 break-all">{value}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RATING DISTRIBUTION BAR
   ═══════════════════════════════════════════════════════════ */
function RatingBar({ stars, count, maxCount, percentage }: { stars: number; count: number; maxCount: number; percentage: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-3 text-sm text-gray-600 dark:text-gray-400 font-medium">{stars}</span>
      <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-sm text-gray-500 dark:text-gray-400 text-right">{count}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP DETAILS PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
interface AppDetailsPageProps {
  app: AppDetails;
  onDownload?: (version?: string) => void;
  onBack?: () => void;
}

export function AppDetailsPage({ app, onDownload, onBack }: AppDetailsPageProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Calculate rating distribution
  const ratingDistribution = [
    { stars: 5, count: 28, percentage: 52.8 },
    { stars: 4, count: 15, percentage: 28.3 },
    { stars: 3, count: 6, percentage: 11.3 },
    { stars: 2, count: 3, percentage: 5.7 },
    { stars: 1, count: 1, percentage: 1.9 },
  ];

  const handleDownload = async (version?: string) => {
    setIsDownloading(true);
    // Simulate download preparation
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (onDownload) {
      onDownload(version || app.version);
    }
    setIsDownloading(false);
    
    // Show success toast or trigger actual download
    alert(`Starting download: ${app.name} v${version || app.version}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ═══ BREADCRUMB ═══ */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            {onBack && (
              <button onClick={onBack} className="hover:text-orange-500 transition-colors flex items-center gap-1">
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>
            )}
            <ChevronRight className="w-4 h-4" />
            <span>Homepage</span>
            <ChevronRight className="w-4 h-4" />
            <span>Android Apps</span>
            <ChevronRight className="w-4 h-4" />
            <span>{app.category}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-500 font-medium">{app.name}</span>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* ═══ APP HEADER SECTION ═══ */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Icon + Basic Info */}
            <div className="flex flex-col sm:flex-row gap-5 lg:w-2/3">
              {/* App Icon */}
              <div className="flex-shrink-0">
                <div className={`w-28 h-28 rounded-3xl ${app.iconBg} flex items-center justify-center text-5xl shadow-xl ring-4 ring-white/50`}>
                  {app.icon}
                </div>
              </div>

              {/* App Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {app.name}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      by {app.developer}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {app.isTrusted && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-full">
                        <Shield className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Trusted</span>
                      </div>
                    )}
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <QrCode className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-2">
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Downloads</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{app.totalDownloads}</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Rating</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <StarRating rating={app.rating} size="sm" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{app.rating.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Size</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{app.size}</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Age</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{app.ageRating}</p>
                  </div>
                  <div className="text-center sm:text-left col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Android Version</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{app.androidVersion}</p>
                  </div>
                </div>

                {/* Download Button */}
                <Button
                  onClick={() => handleDownload()}
                  disabled={isDownloading}
                  className="w-full mt-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 text-base rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.98]"
                >
                  {isDownloading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Preparing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      DOWNLOAD WITH APPSTORE
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SCREENSHOTS GALLERY ═══ */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Screenshots</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {app.screenshots.map((screenshot) => (
              <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
            ))}
          </div>
        </div>

        {/* ═══ TABS SECTION ═══ */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Tab Navigation */}
          <TabsList className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 rounded-none p-0 h-auto gap-0">
            <TabsTrigger 
              value="details" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:bg-transparent px-6 py-4 text-sm font-medium"
            >
              Details
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:bg-transparent px-6 py-4 text-sm font-medium"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger 
              value="versions" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:bg-transparent px-6 py-4 text-sm font-medium"
            >
              Versions
            </TabsTrigger>
            <TabsTrigger 
              value="info" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:bg-transparent px-6 py-4 text-sm font-medium"
            >
              Info
            </TabsTrigger>
          </TabsList>

          {/* ═══ DETAILS TAB ═══ */}
          <TabsContent value="details" className="p-6 mt-0">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Description of {app.name}
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line space-y-4">
                {app.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Security Verified</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This app has been scanned for malware and viruses. No threats detected.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Regular Updates</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This app receives regular updates with new features and bug fixes.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* ═══ REVIEWS TAB ═══ */}
          <TabsContent value="reviews" className="p-6 mt-0">
            {/* Rating Summary Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                These reviews and ratings come from AppStore users. To leave your own, please{" "}
                <span className="text-orange-500 cursor-pointer hover:underline font-medium">install the app</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Overall Rating */}
                <div className="text-center sm:text-left">
                  <div className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                    {app.rating.toFixed(2)}
                  </div>
                  <StarRating rating={app.rating} size="md" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {app.totalReviews} Reviews
                  </p>
                </div>
                
                {/* Rating Distribution */}
                <div className="flex-1 w-full space-y-2">
                  {ratingDistribution.map((item) => (
                    <RatingBar 
                      key={item.stars} 
                      stars={item.stars} 
                      count={item.count} 
                      maxCount={28} 
                      percentage={item.percentage} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                User Reviews of {app.name}
              </h3>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {app.reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
              
              {/* Load More Button */}
              <div className="mt-6 text-center">
                <Button variant="outline" className="text-orange-500 border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                  Load More Reviews
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* ═══ VERSIONS TAB ═══ */}
          <TabsContent value="versions" className="p-6 mt-0">
            {/* Latest Version Section */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Latest Version of {app.name}
              </h3>
              {app.versions.filter(v => v.isLatest).map((version) => (
                <VersionRow key={version.version} version={version} onDownload={handleDownload} />
              ))}
            </div>

            {/* Other Versions */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Other Versions
              </h3>
              <div className="space-y-2">
                {app.versions.filter(v => !v.isLatest).map((version) => (
                  <VersionRow key={version.version} version={version} onDownload={handleDownload} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ═══ INFO TAB ═══ */}
          <TabsContent value="info" className="p-6 mt-0">
            {/* APK Information Header */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {app.name} - APK Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-1">
                <InfoField label="APK Version" value={app.version} />
                <InfoField label="Package" value={app.packageName} />
                <InfoField label="Android compatibility" value={`${app.androidVersion} (Lollipop)`} />
                <InfoField label="Developer" value={app.developer} />
                <InfoField 
                  label="Permissions" 
                  value={
                    <span className="text-orange-500 cursor-pointer hover:underline font-medium">
                      {app.permissions}
                    </span>
                  } 
                />
              </div>
            </div>

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div className="space-y-0">
                <InfoField label="Name" value={app.name} />
                <InfoField label="Size" value={app.size} icon={HardDrive} />
                <InfoField label="Downloads" value={app.totalDownloads} icon={Users} />
                <InfoField label="Version" value={app.version} icon={Package} />
                <InfoField label="Release Date" value={app.releaseDate + " 06:41:53"} icon={Calendar} />
                <InfoField label="Min Screen" value={app.minScreen} icon={Smartphone} />
                <InfoField label="Supported CPU" value={app.supportedCpu} icon={Cpu} />
              </div>
              
              <div className="space-y-0">
                <InfoField label="Package ID" value={app.packageName} />
                <InfoField label="SHA1 Signature" value={app.sha1Signature} />
                <InfoField label="Developer (CN)" value="fun" />
                <InfoField label="Organization" value="fun" />
                <InfoField label="Local (L)" value="fun" />
                <InfoField label="Country (C)" value="fun" />
                <InfoField label="State/City (ST)" value="fun" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* ═══ SIMILAR APPS SECTION ═══ */}
        <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">You May Also Like</h2>
            <button className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "TubeMate", icon: "📺", bg: "bg-red-500", rating: 4.3 },
              { name: "Snaptube", icon: "🎬", bg: "bg-yellow-500", rating: 4.5 },
              { name: "YTD Video", icon: "⬇️", bg: "bg-blue-500", rating: 4.1 },
              { name: "InsTube", icon: "📥", bg: "bg-green-500", rating: 4.2 },
              { name: "Videoder", icon: "🎥", bg: "bg-purple-500", rating: 4.4 },
              { name: "YT Saver", icon: "💾", bg: "bg-indigo-500", rating: 4.0 },
            ].map((similarApp, idx) => (
              <button 
                key={idx}
                className="group p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-center"
              >
                <div className={`w-16 h-16 mx-auto ${similarApp.bg} rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:shadow-lg transition-shadow mb-2`}>
                  {similarApp.icon}
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{similarApp.name}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500">{similarApp.rating}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppDetailsPage;
