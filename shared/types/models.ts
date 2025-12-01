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
  channelId: string;
  rawText: string;
  parsedData?: ParsedJobData;
  status?: 'pending_parse' | 'parsed' | 'failed';
  createdAt: string;
  isVisited?: boolean;
}

export interface ParsedJobData {
  jobTitle?: string;
  company?: string;
  techStack?: string[];
  salary?: string;
  contactMethod?: string;
  isRemote?: boolean;
  level?: string;
}

export interface Resume {
  text: string;
  fileUrl: string;
}

export interface TailoredResume {
  pdfUrl: string;
  docxUrl: string;
  telegramMessage: string;
  coverLetter: string;
}
