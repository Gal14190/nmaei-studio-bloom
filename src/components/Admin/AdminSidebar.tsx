
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ImageIcon, 
  FolderIcon, 
  FileTextIcon, 
  SettingsIcon, 
  LayoutGridIcon,
  GlobeIcon,
  EditIcon,
  FolderOpenIcon,
  PaletteIcon
} from 'lucide-react';

type SidebarSection = 'media' | 'advanced-media' | 'categories' | 'pages' | 'messages' | 'projects' | 'content' | 'settings' | 'site-settings' | 'site-wide';

interface AdminSidebarProps {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
}

const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const sections = [
    {
      id: 'messages' as SidebarSection,
      label: 'הודעות משתמשים',
      icon: FolderOpenIcon,
      description: 'הודעות משתמשים'
    },
    {
      id: 'categories' as SidebarSection,
      label: 'קטגוריות פרויקטים',
      icon: FolderIcon,
      description: 'ארגון לפי קטגוריות'
    },
    {
      id: 'projects' as SidebarSection,
      label: 'פרויקטים',
      icon: LayoutGridIcon,
      description: 'ניהול הפרויקטים'
    },
    {
      id: 'content' as SidebarSection,
      label: 'תוכן אתר',
      icon: EditIcon,
      description: 'עריכת תוכן האתר'
    },
    // {
    //   id: 'advanced-media' as SidebarSection,
    //   label: 'Media Library',
    //   icon: ImageIcon,
    //   description: 'Advanced media management'
    // },
    {
      id: 'site-wide' as SidebarSection,
      label: 'הגדרות אתר',
      icon: GlobeIcon,
      description: 'הגדרות אתר כלליות'
    },
    // {
    //   id: 'media' as SidebarSection,
    //   label: 'Basic Media',
    //   icon: ImageIcon,
    //   description: 'Simple media upload'
    // },
    // {
    //   id: 'pages' as SidebarSection,
    //   label: 'Page Editor',
    //   icon: FileTextIcon,
    //   description: 'Basic page structure'
    // },
    // {
    //   id: 'site-settings' as SidebarSection,
    //   label: 'Legacy Settings',
    //   icon: SettingsIcon,
    //   description: 'Legacy contact & social'
    // },
    {
      id: 'settings' as SidebarSection,
      label: 'הגדרות עיצוב',
      icon: PaletteIcon,
      description: 'עיצוב האתר'
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 h-full">
      <div className="p-6">
        <h2 className="text-lg font-medium text-stone-900 mb-6">דשבורד ניהול</h2>
        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <Button
                key={section.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start text-left h-auto p-3 ${
                  isActive 
                    ? "bg-stone-900 text-white hover:bg-stone-800" 
                    : "text-stone-700 hover:bg-stone-100"
                }`}
                onClick={() => onSectionChange(section.id)}
              >
                <div className="flex items-start space-x-3">
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{section.label}</div>
                    <div className={`text-xs ${
                      isActive ? "text-stone-300" : "text-stone-500"
                    }`}>
                      {section.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
