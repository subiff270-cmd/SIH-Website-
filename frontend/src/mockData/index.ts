import { Complaint, User, DepartmentStats, CityAnalytics, Role } from '../types';

export const MOCK_USERS: Record<Role, User> = {
  citizen: {
    id: 'user_c1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    rewardPoints: 480,
    phone: '+91 98765 43210'
  },
  officer: {
    id: 'user_o1',
    name: 'Rajesh Verma (Executive Engineer)',
    email: 'pwd.officer@civic.gov.in',
    role: 'officer',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    departmentCode: 'PWD_ROADS',
    phone: '+91 98222 33445'
  },
  worker: {
    id: 'user_w1',
    name: 'Vikram Singh (Field Crew #14)',
    email: 'vikram.field@civic.gov.in',
    role: 'worker',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    departmentCode: 'PWD_ROADS',
    phone: '+91 98111 22334'
  }
};

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'cmp_101',
    ticketNumber: 'CIV-2026-8891',
    title: 'Severe Crater Pothole on Ring Road',
    description: 'Deep road crater near Lajpat Nagar Flyover causing heavy traffic slowdown and wheel damage.',
    category: 'POTHOLE',
    severity: 'HIGH',
    status: 'AI_VERIFIED',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    location: {
      lat: 28.5672,
      lng: 77.2400,
      address: 'Lajpat Nagar Ring Road, Ward 14',
      ward: 'Ward 14 (South Delhi)',
      city: 'New Delhi'
    },
    createdAt: '2026-08-05T09:30:00Z',
    updatedAt: '2026-08-05T09:35:00Z',
    reportedBy: {
      id: 'user_c1',
      name: 'Aarav Sharma',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      isAnonymous: false
    },
    department: {
      id: 'dept_pwd',
      name: 'Public Works Dept (PWD)',
      code: 'PWD_ROADS'
    },
    aiAnalysis: {
      detectedCategory: 'POTHOLE',
      confidenceScore: 97.4,
      severityScore: 'HIGH',
      urgencyIndex: 8,
      suggestedDepartment: 'Public Works Dept (PWD)',
      duplicateMatchFound: false,
      detectedObjects: [
        { label: 'Pothole Defect', confidence: 0.97, bbox: [120, 80, 480, 360] }
      ],
      aiSummary: 'Deep asphalt pavement depression detected with high hazard index.'
    },
    upvotesCount: 24,
    timeline: [
      {
        status: 'SUBMITTED',
        timestamp: '2026-08-05T09:30:00Z',
        note: 'Issue logged by citizen with GPS location.',
        updatedBy: 'Aarav Sharma'
      },
      {
        status: 'AI_VERIFIED',
        timestamp: '2026-08-05T09:35:00Z',
        note: 'AI classified Pothole (97.4% confidence). Sent to Officer Triage Queue.',
        updatedBy: 'CivicAI Neural Engine'
      }
    ]
  },
  {
    id: 'cmp_102',
    ticketNumber: 'CIV-2026-4412',
    title: 'Overflowing Waste Dump & Plastic Spill',
    description: 'Municipal garbage bin overflowing onto main pedestrian sidewalk near Metro Gate 3.',
    category: 'GARBAGE',
    severity: 'MEDIUM',
    status: 'ASSIGNED',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'CP Outer Circle, Gate 3 Metro',
      ward: 'Ward 02 (Central Delhi)',
      city: 'New Delhi'
    },
    createdAt: '2026-08-04T14:20:00Z',
    updatedAt: '2026-08-05T08:00:00Z',
    reportedBy: {
      id: 'user_c2',
      name: 'Priya Sundaram',
      isAnonymous: false
    },
    department: {
      id: 'dept_swm',
      name: 'Solid Waste Management Board',
      code: 'SWM_CLEAN'
    },
    assignedWorker: {
      id: 'user_w2',
      name: 'Karthik Raja (Sanitation Crew #08)',
      phone: '+91 98444 55667'
    },
    aiAnalysis: {
      detectedCategory: 'GARBAGE',
      confidenceScore: 94.8,
      severityScore: 'MEDIUM',
      urgencyIndex: 6,
      suggestedDepartment: 'Solid Waste Management Board',
      duplicateMatchFound: false,
      detectedObjects: [
        { label: 'Uncollected Garbage', confidence: 0.95, bbox: [100, 60, 520, 400] }
      ],
      aiSummary: 'Solid waste spill detected blocking public walkway.'
    },
    upvotesCount: 18,
    timeline: [
      {
        status: 'SUBMITTED',
        timestamp: '2026-08-04T14:20:00Z',
        note: 'Submitted by citizen.',
        updatedBy: 'Priya Sundaram'
      },
      {
        status: 'ASSIGNED',
        timestamp: '2026-08-05T08:00:00Z',
        note: 'Approved by Officer. Assigned to Sanitation Crew #08.',
        updatedBy: 'Department Officer'
      }
    ]
  },
  {
    id: 'cmp_103',
    ticketNumber: 'CIV-2026-1190',
    title: 'High Pressure Main Pipeline Water Leakage',
    description: 'Clean drinking water main line ruptured discharging hundreds of liters onto road.',
    category: 'WATER_LEAKAGE',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
    location: {
      lat: 28.5355,
      lng: 77.3910,
      address: 'Sector 62 Main Road',
      ward: 'Ward 08 (Noida)',
      city: 'Noida'
    },
    createdAt: '2026-08-05T06:00:00Z',
    updatedAt: '2026-08-05T07:30:00Z',
    reportedBy: {
      id: 'anon_1',
      name: 'Anonymous Citizen',
      isAnonymous: true
    },
    department: {
      id: 'dept_water',
      name: 'Water Supply & Sewerage Board',
      code: 'WATER_DEPT'
    },
    assignedWorker: {
      id: 'user_w1',
      name: 'Vikram Singh (Field Crew #14)',
      phone: '+91 98111 22334'
    },
    aiAnalysis: {
      detectedCategory: 'WATER_LEAKAGE',
      confidenceScore: 98.9,
      severityScore: 'CRITICAL',
      urgencyIndex: 10,
      suggestedDepartment: 'Water Supply & Sewerage Board',
      duplicateMatchFound: false,
      detectedObjects: [
        { label: 'Water Leak Jet', confidence: 0.99, bbox: [150, 100, 440, 350] }
      ],
      aiSummary: 'Critical high-pressure water main burst detected.'
    },
    upvotesCount: 42,
    timeline: [
      {
        status: 'SUBMITTED',
        timestamp: '2026-08-05T06:00:00Z',
        note: 'Submitted anonymously.',
        updatedBy: 'Anonymous Citizen'
      },
      {
        status: 'IN_PROGRESS',
        timestamp: '2026-08-05T07:30:00Z',
        note: 'Hydraulic repair crew dispatched to isolate main valve.',
        updatedBy: 'Vikram Singh'
      }
    ]
  }
];

