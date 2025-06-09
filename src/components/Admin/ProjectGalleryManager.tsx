
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, GripVertical, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProjectImage {
  id: string;
  url: string;
  title: string;
  altText: string;
  description: string;
  visible: boolean;
  order: number;
}

interface ProjectGalleryManagerProps {
  projectId: string;
  onContentChange: () => void;
}

const ProjectGalleryManager = ({ projectId, onContentChange }: ProjectGalleryManagerProps) => {
  const [images, setImages] = useState<ProjectImage[]>([
    {
      id: '1',
      url: '/lovable-uploads/26882b0c-ca51-42ec-9c11-bf089d9cfc7b.png',
      title: 'Living Room View',
      altText: 'Modern minimalist living room with natural lighting',
      description: 'Main living area showcasing clean lines and natural materials',
      visible: true,
      order: 1
    },
    {
      id: '2',
      url: '/lovable-uploads/abb71ea3-eb84-4ef8-bc2a-169b6f172cd7.png',
      title: 'Kitchen Design',
      altText: 'Minimalist kitchen with white cabinets',
      description: 'Kitchen area with functional design and premium finishes',
      visible: true,
      order: 2
    }
  ]);

  const [editingImage, setEditingImage] = useState<ProjectImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => {
        const newImage: ProjectImage = {
          id: `${Date.now()}-${index}`,
          url: URL.createObjectURL(file),
          title: file.name.replace(/\.[^/.]+$/, ""),
          altText: '',
          description: '',
          visible: true,
          order: Math.max(...images.map(img => img.order), 0) + 1 + index
        };
        setImages(prev => [...prev, newImage]);
      });
      onContentChange();
      toast({
        title: "Images uploaded",
        description: `${files.length} image(s) added to the gallery`,
      });
    }
  };

  const updateImage = (imageId: string, updates: Partial<ProjectImage>) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, ...updates } : img
    ));
    onContentChange();
  };

  const deleteImage = (imageId: string) => {
    if (confirm('Delete this image from the gallery?')) {
      setImages(prev => prev.filter(img => img.id !== imageId));
      onContentChange();
      toast({
        title: "Image deleted",
        description: "Image has been removed from the gallery",
      });
    }
  };

  const handleDragStart = (imageId: string) => {
    setDraggedImage(imageId);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent, targetImageId: string) => {
    event.preventDefault();
    if (draggedImage && draggedImage !== targetImageId) {
      const draggedIndex = images.findIndex(img => img.id === draggedImage);
      const targetIndex = images.findIndex(img => img.id === targetImageId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newImages = [...images];
        const [draggedItem] = newImages.splice(draggedIndex, 1);
        newImages.splice(targetIndex, 0, draggedItem);
        
        // Reorder
        const reorderedImages = newImages.map((img, index) => ({
          ...img,
          order: index + 1
        }));
        
        setImages(reorderedImages);
        onContentChange();
      }
    }
    setDraggedImage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Project Gallery</h3>
          <p className="text-sm text-stone-600">Manage images for this project</p>
        </div>
        <div className="flex space-x-2">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="gallery-upload"
          />
          <Button asChild className="bg-stone-600 hover:bg-stone-700">
            <label htmlFor="gallery-upload" className="cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Add Images
            </label>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images
          .sort((a, b) => a.order - b.order)
          .map((image) => (
            <Card 
              key={image.id} 
              className={`${!image.visible ? 'opacity-60' : ''} cursor-move`}
              draggable
              onDragStart={() => handleDragStart(image.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, image.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-stone-400" />
                    <span className="text-sm font-medium">#{image.order}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Switch
                      checked={image.visible}
                      onCheckedChange={(checked) => updateImage(image.id, { visible: checked })}
                      className="scale-75"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingImage(image);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteImage(image.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <img
                  src={image.url}
                  alt={image.altText}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <p className="text-sm font-medium truncate">{image.title}</p>
                <p className="text-xs text-stone-600 truncate">{image.description}</p>
              </CardContent>
            </Card>
          ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Image Details</DialogTitle>
          </DialogHeader>
          {editingImage && (
            <div className="space-y-4">
              <div>
                <img
                  src={editingImage.url}
                  alt={editingImage.altText}
                  className="w-full h-32 object-cover rounded"
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={editingImage.title}
                  onChange={(e) => setEditingImage(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
              </div>
              <div>
                <Label>Alt Text (for SEO)</Label>
                <Input
                  value={editingImage.altText}
                  onChange={(e) => setEditingImage(prev => prev ? { ...prev, altText: e.target.value } : null)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={editingImage.description}
                  onChange={(e) => setEditingImage(prev => prev ? { ...prev, description: e.target.value } : null)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (editingImage) {
                      updateImage(editingImage.id, editingImage);
                      setIsDialogOpen(false);
                      setEditingImage(null);
                      toast({
                        title: "Image updated",
                        description: "Image details have been saved",
                      });
                    }
                  }}
                  className="bg-stone-600 hover:bg-stone-700"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectGalleryManager;
