export type TicketStatus = 'open' | 'pending' | 'closed';

export interface TicketCategory {
  id: string;
  name: string;
  description: string;
  color: string; // Hex color for the category
  parentId?: string; // The category channel ID in Discord
}

export interface Ticket {
  ticketId: string;
  guildId: string;
  ownerId: string;
  ownerName: string;
  category: string;
  categoryColor?: string; // Color passed from category settings
  status: TicketStatus;
  assignedStaff: string[];
  createdAt: string;
  closedAt?: string;
  lastMessage?: string;
}

export interface ServerStats {
  totalTickets: number;
  openTickets: number;
  avgResolutionTime: string;
  activeStaff: number;
  dailyVolume: { date: string; count: number }[];
}

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  email?: string; // 根據 OAuth2 Scope 可選獲取
}

export enum DashboardTab {
  Overview = 'overview',
  Tickets = 'tickets',
  Config = 'config',
  Analytics = 'analytics',
  Settings = 'settings',
  Documentation = 'docs'
}