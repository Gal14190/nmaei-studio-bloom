
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Search, Grid, List, Plus, Filter, Tag, Upload, FolderOpen, Image, Trash2, Edit, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AdvancedMediaManagerProps {
  onContentChange: () => void;
}

interface MediaAsset {
  id: number;
  name: string;
  originalName: string;
  size: string;
  sizeBytes: number;
  uploadDate: string;
  folder: string;
  category: string;
  title: string;
  altText: string;
  description: string;
  tags: string[];
  url: string;
  thumbnail: string;
  type: 'image' | 'video' | 'document';
  dimensions?: { width: number; height: number };
  optimized: boolean;
}

interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

const AdvancedMediaManager = ({ onContentChange }: AdvancedMediaManagerProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [filterTag, setFilterTag] = useState('');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [folders] = useState([
    { id: 'all', name: 'All Media', count: 15 },
    { id: 'projects', name: 'Projects', count: 8 },
    { id: 'hero-images', name: 'Hero Images', count: 3 },
    { id: 'team', name: 'Team Photos', count: 2 },
    { id: 'logos', name: 'Logos & Branding', count: 2 }
  ]);

  const [assets, setAssets] = useState<MediaAsset[]>([
    {
      id: 1,
      name: 'modern-living-room.jpg',
      originalName: 'IMG_2024_01_15_001.jpg',
      size: '2.3 MB',
      sizeBytes: 2400000,
      uploadDate: '2024-01-15',
      folder: 'projects',
      category: 'Interior',
      title: 'Modern Living Room Design',
      altText: 'Contemporary living room with minimalist design',
      description: 'A beautiful modern living room showcasing clean lines and natural lighting',
      tags: ['modern', 'living-room', 'minimalist', 'interior'],
      url: '/lovable-uploads/26882b0c-ca51-42ec-9c11-bf089d9cfc7b.png',
      thumbnail: '/lovable-uploads/26882b0c-ca51-42ec-9c11-bf089d9cfc7b.png',
      type: 'image',
      dimensions: { width: 1920, height: 1080 },
      optimized: true
    },
    {
      id: 2,
      name: 'nmaei-logo.png',
      originalName: 'logo-final.png',
      size: '458 KB',
      sizeBytes: 468000,
      uploadDate: '2024-01-10',
      folder: 'logos',
      category: 'Branding',
      title: 'NMAEI Studio Logo',
      altText: 'NMAEI Studio official logo',
      description: 'Main logo for NMAEI Architecture and Interior Design Studio',
      tags: ['logo', 'branding', 'nmaei'],
      url: '/lovable-uploads/f911b76f-cd03-4ecc-ace0-40a934fa63db.png',
      thumbnail: '/lovable-uploads/f911b76f-cd03-4ecc-ace0-40a934fa63db.png',
      type: 'image',
      dimensions: { width: 512, height: 512 },
      optimized: true
    }
  ]);

  const handleFileUpload = useCallback((files: FileList) => {
    setIsUploading(true);
    const fileArray = Array.from(files);
    
    const initialProgress = fileArray.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }));
    
    setUploadProgress(initialProgress);

    // Simulate upload process
    fileArray.forEach((file, index) => {
      const interval = setInterval(() => {
        setUploadProgress(prev => 
          prev.map((item, i) => {
            if (i === index && item.progress < 100) {
              const newProgress = Math.min(item.progress + Math.random() * 20, 100);
              return {
                ...item,
                progress: newProgress,
                status: newProgress === 100 ? 'complete' : 'uploading'
              };
            }
            return item;
          })
        );
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        
        // Add completed file to assets
        const newAsset: MediaAsset = {
          id: Date.now() + index,
          name: file.name,
          originalName: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          sizeBytes: file.size,
          uploadDate: new Date().toISOString().split('T')[0],
          folder: selectedFolder === 'all' ? 'projects' : selectedFolder,
          category: 'Uncategorized',
          title: file.name.replace(/\.[^/.]+$/, ""),
          altText: '',
          description: '',
          tags: [],
          url: URL.createObjectURL(file),
          thumbnail: URL.createObjectURL(file),
          type: file.type.startsWith('image/') ? 'image' : 'document',
          optimized: false
        };
        
        setAssets(prev => [newAsset, ...prev]);
        onContentChange();
      }, 2000);
    });

    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress([]);
      toast({
        title: "Upload complete",
        description: `${fileArray.length} file(s) uploaded successfully.`,
      });
    }, 3000);
  }, [selectedFolder, onContentChange]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleAssetSelect = (assetId: number) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleBulkDelete = () => {
    if (selectedAssets.length > 0) {
      if (confirm(`Delete ${selectedAssets.length} selected asset(s)?`)) {
        setAssets(prev => prev.filter(asset => !selectedAssets.includes(asset.id)));
        setSelectedAssets([]);
        onContentChange();
        toast({
          title: "Assets deleted",
          description: `${selectedAssets.length} asset(s) removed.`,
        });
      }
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFolder = selectedFolder === 'all' || asset.folder === selectedFolder;
    
    const matchesTag = !filterTag || asset.tags.some(tag => 
      tag.toLowerCase().includes(filterTag.toLowerCase())
    );
    
    return matchesSearch && matchesFolder && matchesTag;
  });

  const allTags = Array.from(new Set(assets.flatMap(asset => asset.tags)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-900">Advanced Media Manager</h2>
          <p className="text-stone-600">Professional media library with advanced organization</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-stone-400 transition-colors cursor-pointer"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.multiple = true;
                  input.accept = 'image/*,video/*,.pdf,.doc,.docx';
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files) handleFileUpload(files);
                  };
                  input.click();
                }}
              >
                <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-sm text-stone-600">Drop files here or click to upload</p>
              </div>
            </CardContent>
          </Card>

          {/* Folders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Folders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {folders.map(folder => (
                <Button
                  key={folder.id}
                  variant={selectedFolder === folder.id ? "default" : "ghost"}
                  className="w-full justify-between text-left"
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <span>{folder.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {folder.count}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Tags Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Filter by Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search tags..."
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="mb-2"
              />
              <div className="flex flex-wrap gap-1">
                {allTags.slice(0, 10).map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-stone-100"
                    onClick={() => setFilterTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                placeholder="Search media assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-stone-600">
              {filteredAssets.length} of {assets.length} assets
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Uploading Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {uploadProgress.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="truncate">{item.file.name}</span>
                      <span>{Math.round(item.progress)}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Bulk Actions */}
          {selectedAssets.length > 0 && (
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <span className="text-sm text-stone-700">
                  {selectedAssets.length} asset(s) selected
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAssets([])}
                  >
                    Clear Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Media Grid/List */}
          <Card>
            <CardContent className="p-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredAssets.map(asset => (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      isSelected={selectedAssets.includes(asset.id)}
                      onSelect={() => handleAssetSelect(asset.id)}
                      onUpdate={(updatedAsset) => {
                        setAssets(prev => prev.map(a => a.id === updatedAsset.id ? updatedAsset : a));
                        onContentChange();
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAssets.map(asset => (
                    <AssetListItem
                      key={asset.id}
                      asset={asset}
                      isSelected={selectedAssets.includes(asset.id)}
                      onSelect={() => handleAssetSelect(asset.id)}
                      onUpdate={(updatedAsset) => {
                        setAssets(prev => prev.map(a => a.id === updatedAsset.id ? updatedAsset : a));
                        onContentChange();
                      }}
                    />
                  ))}
                </div>
              )}
              
              {filteredAssets.length === 0 && (
                <div className="text-center py-12">
                  <Image className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                  <p className="text-stone-500">No media assets found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const AssetCard = ({ 
  asset, 
  isSelected, 
  onSelect, 
  onUpdate 
}: {
  asset: MediaAsset;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (asset: MediaAsset) => void;
}) => {
  return (
    <div
      className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all ${
        isSelected ? 'ring-2 ring-stone-400 bg-stone-50' : 'hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <div className="aspect-square bg-stone-200 flex items-center justify-center">
        {asset.type === 'image' ? (
          <img 
            src={asset.thumbnail} 
            alt={asset.altText || asset.title}
            className="w-full h-full"
          />
        ) : (
          <Image className="w-12 h-12 text-stone-400" />
        )}
      </div>
      
      <div className="p-3 bg-white">
        <p className="text-sm font-medium text-stone-900 truncate">{asset.title}</p>
        <p className="text-xs text-stone-600 truncate">{asset.size}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-1">
            {asset.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                {tag}
              </Badge>
            ))}
          </div>
          {!asset.optimized && (
            <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
              Not Optimized
            </Badge>
          )}
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-stone-600 text-white rounded-full flex items-center justify-center">
          <span className="text-xs">✓</span>
        </div>
      )}
    </div>
  );
};

const AssetListItem = ({ 
  asset, 
  isSelected, 
  onSelect, 
  onUpdate 
}: {
  asset: MediaAsset;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (asset: MediaAsset) => void;
}) => {
  return (
    <div
      className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-stone-100 border border-stone-300' : 'hover:bg-stone-50'
      }`}
      onClick={onSelect}
    >
      <div className="w-16 h-16 bg-stone-200 rounded flex items-center justify-center">
        {asset.type === 'image' ? (
          <img 
            src={asset.thumbnail} 
            alt={asset.altText || asset.title}
            className="w-full h-full rounded"
          />
        ) : (
          <Image className="w-8 h-8 text-stone-400" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-stone-900 truncate">{asset.title}</p>
        <p className="text-sm text-stone-600 truncate">{asset.description || asset.name}</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-stone-500">{asset.size}</span>
          <span className="text-xs text-stone-500">•</span>
          <span className="text-xs text-stone-500">{asset.uploadDate}</span>
          {asset.dimensions && (
            <>
              <span className="text-xs text-stone-500">•</span>
              <span className="text-xs text-stone-500">
                {asset.dimensions.width}×{asset.dimensions.height}
              </span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex flex-wrap gap-1">
          {asset.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdvancedMediaManager;
