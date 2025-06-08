
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Save, Copy, Trash2 } from 'lucide-react';

interface ContentManagerProps {
  onContentChange: () => void;
}

interface ContentSection {
  id: string;
  title: string;
  content: string;
  published: boolean;
  page: string;
  type: 'text' | 'rich-text' | 'hero' | 'section';
}

const ContentManager = ({ onContentChange }: ContentManagerProps) => {
  const [contentSections, setContentSections] = useState<ContentSection[]>([
    {
      id: 'about-journey',
      title: 'המסע המקצועי',
      content: 'הסטודיו שלנו נוסד בשנת 2020 מתוך חזון ברור - ליצור מרחבים שמשקפים את האישיות והצרכים הייחודיים של כל לקוח...',
      published: true,
      page: 'about',
      type: 'section'
    },
    {
      id: 'about-philosophy',
      title: 'הפילוסופיה שלנו',
      content: 'אנחנו מאמינים שעיצוב טוב מתחיל בהקשבה. כל פרויקט מתחיל בשיחה עמוקה עם הלקוח...',
      published: true,
      page: 'about',
      type: 'section'
    },
    {
      id: 'services-intro',
      title: 'השירותים שלנו',
      content: 'אנחנו מציעים מגוון רחב של שירותי עיצוב ואדריכלות, החל מתכנון מושלם ועד ביצוע מדויק...',
      published: true,
      page: 'services',
      type: 'section'
    }
  ]);

  const [activeSection, setActiveSection] = useState<ContentSection | null>(null);

  const handleSaveSection = (section: ContentSection) => {
    setContentSections(prev => 
      prev.map(s => s.id === section.id ? section : s)
    );
    setActiveSection(null);
    onContentChange();
  };

  const handleDuplicateSection = (section: ContentSection) => {
    const newSection: ContentSection = {
      ...section,
      id: `${section.id}-copy-${Date.now()}`,
      title: `${section.title} - עותק`,
      published: false
    };
    setContentSections(prev => [...prev, newSection]);
    onContentChange();
  };

  const handleDeleteSection = (id: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את הקטע?')) {
      setContentSections(prev => prev.filter(s => s.id !== id));
      onContentChange();
    }
  };

  const handleTogglePublished = (id: string) => {
    setContentSections(prev => prev.map(s => 
      s.id === id ? { ...s, published: !s.published } : s
    ));
    onContentChange();
  };

  const pageGroups = contentSections.reduce((groups, section) => {
    if (!groups[section.page]) {
      groups[section.page] = [];
    }
    groups[section.page].push(section);
    return groups;
  }, {} as Record<string, ContentSection[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-900">Content Manager</h2>
          <p className="text-stone-600">Manage static content sections across all pages</p>
        </div>
        <Button 
          onClick={() => {
            const newSection: ContentSection = {
              id: `section-${Date.now()}`,
              title: 'קטע חדש',
              content: '',
              published: false,
              page: 'about',
              type: 'section'
            };
            setActiveSection(newSection);
          }}
          className="bg-stone-600 hover:bg-stone-700"
        >
          Add New Section
        </Button>
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="services">Services Page</TabsTrigger>
          <TabsTrigger value="contact">Contact Page</TabsTrigger>
        </TabsList>

        {Object.entries(pageGroups).map(([page, sections]) => (
          <TabsContent key={page} value={page}>
            <div className="space-y-4">
              {sections.map((section) => (
                <Card key={section.id} className={`${!section.published ? 'border-orange-300 bg-orange-50' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={section.published}
                            onCheckedChange={() => handleTogglePublished(section.id)}
                            className="scale-75"
                          />
                          <span className="text-xs text-stone-600">
                            {section.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveSection(section)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDuplicateSection(section)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSection(section.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-stone-600 line-clamp-3">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {activeSection && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Edit Content Section</CardTitle>
          </CardHeader>
          <CardContent>
            <SectionEditor
              section={activeSection}
              onSave={handleSaveSection}
              onCancel={() => setActiveSection(null)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const SectionEditor = ({ 
  section, 
  onSave, 
  onCancel 
}: {
  section: ContentSection;
  onSave: (section: ContentSection) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(section);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div>
        <Label>Content</Label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          rows={8}
          className="font-mono text-sm"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={formData.published}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
        />
        <Label>Published</Label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave} className="bg-stone-600 hover:bg-stone-700">
          <Save className="w-4 h-4 mr-2" />
          Save Section
        </Button>
      </div>
    </div>
  );
};

export default ContentManager;
