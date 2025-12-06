import { Code, Server, Layers, type LucideIcon } from 'lucide-react';

export interface Bundle {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  channels: string[];
}

export const BUNDLES: Bundle[] = [
  {
    id: 'frontend',
    title: 'Frontend Focus',
    description: 'React, Vue, JS • 5 Channels',
    icon: Code,
    channels: [
      '@frontend_jobs',
      '@javascript_jobs',
      '@job_react',
      '@nodejs_jobs',
      '@job_for_juniors',
    ],
  },
  {
    id: 'backend',
    title: 'Backend Essentials',
    description: 'Node, APIs, Servers • 5 Channels',
    icon: Server,
    channels: [
      '@nodejs_jobs',
      '@fullstack_jobs',
      '@javascript_jobs',
      '@job_for_juniors',
      '@frontend_jobs',
    ],
  },
  {
    id: 'fullstack',
    title: 'Full Stack',
    description: 'End-to-end development • 5 Channels',
    icon: Layers,
    channels: [
      '@fullstack_jobs',
      '@frontend_jobs',
      '@javascript_jobs',
      '@nodejs_jobs',
      '@job_for_juniors',
    ],
  },
];

export const MAX_FREE_CHANNELS = 5;
