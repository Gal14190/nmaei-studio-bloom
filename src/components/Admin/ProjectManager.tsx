
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Copy, Trash2, Eye, ImageIcon, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ProjectGalleryManager from './ProjectGalleryManager';

interface ProjectManagerProps {
  onContentChange: () => void;
}

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  coverImage: string;
  description: string;
  materials: string;
  client?: string;
  designConcept?: string;
  tags: string[];
  gallery: string[];
  published: boolean;
  slug: string;
}

const ProjectManager = ({ onContentChange }: ProjectManagerProps) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'דירה מינימליסטית בתל אביב',
      category: 'apartments',
      location: 'תל אביב',
      year: '2024',
      coverImage: '/lovable-uploads/26882b0c-ca51-42ec-9c11-bf089d9cfc7b.png',
      description: 'עיצוב נקי ומודרני המשלב פונקציונליות עם אסתטיקה מינימליסטית.',
      materials: 'עץ אלון, שיש לבן, זכוכית',
      client: 'לקוח פרטי',
      designConcept: 'מינימליזם נקי עם דגש על פונקציונליות',
      tags: ['מינימליזם', 'דירה', 'תל אביב'],
      gallery: ['/lovable-uploads/26882b0c-ca51-42ec-9c11-bf089d9cfc7b.png'],
      published: true,
      slug: 'apartment-tel-aviv-minimalist'
    },
    {
      id: 2,
      title: 'בית פרטי בהרצליה',
      category: 'houses',
      location: 'הרצליה',
      year: '2024',
      coverImage: '/lovable-uploads/7b2d2c09-e0eb-4d31-928f-8332dda0acdc.png',
      description: 'אדריכלות עכשווית עם חיבור לטבע',
      materials: 'בטון חשוף, עץ טיק, זכוכית',
      client: 'משפחה צעירה',
      designConcept: 'חיבור בין פנים וחוץ',
      tags: ['בית פרטי', 'עכשווי', 'הרצליה'],
      gallery: ['/lovable-uploads/7b2d2c09-e0eb-4d31-928f-8332dda0acdc.png'],
      published: true,
      slug: 'private-house-herzliya'
    },
    {
      id: 3,
      title: 'חדר אמבטיה יוקרתי',
      category: 'bathrooms',
      location: 'רמת גן',
      year: '2023',
      coverImage: '/lovable-uploads/e0c6aeb2-cfc6-4c92-b675-e0c005c3e481.png',
      description: 'שילוב אבן טבעית ועיצוב מינימליסטי',
      materials: 'אבן טרוורטין, נירוסטה, זכוכית מחוסמת',
      client: 'לקוח VIP',
      designConcept: 'ספא ביתי יוקרתי',
      tags: ['אמבטיה', 'יוקרה', 'אבן טבעית'],
      gallery: ['/lovable-uploads/e0c6aeb2-cfc6-4c92-b675-e0c005c3e481.png'],
      published: true,
      slug: 'luxury-bathroom-ramat-gan'
    }
  ]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'gallery'>('details');

  const categories = [
    { id: 'apartments', label: 'דירות' },
    { id: 'houses', label: 'בתים' },
    { id: 'commercial', label: 'מסחרי' },
    { id: 'offices', label: 'משרדים' },
    { id: 'bathrooms', label: 'חדרי אמבטיה' }
  ];

  const handleCreateProject = () => {
    const newProject: Project = {
      id: Date.now(),
      title: 'פרויקט חדש',
      category: 'apartments',
      location: '',
      year: new Date().getFullYear().toString(),
      coverImage: '',
      description: '',
      materials: '',
      client: '',
      designConcept: '',
      tags: [],
      gallery: [],
      published: false,
      slug: `project-${Date.now()}`
    };
    setEditingProject(newProject);
    setActiveTab('details');
    setIsDialogOpen(true);
  };

  const handleDuplicateProject = (project: Project) => {
    const duplicatedProject: Project = {
      ...project,
      id: Date.now(),
      title: `${project.title} - עותק`,
      slug: `${project.slug}-copy-${Date.now()}`,
      published: false
    };
    setEditingProject(duplicatedProject);
    setActiveTab('details');
    setIsDialogOpen(true);
  };

  const handleSaveProject = (project: Project) => {
    if (projects.find(p => p.id === project.id)) {
      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    } else {
      setProjects(prev => [...prev, project]);
    }
    setIsDialogOpen(false);
    setEditingProject(null);
    onContentChange();
    toast({
      title: "Project saved",
      description: `${project.title} has been saved successfully.`,
    });
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את הפרויקט?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
      onContentChange();
      toast({
        title: "Project deleted",
        description: "The project has been removed.",
      });
    }
  };

  const handleTogglePublished = (id: number) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, published: !p.published } : p
    ));
    onContentChange();
  };

  const handleViewProject = (project: Project) => {
    // Open project page in new tab
    window.open(`/projects/${project.slug}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-900">Project Manager</h2>
          <p className="text-stone-600">Manage your portfolio projects ({projects.length} total)</p>
        </div>
        <Button onClick={handleCreateProject} className="bg-stone-600 hover:bg-stone-700">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className={`${!project.published ? 'border-orange-300 bg-orange-50' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                  <p className="text-sm text-stone-600">{project.year} • {project.location}</p>
                  <p className="text-xs text-stone-500">
                    {categories.find(cat => cat.id === project.category)?.label}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Switch
                    checked={project.published}
                    onCheckedChange={() => handleTogglePublished(project.id)}
                    className="scale-75"
                  />
                  <span className="text-xs text-stone-600">
                    {project.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.coverImage && (
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                <p className="text-sm text-stone-600 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-stone-100 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewProject(project)}
                    className="flex-1"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingProject(project);
                      setActiveTab('details');
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicateProject(project)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
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
              {editingProject?.id && projects.find(p => p.id === editingProject.id) ? 'Edit Project' : 'Create New Project'}
            </DialogTitle>
          </DialogHeader>
          {editingProject && (
            <div className="space-y-6">
              <div className="flex space-x-1 border-b">
                <Button
                  variant={activeTab === 'details' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('details')}
                  className="rounded-b-none"
                >
                  Project Details
                </Button>
                <Button
                  variant={activeTab === 'gallery' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('gallery')}
                  className="rounded-b-none"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Gallery
                </Button>
              </div>

              {activeTab === 'details' && (
                <ProjectForm
                  project={editingProject}
                  categories={categories}
                  onSave={handleSaveProject}
                  onCancel={() => setIsDialogOpen(false)}
                />
              )}

              {activeTab === 'gallery' && (
                <ProjectGalleryManager
                  projectId={editingProject.id.toString()}
                  onContentChange={onContentChange}
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ProjectForm = ({ 
  project, 
  categories, 
  onSave, 
  onCancel 
}: {
  project: Project;
  categories: any[];
  onSave: (project: Project) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(project);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Project Title</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Location</Label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
        <div>
          <Label>Year</Label>
          <Input
            value={formData.year}
            onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label>Cover Image URL</Label>
        <Input
          value={formData.coverImage}
          onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
          placeholder="URL to cover image"
        />
        {formData.coverImage && (
          <img src={formData.coverImage} alt="Preview" className="w-full h-32 object-cover rounded mt-2" />
        )}
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Materials Used</Label>
          <Input
            value={formData.materials}
            onChange={(e) => setFormData(prev => ({ ...prev, materials: e.target.value }))}
          />
        </div>
        <div>
          <Label>Client</Label>
          <Input
            value={formData.client || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label>Design Concept</Label>
        <Textarea
          value={formData.designConcept || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, designConcept: e.target.value }))}
          rows={2}
        />
      </div>

      <div>
        <Label>Tags (comma separated)</Label>
        <Input
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
          }))}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div>
        <Label>URL Slug</Label>
        <Input
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          placeholder="project-url-slug"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave} className="bg-stone-600 hover:bg-stone-700">Save Project</Button>
      </div>
    </div>
  );
};

export default ProjectManager;
