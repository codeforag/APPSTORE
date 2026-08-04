"use client";

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { categorySections, type AppItem } from "@/lib/app-data";
import {
  marketplaceData,
  topNavCategories,
  type CategoryGroup,
  type SubCategory,
  type TopLevelCategory,
} from "@/lib/categories";

/* ═══════════════════════════════════════════════════════════
   VIEW STATES
   ═══════════════════════════════════════════════════════════ */
type ViewMode =
  | { kind: "home" }
  | { kind: "topCategory"; cat: TopLevelCategory }
  | { kind: "categoryGroup"; cat: TopLevelCategory; group: CategoryGroup }
  | { kind: "search"; query: string };

/* ─── Unique per-group visual themes ─── */
const groupThemes: Record<string, { bg: string; iconBg: string; accent: string; border: string; chip: string }> = {
  "AI & Emerging Technology": {
    bg: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/10",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    accent: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200/60 dark:border-violet-800/40",
    chip: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  },
  "Business & Work": {
    bg: "bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/10",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    accent: "text-sky-600 dark:text-sky-400",
    border: "border-sky-200/60 dark:border-sky-800/40",
    chip: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
  },
  "Developer & IT": {
    bg: "bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/10",
    iconBg: "bg-gradient-to-br from-cyan-500 to-teal-600",
    accent: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-200/60 dark:border-cyan-800/40",
    chip: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
  },
  "Education & Learning": {
    bg: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    accent: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200/60 dark:border-amber-800/40",
    chip: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  },
  "Commerce & Finance": {
    bg: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/10",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
    accent: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    chip: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  },
  "Communication": {
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    accent: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200/60 dark:border-blue-800/40",
    chip: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  },
  "Social & Community": {
    bg: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/10",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
    accent: "text-pink-600 dark:text-pink-400",
    border: "border-pink-200/60 dark:border-pink-800/40",
    chip: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
  },
  "Entertainment & Media": {
    bg: "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/10",
    iconBg: "bg-gradient-to-br from-red-500 to-orange-600",
    accent: "text-red-600 dark:text-red-400",
    border: "border-red-200/60 dark:border-red-800/40",
    chip: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  },
  "Lifestyle": {
    bg: "bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/10",
    iconBg: "bg-gradient-to-br from-orange-500 to-yellow-500",
    accent: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200/60 dark:border-orange-800/40",
    chip: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  },
  "Health & Wellness": {
    bg: "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/10",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    accent: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200/60 dark:border-rose-800/40",
    chip: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
  },
  "Utilities & Security": {
    bg: "bg-gradient-to-br from-slate-50 to-zinc-100 dark:from-slate-950/20 dark:to-zinc-950/10",
    iconBg: "bg-gradient-to-br from-slate-500 to-zinc-600",
    accent: "text-slate-600 dark:text-slate-400",
    border: "border-slate-200/60 dark:border-slate-800/40",
    chip: "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300",
  },
  "Government & Public Services": {
    bg: "bg-gradient-to-br from-stone-50 to-neutral-100 dark:from-stone-950/20 dark:to-neutral-950/10",
    iconBg: "bg-gradient-to-br from-stone-500 to-neutral-600",
    accent: "text-stone-600 dark:text-stone-400",
    border: "border-stone-200/60 dark:border-stone-800/40",
    chip: "bg-stone-100 dark:bg-stone-900/30 text-stone-700 dark:text-stone-300",
  },
  "Games": {
    bg: "bg-gradient-to-br from-red-50 to-amber-50 dark:from-red-950/20 dark:to-amber-950/10",
    iconBg: "bg-gradient-to-br from-red-500 to-amber-600",
    accent: "text-red-600 dark:text-red-400",
    border: "border-red-200/60 dark:border-red-800/40",
    chip: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  },
  "Books": {
    bg: "bg-gradient-to-br from-amber-50 to-lime-50 dark:from-amber-950/20 dark:to-lime-950/10",
    iconBg: "bg-gradient-to-br from-amber-500 to-lime-600",
    accent: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200/60 dark:border-amber-800/40",
    chip: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  },
};

