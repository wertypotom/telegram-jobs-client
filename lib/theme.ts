/**
 * Aqua Flow Theme Configuration
 * Soft & Approachable color scheme for TeleJob AI
 */

export const theme = {
  id: 'aqua-flow',
  name: 'Aqua Flow',
  description: 'Soft & Approachable',
  colors: {
    primary: '#06B6D4',
    primaryForeground: '#FFFFFF',
    background: '#FAFAFA',
    card: '#FFFFFF',
    secondary: '#CCFBF1',
    textMain: '#111827',
    textMuted: '#6B7280',
    accent: '#0891B2',
  },
} as const;

export type Theme = typeof theme;
