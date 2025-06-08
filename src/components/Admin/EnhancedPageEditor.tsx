
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Bold, Italic, Link, List, ListOrdered, Type, Save, 
  Undo, Redo, Eye, Clock, Plus, ImageIcon 
} from 'lucide-react';

interface EnhancedPageEditorProps {
  onContentChange: () => void;
}

const EnhancedPageEditor = ({ onContentChange }: EnhancedPageEditorProps) => {
  const [pages, setPages] = useState([
    { 
      id: 'home', 
      name: 'Home Page', 
      content: 'Welcome to NMAEI Studio...',
      published: true,
      seo: { title: 'NMAEI Studio - Architecture & Interior Design', description: 'Welcome to our studio', slug: 'home' }
    },
    { 
      id: 'about', 
      name: 'About Page', 
      content: 'Our story begins...',
      published: true,
      seo: { title: 'About Us - NMAEI Studio', description: 'Learn about our story', slug: 'about' }
    },
    { 
      id: 'contact', 
      name: 'Contact Page', 
      content: 'Get in touch with us...',
      published: false,
      seo: { title: 'Contact - NMAEI Studio', description: 'Get in touch with us', slug: 'contact' }
    },
  ]);

  const [activePageId, setActivePageId] = useState('home');
  const [pageContents, setPageContents] = useState<Record<string, string>>({});
  const [seoData, setSeoData] = useState<Record<string, any>>({});
  const [publishedStatus, setPublishedStatus] = useState<Record<string, boolean>>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Initialize data
  useEffect(() => {
    const initialContents: Record<string, string> = {};
    const initialSeo: Record<string, any> = {};
    const initialPublished: Record<string, boolean> = {};
    
    pages.forEach(page => {
      initialContents[page.id] = page.content;
      initialSeo[page.id] = page.seo;
      initialPublished[page.id] = page.published;
    });
    
    setPageContents(initialContents);
    setSeoData(initialSeo);
    setPublishedStatus(initialPublished);
  }, []);

  // Autosave functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timeout = setTimeout(() => {
        handleAutoSave();
      }, 60000); // Autosave every 60 seconds

      return () => clearTimeout(timeout);
    }
  }, [hasUnsavedChanges, pageContents]);

  const handleAutoSave = useCallback(() => {
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
    console.log('Auto-saved at:', new Date().toLocaleTimeString());
  }, []);

  const handleContentChange = (pageId: string, content: string) => {
    setPageContents(prev => ({ ...prev, [pageId]: content }));
    setHasUnsavedChanges(true);
    onContentChange();
  };

  const handleSeoChange = (pageId: string, field: string, value: string) => {
    setSeoData(prev => ({
      ...prev,
      [pageId]: { ...prev[pageId], [field]: value }
    }));
    setHasUnsavedChanges(true);
  };

  const handlePublishToggle = (pageId: string, published: boolean) => {
    setPublishedStatus(prev => ({ ...prev, [pageId]: published }));
    setHasUnsavedChanges(true);
  };

  const activePage = pages.find(p => p.id === activePageId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-900">Page Editor</h2>
          <p className="text-stone-600">Edit content and manage pages</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Page
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Version History
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {lastSaved && (
        <div className="text-sm text-stone-600">
          Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}

      <Tabs value={activePageId} onValueChange={setActivePageId} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {pages.map((page) => (
            <TabsTrigger key={page.id} value={page.id} className="relative">
              {page.name}
              {!publishedStatus[page.id] && (
                <span className="ml-2 px-1 text-xs bg-orange-200 text-orange-700 rounded">Draft</span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map((page) => (
          <TabsContent key={page.id} value={page.id}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Editor */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Edit {page.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`publish-${page.id}`} className="text-sm">Published</Label>
                        <Switch 
                          id={`publish-${page.id}`}
                          checked={publishedStatus[page.id] || false}
                          onCheckedChange={(checked) => handlePublishToggle(page.id, checked)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <EnhancedRichTextEditor
                      content={pageContents[page.id] || ''}
                      onChange={(content) => handleContentChange(page.id, content)}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - SEO & Settings */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Page Title</Label>
                      <Input
                        value={seoData[page.id]?.title || ''}
                        onChange={(e) => handleSeoChange(page.id, 'title', e.target.value)}
                        placeholder="SEO title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Meta Description</Label>
                      <Input
                        value={seoData[page.id]?.description || ''}
                        onChange={(e) => handleSeoChange(page.id, 'description', e.target.value)}
                        placeholder="Meta description"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">URL Slug</Label>
                      <Input
                        value={seoData[page.id]?.slug || ''}
                        onChange={(e) => handleSeoChange(page.id, 'slug', e.target.value)}
                        placeholder="url-slug"
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Page Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Featured Image</Label>
                      <Button variant="outline" className="w-full mt-1">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Select Image
                      </Button>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Page Template</Label>
                      <Select defaultValue="default">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="full-width">Full Width</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const EnhancedRichTextEditor = ({ 
  content, 
  onChange 
}: { 
  content: string;
  onChange: (content: string) => void;
}) => {
  const [editorContent, setEditorContent] = useState(content);

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    // This would integrate with the media manager
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      formatText('insertImage', imageUrl);
    }
  };

  return (
    <div className="border border-stone-200 rounded-lg">
      {/* Enhanced Toolbar */}
      <div className="border-b border-stone-200 p-3 flex items-center flex-wrap gap-2 bg-stone-50">
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="sm" onClick={() => formatText('undo')}>
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => formatText('redo')}>
            <Redo className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="border-l border-stone-300 h-6 mx-2" />
        
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="sm" onClick={() => formatText('bold')}>
            <Bold className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => formatText('italic')}>
            <Italic className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="border-l border-stone-300 h-6 mx-2" />
        
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="sm" onClick={insertLink}>
            <Link className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={insertImage}>
            <ImageIcon className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="border-l border-stone-300 h-6 mx-2" />
        
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="sm" onClick={() => formatText('insertUnorderedList')}>
            <List className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => formatText('insertOrderedList')}>
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="border-l border-stone-300 h-6 mx-2" />
        
        <Select defaultValue="">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="h1">Heading 1</SelectItem>
            <SelectItem value="h2">Heading 2</SelectItem>
            <SelectItem value="h3">Heading 3</SelectItem>
            <SelectItem value="p">Paragraph</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Editor */}
      <div className="p-4">
        <div
          contentEditable
          className="min-h-64 outline-none prose prose-stone max-w-none"
          onInput={(e) => {
            const newContent = e.currentTarget.textContent || '';
            setEditorContent(newContent);
            onChange(newContent);
          }}
          suppressContentEditableWarning={true}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {content}
        </div>
      </div>

      <div className="border-t border-stone-200 p-3 bg-stone-50">
        <p className="text-xs text-stone-600">
          Auto-saves every 60 seconds. Use Ctrl+S to save manually.
        </p>
      </div>
    </div>
  );
};

export default EnhancedPageEditor;
