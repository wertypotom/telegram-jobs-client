export interface User {
  id: string;
  email: string;
  masterResumeText?: string;
  masterResumeFileUrl?: string;
  subscribedChannels: string[];
  telegramPhone?: string;
  telegramUserId?: string;
  hasCompletedOnboarding?: boolean;
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
  createdAt: string;
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
}

export interface Resume {
  text: string;
  fileUrl: string;
}
