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
  ChevronRight,
  CheckCircle2,
  Calendar,
  HardDrive,
  Smartphone,
  Users,
  ThumbsUp,
  Package,
  Cpu,
  Info,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
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
   SAMPLE DATA (Play Store Style)
   ═══════════════════════════════════════════════════════════ */
export const sampleAppDetails: AppDetails = {
  id: "vidmate-1",
  name: "VidMate",
  developer: "VidMate Studio",
  icon: "▶️",
  iconBg: "bg-red-500",
  rating: 4.47,
  totalReviews: 53421,
  totalDownloads: "100M+",
  size: "34.5MB",
  ageRating: "PEGI 3",
  androidVersion: "5.1+",
  category: "Video Players & Editors",
  packageName: "com.video.fun.app",
  version: "6.0102",
  releaseDate: "2026-06-28",
  updatedDate: "Dec 5, 2026",
  description: `VidMate app is a free video downloader for Android that works with many different social platforms, including YouTube, TikTok, WhatsApp, among others.

With VidMate, you'll be able to download any multimedia material (videos, pictures, or audio files) to your Android device at no cost. Just with a couple of taps, you can get that amazing YouTube music video, useful Facebook tutorials, or popular TikTok recipes or choreographies in just a few seconds.

Key Features:

• Download videos from 1000+ sites including YouTube, Facebook, Instagram, TikTok, Twitter, Vimeo, Dailymotion and more

• Multiple format support - download in MP4, WebM, MP3, M4A formats

• Quality selection - choose from 240p to 4K resolution based on your needs

• Fast download speed with pause and resume support

• Batch download multiple videos simultaneously

• Built-in video player to watch downloaded content

• Background download support - continue using your phone while downloading

• Smart detection - automatically detect downloadable media on web pages

Once you download the VidMate app, you'll realize it's compatible with a lot of different and popular platforms. Also, VidMate works on Internet browsers, so feel free to watch, enjoy and download your favorite content directly from your browser.

VidMate is an extremely easy-to-use tool. You'll realize that a tutorial is not needed and, once you download it and open it, you'll easily understand the way VidMate works and you'll start downloading videos, pictures, and songs in a matter of seconds.`,
  screenshots: [
    { id: "s1", url: "/api/placeholder/400/800", label: "Home Screen" },
    { id: "s2", url: "/api/placeholder/400/800", label: "Video Download" },
    { id: "s3", url: "/api/placeholder/400/800", label: "Download Progress" },
    { id: "s4", url: "/api/placeholder/400/800", label: "Video Player" },
    { id: "s5", url: "/api/placeholder/400/800", label: "Settings" },
    { id: "s6", url: "/api/placeholder/400/800", label: "History" },
  ],
  versions: [
    { version: "6.0102", date: "Dec 5, 2026", downloads: "50M+", size: "34.5 MB", isLatest: true, isVerified: true },
    { version: "6.0100", date: "Nov 28, 2026", downloads: "45M+", size: "34.2 MB", isLatest: false, isVerified: true },
    { version: "6.0098", date: "Nov 15, 2026", downloads: "40M+", size: "33.8 MB", isLatest: false, isVerified: true },
    { version: "6.0095", date: "Oct 30, 2026", downloads: "35M+", size: "33.5 MB", isLatest: false, isVerified: true },
    { version: "6.0090", date: "Oct 10, 2026", downloads: "30M+", size: "33.0 MB", isLatest: false, isVerified: true },
  ],
  reviews: [
    { id: "r1", userName: "Alex Thompson", userAvatar: "AT", rating: 5, date: "2 days ago", comment: "Excellent app! Downloads videos super fast and the quality options are amazing. Been using it for months without any issues.", likes: 124 },
    { id: "r2", userName: "Sarah Miller", userAvatar: "SM", rating: 5, date: "3 days ago", comment: "Best video downloader I've ever used. Supports so many websites and the batch download feature is a lifesaver!", likes: 89 },
    { id: "r3", userName: "James Wilson", userAvatar: "JW", rating: 4, date: "1 week ago", comment: "Great app overall. The only reason for 4 stars is sometimes it takes a moment to detect videos on certain sites. But still highly recommended.", likes: 56 },
    { id: "r4", userName: "Emily Chen", userAvatar: "EC", rating: 5, date: "1 week ago", comment: "Love how I can download in different formats and qualities. The built-in player is also really nice. Keep up the great work!", likes: 72 },
    { id: "r5", userName: "Michael Brown", userAvatar: "MB", rating: 5, date: "2 weeks ago", comment: "This app does exactly what it promises. Fast, reliable, and easy to use. The background download feature is perfect.", likes: 45 },
    { id: "r6", userName: "Lisa Anderson", userAvatar: "LA", rating: 4, date: "2 weeks ago", comment: "Very good app for downloading videos. Would love to see a dark mode option in future updates.", likes: 38 },
  ],
  permissions: 12,
  sha1Signature: "1B:B9:14:17:6F:EB:71:9E:72:18:E0:FE:4A:7E:22:F8:8B:EC:7E:3C",
  minScreen: "NORMAL",
  supportedCpu: "arm64-v8a, armeabi-v7a",
  isTrusted: true,
};

