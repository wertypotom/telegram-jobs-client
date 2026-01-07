export interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  masterResumeText?: string;
  masterResumeFileUrl?: string;
  plan: 'free' | 'premium';
  hasCompletedOnboarding?: boolean;
  viewedJobs?: string[];

  // Subscription change tracking (abuse prevention)
  subscriptionChanges?: {
    count: number;
    lastResetDate: Date;
  };

  // Telegram Notifications
  telegramChatId?: string;
  telegramSubscriptionToken?: string;
  notificationEnabled?: boolean;
  notificationFilters?: {
    stack?: string[];
    level?: string[];
    jobFunction?: string[];
    locationType?: string[];
    experienceYears?: {
      min?: number;
      max?: number;
    };
  };
  quietHours?: {
    enabled: boolean;
    startHour: number;
    endHour: number;
    timezone: string;
  };
  lastNotificationSent?: Date;
  notificationCount?: number;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Job {
  id: string;
  telegramMessageId: string;
  channelId: string;
  channelUsername?: string;
  senderUserId?: string;
  senderUsername?: string;
  rawText: string;
  parsedData?: ParsedJobData;
  status?: 'pending_parse' | 'parsed' | 'failed';
  telegramMessageDate?: Date;
  createdAt: string;
  updatedAt?: string;
  isVisited?: boolean;
}

export interface ContactInfo {
  telegram?: string;
  email?: string;
  applicationUrl?: string;
  other?: string;
}

export interface ParsedJobData {
  jobTitle?: string;
  normalizedJobTitle?: string;
  company?: string;
  techStack?: string[];
  salary?: string;
  contactInfo?: ContactInfo;
  isRemote?: boolean;
  level?: string;
  employmentType?: string;
  location?: string;
  candidateLocation?: string;
  responsibilities?: string[];
  requiredQualifications?: string[];
  preferredQualifications?: string[];
  benefits?: string[];
  description?: string;
  experienceYears?: number;
}

export interface Resume {
  text: string;
  fileUrl: string;
}
