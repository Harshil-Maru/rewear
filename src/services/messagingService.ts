// Simulated real-time messaging service
// In a real application, this would use WebSocket or Socket.io

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  conversationId: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message | null;
  unreadCount: number;
  itemId: string;
  itemTitle: string;
  status: 'active' | 'swap_agreed' | 'completed' | 'interested' | 'proposal';
}

class MessagingService {
  private conversations: Map<string, Conversation> = new Map();
  private messages: Map<string, Message[]> = new Map();
  private listeners: Set<(conversationId: string, message: Message) => void> = new Set();
  private currentUserId = 'user-1'; // In real app, this would come from auth

  constructor() {
    this.initializeMockData();
    this.startRealTimeSimulation();
  }

  private initializeMockData() {
    // Initialize mock conversations
    const mockConversations: Conversation[] = [
      {
        id: 'conv-1',
        participants: ['user-1', 'user-2'],
        lastMessage: null,
        unreadCount: 1,
        itemId: 'item-1',
        itemTitle: 'Vintage Denim Jacket',
        status: 'swap_agreed'
      },
      {
        id: 'conv-2',
        participants: ['user-1', 'user-3'],
        lastMessage: null,
        unreadCount: 0,
        itemId: 'item-2',
        itemTitle: 'Designer Sneakers',
        status: 'interested'
      },
      {
        id: 'conv-3',
        participants: ['user-1', 'user-4'],
        lastMessage: null,
        unreadCount: 0,
        itemId: 'item-3',
        itemTitle: 'Silk Blouse',
        status: 'completed'
      }
    ];

    mockConversations.forEach(conv => {
      this.conversations.set(conv.id, conv);
      this.messages.set(conv.id, []);
    });

    // Initialize mock messages
    const mockMessages: Message[] = [
      {
        id: 'msg-1',
        senderId: 'user-2',
        senderName: 'Emma L.',
        senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: 'Hi! I\'m really interested in your vintage denim jacket. Would you be open to a direct swap?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isOwn: false,
        conversationId: 'conv-1'
      },
      {
        id: 'msg-2',
        senderId: 'user-1',
        senderName: 'You',
        senderAvatar: '',
        content: 'Hi Emma! Yes, I\'d definitely be interested. What item were you thinking of swapping?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        isOwn: true,
        conversationId: 'conv-1'
      },
      {
        id: 'msg-3',
        senderId: 'user-2',
        senderName: 'Emma L.',
        senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: 'I have a wool winter coat from Zara that\'s in excellent condition. Here are some photos:',
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        isOwn: false,
        conversationId: 'conv-1'
      },
      {
        id: 'msg-4',
        senderId: 'user-1',
        senderName: 'You',
        senderAvatar: '',
        content: 'That coat looks perfect! I love the color. It seems like a fair swap to me.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        isOwn: true,
        conversationId: 'conv-1'
      },
      {
        id: 'msg-5',
        senderId: 'user-2',
        senderName: 'Emma L.',
        senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: 'Wonderful! I\'m so excited. The jacket is exactly what I\'ve been looking for.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        isOwn: false,
        conversationId: 'conv-1'
      },
      {
        id: 'msg-6',
        senderId: 'user-2',
        senderName: 'Emma L.',
        senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: 'Sounds great! When would you like to meet for the exchange?',
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        isOwn: false,
        conversationId: 'conv-1'
      }
    ];

    mockMessages.forEach(msg => {
      const conversationMessages = this.messages.get(msg.conversationId) || [];
      conversationMessages.push(msg);
      this.messages.set(msg.conversationId, conversationMessages);
    });

    // Update last messages for conversations
    this.conversations.forEach((conv, convId) => {
      const convMessages = this.messages.get(convId) || [];
      if (convMessages.length > 0) {
        conv.lastMessage = convMessages[convMessages.length - 1];
      }
    });
  }

  private startRealTimeSimulation() {
    // Simulate incoming messages every 10-30 seconds
    setInterval(() => {
      const conversationIds = Array.from(this.conversations.keys());
      const randomConvId = conversationIds[Math.floor(Math.random() * conversationIds.length)];
      
      // 20% chance of receiving a new message
      if (Math.random() < 0.2) {
        const mockResponses = [
          'That sounds perfect!',
          'Can you send me more photos?',
          'What time works best for you?',
          'I\'m available this weekend',
          'The item looks great in the photos',
          'Let\'s meet at the coffee shop downtown',
          'Perfect! I\'m excited for this swap',
          'Do you have any other items available?'
        ];

        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          senderId: 'user-2',
          senderName: 'Emma L.',
          senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
          content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
          timestamp: new Date(),
          isOwn: false,
          conversationId: randomConvId
        };

        this.addMessage(randomConvId, newMessage);
      }
    }, 10000 + Math.random() * 20000); // Random interval between 10-30 seconds
  }

  public getConversations(): Conversation[] {
    return Array.from(this.conversations.values());
  }

  public getMessages(conversationId: string): Message[] {
    return this.messages.get(conversationId) || [];
  }

  public sendMessage(conversationId: string, content: string): Message {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: this.currentUserId,
      senderName: 'You',
      senderAvatar: '',
      content,
      timestamp: new Date(),
      isOwn: true,
      conversationId
    };

    this.addMessage(conversationId, newMessage);
    return newMessage;
  }

  private addMessage(conversationId: string, message: Message) {
    const conversationMessages = this.messages.get(conversationId) || [];
    conversationMessages.push(message);
    this.messages.set(conversationId, conversationMessages);

    // Update conversation's last message
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.lastMessage = message;
      if (!message.isOwn) {
        conversation.unreadCount++;
      }
      this.conversations.set(conversationId, conversation);
    }

    // Notify listeners
    this.listeners.forEach(listener => {
      listener(conversationId, message);
    });
  }

  public markConversationAsRead(conversationId: string) {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.unreadCount = 0;
      this.conversations.set(conversationId, conversation);
    }
  }

  public subscribeToMessages(callback: (conversationId: string, message: Message) => void) {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  public createConversation(participantId: string, itemId: string, itemTitle: string): string {
    const conversationId = `conv-${Date.now()}`;
    const newConversation: Conversation = {
      id: conversationId,
      participants: [this.currentUserId, participantId],
      lastMessage: null,
      unreadCount: 0,
      itemId,
      itemTitle,
      status: 'active'
    };

    this.conversations.set(conversationId, newConversation);
    this.messages.set(conversationId, []);
    
    return conversationId;
  }
}

// Export singleton instance
export const messagingService = new MessagingService(); 