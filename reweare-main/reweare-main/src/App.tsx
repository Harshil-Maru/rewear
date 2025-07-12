import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { BrowsePage } from './components/BrowsePage';
import { AddItemPage } from './components/AddItemPage';
import { ProfilePage } from './components/ProfilePage';
import { MessagesPage } from './components/MessagesPage';
import { ItemDetailPage } from './components/ItemDetailPage';
import { UserDashboard } from './components/UserDashboard';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const userPoints = 149;

  const handleViewItem = (itemId: number) => {
    setSelectedItemId(itemId);
    setCurrentView('item-detail');
  };
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onViewChange={setCurrentView} />;
      case 'browse':
        return <BrowsePage onViewItem={handleViewItem} />;
      case 'add-item':
        return <AddItemPage />;
      case 'profile':
        return <ProfilePage />;
      case 'messages':
        return <MessagesPage />;
      case 'dashboard':
        return <UserDashboard onViewChange={setCurrentView} />;
      case 'item-detail':
        return <ItemDetailPage itemId={selectedItemId} onBack={() => setCurrentView('browse')} />;
      default:
        return <HomePage onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        userPoints={userPoints}
      />
      {renderCurrentView()}
    </div>
  );
}

export default App;