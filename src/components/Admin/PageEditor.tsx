
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bold, Italic, Link, List, ListOrdered, Type, Save } from 'lucide-react';

interface PageEditorProps {
  onContentChange: () => void;
}

const PageEditor = ({ onContentChange }: PageEditorProps) => {
  const [pages] = useState([
    { id: 'home', name: 'Home Page', content: 'Welcome to NMAEI Studio...' },
    { id: 'about', name: 'About Page', content: 'Our story begins...' },
    { id: 'contact', name: 'Contact Page', content: 'Get in touch with us...' },
  ]);

  const [activeEditor, setActiveEditor] = useState<string | null>(null);
  const [pageContents, setPageContents] = useState<Record<string, string>>({
    home: 'Welcome to NMAEI Studio - where architecture meets emotion...',
    about: 'Our story begins with a passion for creating spaces that inspire...',
    contact: 'Get in touch with us to discuss your next project...',
  });

  const handleContentChange = (pageId: string, content: string) => {
    setPageContents(prev => ({ ...prev, [pageId]: content }));
    onContentChange();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-stone-900">Page Editor</h2>
        <p className="text-stone-600">Edit content for different pages</p>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {pages.map((page) => (
            <TabsTrigger key={page.id} value={page.id}>
              {page.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map((page) => (
          <TabsContent key={page.id} value={page.id}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Edit {page.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  content={pageContents[page.id] || ''}
                  onChange={(content) => handleContentChange(page.id, content)}
                  onFocus={() => setActiveEditor(page.id)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const RichTextEditor = ({ 
  content, 
  onChange, 
  onFocus 
}: { 
  content: string;
  onChange: (content: string) => void;
  onFocus: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatText = (command: string) => {
    document.execCommand(command, false, undefined);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
  };

  return (
    <div className="border border-stone-200 rounded-lg">
      {/* Toolbar */}
      <div className="border-b border-stone-200 p-3 flex items-center space-x-2 bg-stone-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => formatText('bold')}
          className="h-8 w-8 p-0"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => formatText('italic')}
          className="h-8 w-8 p-0"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={insertLink}
          className="h-8 w-8 p-0"
        >
          <Link className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => formatText('insertUnorderedList')}
          className="h-8 w-8 p-0"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => formatText('insertOrderedList')}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <div className="border-l border-stone-300 h-6 mx-2" />
        <select 
          className="text-sm border border-stone-300 rounded px-2 py-1"
          onChange={(e) => formatText('formatBlock')}
        >
          <option value="">Format</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="p">Paragraph</option>
        </select>
      </div>

      {/* Editor */}
      <div className="p-4">
        <div
          contentEditable
          className="min-h-64 outline-none prose prose-stone max-w-none"
          onInput={(e) => onChange(e.currentTarget.textContent || '')}
          onFocus={onFocus}
          suppressContentEditableWarning={true}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {content}
        </div>
      </div>

      <div className="border-t border-stone-200 p-3 bg-stone-50">
        <p className="text-xs text-stone-600">
          Use the toolbar above to format your text. Changes are saved automatically.
        </p>
      </div>
    </div>
  );
};

export default PageEditor;