function getTheme(name: string) {
  return groupThemes[name] || groupThemes["Utilities & Security"];
}

/* ─── tiny star renderer ─── */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`h-3 w-3 ${i <= Math.round(rating) ? "text-amber-400" : "text-zinc-200 dark:text-zinc-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* ─── App Card (vertical for carousels) ─── */
function AppCard({ app }: { app: AppItem }) {
  return (
    <button className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200 w-full min-w-[100px] snap-start">
      <div className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-[22px] ${app.iconBg} flex items-center justify-center text-2xl sm:text-3xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 flex-shrink-0 relative`}>
        {app.icon}
        {app.badge && <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">{app.badge}</span>}
      </div>
      <p className="text-[13px] font-medium mt-2.5 line-clamp-2 text-zinc-900 dark:text-zinc-100 leading-tight max-w-[120px]">{app.name}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-xs text-zinc-600 dark:text-zinc-400">{app.rating}</span>
        <Stars rating={app.rating} />
      </div>
      <p className={`text-xs mt-0.5 font-medium ${app.price === "Free" ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-600 dark:text-zinc-400"}`}>{app.price}</p>
    </button>
  );
}

/* ─── App Carousel ─── */
function AppCarousel({ title, apps }: { title: string; apps: AppItem[] }) {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between px-1 mb-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
        <button className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors">See all</button>
      </div>
      <div className="flex gap-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-1 px-1">
        {apps.map((app) => <AppCard key={app.id} app={app} />)}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKELETONS
   ═══════════════════════════════════════════════════════════ */
function SkeletonHome() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <Skeleton className="h-7 w-48 mb-4 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0,1,2].map(i => (
            <Skeleton key={i} className="h-44 rounded-3xl" />
          ))}
        </div>
      </div>
      {[0,1,2,3].map(i => (
        <div key={i}>
          <div className="flex items-center justify-between mb-3 px-1">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <Skeleton className="h-4 w-14 rounded-lg" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[0,1,2,3,4,5].map(j => (
              <div key={j} className="flex flex-col items-center gap-2 min-w-[100px]">
                <Skeleton className="w-16 h-16 rounded-[22px]" />
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonCategoryGrid() {
  return (
    <div className="animate-in fade-in duration-300">
      <Skeleton className="h-8 w-64 mb-6 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[0,1,2,3,4,5].map(i => (
          <Skeleton key={i} className="h-48 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

function SkeletonSubcategoryGrid() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-14 h-14 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {[0,1,2,3,4,5,6,7].map(i => (
          <Skeleton key={i} className={`${i === 0 ? "col-span-2 row-span-2 h-40" : "h-28"} rounded-3xl`} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CATEGORY COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/* ─── Top-Level Category Card ─── */
function TopCategoryCard({ cat, onSelect }: { cat: TopLevelCategory; onSelect: () => void }) {
  const totalSubs = cat.groups.reduce((a, g) => a + g.subcategories.length, 0);
  return (
    <button
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.gradient} p-6 sm:p-8 text-left text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]`}
    >
      <div className="relative z-10">
        <span className="text-4xl sm:text-5xl block mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{cat.icon}</span>
        <h3 className="text-xl sm:text-2xl font-bold drop-shadow-sm">{cat.name}</h3>
        <p className="text-sm text-white/75 mt-1">{cat.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
            {cat.groups.length} {cat.groups.length === 1 ? "category" : "categories"}
          </span>
          <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
            {totalSubs} subcategories
          </span>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-white/5" />
    </button>
  );
}

/* ─── Category Group Card (REDESIGNED - unique color per group) ─── */
function CategoryGroupCard({ group, onSelect, index }: { group: CategoryGroup; onSelect: () => void; index: number }) {
  const theme = getTheme(group.name);
  const totalApps = group.subcategories.reduce((a, s) => a + s.count, 0);
  const isLarge = index === 0;
  return (
    <button
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-3xl ${theme.bg} border ${theme.border} text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] ${isLarge ? "sm:col-span-2" : ""}`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className={`${theme.iconBg} w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
            {group.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={`font-bold ${isLarge ? "text-lg" : "text-base"} text-zinc-900 dark:text-zinc-100`}>
              {group.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{group.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {group.subcategories.slice(0, isLarge ? 5 : 3).map((sub) => (
            <span key={sub.name} className={`${sub.color} text-[11px] font-medium px-2.5 py-1 rounded-full`}>
              {sub.icon} {sub.name}
            </span>
          ))}
          {group.subcategories.length > (isLarge ? 5 : 3) && (
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
              +{group.subcategories.length - (isLarge ? 5 : 3)} more
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-200/40 dark:border-zinc-700/40">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{group.subcategories.length} subcategories</span>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold ${theme.accent}`}>{(totalApps / 1000).toFixed(1)}K apps</span>
            <svg className={`h-4 w-4 ${theme.accent} group-hover:translate-x-0.5 transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ─── SubCategory Tile (REDESIGNED) ─── */
function SubCategoryTile({ sub, index, theme }: { sub: SubCategory; index: number; theme: ReturnType<typeof getTheme> }) {
  const isHero = index === 0;
  return (
    <button
      className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:-translate-y-0.5 active:scale-[0.98] text-left ${
        isHero ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <div className={isHero ? "p-6 sm:p-8" : "p-4 sm:p-5"}>
        <div className="flex items-start gap-3 sm:gap-4">
          <div className={`${sub.color} ${isHero ? "w-16 h-16 sm:w-20 sm:h-20 text-3xl sm:text-4xl" : "w-11 h-11 sm:w-13 sm:h-13 text-xl sm:text-2xl"} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
            {sub.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className={`font-bold text-zinc-900 dark:text-zinc-100 ${isHero ? "text-lg sm:text-xl" : "text-sm"}`}>{sub.name}</h4>
            <p className={`text-zinc-500 dark:text-zinc-400 mt-0.5 ${isHero ? "text-sm" : "text-xs"}`}>{sub.count.toLocaleString()} apps</p>
          </div>
        </div>
        {isHero && (
          <div className="mt-4 flex items-center gap-2">
            <span className={`${theme.chip} text-xs font-medium px-2.5 py-1 rounded-full`}>Popular</span>
            <span className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-medium px-2.5 py-1 rounded-full">Trending</span>
          </div>
        )}
      </div>
    </button>
  );
}

/* ─── Breadcrumb ─── */
function Breadcrumb({ segments, onNavigate }: { segments: { label: string; icon?: string }[]; onNavigate: (index: number) => void }) {
  return (
    <nav className="flex items-center gap-1.5 mb-5 overflow-x-auto scrollbar-hide py-1">
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        return (
          <div key={i} className="flex items-center gap-1.5 flex-shrink-0">
            {i > 0 && <svg className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>}
            <button
              onClick={() => !isLast && onNavigate(i)}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap ${isLast ? "text-zinc-900 dark:text-zinc-100 cursor-default" : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
            >
              {seg.icon && <span>{seg.icon}</span>}
              {seg.label}
            </button>
          </div>
        );
      })}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function AppStorePage() {
  const [view, setView] = useState<ViewMode>({ kind: "home" });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allApps = categorySections.flatMap((s) => s.apps);

  const navigateTo = useCallback((newView: ViewMode) => {
    setLoading(true);
    setView(newView);
    setSearchQuery("");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setLoading(false), 400);
  }, []);

  const handleNavClick = useCallback((name: string) => {
    if (name === "Home") { navigateTo({ kind: "home" }); }
    else {
      const cat = marketplaceData.find((c) => c.name === name || c.id === name.toLowerCase());
      if (cat) navigateTo({ kind: "topCategory", cat });
    }
  }, [navigateTo]);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (q.trim()) { navigateTo({ kind: "search", query: q.trim() }); }
    else { navigateTo({ kind: "home" }); }
  }, [navigateTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (view.kind === "categoryGroup") navigateTo({ kind: "topCategory", cat: view.cat });
        else if (view.kind === "topCategory" || view.kind === "search") { navigateTo({ kind: "home" }); setSearchQuery(""); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, navigateTo]);

  const breadcrumbs: { label: string; icon?: string }[] = [{ label: "Home", icon: "🏠" }];
  if (view.kind === "topCategory") breadcrumbs.push({ label: view.cat.name, icon: view.cat.icon });
  else if (view.kind === "categoryGroup") breadcrumbs.push({ label: view.cat.name, icon: view.cat.icon }, { label: view.group.name, icon: view.group.icon });
  else if (view.kind === "search") breadcrumbs.push({ label: `Search: "${view.query}"`, icon: "🔍" });

  const activeTab = view.kind === "home" ? "Home" : view.kind === "topCategory" || view.kind === "categoryGroup" ? view.cat.name : "Home";

  const filteredApps = view.kind === "search" ? allApps.filter((a) => a.name.toLowerCase().includes(view.query.toLowerCase()) || a.developer.toLowerCase().includes(view.query.toLowerCase()) || a.category.toLowerCase().includes(view.query.toLowerCase())) : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* ═══════ HEADER ═══════ */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 sm:h-16 gap-3">
            <button onClick={() => handleNavClick("Home")} className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" />
                </svg>
              </div>
              <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 hidden sm:block">AppStore</span>
            </button>

            <nav className="hidden md:flex items-center gap-1 ml-6">
              {topNavCategories.map((cat) => (
                <button key={cat.name} onClick={() => handleNavClick(cat.name)} className={`px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === cat.name ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}>
                  <span className="mr-1.5">{cat.icon}</span>{cat.name}
                </button>
              ))}
            </nav>

            <div className="flex-1 max-w-md mx-auto">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <Input type="text" placeholder="Search apps, games, books..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} className="pl-9 pr-9 h-9 sm:h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-0 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:bg-white dark:focus-visible:bg-zinc-900 transition-all" />
                {searchQuery && (
                  <button onClick={() => handleSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
                    <svg className="h-3 w-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
              </Button>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer">U</div>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-100 dark:border-zinc-800 px-4 py-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {topNavCategories.map((cat) => (
                <button key={cat.name} onClick={() => handleNavClick(cat.name)} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-sm font-medium transition-all duration-200 flex-shrink-0 ${activeTab === cat.name ? "bg-emerald-500 text-white shadow-md" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"}`}>
                  <span>{cat.icon}</span><span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ═══════ MAIN ═══════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
        {view.kind !== "home" && (
          <Breadcrumb segments={breadcrumbs} onNavigate={(i) => {
            if (i === 0) { navigateTo({ kind: "home" }); setSearchQuery(""); }
            else if (view.kind === "categoryGroup" && i === 1) navigateTo({ kind: "topCategory", cat: view.cat });
          }} />
        )}

        {loading ? (
          view.kind === "home" ? <SkeletonHome /> :
          view.kind === "categoryGroup" ? <SkeletonSubcategoryGrid /> :
          <SkeletonCategoryGrid />
        ) : (
          <>
            {/* ═══ HOME ═══ */}
            {view.kind === "home" && (
              <>
                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 px-1 mb-4">Explore Categories</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {marketplaceData.map((cat) => (
                      <TopCategoryCard key={cat.id} cat={cat} onSelect={() => navigateTo({ kind: "topCategory", cat })} />
                    ))}
                  </div>
                </section>
                {categorySections.map((section) => (
                  <AppCarousel key={section.title} title={section.title} apps={section.apps} />
                ))}
              </>
            )}

            {/* ═══ TOP CATEGORY (Apps/Games/Books) ═══ */}
            {view.kind === "topCategory" && (
              <>
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${view.cat.gradient} p-5 sm:p-7 mb-8`}>
                  <div className="relative z-10 flex items-center gap-4">
                    <span className="text-4xl sm:text-5xl drop-shadow-lg">{view.cat.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h1 className="text-xl sm:text-3xl font-bold text-white drop-shadow-sm">{view.cat.name}</h1>
                      <p className="text-sm text-white/75 mt-0.5">{view.cat.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-white">
                          {view.cat.groups.length} {view.cat.groups.length === 1 ? "category" : "categories"}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-white">
                          {view.cat.groups.reduce((a, g) => a + g.subcategories.length, 0)} subcategories
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full bg-white/10" />
                  <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-white/5" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {view.cat.groups.map((group, i) => (
                    <CategoryGroupCard key={group.name} group={group} index={i} onSelect={() => navigateTo({ kind: "categoryGroup", cat: view.cat, group })} />
                  ))}
                </div>
              </>
            )}

            {/* ═══ CATEGORY GROUP (subcategories) ═══ */}
            {view.kind === "categoryGroup" && (
              <>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${getTheme(view.group.name).iconBg} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                    {view.group.icon}
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">{view.group.name}</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{view.group.description} · {view.group.subcategories.length} subcategories</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {view.group.subcategories.map((sub, i) => (
                    <SubCategoryTile key={sub.name} sub={sub} index={i} theme={getTheme(view.group.name)} />
                  ))}
                </div>
              </>
            )}

            {/* ═══ SEARCH ═══ */}
            {view.kind === "search" && filteredApps !== null && (
              <>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                  Results for &ldquo;{view.query}&rdquo;
                  <span className="text-sm font-normal text-zinc-500 ml-2">{filteredApps.length} apps found</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredApps.map((app) => (
                    <button key={app.id} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-left">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${app.iconBg} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>{app.icon}</div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">{app.name}</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{app.developer}</p>
                          <div className="flex items-center gap-2 mt-1.5"><Stars rating={app.rating} /><span className="text-xs text-zinc-600 dark:text-zinc-400">{app.rating}</span></div>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 line-clamp-2">{app.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">{app.size}</span>
                        <span className={`text-sm font-semibold ${app.price === "Free" ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-900 dark:text-zinc-100"}`}>{app.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {filteredApps.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-5xl mb-4">🔍</p>
                    <p className="text-zinc-500 dark:text-zinc-400">No apps found for &ldquo;{view.query}&rdquo;</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-200/60 dark:border-zinc-800/60 safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {[
            { label: "Home", icon: "home", kind: "home" as const },
            { label: "Categories", icon: "grid", kind: "topCategory" as const },
            { label: "Search", icon: "search", kind: "search" as const },
            { label: "Library", icon: "book-open", kind: "home" as const },
            { label: "Profile", icon: "user", kind: "home" as const },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.label === "Home") handleNavClick("Home");
                else if (item.label === "Categories" && view.kind !== "topCategory" && view.kind !== "categoryGroup") handleNavClick("Apps");
                else if (item.label === "Search") (document.querySelector('input[placeholder*="Search"]') as HTMLInputElement)?.focus();
              }}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                (item.label === "Home" && view.kind === "home") || (item.label === "Categories" && (view.kind === "topCategory" || view.kind === "categoryGroup")) || (item.label === "Search" && view.kind === "search")
                  ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"
              }`}
            >
              <MobileNavIcon name={item.icon} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      <div className="md:hidden h-16" />
    </div>
  );
}

function MobileNavIcon({ name }: { name: string }) {
  const m: Record<string, React.ReactNode> = {
    home: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    grid: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>,
    search: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    "book-open": <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    user: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  };
  return <>{m[name]}</>;
}
