
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Edit3, Trash2, Tag, ImageIcon, Save, X } from 'lucide-react';

interface MediaItemProps {
  image: {
    id: number;
    name: string;
    size: string;
    uploadDate: string;
    category: string;
    title?: string;
    description?: string;
    tags?: string[];
  };
  isSelected: boolean;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: any) => void;
  viewMode: 'grid' | 'list';
}

const MediaItem = ({ 
  image, 
  isSelected, 
  onSelect, 
  onDelete, 
  onUpdate, 
  viewMode 
}: MediaItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: image.title || image.name,
    description: image.description || '',
    tags: image.tags?.join(', ') || ''
  });

  const handleSave = () => {
    onUpdate(image.id, {
      ...editData,
      tags: editData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: image.title || image.name,
      description: image.description || '',
      tags: image.tags?.join(', ') || ''
    });
    setIsEditing(false);
  };

  if (viewMode === 'grid') {
    return (
      <Card 
        className={`relative group cursor-pointer transition-all ${
          isSelected ? 'ring-2 ring-stone-400 bg-stone-50' : 'hover:shadow-md'
        }`}
        onClick={() => onSelect(image.id)}
      >
        <CardContent className="p-0">
          <div className="aspect-square bg-stone-200 flex items-center justify-center rounded-t-lg">
            <ImageIcon className="w-12 h-12 text-stone-400" />
          </div>
          
          {isEditing ? (
            <div className="p-3 space-y-2">
              <Input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="Title"
                className="text-sm"
              />
              <Input
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                placeholder="Description"
                className="text-sm"
              />
              <Input
                value={editData.tags}
                onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
                placeholder="Tags (comma separated)"
                className="text-sm"
              />
              <div className="flex space-x-1">
                <Button size="sm" onClick={handleSave} className="flex-1">
                  <Save className="w-3 h-3 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-3">
              <p className="text-sm font-medium text-stone-900 truncate">
                {image.title || image.name}
              </p>
              <p className="text-xs text-stone-600 truncate">
                {image.description || image.category}
              </p>
              <p className="text-xs text-stone-500">{image.size}</p>
              {image.tags && image.tags.length > 0 && (
                <div className="flex items-center mt-1">
                  <Tag className="w-3 h-3 text-stone-400 mr-1" />
                  <span className="text-xs text-stone-500 truncate">
                    {image.tags.slice(0, 2).join(', ')}
                    {image.tags.length > 2 && '...'}
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 w-8 p-0 bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Edit3 className="w-3 h-3" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 w-8 p-0 bg-white text-red-600 hover:bg-red-50"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(image.id);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-stone-100 border border-stone-300' : 'hover:bg-stone-50'
      }`}
      onClick={() => onSelect(image.id)}
    >
      <div className="flex items-center space-x-4 flex-1">
        <div className="w-12 h-12 bg-stone-200 rounded flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-stone-400" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-stone-900">{image.title || image.name}</p>
          <p className="text-sm text-stone-600">{image.description || image.category}</p>
          {image.tags && image.tags.length > 0 && (
            <div className="flex items-center mt-1">
              <Tag className="w-3 h-3 text-stone-400 mr-1" />
              <span className="text-xs text-stone-500">
                {image.tags.join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-stone-600">{image.size}</span>
        <span className="text-sm text-stone-500">{image.uploadDate}</span>
        <div className="flex space-x-1">
          <Button 
            size="sm" 
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="text-red-600 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(image.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MediaItem;
