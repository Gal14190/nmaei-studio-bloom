import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Plus,
  Edit,
  Copy,
  Trash2,
} from 'lucide-react';

import { toast } from '@/hooks/use-toast';
import ProjectGalleryManager from './ProjectGalleryManager';
import FileReaders from './FileReader';

interface ProjectManagerProps {
  onContentChange: () => void;
}

interface Project {
  id: string;
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

interface Category {
  id: string;
  label: string;
}

const ProjectManager = ({ onContentChange }: ProjectManagerProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'gallery'>('details');
  const [imageMap, setImageMap] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(collection(db, 'projects'));
        const data = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Project) }));
        setProjects(data);

        const allImageIds = new Set<string>();
        data.forEach((p) => {
          if (p.coverImage) allImageIds.add(p.coverImage);
          (p.gallery || []).forEach((id) => allImageIds.add(id));
        });

        const imageEntries = await Promise.all(
          Array.from(allImageIds).map(async (id) => {
            try {
              const snap = await getDoc(doc(db, 'gallery', id));
              if (snap.exists()) {
                return [id, snap.data().url];
              }
            } catch {
              return null;
            }
            return null;
          })
        );

        const map: { [id: string]: string } = {};
        imageEntries.forEach((entry) => {
          if (entry) map[entry[0]] = entry[1];
        });
        setImageMap(map);
      } catch (err) {
        console.error(err);
        toast({
          title: 'שגיאה',
          description: 'לא ניתן לטעון פרויקטים',
          variant: 'destructive',
        });
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snap = await getDocs(collection(db, 'categories'));
        const data = snap.docs.map((d) => ({
          id: d.id,
          label: (d.data().name as string) || 'ללא שם',
        }));
        setCategories(data);
      } catch (err) {
        console.error(err);
        toast({
          title: 'שגיאה',
          description: 'לא ניתן לטעון קטגוריות',
          variant: 'destructive',
        });
      }
    };
    fetchCategories();
  }, []);

  const handleCreateProject = () => {
    const id = String(Date.now());
    const defaultCat = categories[0]?.id || '';
    const newProject: Project = {
      id,
      title: 'פרויקט חדש',
      category: defaultCat,
      location: '',
      year: new Date().getFullYear().toString(),
      coverImage: '',
      description: '',
      materials: '',
      client: '',
      designConcept: '',
      tags: [],
      gallery: [],
      published: true,
      slug: `project-${id}`,
    };
    setEditingProject(newProject);
    setActiveTab('details');
    setIsDialogOpen(true);
  };

  const handleSaveProject = async (project: Project) => {
    try {
      await setDoc(doc(db, 'projects', project.id), project);
      setProjects((prev) =>
        prev.some((p) => p.id === project.id)
          ? prev.map((p) => (p.id === project.id ? project : p))
          : [...prev, project]
      );
      toast({ title: 'נשמר', description: 'הפרויקט נשמר בהצלחה' });
    } catch (err) {
      console.error(err);
      toast({
        title: 'שגיאה בשמירה',
        description: 'לא ניתן לשמור פרויקט',
        variant: 'destructive',
      });
    }
    setIsDialogOpen(false);
    setEditingProject(null);
    onContentChange();
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('למחוק את הפרויקט לצמיתות?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast({ title: 'נמחק', description: 'הפרויקט נמחק' });
      onContentChange();
    } catch (err) {
      console.error(err);
      toast({
        title: 'שגיאה',
        description: 'לא ניתן למחוק',
        variant: 'destructive',
      });
    }
  };

  const handleDuplicateProject = (proj: Project) => {
    const id = String(Date.now());
    const dup: Project = {
      ...proj,
      id,
      title: `${proj.title} - עותק`,
      slug: `${proj.slug}-copy-${id}`,
      published: false,
    };
    setEditingProject(dup);
    setActiveTab('details');
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-900">ניהול פרויקטים</h2>
          <p className="text-stone-600">סה״כ {projects.length} פרויקטים</p>
        </div>
        <Button onClick={handleCreateProject} className="bg-stone-600 hover:bg-stone-700">
          <Plus className="w-4 h-4 mr-2" />
          פרויקט חדש
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">{p.title}</CardTitle>
              <p className="text-sm text-stone-600">{p.year} • {p.location}</p>
              <p className="text-xs text-stone-500">
                {categories.find((c) => c.id === p.category)?.label || '—'}
              </p>
            </CardHeader>
            <CardContent>
              {p.coverImage && imageMap[p.coverImage] && (
                <img
                  src={imageMap[p.coverImage]}
                  className="w-full h-32 rounded object-cover"
                />
              )}
              <p className="text-sm mt-2 text-stone-600 line-clamp-2">{p.description}</p>
              <div className="flex mt-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingProject(p);
                    setActiveTab('details');
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDuplicateProject(p)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteProject(p.id)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject &&
              projects.find((x) => x.id === editingProject.id)
                ? 'עריכת פרויקט'
                : 'פרויקט חדש'}
            </DialogTitle>
          </DialogHeader>

          {editingProject && (
            <div className="space-y-6">
              <div className="flex border-b">
                <Button
                  variant={activeTab === 'details' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('details')}
                  className="rounded-b-none"
                >
                  פרטים
                </Button>
              </div>

              {activeTab === 'details' && (
                <ProjectForm
                  project={editingProject}
                  categories={categories}
                  imageMap={imageMap}
                  onSave={handleSaveProject}
                  onCancel={() => setIsDialogOpen(false)}
                />
              )}

              {activeTab === 'gallery' && (
                <ProjectGalleryManager
                  projectId={editingProject.id}
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
  imageMap,
  onSave,
  onCancel,
}: {
  project: Project;
  categories: Category[];
  imageMap: { [id: string]: string };
  onSave: (p: Project) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Project>(project);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => setFormData(project), [project]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>כותרת</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <Label>קטגוריה</Label>
          <Select
            value={formData.category}
            onValueChange={(val) => setFormData({ ...formData, category: val })}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Label>כתובת / מיקום</Label>
      <Input
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />

      <Label>תמונה ראשית</Label>
      <FileReaders setImageSrc={setImageSrc} setFormData={setFormData} />
      {formData.coverImage && imageMap[formData.coverImage] && (
        <img src={imageMap[formData.coverImage]} className="rounded shadow" style={{ width: '20vw', height: '15vh' }} />
      )}

      <Label>חומרים</Label>
      <Input
        value={formData.materials}
        onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
      />

      <Label>תיאור</Label>
      <Textarea
        rows={3}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <div className="flex gap-2 mt-4 flex-wrap">
        {formData.gallery.map((id, idx) => (
          imageMap[id] && (
            <img
              key={idx}
              src={imageMap[id]}
              alt={`gallery-${idx}`}
              className="w-20 h-20 object-cover rounded"
            />
          )
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>ביטול</Button>
        <Button onClick={() => onSave(formData)} className="bg-stone-600 hover:bg-stone-700">שמור</Button>
      </div>
    </div>
  );
};

export default ProjectManager;