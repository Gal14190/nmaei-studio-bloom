
import React from 'react';
import { Image, FolderOpen, FileText, Settings } from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: 'media' | 'categories' | 'pages' | 'settings') => void;
}

const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'media', label: 'Media', icon: Image },
    { id: 'categories', label: 'Categories', icon: FolderOpen },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-stone-100 text-stone-900 border border-stone-200'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
