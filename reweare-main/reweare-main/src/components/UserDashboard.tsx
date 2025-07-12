import React, { useState } from 'react';
import { User, Award, Package, TrendingUp, Clock, Star, Plus, Eye, MessageCircle } from 'lucide-react';

interface UserDashboardProps {
  onViewChange: (view: string) => void;
}

export function UserDashboard({ onViewChange }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const userProfile = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    location: "San Francisco, CA",
    memberSince: "March 2024",
    avatar: "SJ",
    rating: 4.8,
    totalReviews: 12
  };

  const pointsBalance = {
    current: 149,
    earned: 347,
    spent: 198,
    pending: 25
  };

  const uploadedItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      brand: "Zara",
      condition: "Excellent",
      points: 42,
      image: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "available",
      likes: 8,
      views: 34,
      dateUploaded: "2 days ago"
    },
    {
      id: 2,
      title: "Summer Midi Dress",
      brand: "H&M",
      condition: "Very Good",
      points: 28,
      image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "pending",
      likes: 5,
      views: 21,
      dateUploaded: "1 week ago"
    },
    {
      id: 3,
      title: "Designer Sneakers",
      brand: "Nike",
      condition: "Good",
      points: 35,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "swapped",
      likes: 12,
      views: 56,
      dateUploaded: "2 weeks ago"
    }
  ];

  const ongoingSwaps = [
    {
      id: 1,
      type: "swap_request",
      item: "Vintage Denim Jacket",
      otherUser: "Emma L.",
      status: "pending_approval",
      date: "2 hours ago",
      image: "https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      type: "point_redemption",
      item: "Wool Winter Coat",
      points: 45,
      status: "processing",
      date: "1 day ago",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-primary bg-orange-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'swapped': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your profile, items, and track your sustainable impact</p>
        </div>

        {/* Profile Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{userProfile.avatar}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{userProfile.name}</h2>
              <p className="text-gray-600 mb-2">{userProfile.email}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{userProfile.location}</span>
                <span>•</span>
                <span>Member since {userProfile.memberSince}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{userProfile.rating} ({userProfile.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onViewChange('profile')}
              className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Points Balance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{pointsBalance.current}</div>
            <div className="text-sm text-gray-600">Current Points</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{pointsBalance.earned}</div>
            <div className="text-sm text-gray-600">Total Earned</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{pointsBalance.spent}</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{pointsBalance.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Uploaded Items Overview */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">My Items ({uploadedItems.length})</h3>
                <button
                  onClick={() => onViewChange('add-item')}
                  className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {uploadedItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.brand} • {item.condition}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-primary font-semibold text-sm">{item.points} pts</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center space-x-2 mb-1">
                        <Eye className="h-4 w-4" />
                        <span>{item.views}</span>
                      </div>
                      <div>{item.dateUploaded}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => onViewChange('profile')}
                  className="text-primary hover:text-secondary font-medium"
                >
                  View All Items
                </button>
              </div>
            </div>
          </div>

          {/* Ongoing Swaps */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ongoing Activity ({ongoingSwaps.length})</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {ongoingSwaps.map(swap => (
                  <div key={swap.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img src={swap.image} alt={swap.item} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{swap.item}</h4>
                      {swap.type === 'swap_request' ? (
                        <p className="text-sm text-gray-600">Swap request from {swap.otherUser}</p>
                      ) : (
                        <p className="text-sm text-gray-600">Point redemption ({swap.points} pts)</p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{swap.date}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {swap.type === 'swap_request' && (
                        <button className="text-primary hover:text-secondary">
                          <MessageCircle className="h-5 w-5" />
                        </button>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        swap.status === 'pending_approval' ? 'text-yellow-600 bg-yellow-100' : 'text-blue-600 bg-blue-100'
                      }`}>
                        {swap.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => onViewChange('messages')}
                  className="text-primary hover:text-secondary font-medium"
                >
                  View All Messages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}