/* ═══════════════════════════════════════════════════════════
   STAR RATING COMPONENT (Play Store Style)
   ═══════════════════════════════════════════════════════════ */
function StarRating({ rating, size = "sm", showValue = false }: { rating: number; size?: "sm" | "md" | "lg"; showValue?: boolean }) {
  const stars = [1, 2, 3, 4, 5];
  const sizeClass = size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";
  
  return (
    <div className="flex items-center gap-0.5">
      {stars.map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= Math.round(rating)
              ? "fill-[#fbbc04] text-[#fbbc04]"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      {showValue && (
        <span className="font-medium text-gray-900 ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCREENSHOT CARD (Play Store Style)
   ═══════════════════════════════════════════════════════════ */
function ScreenshotCard({ screenshot, isActive = false }: { screenshot: Screenshot; isActive?: boolean }) {
  return (
    <button 
      className={`flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
        isActive 
          ? 'border-blue-500 shadow-lg scale-[1.02]' 
          : 'border-transparent hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="w-[160px] bg-gray-100 aspect-[9/19] flex items-center justify-center">
        <span className="text-xs text-gray-500 font-medium px-4 text-center">{screenshot.label}</span>
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   REVIEW ITEM (Play Store Style)
   ═══════════════════════════════════════════════════════════ */
function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="py-6 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            {review.userAvatar}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{review.userName}</p>
            <StarRating rating={review.rating} size="sm" />
          </div>
        </div>
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>
      
      <p className="text-sm text-gray-700 leading-relaxed mt-3 pl-13">{review.comment}</p>
      
      <div className="flex items-center gap-4 mt-3 pl-13">
        <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-blue-600 transition-colors">
          <ThumbsUp className="w-4 h-4" />
          <span>{review.likes}</span>
        </button>
        <button className="text-xs text-gray-600 hover:text-blue-600 transition-colors">Reply</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   VERSION ROW (Play Store Style)
   ═══════════════════════════════════════════════════════════ */
function VersionRow({ version, onDownload }: { version: AppVersion; onDownload: (v: string) => void }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
      version.isLatest 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <div className={`w-12 h-12 rounded-xl ${version.isLatest ? 'bg-green-500' : 'bg-gray-200'} flex items-center justify-center text-lg`}>
        ▶️
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{version.version}</span>
          {version.isLatest && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-0">Latest</Badge>
          )}
          {version.isVerified && (
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          <span>{version.date}</span>
          <span>•</span>
          <span>{version.downloads} downloads</span>
          <span>•</span>
          <span>{version.size}</span>
        </div>
      </div>
      
      <Button 
        onClick={() => onDownload(version.version)}
        variant={version.isLatest ? "default" : "outline"}
        className={version.isLatest ? "bg-green-600 hover:bg-green-700" : ""}
      >
        Download
      </Button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INFO FIELD (Play Store Style)
   ═══════════════════════════════════════════════════════════ */
function InfoField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex py-3 border-b border-gray-100 last:border-0">
      <span className="w-32 text-sm text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-900 break-all">{value}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RATING BAR (Play Store Style)
   ═══════════════════════════════════════════════════════════ */
function RatingBar({ stars, percentage }: { stars: number; percentage: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 text-sm text-gray-600 font-medium">{stars}</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#fbbc04] rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURE CARD (Bento Grid Item)
   ═══════════════════════════════════════════════════════════ */
function FeatureCard({ icon: Icon, title, description, color = "blue" }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; color?: string }) {
  const colorClasses: Record<string, { bg: string; icon: string }> = {
    blue: { bg: "bg-blue-50", icon: "text-blue-600" },
    green: { bg: "bg-green-50", icon: "text-green-600" },
    purple: { bg: "bg-purple-50", icon: "text-purple-600" },
    orange: { bg: "bg-orange-50", icon: "text-orange-600" },
    red: { bg: "bg-red-50", icon: "text-red-600" },
  };
  
  const colors = colorClasses[color] || colorClasses.blue;
  
  return (
    <div className={`p-5 rounded-2xl ${colors.bg} border border-gray-100`}>
      <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${colors.icon}`} />
      </div>
      <h4 className="font-semibold text-gray-900 text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIMILAR APP CARD (Bento Grid)
   ═══════════════════════════════════════════════════════════ */
function SimilarAppCard({ name, icon, bg, rating, developer }: { name: string; icon: string; bg: string; rating: number; developer: string }) {
  return (
    <button className="group p-4 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left w-full">
      <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <h4 className="font-semibold text-gray-900 text-sm truncate">{name}</h4>
      <p className="text-xs text-gray-500 truncate">{developer}</p>
      <div className="flex items-center gap-1 mt-2">
        <Star className="w-3.5 h-3.5 fill-[#fbbc04] text-[#fbbc04]" />
        <span className="text-xs font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP DETAILS PAGE (PLAY STORE + BENTO GRID STYLE)
   ═══════════════════════════════════════════════════════════ */
interface AppDetailsPageProps {
  app: AppDetails;
  onDownload?: (version?: string) => void;
  onBack?: () => void;
}

export function AppDetailsPage({ app, onDownload, onBack }: AppDetailsPageProps) {
  const [activeTab, setActiveTab] = useState("about");
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  
  // Rating distribution data
  const ratingDistribution = [
    { stars: 5, percentage: 68 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 8 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 1 },
  ];

  const handleDownload = async (version?: string) => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    if (onDownload) {
      onDownload(version || app.version);
    }
    setIsDownloading(false);
    alert(`📥 Download Started\n\nApp: ${app.name}\nVersion: ${version || app.version}\nSize: ${app.size}`);
  };

  /* ════════════════════════════════════════════════════════
     PLAY STORE LAYOUT
     ════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ─── TOP BAR ─── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search apps & games"
                className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 border-0 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-5xl mx-auto pb-8">
        
        {/* ═══ APP HEADER (Hero Section) ═══ */}
        <section className="bg-white px-6 pt-6 pb-0">
          <div className="flex gap-6">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className={`w-20 h-20 ${app.iconBg} rounded-2xl flex items-center justify-center text-4xl shadow-sm`}>
                {app.icon}
              </div>
            </div>

            {/* App Info */}
            <div className="flex-1 min-w-0 pt-1">
              <h1 className="text-2xl font-normal text-gray-900 truncate">{app.name}</h1>
              <p className="text-sm text-[#01875d] mt-0.5">{app.developer}</p>
              
              {/* Contains ads badge would go here - we skip it as requested */}
              
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-900">4.47</span>
                  <Star className="w-4 h-4 fill-[#fbbc04] text-[#fbbc04]" />
                  <span>({app.totalReviews.toLocaleString()} reviews)</span>
                </div>
                <span>•</span>
                <span>{app.totalDownloads} Downloads</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-4">
                <Button
                  onClick={() => handleDownload()}
                  disabled={isDownloading}
                  className="h-11 px-8 bg-[#01875d] hover:bg-[#016e4d] text-white font-medium rounded-full shadow-sm"
                >
                  {isDownloading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Preparing...
                    </span>
                  ) : (
                    "Install"
                  )}
                </Button>
                
                {app.isTrusted && (
                  <div className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SCREENSHOTS CAROUSEL ═══ */}
        <section className="bg-white px-6 py-6 border-b border-gray-100">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {app.screenshots.map((screenshot, idx) => (
              <ScreenshotCard 
                key={screenshot.id} 
                screenshot={screenshot} 
                isActive={idx === activeScreenshot}
              />
            ))}
          </div>
        </section>

        {/* ═══ TABS NAVIGATION ═══ */}
        <section className="bg-white sticky top-14 z-40 border-b border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-transparent border-b-0 p-0 h-auto gap-0">
              <TabsTrigger 
                value="about" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#01875d] data-[state=active]:text-[#01875d] px-4 py-3 text-sm font-medium text-gray-600 data-[state=active]:bg-transparent"
              >
                About this app
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#01875d] data-[state=active]:text-[#01875d] px-4 py-3 text-sm font-medium text-gray-600 data-[state=active]:bg-transparent"
              >
                Ratings & reviews
              </TabsTrigger>
              <TabsTrigger 
                value="versions" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#01875d] data-[state=active]:text-[#01875d] px-4 py-3 text-sm font-medium text-gray-600 data-[state=active]:bg-transparent"
              >
                Versions
              </TabsTrigger>
            </TabsList>

            {/* ═══ ABOUT TAB CONTENT ═══ */}
            <TabsContent value="about" className="px-6 py-6 mt-0">
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-base font-medium text-gray-900 mb-3">About this app</h2>
                <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                  {app.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* BENTO GRID - Features Section */}
              <div className="mb-8">
                <h2 className="text-base font-medium text-gray-900 mb-4">Key Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <FeatureCard 
                    icon={Download} 
                    title="Fast Downloads" 
                    description="Multi-threaded downloading for maximum speed"
                    color="green"
                  />
                  <FeatureCard 
                    icon={Smartphone} 
                    title="Multi-Platform" 
                    description="Supports 1000+ websites and platforms"
                    color="blue"
                  />
                  <FeatureCard 
                    icon={ShieldCheck} 
                    title="Safe & Secure" 
                    description="No malware, verified by our security team"
                    color="purple"
                  />
                  <FeatureCard 
                    icon={RefreshCw} 
                    title="Regular Updates" 
                    description="New features and improvements monthly"
                    color="orange"
                  />
                  <FeatureCard 
                    icon={HardDrive} 
                    title="Multiple Formats" 
                    description="MP4, WebM, MP3, M4A and more"
                    color="red"
                  />
                  <FeatureCard 
                    icon={Smartphone} 
                    title="Background Mode" 
                    description="Download while using other apps"
                    color="blue"
                  />
                </div>
              </div>

              {/* Data Safety - Bento Style */}
              <div className="mb-8">
                <h2 className="text-base font-medium text-gray-900 mb-4">Data safety</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-5 h-5 text-green-600" />
                      <h3 className="font-medium text-gray-900">No data shared with third parties</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      This app doesn't share any user data with other companies or organizations.
                    </p>
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-white border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium text-gray-900">Data encrypted in transit</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Your data is transferred over a secure connection and cannot be read by third parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* App Info Table */}
              <div>
                <h2 className="text-base font-medium text-gray-900 mb-4">App info</h2>
                <div className="rounded-2xl bg-white border border-gray-200 divide-y divide-gray-100">
                  <InfoField label="Version" value={app.version} />
                  <InfoField label="Updated on" value={app.updatedDate} />
                  <InfoField label="Requires Android" value={app.androidVersion} />
                  <InfoField label="Downloads" value={app.totalDownloads} />
                  <InfoField label="Offered By" value={app.developer} />
                  <InfoField label="Developer" value={
                    <button className="text-blue-600 hover:underline flex items-center gap-1">
                      {app.developer}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  } />
                  <InfoField label="Size" value={app.size} />
                  <InfoField label="Content Rating" value={app.ageRating} />
                  <InfoField label="Permissions" value={
                    <button className="text-blue-600 hover:underline">
                      View details ({app.permissions})
                    </button>
                  } />
                </div>
              </div>
            </TabsContent>

            {/* ═══ REVIEWS TAB CONTENT ═══ */}
            <TabsContent value="reviews" className="mt-0">
              {/* Rating Summary - Bento Card */}
              <div className="p-6 bg-white border-b border-gray-100">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Overall Score */}
                  <div className="text-center md:text-left">
                    <div className="text-5xl font-light text-gray-900">{app.rating.toFixed(1)}</div>
                    <StarRating rating={app.rating} size="lg" />
                    <p className="text-sm text-gray-500 mt-2">{app.totalReviews.toLocaleString()} reviews</p>
                  </div>
                  
                  {/* Distribution Bars */}
                  <div className="flex-1 space-y-2 max-w-xs">
                    {ratingDistribution.map((item) => (
                      <RatingBar key={item.stars} stars={item.stars} percentage={item.percentage} />
                    ))}
                  </div>
                  
                  {/* Rating Breakdown */}
                  <div className="space-y-3">
                    <div className="text-center p-4 rounded-xl bg-gray-50">
                      <div className="text-2xl font-medium text-gray-900">5</div>
                      <div className="text-xs text-gray-500">stars</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-gray-50">
                        <div className="text-sm font-medium text-gray-900">68%</div>
                        <div className="text-[10px] text-gray-500">5 star</div>
                      </div>
                      <div className="p-2 rounded-lg bg-gray-50">
                        <div className="text-sm font-medium text-gray-900">20%</div>
                        <div className="text-[10px] text-gray-500">4 star</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Chips */}
              <div className="px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
                <button className="px-4 py-1.5 rounded-full bg-gray-900 text-white text-sm font-medium">All</button>
                <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200">Positive</button>
                <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200">Critical</button>
                <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200">5 ★</button>
                <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200">4 ★</button>
                <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200">3 ★</button>
              </div>

              {/* Reviews List */}
              <div className="px-6 divide-y divide-gray-100">
                {app.reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>

              {/* Load More */}
              <div className="px-6 py-6 text-center">
                <Button variant="outline" className="text-[#01875d] border-[#01875d] hover:bg-[#01875d] hover:text-white rounded-full px-8">
                  See all reviews
                </Button>
              </div>
            </TabsContent>

            {/* ═══ VERSIONS TAB CONTENT ═══ */}
            <TabsContent value="versions" className="px-6 py-6 mt-0">
              {/* Latest Version Highlight */}
              <div className="mb-6">
                <h2 className="text-base font-medium text-gray-900 mb-4">Current Version</h2>
                {app.versions.filter(v => v.isLatest).map((version) => (
                  <VersionRow key={version.version} version={version} onDownload={handleDownload} />
                ))}
              </div>

              {/* Previous Versions */}
              <div>
                <h2 className="text-base font-medium text-gray-900 mb-4">Previous Versions</h2>
                <div className="space-y-3">
                  {app.versions.filter(v => !v.isLatest).map((version) => (
                    <VersionRow key={version.version} version={version} onDownload={handleDownload} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* ═══ SIMILAR APPS (BENTO GRID) ═══ */}
        <section className="px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Similar apps</h2>
            <button className="text-sm text-[#01875d] font-medium flex items-center gap-1 hover:underline">
              See more <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: "TubeMate", icon: "📺", bg: "bg-red-500", rating: 4.3, developer: "TubeMate Dev" },
              { name: "Snaptube", icon: "🎬", bg: "bg-yellow-500", rating: 4.5, developer: "SnapTube Inc" },
              { name: "YTD Video", icon: "⬇️", bg: "bg-blue-500", rating: 4.1, developer: "YTD Team" },
              { name: "InsTube", icon: "📥", bg: "bg-green-500", rating: 4.2, developer: "InsTube Co" },
              { name: "Videoder", icon: "🎥", bg: "bg-purple-500", rating: 4.4, developer: "Videoder Dev" },
              { name: "YT Saver", icon: "💾", bg: "bg-indigo-500", rating: 4.0, developer: "YT Saver Ltd" },
            ].map((similarApp, idx) => (
              <SimilarAppCard key={idx} {...similarApp} />
            ))}
          </div>
        </section>

        {/* ═══ MORE BY DEVELOPER (BENTO GRID) ═══ */}
        <section className="px-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">More by {app.developer}</h2>
            <button className="text-sm text-[#01875d] font-medium flex items-center gap-1 hover:underline">
              See more <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: "VidMate Lite", icon: "⚡", bg: "bg-orange-500", rating: 4.2, developer: app.developer },
              { name: "VidMate Pro", icon: "👑", bg: "bg-amber-500", rating: 4.6, developer: app.developer },
              { name: "VidMate Music", icon: "🎵", bg: "bg-pink-500", rating: 4.3, developer: app.developer },
              { name: "VidMate HD", icon: "📺", bg: "bg-cyan-500", rating: 4.4, developer: app.developer },
            ].map((devApp, idx) => (
              <SimilarAppCard key={idx} {...devApp} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default AppDetailsPage;
