
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Save, RotateCcw, Eye } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import MediaManager from './MediaManager';
import CategoryEditor from './CategoryEditor';
import PageEditor from './PageEditor';
import DesignSettings from './DesignSettings';

interface AdminDashboardProps {
  onLogout: () => void;
}

type ActiveSection = 'media' | 'categories' | 'pages' | 'settings';

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('media');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSave = () => {
    // In production, this would save to backend
    setHasUnsavedChanges(false);
    alert('Changes saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default settings? This cannot be undone.')) {
      setHasUnsavedChanges(false);
      alert('Settings reset to default!');
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
        return <PageEditor onContentChange={() => setHasUnsavedChanges(true)} />;
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
            <p className="text-sm text-stone-600">Manage your website content</p>
          </div>
          <div className="flex items-center space-x-3">
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

      {hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 bg-amber-100 border border-amber-300 rounded-lg p-3">
          <p className="text-sm text-amber-800">You have unsaved changes</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