export const DEPARTMENT_STATS: DepartmentStats[] = [
  {
    id: 'dept_pwd',
    name: 'Public Works Dept (PWD)',
    code: 'PWD_ROADS',
    icon: '🛣️',
    totalTickets: 2450,
    resolvedTickets: 2280,
    pendingTickets: 170,
    avgResolutionHours: 18.4,
    slaCompliancePercent: 94.2,
    activeWorkers: 62
  },
  {
    id: 'dept_swm',
    name: 'Solid Waste Management',
    code: 'SWM_CLEAN',
    icon: '♻️',
    totalTickets: 1890,
    resolvedTickets: 1810,
    pendingTickets: 80,
    avgResolutionHours: 8.2,
    slaCompliancePercent: 97.8,
    activeWorkers: 85
  },
  {
    id: 'dept_water',
    name: 'Water Supply Board',
    code: 'WATER_DEPT',
    icon: '💧',
    totalTickets: 1120,
    resolvedTickets: 1040,
    pendingTickets: 80,
    avgResolutionHours: 12.6,
    slaCompliancePercent: 92.5,
    activeWorkers: 40
  },
  {
    id: 'dept_elec',
    name: 'Electrical Grid Board',
    code: 'ELEC_LIGHT',
    icon: '⚡',
    totalTickets: 840,
    resolvedTickets: 810,
    pendingTickets: 30,
    avgResolutionHours: 6.5,
    slaCompliancePercent: 96.4,
    activeWorkers: 35
  }
];

export const CITY_ANALYTICS: CityAnalytics = {
  totalIssuesReported: 6300,
  totalResolved: 5940,
  activeCriticalIssues: 12,
  aiAccuracyPercent: 96.8,
  avgResolutionDays: 1.2,
  citizenSatisfactionScore: 4.8,
  issuesByCategory: [
    { category: 'POTHOLE', count: 2450 },
    { category: 'GARBAGE', count: 1890 },
    { category: 'WATER_LEAKAGE', count: 1120 },
    { category: 'STREET_LIGHT', count: 840 }
  ],
  weeklyResolutionTrend: [
    { day: 'Mon', reported: 120, resolved: 115 },
    { day: 'Tue', reported: 140, resolved: 138 },
    { day: 'Wed', reported: 160, resolved: 155 },
    { day: 'Thu', reported: 130, resolved: 128 },
    { day: 'Fri', reported: 170, resolved: 168 },
    { day: 'Sat', reported: 90, resolved: 95 },
    { day: 'Sun', reported: 80, resolved: 85 }
  ],
  wardHeatmap: [
    { ward: 'Ward 14 (South Delhi)', issueCount: 42, statusRatio: 0.92 },
    { ward: 'Ward 02 (Central Delhi)', issueCount: 28, statusRatio: 0.96 },
    { ward: 'Ward 08 (Noida)', issueCount: 35, statusRatio: 0.88 },
    { ward: 'Ward 05 (Gurugram)', issueCount: 51, statusRatio: 0.85 }
  ]
};
