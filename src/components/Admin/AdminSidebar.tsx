
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ImageIcon, 
  FolderIcon, 
  FileTextIcon, 
  SettingsIcon, 
  LayoutGridIcon,
  GlobeIcon,
  EditIcon
} from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

type SidebarSection = 'media' | 'categories' | 'pages' | 'projects' | 'content' | 'settings' | 'site-settings';

const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const sections = [
    {
      id: 'media' as SidebarSection,
      label: 'Media Manager',
      icon: ImageIcon,
      description: 'Upload and manage images'
    },
    {
      id: 'projects' as SidebarSection,
      label: 'Projects',
      icon: LayoutGridIcon,
      description: 'Manage portfolio projects'
    },
    {
      id: 'content' as SidebarSection,
      label: 'Content',
      icon: EditIcon,
      description: 'Edit page content sections'
    },
    {
      id: 'pages' as SidebarSection,
      label: 'Page Editor',
      icon: FileTextIcon,
      description: 'Edit page structure'
    },
    {
      id: 'categories' as SidebarSection,
      label: 'Categories',
      icon: FolderIcon,
      description: 'Organize content'
    },
    {
      id: 'site-settings' as SidebarSection,
      label: 'Site Settings',
      icon: GlobeIcon,
      description: 'Contact info & social links'
    },
    {
      id: 'settings' as SidebarSection,
      label: 'Design Settings',
      icon: SettingsIcon,
      description: 'Customize appearance'
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 h-full">
      <div className="p-6">
        <h2 className="text-lg font-medium text-stone-900 mb-6">Dashboard</h2>
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
