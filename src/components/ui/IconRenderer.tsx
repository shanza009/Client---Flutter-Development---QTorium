import React from 'react';
import {
  LayoutGrid,
  Home,
  CalendarDays,
  GraduationCap,
  HelpCircle,
  BarChart3,
  Bookmark,
  Users,
  CreditCard,
  Sparkles,
  FileEdit,
  CheckSquare,
  Presentation,
  ClipboardList,
  Calendar,
  Settings,
  Network,
  Compass,
  UserCheck,
  MessageSquare,
  Repeat,
  Shield,
  FileText,
  Award,
  DollarSign,
  Cpu,
  ShieldAlert,
  UserCog,
  Activity,
  BellRing,
  Scale,
  FolderCode,
  CheckCircle2,
  AlertCircle,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  Home,
  CalendarDays,
  GraduationCap,
  HelpCircle,
  BarChart3,
  Bookmark,
  Users,
  CreditCard,
  Sparkles,
  FileEdit,
  CheckSquare,
  Presentation,
  ClipboardList,
  Calendar,
  Settings,
  Network,
  Compass,
  UserCheck,
  MessageSquare,
  Repeat,
  Shield,
  FileText,
  Award,
  DollarSign,
  Cpu,
  ShieldAlert,
  UserCog,
  Activity,
  BellRing,
  Scale,
  FolderCode,
  CheckCircle2,
  AlertCircle,
};

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({
  name,
  className = 'w-5 h-5',
  size = 20,
}) => {
  const IconComponent = iconMap[name] || LayoutGrid;
  return <IconComponent className={className} size={size} />;
};
