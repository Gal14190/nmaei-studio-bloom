
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Eye, Lock, Plus } from 'lucide-react';
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
      sections: [
        { id: 'hero', name: 'Hero Section', editable: true, type: 'hero' },
        { id: 'values', name: 'Values Section', editable: true, type: 'values' },
        { id: 'cta', name: 'Call to Action', editable: true, type: 'cta' }
      ]
    },
    {
      id: 'about',
      name: 'About Page',
      sections: [
        { id: 'story', name: 'Story Section', editable: true, type: 'text' },
        { id: 'timeline', name: 'Professional Journey', editable: true, type: 'timeline' },
        { id: 'quote', name: 'Quote Section', editable: true, type: 'quote' }
      ]
    },
    {
      id: 'services',
      name: 'Services Page',
      sections: [
        { id: 'services-list', name: 'Services List', editable: true, type: 'services' },
        { id: 'process', name: 'Work Process', editable: true, type: 'process' },
        { id: 'consultation', name: 'Consultation CTA', editable: true, type: 'cta' }
      ]
    },
    {
      id: 'projects',
      name: 'Projects Page',
      sections: [
        { id: 'projects-intro', name: 'Projects Introduction', editable: true, type: 'text' },
        { id: 'project-grid', name: 'Project Grid', editable: false, type: 'dynamic' }
      ]
    },
    {
      id: 'contact',
      name: 'Contact Page',
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
        {/* Sidebar - Page List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pages</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredPages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setActivePageId(page.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activePageId === page.id
                        ? 'bg-stone-100 border-l-4 border-stone-600'
                        : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="font-medium">{page.name}</div>
                    <div className="text-sm text-stone-600">
                      {page.sections.length} sections
                    </div>
                    <div className="flex space-x-1 mt-2">
                      {page.sections.map((section) => (
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
                <CardTitle>
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
