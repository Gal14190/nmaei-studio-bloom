
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Save, RotateCcw, Eye, Bell } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import MediaManager from './MediaManager';
import CategoryEditor from './CategoryEditor';
import EnhancedPageEditor from './EnhancedPageEditor';
import DesignSettings from './DesignSettings';

interface AdminDashboardProps {
  onLogout: () => void;
}

type ActiveSection = 'media' | 'categories' | 'pages' | 'settings';

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('media');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Auto-saved draft changes', time: '2 minutes ago' },
    { id: 2, message: 'New image uploaded', time: '5 minutes ago' },
  ]);

  const handleSave = () => {
    setHasUnsavedChanges(false);
    const newNotification = {
      id: Date.now(),
      message: 'All changes saved successfully',
      time: 'Just now'
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default settings? This cannot be undone.')) {
      setHasUnsavedChanges(false);
      const newNotification = {
        id: Date.now(),
        message: 'Settings reset to default',
        time: 'Just now'
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'media':
        return <MediaManager onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'categories':
        return <CategoryEditor onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'pages':
        return <EnhancedPageEditor onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'settings':
        return <DesignSettings onContentChange={() => setHasUnsavedChanges(true)} />;
      default:
        return <MediaManager onContentChange={() => setHasUnsavedChanges(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-stone-900">Admin Dashboard</h1>
            <p className="text-sm text-stone-600">Professional CMS for NMAEI Studio</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </div>
            
            <Button
              onClick={handlePreview}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              onClick={handleSave}
              size="sm"
              className={`flex items-center gap-2 ${
                hasUnsavedChanges 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-stone-600 hover:bg-stone-700'
              }`}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>

      {/* Status Indicators */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 bg-amber-100 border border-amber-300 rounded-lg p-3">
          <p className="text-sm text-amber-800">You have unsaved changes</p>
        </div>
      )}

      {/* Notifications Panel */}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 left-4 bg-white border border-stone-200 rounded-lg p-4 shadow-lg max-w-sm">
          <h4 className="font-medium text-stone-900 mb-2">Recent Activity</h4>
          <div className="space-y-2">
            {notifications.slice(0, 3).map(notification => (
              <div key={notification.id} className="text-sm">
                <p className="text-stone-700">{notification.message}</p>
                <p className="text-stone-500 text-xs">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
