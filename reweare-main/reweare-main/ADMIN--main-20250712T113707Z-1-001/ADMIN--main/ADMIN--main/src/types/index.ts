export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  status: 'active' | 'suspended';
  itemsListed: number;
  swapsCompleted: number;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  images: string[];
  user: User;
  status: 'pending' | 'approved' | 'rejected';
  dateSubmitted: string;
  tags: string[];
}

export interface DashboardStats {
  totalUsers: number;
  totalItems: number;
  pendingItems: number;
  swapsCompleted: number;
  monthlyGrowth: number;
  activeUsers: number;
}