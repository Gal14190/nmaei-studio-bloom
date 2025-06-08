
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Trash2, Edit3, Search, Grid, List, ImageIcon } from 'lucide-react';

interface MediaManagerProps {
  onContentChange: () => void;
}

const MediaManager = ({ onContentChange }: MediaManagerProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  // Mock data - in production this would come from backend
  const [images] = useState([
    { id: 1, name: 'project-1.jpg', size: '2.3 MB', uploadDate: '2024-01-15', category: 'Living Room' },
    { id: 2, name: 'project-2.jpg', size: '1.8 MB', uploadDate: '2024-01-14', category: 'Kitchen' },
    { id: 3, name: 'project-3.jpg', size: '3.1 MB', uploadDate: '2024-01-13', category: 'Bedroom' },
    { id: 4, name: 'project-4.jpg', size: '2.7 MB', uploadDate: '2024-01-12', category: 'Bathroom' },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onContentChange();
      alert(`${files.length} file(s) uploaded successfully!`);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedImages.length > 0) {
      if (confirm(`Delete ${selectedImages.length} selected image(s)?`)) {
        setSelectedImages([]);
        onContentChange();
        alert('Images deleted successfully!');
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

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        </div>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upload Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-stone-900 mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-stone-600 mb-4">
              Support for JPG, PNG, WebP files up to 10MB
            </p>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button asChild className="bg-stone-600 hover:bg-stone-700">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
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
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected
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
                <div
                  key={image.id}
                  className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden ${
                    selectedImages.includes(image.id)
                      ? 'border-stone-400 bg-stone-50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                  onClick={() => toggleImageSelection(image.id)}
                >
                  <div className="aspect-square bg-stone-200 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-stone-400" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-stone-900 truncate">
                      {image.name}
                    </p>
                    <p className="text-xs text-stone-600">{image.category}</p>
                    <p className="text-xs text-stone-500">{image.size}</p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                    selectedImages.includes(image.id)
                      ? 'bg-stone-100 border border-stone-300'
                      : 'hover:bg-stone-50'
                  }`}
                  onClick={() => toggleImageSelection(image.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-stone-200 rounded flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-stone-400" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-900">{image.name}</p>
                      <p className="text-sm text-stone-600">{image.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-stone-600">{image.size}</span>
                    <span className="text-sm text-stone-500">{image.uploadDate}</span>
                    <Button size="sm" variant="outline">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaManager;
