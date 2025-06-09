
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Eye, Lock, Plus, FileText, Home, Info, Briefcase, Phone } from 'lucide-react';
import ContentEditor from './ContentEditor';

interface ContentManagerProps {
  onContentChange: () => void;
}

const ContentManager = ({ onContentChange }: ContentManagerProps) => {
  const [activePageId, setActivePageId] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');

  const pages = [
    {
      id: 'home',
      name: 'Homepage',
      icon: <Home className="w-4 h-4" />,
      sections: [
        { id: 'hero', name: 'Hero Section', editable: true, type: 'hero' },
        { id: 'values', name: 'Values Section', editable: true, type: 'values' },
        { id: 'quote', name: 'Quote Section', editable: true, type: 'quote' },
        { id: 'cta', name: 'Call to Action', editable: true, type: 'cta' }
      ]
    },
    {
      id: 'about',
      name: 'About Page',
      icon: <Info className="w-4 h-4" />,
      sections: [
        { id: 'story', name: 'Story Section', editable: true, type: 'text' },
        { id: 'timeline', name: 'Professional Journey', editable: true, type: 'timeline' },
        { id: 'quote', name: 'Quote Section', editable: true, type: 'quote' }
      ]
    },
    {
      id: 'services',
      name: 'Services Page',
      icon: <Briefcase className="w-4 h-4" />,
      sections: [
        { id: 'services-intro', name: 'Services Introduction', editable: true, type: 'text' },
        { id: 'process', name: 'Work Process', editable: true, type: 'process' },
        { id: 'consultation', name: 'Consultation CTA', editable: true, type: 'cta' }
      ]
    },
    {
      id: 'projects',
      name: 'Projects Page',
      icon: <Eye className="w-4 h-4" />,
      sections: [
        { id: 'projects-intro', name: 'Projects Introduction', editable: true, type: 'text' },
        { id: 'project-grid', name: 'Project Grid', editable: false, type: 'dynamic' }
      ]
    },
    {
      id: 'contact',
      name: 'Contact Page',
      icon: <Phone className="w-4 h-4" />,
      sections: [
        { id: 'contact-form', name: 'Contact Form', editable: true, type: 'form' },
        { id: 'contact-info', name: 'Contact Information', editable: true, type: 'contact' },
        { id: 'working-hours', name: 'Working Hours', editable: true, type: 'hours' }
      ]
    }
  ];

  const filteredPages = pages.filter(page => 
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.sections.some(section => 
      section.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-900">Content Management</h2>
          <p className="text-stone-600">Edit all text content across your website</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button className="bg-stone-600 hover:bg-stone-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Enhanced Sidebar - Page List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Pages
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredPages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setActivePageId(page.id)}
                    className={`w-full text-left p-4 rounded-lg transition-colors border-l-4 ${
                      activePageId === page.id
                        ? 'bg-stone-100 border-stone-600 shadow-sm'
                        : 'hover:bg-stone-50 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {page.icon}
                      <span className="font-medium">{page.name}</span>
                    </div>
                    <div className="text-sm text-stone-600 mb-3">
                      {page.sections.length} sections
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {page.sections.slice(0, 3).map((section) => (
                        <Badge 
                          key={section.id}
                          variant={section.editable ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {section.editable ? (
                            <Edit className="w-2 h-2 mr-1" />
                          ) : (
                            <Lock className="w-2 h-2 mr-1" />
                          )}
                          {section.type}
                        </Badge>
                      ))}
                      {page.sections.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{page.sections.length - 3}
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Editor */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  {pages.find(p => p.id === activePageId)?.icon}
                  Edit: {pages.find(p => p.id === activePageId)?.name}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                </div>
              </div>
              <div className="text-sm text-stone-600">
                Now editing all content blocks for this page. All previously locked sections are now fully editable.
              </div>
            </CardHeader>
            <CardContent>
              <ContentEditor 
                pageId={activePageId}
                onContentChange={onContentChange}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
