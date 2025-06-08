
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Save, RotateCcw, Eye, Bell, Search } from 'lucide-react';
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

interface AdminDashboardProps {
  onLogout: () => void;
}

type ActiveSection = 'media' | 'advanced-media' | 'categories' | 'pages' | 'dynamic-pages' | 'projects' | 'content' | 'settings' | 'site-settings';

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dynamic-pages');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges && autoSaveEnabled) {
      const autoSaveTimer = setTimeout(() => {
        handleSave(true);
      }, 60000); // Auto-save every 60 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [hasUnsavedChanges, autoSaveEnabled]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSave = (isAutoSave = false) => {
    setHasUnsavedChanges(false);
    setLastSaved(new Date());
    
    toast({
      title: isAutoSave ? "Auto-saved" : "Changes saved",
      description: isAutoSave ? "Your work has been automatically saved" : "All changes have been saved successfully",
    });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default settings? This cannot be undone.')) {
      setHasUnsavedChanges(false);
      toast({
        title: "Settings reset",
        description: "All settings have been reset to default values",
      });
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dynamic-pages': return 'Dynamic Page Management';
      case 'advanced-media': return 'Advanced Media Library';
      case 'media': return 'Basic Media Manager';
      case 'categories': return 'Category Management';
      case 'pages': return 'Page Editor';
      case 'projects': return 'Project Management';
      case 'content': return 'Content Management';
      case 'site-settings': return 'Site Settings';
      case 'settings': return 'Design Settings';
      default: return 'Dashboard';
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dynamic-pages':
        return <DynamicPageManager onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'advanced-media':
        return <AdvancedMediaManager onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'media':
        return <MediaManager onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'categories':
        return <CategoryEditor onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'pages':
        return <EnhancedPageEditor onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'projects':
        return <ProjectManager onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'content':
        return <ContentManager onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'site-settings':
        return <SiteSettings onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'settings':
        return <DesignSettings onContentChange={() => setHasUnsavedChanges(true)} />;
      default:
        return <DynamicPageManager onContentChange={() => setHasUnsavedChanges(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
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
            
            {/* Global Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                placeholder="Search pages, projects, media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Status Indicators */}
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-2 text-amber-600">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Unsaved changes</span>
              </div>
            )}
            
            <Button
              onClick={handlePreview}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview Site
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
              onClick={() => handleSave()}
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
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>

      {/* Floating Save Indicator */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 right-6 bg-amber-100 border border-amber-300 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-amber-800">Unsaved Changes</p>
              <p className="text-xs text-amber-600">Press Ctrl+S to save or wait for auto-save</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
