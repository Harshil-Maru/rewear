import React, { useState } from 'react';
import { Search, Send, MoreVertical, Image, Package, Star, Clock } from 'lucide-react';

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      user: "Emma L.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      lastMessage: "Sounds great! When would you like to meet for the exchange?",
      time: "2m ago",
      unread: true,
      item: "Vintage Denim Jacket",
      status: "swap_agreed"
    },
    {
      id: 2,
      user: "Mike R.",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
      lastMessage: "The sneakers look amazing! Are they still available?",
      time: "1h ago",
      unread: false,
      item: "Designer Sneakers",
      status: "interested"
    },
    {
      id: 3,
      user: "Anna T.",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100",
      lastMessage: "Thank you for the smooth exchange! ⭐⭐⭐⭐⭐",
      time: "2d ago",
      unread: false,
      item: "Silk Blouse",
      status: "completed"
    },
    {
      id: 4,
      user: "Lisa P.",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100",
      lastMessage: "Would you be interested in a direct swap?",
      time: "3d ago",
      unread: false,
      item: "Summer Dress",
      status: "proposal"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Emma L.",
      message: "Hi! I'm really interested in your vintage denim jacket. Would you be open to a direct swap?",
      time: "2 hours ago",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      message: "Hi Emma! Yes, I'd definitely be interested. What item were you thinking of swapping?",
      time: "1 hour ago",
      isOwn: true
    },
    {
      id: 3,
      sender: "Emma L.",
      message: "I have a wool winter coat from Zara that's in excellent condition. Here are some photos:",
      time: "45m ago",
      isOwn: false,
      hasImages: true
    },
    {
      id: 4,
      sender: "You",
      message: "That coat looks perfect! I love the color. It seems like a fair swap to me.",
      time: "30m ago",
      isOwn: true
    },
    {
      id: 5,
      sender: "Emma L.",
      message: "Wonderful! I'm so excited. The jacket is exactly what I've been looking for.",
      time: "15m ago",
      isOwn: false
    },
    {
      id: 6,
      sender: "Emma L.",
      message: "Sounds great! When would you like to meet for the exchange?",
      time: "2m ago",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'swap_agreed': return 'text-green-600 bg-green-100';
      case 'interested': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'proposal': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'swap_agreed': return 'Swap Agreed';
      case 'interested': return 'Interested';
      case 'completed': return 'Completed';
      case 'proposal': return 'Proposal';
      default: return 'Active';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto h-screen flex">
        {/* Conversations List */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.user}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.unread && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-semibold truncate ${
                        conversation.unread ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {conversation.user}
                      </h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 truncate">
                      {conversation.item}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate flex-1 ${
                        conversation.unread ? 'font-medium text-gray-900' : 'text-gray-600'
                      }`}>
                        {conversation.lastMessage}
                      </p>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                        {getStatusText(conversation.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={conversations.find(c => c.id === selectedConversation)?.avatar}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {conversations.find(c => c.id === selectedConversation)?.user}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>{conversations.find(c => c.id === selectedConversation)?.item}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  getStatusColor(conversations.find(c => c.id === selectedConversation)?.status || '')
                }`}>
                  {getStatusText(conversations.find(c => c.id === selectedConversation)?.status || '')}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isOwn
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  {message.hasImages && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="bg-gray-200 rounded h-20 flex items-center justify-center">
                        <Image className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="bg-gray-200 rounded h-20 flex items-center justify-center">
                        <Image className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                  )}
                  <div className={`flex items-center space-x-1 mt-2 text-xs ${
                    message.isOwn ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    <Clock className="h-3 w-3" />
                    <span>{message.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Image className="h-5 w-5" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-4 flex space-x-2">
              <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
                Agree to Swap
              </button>
              <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                Make Counter Offer
              </button>
              <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors">
                Request More Photos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}