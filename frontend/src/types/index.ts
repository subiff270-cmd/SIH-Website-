export type Role = 'citizen' | 'officer' | 'worker';

export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type IssueStatus = 'SUBMITTED' | 'AI_VERIFIED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED';

export type IssueCategory = 
  | 'POTHOLE' 
  | 'GARBAGE' 
  | 'STREET_LIGHT' 
  | 'WATER_LEAKAGE' 
  | 'DRAINAGE' 
  | 'FALLEN_TREE' 
  | 'ILLEGAL_DUMPING' 
  | 'DAMAGED_ROAD'
  | 'MANHOLE';

export interface LocationCoordinates {
  lat: number;
  lng: number;
  address: string;
  ward: string;
  city: string;
}

export interface AIAnalysisResult {
  detectedCategory: IssueCategory;
  confidenceScore: number;
  severityScore: SeverityLevel;
  urgencyIndex: number;
  suggestedDepartment: string;
  duplicateMatchFound: boolean;
  duplicateCount?: number;
  parentTicketId?: string;
  detectedObjects: { label: string; confidence: number; bbox: [number, number, number, number] }[];
  aiSummary: string;
}

export interface Complaint {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: IssueCategory;
  severity: SeverityLevel;
  status: IssueStatus;
  imageUrl: string;
  afterImageUrl?: string;
  location: LocationCoordinates;
  createdAt: string;
  updatedAt: string;
  reportedBy: {
    id: string;
    name: string;
    avatar?: string;
    isAnonymous: boolean;
  };
  department: {
    id: string;
    name: string;
    code: string;
  };
  assignedWorker?: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  };
  aiAnalysis: AIAnalysisResult;
  upvotesCount: number;
  voiceNoteUrl?: string;
  timeline: {
    status: IssueStatus;
    timestamp: string;
    note: string;
    updatedBy: string;
  }[];
  citizenRating?: number;
  citizenFeedback?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  rewardPoints?: number;
  departmentCode?: string;
  phone?: string;
}

export interface DepartmentStats {
  id: string;
  name: string;
  code: string;
  icon: string;
  totalTickets: number;
  resolvedTickets: number;
  pendingTickets: number;
  avgResolutionHours: number;
  slaCompliancePercent: number;
  activeWorkers: number;
}

export interface CityAnalytics {
  totalIssuesReported: number;
  totalResolved: number;
  activeCriticalIssues: number;
  aiAccuracyPercent: number;
  avgResolutionDays: number;
  citizenSatisfactionScore: number;
  issuesByCategory: { category: IssueCategory; count: number }[];
  weeklyResolutionTrend: { day: string; reported: number; resolved: number }[];
  wardHeatmap: { ward: string; issueCount: number; statusRatio: number }[];
}
