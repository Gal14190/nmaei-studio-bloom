
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, Eye, Lock, Plus, Trash2, GripVertical } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContentBlock {
  id: string;
  type: 'text' | 'heading' | 'image' | 'quote' | 'cta' | 'timeline' | 'service' | 'value';
  content: any;
  visible: boolean;
  editable: boolean;
  order: number;
}

interface ContentEditorProps {
  pageId: string;
  onContentChange: () => void;
}

const ContentEditor = ({ pageId, onContentChange }: ContentEditorProps) => {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: 'hero-title',
      type: 'heading',
      content: { text: 'N M A E I', level: 1, style: 'hero' },
      visible: true,
      editable: true,
      order: 1
    },
    {
      id: 'hero-subtitle',
      type: 'text',
      content: { text: 'Architecture | Interior Design' },
      visible: true,
      editable: true,
      order: 2
    },
    {
      id: 'hero-tagline',
      type: 'text',
      content: { text: 'לראות | להבין | להרגיש' },
      visible: true,
      editable: true,
      order: 3
    },
    {
      id: 'hero-description',
      type: 'text',
      content: { text: 'תכנון שמתרגם חלומות ומדבר עם השטח' },
      visible: true,
      editable: true,
      order: 4
    },
    {
      id: 'journey-timeline',
      type: 'timeline',
      content: {
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
      },
      visible: true,
      editable: true,
      order: 5
    },
    {
      id: 'quote-tadao',
      type: 'quote',
      content: {
        text: 'Architecture is not about form follows function. It is about form and spirit.',
        author: 'Tadao Ando'
      },
      visible: true,
      editable: true,
      order: 6
    }
  ]);

  const [editingBlock, setEditingBlock] = useState<string | null>(null);

  const updateBlock = (blockId: string, newContent: any) => {
    setContentBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, content: newContent } : block
    ));
    onContentChange();
    toast({
      title: "Content updated",
      description: "Block has been saved successfully",
    });
  };

  const toggleBlockVisibility = (blockId: string) => {
    setContentBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, visible: !block.visible } : block
    ));
    onContentChange();
  };

  const duplicateBlock = (blockId: string) => {
    const blockToDuplicate = contentBlocks.find(b => b.id === blockId);
    if (blockToDuplicate) {
      const newBlock = {
        ...blockToDuplicate,
        id: `${blockId}-copy-${Date.now()}`,
        order: Math.max(...contentBlocks.map(b => b.order)) + 1
      };
      setContentBlocks(prev => [...prev, newBlock]);
      onContentChange();
    }
  };

  const deleteBlock = (blockId: string) => {
    if (confirm('Are you sure you want to delete this content block?')) {
      setContentBlocks(prev => prev.filter(b => b.id !== blockId));
      onContentChange();
    }
  };

  const renderBlockEditor = (block: ContentBlock) => {
    if (!block.editable) {
      return (
        <div className="flex items-center justify-center p-8 bg-stone-50 rounded-lg border-2 border-dashed border-stone-300">
          <div className="text-center">
            <Lock className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-stone-600 font-medium">Currently not editable</p>
            <p className="text-sm text-stone-500">Under development</p>
          </div>
        </div>
      );
    }

    switch (block.type) {
      case 'heading':
        return (
          <div className="space-y-3">
            <Input
              value={block.content.text}
              onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
              placeholder="Heading text"
            />
            <Select 
              value={block.content.level?.toString() || '1'} 
              onValueChange={(value) => updateBlock(block.id, { ...block.content, level: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">H1 - Main Title</SelectItem>
                <SelectItem value="2">H2 - Section Title</SelectItem>
                <SelectItem value="3">H3 - Subsection</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case 'text':
        return (
          <Textarea
            value={block.content.text}
            onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
            placeholder="Enter text content"
            rows={3}
          />
        );

      case 'quote':
        return (
          <div className="space-y-3">
            <Textarea
              value={block.content.text}
              onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
              placeholder="Quote text"
              rows={3}
            />
            <Input
              value={block.content.author}
              onChange={(e) => updateBlock(block.id, { ...block.content, author: e.target.value })}
              placeholder="Author name"
            />
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-4">
            <Input
              value={block.content.title}
              onChange={(e) => updateBlock(block.id, { ...block.content, title: e.target.value })}
              placeholder="Timeline title"
            />
            <Textarea
              value={block.content.description}
              onChange={(e) => updateBlock(block.id, { ...block.content, description: e.target.value })}
              placeholder="Timeline description"
              rows={2}
            />
            <div className="space-y-3">
              <Label>Timeline Items</Label>
              {block.content.items.map((item: any, index: number) => (
                <Card key={index} className="p-3">
                  <div className="grid grid-cols-4 gap-3">
                    <Input
                      value={item.year}
                      onChange={(e) => {
                        const newItems = [...block.content.items];
                        newItems[index] = { ...item, year: e.target.value };
                        updateBlock(block.id, { ...block.content, items: newItems });
                      }}
                      placeholder="Year"
                    />
                    <Input
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...block.content.items];
                        newItems[index] = { ...item, title: e.target.value };
                        updateBlock(block.id, { ...block.content, items: newItems });
                      }}
                      placeholder="Title"
                      className="col-span-3"
                    />
                  </div>
                  <Textarea
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...block.content.items];
                      newItems[index] = { ...item, description: e.target.value };
                      updateBlock(block.id, { ...block.content, items: newItems });
                    }}
                    placeholder="Description"
                    rows={2}
                    className="mt-2"
                  />
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-stone-50 rounded text-center text-stone-600">
            Editor for {block.type} type coming soon
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Content Blocks</h3>
          <p className="text-sm text-stone-600">Edit all content sections for this page</p>
        </div>
        <Button className="bg-stone-600 hover:bg-stone-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Block
        </Button>
      </div>

      <div className="space-y-4">
        {contentBlocks
          .sort((a, b) => a.order - b.order)
          .map((block) => (
            <Card key={block.id} className={`${!block.visible ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <GripVertical className="w-4 h-4 text-stone-400 cursor-move" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium capitalize">{block.type}</span>
                        <Badge variant={block.visible ? "default" : "secondary"}>
                          {block.visible ? "Visible" : "Hidden"}
                        </Badge>
                        {!block.editable && (
                          <Badge variant="outline" className="text-orange-600">
                            <Lock className="w-3 h-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-stone-600">{block.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={block.visible}
                      onCheckedChange={() => toggleBlockVisibility(block.id)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => duplicateBlock(block.id)}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteBlock(block.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderBlockEditor(block)}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ContentEditor;
