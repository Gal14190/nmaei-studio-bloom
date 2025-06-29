import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit3, Trash2, FolderOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Category {
  id: string;               // Firestore id
  name: string;
  description: string;
  imageCount: number;
  createdAt?: Timestamp;
}

interface CategoryEditorProps {
  onContentChange: () => void;
}

const CategoryEditor = ({ onContentChange }: CategoryEditorProps) => {
  /* ---------- state ---------- */
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  /* ---------- fetch categories ---------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snap = await getDocs(collection(db, 'categories'));
        const data = snap.docs.map(
          (d) => ({ id: d.id, ...d.data() } as Category)
        );
        setCategories(data);
      } catch (err) {
        console.error(err);
        toast({
          title: 'שגיאה בטעינת קטגוריות',
          description: 'נסה לרענן את הדף',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  /* ---------- add ---------- */
  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return;

    try {
      const docRef = await addDoc(collection(db, 'categories'), {
        ...newCategory,
        imageCount: 0,
        createdAt: Timestamp.now(),
      });
      setCategories([
        ...categories,
        { id: docRef.id, ...newCategory, imageCount: 0 },
      ]);
      setNewCategory({ name: '', description: '' });
      toast({ title: 'נוספה קטגוריה חדשה' });
      onContentChange();
    } catch (err) {
      console.error(err);
      toast({
        title: 'שגיאה',
        description: 'לא ניתן להוסיף קטגוריה',
        variant: 'destructive',
      });
    }
  };

  /* ---------- delete ---------- */
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('למחוק את הקטגוריה לצמיתות?')) return;
    try {
      await deleteDoc(doc(db, 'categories', id));
      setCategories(categories.filter((c) => c.id !== id));
      toast({ title: 'הקטגוריה נמחקה' });
      onContentChange();
    } catch (err) {
      console.error(err);
      toast({
        title: 'שגיאה במחיקה',
        description: 'לא ניתן למחוק',
        variant: 'destructive',
      });
    }
  };

  /* ---------- update ---------- */
  const handleUpdateCategory = async (
    id: string,
    name: string,
    description: string
  ) => {
    try {
      await updateDoc(doc(db, 'categories', id), { name, description });
      setCategories(
        categories.map((c) =>
          c.id === id ? { ...c, name, description } : c
        )
      );
      toast({ title: 'הקטגוריה עודכנה' });
      onContentChange();
    } catch (err) {
      console.error(err);
      toast({
        title: 'שגיאה בעדכון',
        description: 'לא ניתן לעדכן',
        variant: 'destructive',
      });
    } finally {
      setEditingCategory(null);
    }
  };

  /* ---------- UI ---------- */
  if (loading)
    return (
      <p className="p-4 text-center text-gray-500">טוען קטגוריות...</p>
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-stone-900">ניהול קטגוריות</h2>
        <p className="text-stone-600">ארגן את הפרויקטים לפי קטגוריות</p>
      </div>

      {/* -------- הוספת קטגוריה -------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">הוסף קטגוריה חדשה</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                שם קטגוריה
              </label>
              <Input
                placeholder="שם הקטגוריה"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                תיאור
              </label>
              <Input
                placeholder="תיאור (לא חובה)"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={handleAddCategory}
              className="bg-stone-600 hover:bg-stone-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              הוסף קטגוריה
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* -------- רשימת קטגוריות -------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">קטגוריות קיימות</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-center text-stone-500">אין קטגוריות כרגע.</p>
          ) : (
            <div className="space-y-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="border border-stone-200 rounded-lg p-4"
                >
                  {editingCategory === cat.id ? (
                    <EditCategoryForm
                      category={cat}
                      onSave={handleUpdateCategory}
                      onCancel={() => setEditingCategory(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center">
                          <FolderOpen className="w-6 h-6 text-stone-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-stone-900">
                            {cat.name}
                          </h3>
                          <p className="text-sm text-stone-600">
                            {cat.description}
                          </p>
                          <p className="text-xs text-stone-500">
                            {cat.imageCount} תמונות
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEditingCategory(
                              editingCategory === cat.id ? null : cat.id
                            )
                          }
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCategory(cat.id)}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

/* ---------- טופס עריכה ---------- */
const EditCategoryForm = ({
  category,
  onSave,
  onCancel,
}: {
  category: Category;
  onSave: (id: string, name: string, description: string) => void;
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
          placeholder="שם קטגוריה"
          required
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="תיאור"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
          שמור
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onCancel}>
          ביטול
        </Button>
      </div>
    </form>
  );
};

export default CategoryEditor;
