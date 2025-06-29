import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

interface ContactMessage {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  createdAt?: Timestamp;
}

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'contactMessages'));
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as ContactMessage[];
        setMessages(data);
      } catch (error) {
        console.error('Error loading messages:', error);
        toast({
          title: 'שגיאה בטעינת הודעות',
          description: 'נסה לרענן את הדף',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('האם למחוק את ההודעה לצמיתות?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'contactMessages', id));
      setMessages((prev) => prev.filter((m) => m.id !== id));

      toast({
        title: 'נמחק בהצלחה',
        description: 'ההודעה הוסרה מהמערכת',
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'שגיאה',
        description: 'לא ניתן למחוק את ההודעה',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <p className="p-4 text-center text-gray-500">טוען הודעות...</p>;
  }

  if (messages.length === 0) {
    return <p className="p-4 text-center text-gray-500">אין הודעות להצגה כרגע.</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-light text-stone-900">הודעות שהתקבלו</h2>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm text-right border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">שם</th>
              <th className="px-4 py-2 border">טלפון</th>
              <th className="px-4 py-2 border">אימייל</th>
              <th className="px-4 py-2 border">הודעה</th>
              <th className="px-4 py-2 border">תאריך</th>
              <th className="px-4 py-2 border">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{msg.fullName}</td>
                <td className="px-4 py-2 border">{msg.phone}</td>
                <td className="px-4 py-2 border">{msg.email}</td>
                <td className="px-4 py-2 border">{msg.message}</td>
                <td className="px-4 py-2 border">
                  {msg.createdAt
                    ? new Date(msg.createdAt.seconds * 1000).toLocaleString('he-IL')
                    : '-'}
                </td>
                <td className="px-4 py-2 border text-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(msg.id)}
                  >
                    <Trash2 size={16} />
                    <span className="ml-2">מחק</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactMessages;
