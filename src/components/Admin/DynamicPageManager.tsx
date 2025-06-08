
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Copy, Trash2, Eye, Globe, Lock, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DynamicPageManagerProps {
  onContentChange: () => void;
}

interface PageTemplate {
  id: string;
  name: string;
  description: string;
}

interface DynamicPage {
  id: string;
  title: string;
  slug: string;
  template: string;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
  content: Record<string, any>;
  lastModified: string;
  language: 'he' | 'en';
}

const DynamicPageManager = ({ onContentChange }: DynamicPageManagerProps) => {
  const [pages, setPages] = useState<DynamicPage[]>([
    {
      id: 'home',
      title: 'Home Page',
      slug: '/',
      template: 'hero-template',
      published: true,
      seoTitle: 'NMAEI Studio - Architecture & Interior Design',
      seoDescription: 'Professional architecture and interior design studio',
      featuredImage: '/lovable-uploads/0a45c4d2-657f-4646-99b2-d0f432254035.png',
      content: {
        hero: {
          title: 'N M A E I',
          subtitle: 'Architecture | Interior Design',
          tagline: 'לראות | להבין | להרגיש',
          description: 'תכנון שמתרגם חלומות ומדבר עם השטח'
        }
      },
      lastModified: new Date().toISOString(),
      language: 'he'
    },
    {
      id: 'about',
      title: 'About Page',
      slug: '/about',
      template: 'content-template',
      published: true,
      seoTitle: 'About NMAEI Studio',
      seoDescription: 'Learn about our professional journey and design philosophy',
      featuredImage: '/lovable-uploads/abb71ea3-eb84-4ef8-bc2a-169b6f172cd7.png',
      content: {
        story: {
          title: 'הסיפור שלי',
          content: 'נעים מאוד, אני נופר אדריכלית ומעצבת פנים...'
        },
        timeline: {
          title: 'המסע המקצועי',
          description: 'הדרך שהובילה להקמת סטודיו NMAEI',
          items: [
            {
              year: '2021',
              title: 'ההתחלה',
              description: 'סיום לימודי הנדסאית אדריכלות וכניסה לתחום המקצועי'
            },
            {
              year: '2022',
              title: 'השכלה נוספת',
              description: 'השלמת תואר B.Design בעיצוב פנים והתמחות בעיצוב מינימליסטי'
            },
            {
              year: '2023',
              title: 'ייסוד הסטודיו',
              description: 'הקמת סטודיו NMAEI ותחילת עבודה עצמאית עם לקוחות פרטיים'
            },
            {
              year: '2024',
              title: 'צמיחה והתפתחות',
              description: 'הרחבת הפעילות לפרויקטים מסחריים וצוות מקצועי מורחב'
            }
          ]
        }
      },
      lastModified: new Date().toISOString(),
      language: 'he'
    }
  ]);

  const [editingPage, setEditingPage] = useState<DynamicPage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const templates: PageTemplate[] = [
    { id: 'hero-template', name: 'Hero Template', description: 'Homepage with hero section' },
    { id: 'content-template', name: 'Content Template', description: 'Standard content page' },
    { id: 'gallery-template', name: 'Gallery Template', description: 'Image gallery layout' },
    { id: 'contact-template', name: 'Contact Template', description: 'Contact form page' }
  ];

  const handleCreatePage = () => {
    const newPage: DynamicPage = {
      id: `page-${Date.now()}`,
      title: 'New Page',
      slug: '/new-page',
      template: 'content-template',
      published: false,
      seoTitle: 'New Page',
      seoDescription: '',
      featuredImage: '',
      content: {},
      lastModified: new Date().toISOString(),
      language: 'he'
    };
    setEditingPage(newPage);
    setIsDialogOpen(true);
  };

  const handleDuplicatePage = (page: DynamicPage) => {
    const duplicatedPage: DynamicPage = {
      ...page,
      id: `page-${Date.now()}`,
      title: `${page.title} - Copy`,
      slug: `${page.slug}-copy`,
      published: false,
      lastModified: new Date().toISOString()
    };
    setEditingPage(duplicatedPage);
    setIsDialogOpen(true);
  };

  const handleSavePage = (page: DynamicPage) => {
    if (pages.find(p => p.id === page.id)) {
      setPages(prev => prev.map(p => p.id === page.id ? { ...page, lastModified: new Date().toISOString() } : p));
    } else {
      setPages(prev => [...prev, { ...page, lastModified: new Date().toISOString() }]);
    }
    setIsDialogOpen(false);
    setEditingPage(null);
    onContentChange();
    toast({
      title: "Page saved successfully",
      description: `${page.title} has been updated.`,
    });
  };

  const handleDeletePage = (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      setPages(prev => prev.filter(p => p.id !== id));
      onContentChange();
      toast({
        title: "Page deleted",
        description: "The page has been removed.",
      });
    }
  };

  const handleTogglePublished = (id: string) => {
    setPages(prev => prev.map(p => 
      p.id === id ? { ...p, published: !p.published, lastModified: new Date().toISOString() } : p
    ));
    onContentChange();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-900">Dynamic Page Manager</h2>
          <p className="text-stone-600">Create and manage all website pages</p>
        </div>
        <Button onClick={handleCreatePage} className="bg-stone-600 hover:bg-stone-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Page
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Card key={page.id} className={`${!page.published ? 'border-orange-300 bg-orange-50' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{page.title}</CardTitle>
                  <p className="text-sm text-stone-600">{page.slug}</p>
                  <p className="text-xs text-stone-500">
                    {templates.find(t => t.id === page.template)?.name}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Switch
                    checked={page.published}
                    onCheckedChange={() => handleTogglePublished(page.id)}
                    className="scale-75"
                  />
                  <span className="text-xs text-stone-600">
                    {page.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {page.featuredImage && (
                  <img 
                    src={page.featuredImage} 
                    alt={page.title}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                <p className="text-sm text-stone-600 line-clamp-2">{page.seoDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded">
                    {page.language === 'he' ? 'עברית' : 'English'}
                  </span>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingPage(page);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicatePage(page)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePage(page.id)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPage?.id && pages.find(p => p.id === editingPage.id) ? 'Edit Page' : 'Create New Page'}
            </DialogTitle>
          </DialogHeader>
          {editingPage && (
            <PageForm
              page={editingPage}
              templates={templates}
              onSave={handleSavePage}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const PageForm = ({ 
  page, 
  templates, 
  onSave, 
  onCancel 
}: {
  page: DynamicPage;
  templates: PageTemplate[];
  onSave: (page: DynamicPage) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(page);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="seo">SEO Settings</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Page Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <Label>URL Slug</Label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Template</Label>
            <Select value={formData.template} onValueChange={(value) => setFormData(prev => ({ ...prev, template: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Language</Label>
            <Select value={formData.language} onValueChange={(value: 'he' | 'en') => setFormData(prev => ({ ...prev, language: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="he">עברית</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Featured Image URL</Label>
          <Input
            value={formData.featuredImage}
            onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
            placeholder="URL to featured image"
          />
        </div>
      </TabsContent>

      <TabsContent value="seo" className="space-y-4">
        <div>
          <Label>SEO Title</Label>
          <Input
            value={formData.seoTitle}
            onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
          />
        </div>
        <div>
          <Label>SEO Description</Label>
          <Textarea
            value={formData.seoDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
            rows={3}
          />
        </div>
      </TabsContent>

      <TabsContent value="content" className="space-y-4">
        <div className="bg-stone-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-stone-500" />
            <span className="text-sm text-stone-600">Content Editor</span>
          </div>
          <p className="text-sm text-stone-500">
            Rich content editing is currently under development. Use the Content Manager section for now.
          </p>
        </div>
      </TabsContent>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave} className="bg-stone-600 hover:bg-stone-700">Save Page</Button>
      </div>
    </Tabs>
  );
};

export default DynamicPageManager;
