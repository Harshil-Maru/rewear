import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, MoreVertical, Image, Package, Star, Clock } from 'lucide-react';
import { messagingService, Message, Conversation } from '../services/messagingService';

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string>('');
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations and messages on component mount
  useEffect(() => {
    const loadConversations = () => {
      const convs = messagingService.getConversations();
      setConversations(convs);
      
      // Select first conversation by default
      if (convs.length > 0 && !selectedConversation) {
        setSelectedConversation(convs[0].id);
      }
    };

    loadConversations();

    // Subscribe to real-time messages
    const unsubscribe = messagingService.subscribeToMessages((conversationId, message) => {
      // Update conversations list
      setConversations(prev => {
        const updated = prev.map(conv => {
          if (conv.id === conversationId) {
            return { ...conv, lastMessage: message };
          }
          return conv;
        });
        return updated;
      });

      // Update messages if this conversation is currently selected
      if (conversationId === selectedConversation) {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
      }
    });

    return unsubscribe;
  }, [selectedConversation]);

  // Load messages when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      const convMessages = messagingService.getMessages(selectedConversation);
      setMessages(convMessages);
      messagingService.markConversationAsRead(selectedConversation);
      scrollToBottom();
    }
  }, [selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      messagingService.sendMessage(selectedConversation, newMessage.trim());
      setNewMessage('');
      scrollToBottom();
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredConversations = conversations.filter(conv =>
    conv.itemTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'swap_agreed': return 'text-primary bg-orange-100';
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-orange-50 border-primary' : ''
                }`}
              >
                                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {conversation.itemTitle.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{conversation.unreadCount}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold truncate ${
                          conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {conversation.itemTitle}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessage ? formatTime(conversation.lastMessage.timestamp) : ''}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate flex-1 ${
                          conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                        }`}>
                          {conversation.lastMessage?.content || 'No messages yet'}
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
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {conversations.find(c => c.id === selectedConversation)?.itemTitle.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {conversations.find(c => c.id === selectedConversation)?.itemTitle}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>Item Discussion</span>
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
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <div className={`flex items-center space-x-1 mt-2 text-xs ${
                    message.isOwn ? 'text-orange-100' : 'text-gray-500'
                  }`}>
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-4 flex space-x-2">
              <button className="bg-orange-100 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
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