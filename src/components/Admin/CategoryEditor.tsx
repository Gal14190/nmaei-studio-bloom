
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit3, Trash2, FolderOpen } from 'lucide-react';

interface CategoryEditorProps {
  onContentChange: () => void;
}

const CategoryEditor = ({ onContentChange }: CategoryEditorProps) => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Living Room', description: 'Living room design projects', imageCount: 12 },
    { id: 2, name: 'Kitchen', description: 'Kitchen renovation projects', imageCount: 8 },
    { id: 3, name: 'Bedroom', description: 'Bedroom interior designs', imageCount: 15 },
    { id: 4, name: 'Bathroom', description: 'Bathroom remodeling projects', imageCount: 6 },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState<number | null>(null);

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newCat = {
        id: Date.now(),
        name: newCategory.name,
        description: newCategory.description,
        imageCount: 0
      };
      setCategories([...categories, newCat]);
      setNewCategory({ name: '', description: '' });
      onContentChange();
    }
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
      onContentChange();
    }
  };

  const handleEditCategory = (id: number) => {
    setEditingCategory(editingCategory === id ? null : id);
  };

  const handleUpdateCategory = (id: number, updatedName: string, updatedDescription: string) => {
    setCategories(categories.map(cat => 
      cat.id === id 
        ? { ...cat, name: updatedName, description: updatedDescription }
        : cat
    ));
    setEditingCategory(null);
    onContentChange();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-stone-900">Category Manager</h2>
        <p className="text-stone-600">Organize your projects into categories</p>
      </div>

      {/* Add New Category */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Category Name
              </label>
              <Input
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Description
              </label>
              <Input
                placeholder="Enter description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button 
              onClick={handleAddCategory}
              className="bg-stone-600 hover:bg-stone-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Existing Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="border border-stone-200 rounded-lg p-4">
                {editingCategory === category.id ? (
                  <EditCategoryForm
                    category={category}
                    onSave={handleUpdateCategory}
                    onCancel={() => setEditingCategory(null)}
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-6 h-6 text-stone-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-stone-900">{category.name}</h3>
                        <p className="text-sm text-stone-600">{category.description}</p>
                        <p className="text-xs text-stone-500">{category.imageCount} images</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCategory(category.id)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const EditCategoryForm = ({ 
  category, 
  onSave, 
  onCancel 
}: { 
  category: any; 
  onSave: (id: number, name: string, description: string) => void;
  onCancel: () => void;
}) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(category.id, name, description);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          required
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </div>
      <div className="flex space-x-2">
        <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
          Save
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CategoryEditor;
