export interface InsightsPageData {
  config: {
    slug: string;
    template: InsightsTemplate;
  };
  meta: InsightsPageMeta;
  faq: FaqItem[];
  stats: MarketStats;
  jobs: any[]; // Recent jobs for display
}

export type InsightsTemplate =
  | 'category-region' // "Python Jobs in Europe"
  | 'region-only' // "Jobs in Europe"
  | 'category-only' // "Python Jobs Worldwide"
  | 'remote-jobs' // "Remote Developer Jobs"
  | 'general-insight'; // "Top Programming Languages 2026"

export interface MarketStats {
  totalJobs: number; // Active + archived (all-time)
  jobsLast7Days: number; // Active jobs only (freshness signal)
  avgSalary: string | null;
  topSkills: { name: string; count: number }[];
  salaryBands: { band: string; count: number }[];
  experienceLevels: { level: string; count: number }[];
  trendData: { date: string; jobs: number }[]; // Last 7 days posting volume
  updatedAt: string; // Relative time: "2 hours ago"
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface InsightsPageMeta {
  h1: string; // Page heading
  title: string; // SEO title tag
  description: string; // Meta description
}
