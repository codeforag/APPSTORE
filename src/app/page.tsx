"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  categorySections,
  categories,
  type AppItem,
} from "@/lib/app-data";

/* ─── tiny star renderer ─── */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-3 w-3 ${
            i <= Math.round(rating) ? "text-amber-400" : "text-zinc-200 dark:text-zinc-700"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* ─── App Card (compact horizontal for lists) ─── */
function AppCard({ app, variant = "default" }: { app: AppItem; variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors text-left">
        <div
          className={`w-12 h-12 rounded-2xl ${app.iconBg} flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}
        >
          {app.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">
            {app.name}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {app.developer}
          </p>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {app.rating}
            </span>
            <Stars rating={app.rating} />
          </div>
          <p
            className={`text-xs mt-0.5 ${
              app.price === "Free"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {app.price}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200 w-full min-w-[100px] snap-start">
      <div
        className={`w-16 h-16 sm:w-18 sm:h-18 rounded-[22px] ${app.iconBg} flex items-center justify-center text-2xl sm:text-3xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 flex-shrink-0 relative`}
      >
        {app.icon}
        {app.badge && (
          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
            {app.badge}
          </span>
        )}
      </div>
      <p className="text-[13px] font-medium mt-2.5 line-clamp-2 text-zinc-900 dark:text-zinc-100 leading-tight max-w-[120px]">
        {app.name}
      </p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          {app.rating}
        </span>
        <Stars rating={app.rating} />
      </div>
      <p
        className={`text-xs mt-0.5 font-medium ${
          app.price === "Free"
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-zinc-600 dark:text-zinc-400"
        }`}
      >
        {app.price}
      </p>
    </button>
  );
}

/* ─── Bento App Card (larger, with description) ─── */
function BentoAppCard({
  app,
  className = "",
}: {
  app: AppItem;
  className?: string;
}) {
  return (
    <button
      className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-5 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300 hover:-translate-y-0.5 text-left ${className}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-2xl ${app.iconBg} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
        >
          {app.icon}
          {app.badge && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              {app.badge}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
              {app.name}
            </h4>
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 h-4 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0 flex-shrink-0"
            >
              {app.category}
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {app.developer}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <Stars rating={app.rating} />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              {app.rating}
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {app.reviews} reviews
            </span>
          </div>
        </div>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 line-clamp-2 leading-relaxed">
        {app.description}
      </p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
          <span>{app.size}</span>
        </div>
        <span
          className={`text-sm font-semibold ${
            app.price === "Free"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {app.price}
        </span>
      </div>
    </button>
  );
}

/* ─── Horizontal Scroll Section ─── */
function AppCarousel({
  title,
  apps,
  onSeeAll,
}: {
  title: string;
  apps: AppItem[];
  onSeeAll?: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between px-1 mb-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            See all
          </button>
        )}
      </div>
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-1 px-1"
      >
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}

/* ─── Category Pill ─── */
function CategoryPill({
  cat,
  active,
  onClick,
}: {
  cat: (typeof categories)[0];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 flex-shrink-0 ${
        active
          ? `bg-gradient-to-r ${cat.color} text-white shadow-md`
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
      }`}
    >
      <span>{cat.icon}</span>
      <span>{cat.name}</span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function AppStorePage() {
  const [activeCategory, setActiveCategory] = useState("Apps");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allApps = categorySections.flatMap((s) => s.apps);
  const filteredApps = searchQuery
    ? allApps.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 sm:h-16 gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" /><path d="m8 17 4 4 4-4" />
                </svg>
              </div>
              <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 hidden sm:block">
                AppStore
              </span>
            </div>

            {/* Nav Tabs - Desktop */}
            <nav className="hidden md:flex items-center gap-1 ml-6">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.name
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>

            {/* Search */}
            <div className="flex-1 max-w-md mx-auto">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  type="text"
                  placeholder="Search apps & games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 h-9 sm:h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-0 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:bg-white dark:focus-visible:bg-zinc-900 transition-all"
                />
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl h-9 w-9 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </Button>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer">
                U
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Category Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-100 dark:border-zinc-800 px-4 py-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <CategoryPill
                  key={cat.name}
                  cat={cat}
                  active={activeCategory === cat.name}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    setMobileMenuOpen(false);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ─── Main Content ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
        {/* Search Results */}
        {filteredApps ? (
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Results for &ldquo;{searchQuery}&rdquo;
              <span className="text-sm font-normal text-zinc-500 ml-2">
                {filteredApps.length} apps found
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredApps.map((app) => (
                <BentoAppCard key={app.id} app={app} />
              ))}
            </div>
            {filteredApps.length === 0 && (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-zinc-500 dark:text-zinc-400">
                  No apps found for &ldquo;{searchQuery}&rdquo;
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* ─── Category Carousels ─── */}
            {categorySections.map((section) => (
              <AppCarousel
                key={section.title}
                title={section.title}
                apps={section.apps}
                onSeeAll={() => {}}
              />
            ))}

            {/* ─── Bento Grid: Top Picks ─── */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 px-1 mb-3">
                Top Picks for You
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allApps.slice(0, 6).map((app, i) => (
                  <BentoAppCard
                    key={app.id}
                    app={app}
                    className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
                  />
                ))}
              </div>
            </section>

            {/* ─── Bento Grid: Editors' Choice ─── */}
            <section className="mb-8">
              <div className="flex items-center gap-2 px-1 mb-3">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Editors&apos; Choice
                </h2>
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0 gap-1">
                  ✨ Curated
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {allApps
                  .filter((a) => a.rating >= 4.4)
                  .slice(0, 8)
                  .map((app, i) => (
                    <BentoAppCard
                      key={app.id}
                      app={app}
                      className={i === 0 ? "sm:col-span-2" : ""}
                    />
                  ))}
              </div>
            </section>

            {/* ─── Trending Compact List ─── */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 px-1 mb-3">
                Trending Now
              </h2>
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 divide-y divide-zinc-50 dark:divide-zinc-800 p-2">
                {allApps.slice(0, 8).map((app, i) => (
                  <div key={app.id} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-zinc-300 dark:text-zinc-600 w-6 text-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <AppCard app={app} variant="compact" />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* ─── Mobile Bottom Navigation ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-200/60 dark:border-zinc-800/60 safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {[
            { label: "Home", icon: "home", active: true },
            { label: "Games", icon: "gamepad", active: false },
            { label: "Search", icon: "search", active: false },
            { label: "Library", icon: "book-open", active: false },
            { label: "Profile", icon: "user", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                item.active
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-400 dark:text-zinc-500"
              }`}
            >
              <NavigationIcon name={item.icon} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom spacer for mobile nav */}
      <div className="md:hidden h-16" />
    </div>
  );
}

function NavigationIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    gamepad: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    search: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    "book-open": (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    user: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}
