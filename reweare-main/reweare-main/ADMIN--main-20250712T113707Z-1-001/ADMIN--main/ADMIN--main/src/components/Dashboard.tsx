import React from 'react';
import { Users, Package, Clock, TrendingUp, Activity } from 'lucide-react';
import { mockStats } from '../data/mockData';
import { useItems } from '../contexts/ItemsContext';

const Dashboard: React.FC = () => {
  const { items, getRecentActivity } = useItems();
  
  const pendingItemsCount = items.filter(item => item.status === 'pending').length;
  
  const stats = [
    {
      title: 'Total Users',
      value: mockStats.totalUsers.toLocaleString(),
      icon: Users,
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Total Items',
      value: items.length.toString(),
      icon: Package,
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Pending Items',
      value: pendingItemsCount.toString(),
      icon: Clock,
      change: '-3.1%',
      changeType: 'negative'
    },
    {
      title: 'Swaps Completed',
      value: mockStats.swapsCompleted.toLocaleString(),
      icon: TrendingUp,
      change: '+15.3%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#292929] dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening on ReWear.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#d47c08] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#d47c08]" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
                    : 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#292929] dark:text-white mb-1">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-[#292929] dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {getRecentActivity().map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#d47c08] bg-opacity-10 rounded-full flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[#d47c08]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#292929] dark:text-white">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                    {activity.item && (
                      <span className="text-gray-500 dark:text-gray-400"> - {activity.item.title}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-[#292929] dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { title: 'Manage All Listings', count: items.length, color: 'text-[#d47c08]' },
              { title: 'Flagged Content', count: 3, color: 'text-red-500' },
              { title: 'User Reports', count: 2, color: 'text-yellow-500' },
              { title: 'System Alerts', count: 1, color: 'text-blue-500' }
            ].map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-[#292929] dark:text-white font-medium">{action.title}</span>
                <span className={`${action.color} font-semibold`}>{action.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;