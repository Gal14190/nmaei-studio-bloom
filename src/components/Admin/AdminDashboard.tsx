import React, { useState, useEffect } from 'react';
import {
  LogOut, Save, RotateCcw, Eye, Bell, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import AdminSidebar from './AdminSidebar';
import MediaManager from './MediaManager';
import AdvancedMediaManager from './AdvancedMediaManager';
import CategoryEditor from './CategoryEditor';
import EnhancedPageEditor from './EnhancedPageEditor';
import DesignSettings from './DesignSettings';
import ProjectManager from './ProjectManager';
import ContentManager from './ContentManager';
import SiteSettings from './SiteSettings';
import DynamicPageManager from './DynamicPageManager';
import SiteWideSettings from './SiteWideSettings';
import ContactMessages from './ContactMessages';

interface AdminDashboardProps {
  onLogout: () => void;
}

type ActiveSection =
  | 'media'
  | 'advanced-media'
  | 'categories'
  | 'pages'
  | 'messages'
  | 'projects'
  | 'content'
  | 'settings'
  | 'site-settings'
  | 'site-wide';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('messages');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [autoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save
  useEffect(() => {
    if (hasUnsavedChanges && autoSaveEnabled) {
      const timer = setTimeout(() => handleSave(true), 60000);
      return () => clearTimeout(timer);
    }
  }, [hasUnsavedChanges, autoSaveEnabled]);

  const handleSave = (isAutoSave = false) => {
    setHasUnsavedChanges(false);
    setLastSaved(new Date());

    toast({
      title: isAutoSave ? 'Auto-saved' : 'Changes saved',
      description: isAutoSave
        ? 'Your work has been automatically saved'
        : 'All changes have been saved successfully',
    });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default settings?')) {
      setHasUnsavedChanges(false);
      toast({
        title: 'Settings reset',
        description: 'All settings have been reset to default values',
      });
    }
  };

  const handlePreview = () => window.open('/', '_blank');

  const getSectionTitle = (): string => {
    switch (activeSection) {
      case 'advanced-media': return 'Advanced Media Library';
      case 'media': return 'Basic Media Manager';
      case 'categories': return 'Category Management';
      case 'pages': return 'Page Editor';
      case 'projects': return 'Project Management';
      case 'content': return 'Content Management';
      case 'site-settings': return 'Site Settings';
      case 'site-wide': return 'Site-Wide Settings';
      case 'settings': return 'Design Settings';
      default: return 'Dashboard';
    }
  };

  const renderActiveSection = () => {
    const onContentChange = () => setHasUnsavedChanges(true);
    switch (activeSection) {
      case 'messages': return <ContactMessages />;
      case 'media': return <MediaManager onContentChange={onContentChange} />;
      case 'advanced-media': return <AdvancedMediaManager onContentChange={onContentChange} />;
      case 'categories': return <CategoryEditor onContentChange={onContentChange} />;
      case 'pages': return <EnhancedPageEditor onContentChange={onContentChange} />;
      case 'projects': return <ProjectManager onContentChange={onContentChange} />;
      case 'content': return <ContentManager onContentChange={onContentChange} />;
      case 'site-settings': return <SiteSettings onContentChange={onContentChange} />;
      case 'site-wide': return <SiteWideSettings onContentChange={onContentChange} />;
      case 'settings': return <DesignSettings onContentChange={onContentChange} />;
      default: return <DynamicPageManager onContentChange={onContentChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          {/* Title & Subtitle */}
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-light text-stone-900">NMAEI CMS</h1>
              <div className="flex items-center space-x-2 text-sm text-stone-600">
                <span>{getSectionTitle()}</span>
                {lastSaved && (
                  <>
                    <span>•</span>
                    <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
                  </>
                )}
              </div>
            </div>

            {/* Search (optionally enable) */}
            {/* <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-2 text-amber-600">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              </div>
            )}

            <Button onClick={handlePreview} variant="outline" size="sm" className="flex items-center gap-2">
              <Eye className="w-4 h-4" /> לאתר
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50"
            >
              <RotateCcw className="w-4 h-4" /> רענון
            </Button>

            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" /> יציאה
            </Button>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex">
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
