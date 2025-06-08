
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Grid, List, Plus, Filter, Tag } from 'lucide-react';
import MediaUpload from './MediaUpload';
import MediaItem from './MediaItem';

interface MediaManagerProps {
  onContentChange: () => void;
}

const MediaManager = ({ onContentChange }: MediaManagerProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [filterTag, setFilterTag] = useState('');

  // Enhanced mock data with metadata
  const [images, setImages] = useState([
    { 
      id: 1, 
      name: 'project-1.jpg', 
      size: '2.3 MB', 
      uploadDate: '2024-01-15', 
      category: 'Living Room',
      title: 'Modern Living Space',
      description: 'Contemporary living room with natural lighting',
      tags: ['modern', 'interior', 'living']
    },
    { 
      id: 2, 
      name: 'project-2.jpg', 
      size: '1.8 MB', 
      uploadDate: '2024-01-14', 
      category: 'Kitchen',
      title: 'Minimalist Kitchen Design',
      description: 'Clean lines and functional design',
      tags: ['minimalist', 'kitchen', 'white']
    },
    { 
      id: 3, 
      name: 'project-3.jpg', 
      size: '3.1 MB', 
      uploadDate: '2024-01-13', 
      category: 'Bedroom',
      title: 'Cozy Bedroom Retreat',
      description: 'Warm and inviting bedroom space',
      tags: ['cozy', 'bedroom', 'wood']
    },
    { 
      id: 4, 
      name: 'project-4.jpg', 
      size: '2.7 MB', 
      uploadDate: '2024-01-12', 
      category: 'Bathroom',
      title: 'Luxury Bathroom',
      description: 'Spa-like bathroom with premium finishes',
      tags: ['luxury', 'bathroom', 'spa']
    },
  ]);

  const handleFileUpload = (files: FileList) => {
    // Simulate file processing
    Array.from(files).forEach((file, index) => {
      const newImage = {
        id: Date.now() + index,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        category: 'Uncategorized',
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: '',
        tags: []
      };
      setImages(prev => [newImage, ...prev]);
    });
    
    setShowUpload(false);
    onContentChange();
  };

  const handleDeleteImage = (id: number) => {
    if (confirm('Delete this image?')) {
      setImages(prev => prev.filter(img => img.id !== id));
      setSelectedImages(prev => prev.filter(imgId => imgId !== id));
      onContentChange();
    }
  };

  const handleUpdateImage = (id: number, data: any) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, ...data } : img
    ));
    onContentChange();
  };

  const handleDeleteSelected = () => {
    if (selectedImages.length > 0) {
      if (confirm(`Delete ${selectedImages.length} selected image(s)?`)) {
        setImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
        setSelectedImages([]);
        onContentChange();
      }
    }
  };

  const toggleImageSelection = (imageId: number) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !filterTag || image.tags?.some(tag => 
      tag.toLowerCase().includes(filterTag.toLowerCase())
    );
    
    return matchesSearch && matchesTag;
  });

  // Get all unique tags for filtering
  const allTags = Array.from(new Set(images.flatMap(img => img.tags || [])));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-900">Media Manager</h2>
          <p className="text-stone-600">Upload and manage your project images</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => setShowUpload(true)}
            className="bg-stone-600 hover:bg-stone-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-stone-500" />
          <select 
            className="text-sm border border-stone-300 rounded px-3 py-1"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        <div className="text-sm text-stone-600">
          {filteredImages.length} of {images.length} images
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedImages.length > 0 && (
        <div className="flex items-center justify-between bg-stone-100 p-4 rounded-lg">
          <p className="text-stone-700">
            {selectedImages.length} image(s) selected
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteSelected}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Delete Selected
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedImages([])}
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {/* Image Grid/List */}
      <Card>
        <CardContent className="p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <MediaItem
                  key={image.id}
                  image={image}
                  isSelected={selectedImages.includes(image.id)}
                  onSelect={toggleImageSelection}
                  onDelete={handleDeleteImage}
                  onUpdate={handleUpdateImage}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredImages.map((image) => (
                <MediaItem
                  key={image.id}
                  image={image}
                  isSelected={selectedImages.includes(image.id)}
                  onSelect={toggleImageSelection}
                  onDelete={handleDeleteImage}
                  onUpdate={handleUpdateImage}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
          
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-500">No images found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Modal */}
      {showUpload && (
        <MediaUpload
          onUpload={handleFileUpload}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  );
};

export default MediaManager;
