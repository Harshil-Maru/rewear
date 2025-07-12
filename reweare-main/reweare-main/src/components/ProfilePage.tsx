import React, { useState } from 'react';
import { Star, MapPin, Calendar, Package, Award, TrendingUp, MessageSquare, Settings, Camera, Edit3 } from 'lucide-react';

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('listings');

  const userStats = {
    totalListings: 23,
    completedSwaps: 15,
    pointsEarned: 347,
    pointsSpent: 198,
    currentPoints: 149,
    memberSince: 'March 2024',
    rating: 4.8,
    totalReviews: 12,
    co2Saved: 45.6,
    location: 'San Francisco, CA'
  };

  const userListings = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      brand: "Zara",
      condition: "Excellent",
      points: 42,
      image: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "available",
      likes: 8,
      views: 34
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
      views: 21
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
      views: 56
    }
  ];

  const recentActivity = [
    { type: 'swap_completed', item: 'Wool Winter Coat', points: '+45', time: '2 hours ago' },
    { type: 'item_listed', item: 'Vintage Leather Jacket', points: '+15', time: '1 day ago' },
    { type: 'points_spent', item: 'Designer Handbag', points: '-38', time: '3 days ago' },
    { type: 'review_received', item: '5-star review', points: '+5', time: '5 days ago' }
  ];

  const reviews = [
    {
      id: 1,
      reviewer: "Emma L.",
      rating: 5,
      comment: "Amazing item exactly as described! Fast and smooth exchange.",
      item: "Silk Blouse",
      date: "1 week ago",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      reviewer: "Mike R.",
      rating: 5,
      comment: "Great communication and the jacket was in perfect condition.",
      item: "Denim Jacket",
      date: "2 weeks ago",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  const tabs = [
    { id: 'listings', label: 'My Listings', count: userStats.totalListings },
    { id: 'activity', label: 'Activity', count: null },
    { id: 'reviews', label: 'Reviews', count: userStats.totalReviews },
    { id: 'settings', label: 'Settings', count: null }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">SJ</span>
              </div>
              <button className="absolute -bottom-1 -right-1 bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Sarah Johnson</h1>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit3 className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{userStats.rating}</span>
                  <span>({userStats.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{userStats.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {userStats.memberSince}</span>
                </div>
              </div>
              <p className="text-gray-700 max-w-2xl">
                Passionate about sustainable fashion and reducing textile waste. 
                Love finding new homes for clothes I no longer wear and discovering unique pieces from the community!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Edit Profile
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                <Settings className="h-4 w-4 inline mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{userStats.currentPoints}</div>
            <div className="text-sm text-gray-600">Current Points</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{userStats.totalListings}</div>
            <div className="text-sm text-gray-600">Items Listed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{userStats.completedSwaps}</div>
            <div className="text-sm text-gray-600">Swaps Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{userStats.pointsEarned}</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">{userStats.co2Saved}</div>
            <div className="text-sm text-gray-600">kg CO₂ Saved</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      activeTab === tab.id ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* My Listings */}
            {activeTab === 'listings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">My Listed Items</h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Add New Item
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userListings.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'available' ? 'bg-green-100 text-green-800' :
                          item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 mb-2">{item.brand} • {item.condition}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 font-semibold">{item.points} pts</span>
                          <div className="text-sm text-gray-500">
                            {item.likes} likes • {item.views} views
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'swap_completed' ? 'bg-green-100' :
                          activity.type === 'item_listed' ? 'bg-blue-100' :
                          activity.type === 'points_spent' ? 'bg-red-100' :
                          'bg-yellow-100'
                        }`}>
                          {activity.type === 'swap_completed' && <Package className="h-4 w-4 text-green-600" />}
                          {activity.type === 'item_listed' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'points_spent' && <Award className="h-4 w-4 text-red-600" />}
                          {activity.type === 'review_received' && <Star className="h-4 w-4 text-yellow-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.item}</p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${
                        activity.points.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {activity.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Reviews from Other Users</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">{userStats.rating}</span>
                    <span className="text-gray-600">({userStats.totalReviews} reviews)</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <img src={review.avatar} alt={review.reviewer} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.reviewer}</h4>
                              <p className="text-sm text-gray-600">Exchanged: {review.item}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Notification Preferences</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="text-green-600 focus:ring-green-500" defaultChecked />
                        <span>Email notifications for new swap requests</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="text-green-600 focus:ring-green-500" defaultChecked />
                        <span>Push notifications for messages</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="text-green-600 focus:ring-green-500" />
                        <span>Weekly sustainability impact reports</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Privacy Settings</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="text-green-600 focus:ring-green-500" defaultChecked />
                        <span>Show my location to nearby users</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="text-green-600 focus:ring-green-500" defaultChecked />
                        <span>Allow others to see my swap history</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}