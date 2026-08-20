export type QToriumCardProminence = 'hero' | 'standard' | 'utility' | 'preview';

export interface QToriumNavItem {
  id: string;
  label: string;
  dropdownDetail?: string;
  surfaceCode?: string;
  icon: string;
  route: string;
  badge?: string;
  description?: string;
  category?: string;
}

export interface QToriumProductConfig {
  id: string;
  milestoneId: string;
  title: string;
  subtitle: string;
  description: string;
  accentNote?: string;
  navItems: QToriumNavItem[];
}

export type ViewportMode = 'responsive' | 'desktop' | 'laptop' | 'tablet' | 'tablet768' | 'mobile';

export interface ExecutionSplitItem {
  id: string;
  category: 'AI' | 'DEVELOPER';
  title: string;
  percentage: number;
  description: string;
  deliverables?: string[];
  status: 'Complete' | 'In Review' | 'Pending';
}

export interface LockedSpecDocument {
  id: string;
  docNumber: string;
  title: string;
  version: string;
  status: string;
  lastUpdated: string;
  corePrinciple: string;
  surfaceCount: number;
  namespace?: string;
  summary: string;
  sectionsOrModules: {
    id: string | number;
    shortLabel: string;
    dropdownDetail?: string;
    route?: string;
    surfaces?: string[];
    description: string;
  }[];
  keyClauses: {
    number: string | number;
    title: string;
    description: string;
  }[];
}

export interface DartSourceFile {
  path: string;
  name: string;
  category: 'core' | 'theme' | 'config' | 'shell' | 'components' | 'preview' | 'demo' | 'test' | 'root';
  code: string;
  description: string;
}

export interface MilestoneStage {
  stage: string;
  milestone: string;
  durationDays: string;
  hours: number;
  description: string;
  deliverables: string[];
  status: 'Ready for Review' | 'In Progress' | 'Upcoming';
  acceptanceGate: string;
}

export interface AcceptanceGateItem {
  id: string;
  title: string;
  description: string;
  status: 'PASS' | 'VERIFIED' | 'READY';
  evidence: string;
}
