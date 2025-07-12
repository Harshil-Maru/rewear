import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockItems } from '../data/mockData';
import { Item } from '../types';

interface ItemsContextType {
  items: Item[];
  updateItemStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
  deleteItem: (id: string) => void;
  getRecentActivity: () => Array<{
    id: string;
    user: string;
    action: string;
    time: string;
    item?: Item;
  }>;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [activityLog, setActivityLog] = useState<Array<{
    id: string;
    user: string;
    action: string;
    time: string;
    itemId?: string;
  }>>([
    { id: '1', user: 'Diya Sarvaiya', action: 'Listed a new item', time: '2 minutes ago', itemId: '1' },
    { id: '2', user: 'Harshil Maru', action: 'Completed a swap', time: '5 minutes ago' },
    { id: '3', user: 'Mahek Maru', action: 'Updated profile', time: '1 hour ago' },
    { id: '4', user: 'Ayush Mittal', action: 'Joined the platform', time: '2 hours ago' }
  ]);

  const updateItemStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );

    // Add activity log entry
    const item = items.find(item => item.id === id);
    if (item) {
      const action = status === 'approved' ? 'approved an item' : 
                    status === 'rejected' ? 'rejected an item' : 
                    'updated item status';
      
      const newActivity = {
        id: Date.now().toString(),
        user: 'Admin',
        action,
        time: 'Just now',
        itemId: id
      };
      
      setActivityLog(prev => [newActivity, ...prev.slice(0, 9)]); // Keep last 10 activities
    }
  };

  const deleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    
    // Add activity log entry
    const newActivity = {
      id: Date.now().toString(),
      user: 'Admin',
      action: 'deleted an item',
      time: 'Just now',
      itemId: id
    };
    
    setActivityLog(prev => [newActivity, ...prev.slice(0, 9)]);
  };

  const getRecentActivity = () => {
    return activityLog.map(activity => {
      const item = activity.itemId ? items.find(item => item.id === activity.itemId) : undefined;
      return {
        ...activity,
        item
      };
    });
  };

  return (
    <ItemsContext.Provider value={{
      items,
      updateItemStatus,
      deleteItem,
      getRecentActivity
    }}>
      {children}
    </ItemsContext.Provider>
  );
}; 