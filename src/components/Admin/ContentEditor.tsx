import { db } from "../../firebaseConfig";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Save,
  Lock,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import FileReaders from "./FileReader";

interface ContentBlock {
  id: string;
  type: string;
  content: any;
  visible: boolean;
  editable: boolean;
  order: number;
}

interface ContentEditorProps {
  pageId: string;
  onContentChange: () => void;
}

const ContentEditor = ({ pageId, onContentChange }: ContentEditorProps) => {
  const getContentBlocksForPage = (pageId: string): ContentBlock[] => {
    switch (pageId) {
      case 'home':
        return [
          {
            id: 'hero-image',
            type: 'image',
            content: { url:'' },
            visible: true,
            editable: true,
            order: 1,
          },
          {
            id: 'hero-title',
            type: 'heading',
            content: { text: 'N M A E I', level: 1, style: 'hero' },
            visible: true,
            editable: true,
            order: 2,
          },
          {
            id: 'hero-subtitle',
            type: 'text',
            content: { text: 'Architecture | Interior Design' },
            visible: true,
            editable: true,
            order: 3,
          },
          {
            id: 'hero-tagline',
            type: 'text',
            content: { text: 'לראות | להבין | להרגיש' },
            visible: true,
            editable: true,
            order: 4,
          },
          {
            id: 'hero-description',
            type: 'text',
            content: { text: 'תכנון שמתרגם חלומות ומדבר עם השטח' },
            visible: true,
            editable: true,
            order: 5,
          },
          {
            id: 'featured-projects',
            type: 'projects',
            content: {
              title: 'פרויקטים נבחרים',
              description: 'מבחר מהעבודות הבולטות שלנו המדגימות את הגישה המקצועית והיצירתית',
              projects: [
                {
                  title: 'דירה מינימליסטית בתל אביב',
                  category: 'דירות',
                  image: '/lovable-uploads/26882b0c-ca51-42ec-9c11-bf089d9cfc7b.png',
                  description: 'עיצוב נקי ומודרני עם נגיעות חמות',
                },
                {
                  title: 'בית פרטי בהרצליה',
                  category: 'בתים',
                  image: '/lovable-uploads/7b2d2c09-e0eb-4d31-928f-8332dda0acdc.png',
                  description: 'אדריכלות עכשווית עם חיבור לטבע',
                },
                {
                  title: 'חדר אמבטיה יוקרתי',
                  category: 'פרויקטים מיוחדים',
                  image: '/lovable-uploads/e0c6aeb2-cfc6-4c92-b675-e0c005c3e481.png',
                  description: 'שילוב אבן טבעית ועיצוב מינימליסטי',
                },
              ],
            },
            visible: true,
            editable: true,
            order: 6,
          },          
          {
            id: 'values-section',
            type: 'value',
            content: {
              title: 'הערכים שלנו',
              description: 'העקרונות המנחים אותנו בכל פרויקט ופרויקט',
              values: [
                {
                  icon: 'Eye',
                  title: 'ראייה ייחודית',
                  description: 'כל פרויקט מקבל גישה אישית ויחודה המותאמת לצרכי הלקוח',
                },
                {
                  icon: 'Heart',
                  title: 'תשוקה לפרטים',
                  description: 'תשומת לב מיוחדת לכל פרט, מהקונספט ועד לביצוע הסופי',
                },
                {
                  icon: 'Lightbulb',
                  title: 'חדשנות ויצירתיות',
                  description: 'פתרונות מתקדמים המשלבים פונקציונליות ואסתטיקה',
                },
              ],
            },
            visible: true,
            editable: true,
            order: 7,
          },
          {
            id: 'quote-tadao',
            type: 'quote',
            content: {
              text: "I don't believe architecture has to speak too much. It should remain silent and let nature in the guise of sunlight and wind.",
              author: 'Tadao Ando',
            },
            visible: true,
            editable: true,
            order: 8,
          },
          {
            id: 'cta-ready-to-start',
            type: 'cta',
            content: {
              title: 'מוכנים להתחיל?',
              description: 'בואו ניצור יחד את הבית או המשרד שתמיד חלמתם עליו',
              primaryButton: {
                text: 'בואו נתחיל',
                link: '/contact',
              },
              secondaryButton: {
                text: 'קראו עלינו',
                link: '/about',
              },
            },
            visible: true,
            editable: true,
            order: 9,
          },
        ];
        case 'projects':
        return [
          {
            id: 'hero-title',
            type: 'heading',
            content: { text: 'הפרויקטים שלנו' },
            visible: true,
            editable: true,
            order: 1,
          },
          {
            id: 'hero-subtitle',
            type: 'text',
            content: { text: 'מבחר מעבודותינו המדגימות את הגישה המקצועית, הייחודית והיצירתית שלנו' },
            visible: true,
            editable: true,
            order: 2,
          },
        ];
        case 'about':
        return [
          {
            id: 'hero-title',
            type: 'heading',
            content: { text: 'M I N É A' },
            visible: true,
            editable: true,
            order: 1,
          },
          {
            id: 'hero-subtitle',
            type: 'text',
            content: { text: 'לראות | להבין | להרגיש' },
            visible: true,
            editable: true,
            order: 2,
          },
          {
            id: 'counter',
            type: 'value',
            content: {
              title: 'הסיפור שלי',
              description: 'נעים מאוד, אני נופר אדריכלית ומעצבת פנים \n\
\n\
אדריכלות ועיצוב עבורי בחירה בדרך חיים – דרך שמלווה בתהליך רגשי ועמוק של תרגום חלומות ותחושות לחללים מוחשיים בעולם החומרי. כל פרויקט מתחיל בהקשבה עמוקה ובחיבור אינטואיטיבי ללקוח. עבורי, הלקוח הוא לא משימה לסיום, אלא סיפור שלם שכולל תובנות, רגשות ומשמעות.\n\
\n\
מתוך ההקשבה נולדת היצירה. אני מתרגמת רגשות, זיכרונות ואנרגיה לתכנון אישי, מדויק ושלם. כמו מערכת חכמה שמעבדת נתונים והופכת אותם לממצאים– כך אני יוצרת חללים שמספרים את הסיפור הפנימי של מי שיחיה בהם.',
              values: [
                {
                  icon: 'Award',
                  title: 'פרויקטים הושלמו',
                  description: '+50',
                },
                {
                  icon: 'Users',
                  title: 'לקוחות מרוצים',
                  description: '+40',
                },
                {
                  icon: 'Clock',
                  title: 'שנות ניסיון',
                  description: '3',
                },
                {
                  icon: 'Heart',
                  title: 'מחויבות לאיכות',
                  description: '100%',
                },
              ],
            },
            visible: true,
            editable: true,
            order: 3,
          },
          {
            id: 'mysory',
            type: 'value',
            content: {
              title: 'המסע המקצועי',
              description: '',
              values: [
                {
                  icon: 'ללא',
                  title: 'ההתחלה',
                  description: 'סיום לימודי הנדסאית אדריכלות וכניסה לתחום המקצועי',
                },
                {
                  icon: 'ללא',
                  title: 'השכלה נוספת',
                  description: 'השלמת תואר B.Design בעיצוב פנים והתמחות בעיצוב מינימליסטי',
                },
                {
                  icon: 'ללא',
                  title: 'ייסוד הסטודיו',
                  description: 'הקמת סטודיו NMAEI ותחילת עבודה עצמאית עם לקוחות פרטיים',
                },
                {
                  icon: 'ללא',
                  title: 'צמיחה והתפתחות',
                  description: 'הרחבת הפעילות לפרויקטים מסחריים וצוות מקצועי מורחב',
                },
              ],
            },
            visible: true,
            editable: true,
            order: 4,
          },
          {
            id: 'quote-tadao',
            type: 'quote',
            content: {
              text: "אני מנסה להשתמש בעיצוב מינימליסטי כדי ליצור חיבור רגשי חזק בין אנשים למרחב",
              author: 'טדאו אנדו',
            },
            visible: true,
            editable: true,
            order: 5,
          },
        ];
        case 'service':
        return [
          {
            id: 'myservices',
            type: 'value',
            content: {
              title: 'השירותים שלנו',
              description: 'מגוון שירותי אדריכלות ועיצוב פנים המותאמים לכל צורך ותקציב',
              values: [
                {
                  icon: 'Home',
                  title: 'תכנון אדריכלי מלא',
                  description: 'תכנון מפורט החל משלב הרעיון ועד לביצוע, כולל תוכניות עבודה, חזיתות וחתכים',
                  features: [
                    'תכנון פונקציונלי ואסתטי',
                    'תוכניות עבודה מפורטות',
                    'ליווי מול הרשויות',
                    'פיקוח על הביצוע'
                  ],
                  image: '/lovable-uploads/30b6683c-eccd-4e1a-9437-2fae96c4540b.png'
                },
                {
                  icon: 'Palette',
                  title: 'עיצוב פנים כולל ליווי',
                  description: 'עיצוב פנים מקצועי המשלב סגנון אישי עם פתרונות פרקטיים לכל חלל בבית',
                  features: [
                    'קונספט עיצוב ייחודי',
                    'בחירת חומרים ורהיטים',
                    'תכנון תאורה מתקדם',
                    'ליווי עד לסיום הפרויקט'
                  ],
                  image: '/lovable-uploads/0a85161f-705c-4a04-ad1a-921ed6a25804.png'
                },
                {
                  icon: 'Users',
                  title: 'ייעוץ ממוקד',
                  description: 'ייעוץ מקצועי לשיפור ואופטימיזציה של מרחבים קיימים או פתרון בעיות ספציפיות',
                  features: [
                    'ייעוץ תכנוני מקצועי',
                    'פתרונות לבעיות מרחב',
                    'אופטימיזציה של פריסות',
                    'ייעוץ לשיפוצים'
                  ],
                  image: '/lovable-uploads/27c74a05-6338-4ae2-b8ca-2231ff6e02d2.png'
                },
                {
                  icon: 'Lightbulb',
                  title: 'הדמיות וסקיצות',
                  description: 'יצירת הדמיות תלת-ממדיות וסקיצות המאפשרות חזייה מדויקת של התוצאה הסופית',
                  features: [
                    'הדמיות תלת-ממד מפורטות',
                    'סקיצות רעיוניות',
                    'מצגות ייעודיות ללקוח',
                    'גרסאות עיצוב חלופיות'
                  ],
                  image: '/lovable-uploads/abb71ea3-eb84-4ef8-bc2a-169b6f172cd7.png'
                },
              ],
            },
            visible: true,
            editable: true,
            order: 1,
          },
          {
            id: 'myworkflow',
            type: 'value',
            content: {
              title: 'תהליך העבודה',
              description: 'כך אנחנו עובדים יחד כדי להגשים את החזון שלכם',
              values: [
                {
                  icon: '1',
                  title: 'פגישת היכרות',
                  description: 'פגישה ראשונית להכרת הצרכים, החלומות והתקציב',
                },
                {
                  icon: '2',
                  title: 'פיתוח קונספט',
                  description: 'יצירת רעיון עיצובי ראשוני המבוסס על הדרישות שלכם',
                },
                {
                  icon: '3',
                  title: 'תכנון מפורט',
                  description: 'פיתוח התוכניות המפורטות וההדמיות הסופיות',
                },
                {
                  icon: '4',
                  title: 'ביצוע וליווי',
                  description: 'ליווי מקצועי לאורך כל שלבי הביצוע עד להשלמה',
                },
              ],
            },
            visible: true,
            editable: true,
            order: 2,
          },
          {
            id: 'cta-ready-to-start',
            type: 'cta',
            content: {
              title: 'מעוניינים בפנייה אישית?',
              description: 'בואו נקבע פגישת ייעוץ ראשונה ונתחיל לתכנן יחד את הפרויקט שלכם',
              primaryButton: {
                text: 'צור קשר',
                link: '/contact',
              },
              secondaryButton: {
                text: 'צפה בפרויקטים',
                link: '/project',
              },
            },
            visible: true,
            editable: true,
            order: 3,
          },
        ];
        case 'contect':
        return [
          {
            id: 'hero-title',
            type: 'heading',
            content: { text: 'צור קשר' },
            visible: true,
            editable: true,
            order: 1,
          },
          {
            id: 'hero-subtitle',
            type: 'text',
            content: { text: 'מוזמנים ליצור איתנו קשר לקבלת ייעוץ מקצועי או לתיאום פגישה' },
            visible: true,
            editable: true,
            order: 2,
          },
        ];
      default:
        return [];
      }
    };
    
    const [imageSrc, setImageSrc] = useState("");
    const [formData, setFormData] = useState("");
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContentFromFirestore = async () => {
      try {
        const docRef = doc(db, 'pages', pageId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setContentBlocks(data.contentBlocks || []);
          toast({
            title: 'Loaded from Firestore',
            description: 'Content loaded successfully',
          });
        } else {
          const defaults = getContentBlocksForPage(pageId);
          setContentBlocks(defaults);
          await setDoc(docRef, { contentBlocks: defaults });
          toast({
            title: 'Initialized',
            description: 'Using default content for first time',
          });
        }
      } catch (error) {
        console.error('Error loading content:', error);
        toast({
          title: 'Error',
          description: 'Could not load content from Firestore',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContentFromFirestore();
  }, [pageId]);

  const updateBlock = (blockId: string, newContent: any) => {
    setContentBlocks((prev) =>
      prev.map((block) => (block.id === blockId ? { ...block, content: newContent } : block))
    );
    onContentChange();
  };

  const toggleBlockVisibility = (blockId: string) => {
    setContentBlocks((prev) =>
      prev.map((block) => (block.id === blockId ? { ...block, visible: !block.visible } : block))
    );
    onContentChange();
  };

  const duplicateBlock = (blockId: string) => {
    const blockToDuplicate = contentBlocks.find((b) => b.id === blockId);
    if (blockToDuplicate) {
      const newBlock = {
        ...blockToDuplicate,
        id: `${blockId}-copy-${Date.now()}`,
        order: Math.max(...contentBlocks.map((b) => b.order)) + 1,
      };
      setContentBlocks((prev) => [...prev, newBlock]);
      onContentChange();
    }
  };

  const deleteBlock = (blockId: string) => {
    if (confirm('Are you sure you want to delete this content block?')) {
      setContentBlocks((prev) => prev.filter((b) => b.id !== blockId));
      onContentChange();
    }
  };

  const saveContentToFirestore = async () => {
    try {
      await setDoc(doc(db, 'pages', pageId), { contentBlocks });
      toast({
        title: 'Saved',
        description: 'נשמר בהצלחה',
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'Error',
        description: 'Save failed',
        variant: 'destructive',
      });
    }
  };

   // Keyboard shortcuts
   useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveContentToFirestore();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetToDefault = async () => {
    if (confirm('האם לשחזר לברירת המחדל?')) {
      const defaults = getContentBlocksForPage(pageId);
      setContentBlocks(defaults);
      try {
        await setDoc(doc(db, 'pages', pageId), { contentBlocks: defaults });
        toast({
          title: 'אתחול לברירת מחדל',
          description: 'ברירת המחדל נשמר',
        });
      } catch (error) {
        console.error('Reset error:', error);
        toast({
          title: 'Error',
          description: 'Could not reset',
          variant: 'destructive',
        });
      }
    }
  };

  const renderBlockEditor = (block: ContentBlock) => {
    switch (block.type) {
      case 'projects':
  return (
    <div className="space-y-4">
      <Input
        value={block.content.title}
        onChange={(e) =>
          updateBlock(block.id, { ...block.content, title: e.target.value })
        }
        placeholder="כותרת"
      />
        <Input
        value={block.content.description}
        onChange={(e) =>
          updateBlock(block.id, { ...block.content, description: e.target.value })
        }
        placeholder="פירוט"
      />
      <div className="space-y-3">
        {block.content.projects.map((proj: any, index: number) => (
          <div key={index} className="p-3 border rounded bg-muted/30 space-y-2">
            <Input
              value={proj.title}
              onChange={(e) => {
                const updated = [...block.content.projects];
                updated[index].title = e.target.value;
                updateBlock(block.id, { ...block.content, projects: updated });
              }}
              placeholder="כותרת הפרויקט"
            />
            <Input
              value={proj.category}
              onChange={(e) => {
                const updated = [...block.content.projects];
                updated[index].category = e.target.value;
                updateBlock(block.id, { ...block.content, projects: updated });
              }}
              placeholder="קטגוריה"
            />
            <Textarea
              value={proj.description}
              onChange={(e) => {
                const updated = [...block.content.projects];
                updated[index].description = e.target.value;
                updateBlock(block.id, { ...block.content, projects: updated });
              }}
              placeholder="תיאור"
            />
            <Input
              value={proj.image}
              onChange={(e) => {
                const updated = [...block.content.projects];
                updated[index].image = e.target.value;
                updateBlock(block.id, { ...block.content, projects: updated });
              }}
              placeholder="כתובת תמונה"
              disabled
            />
          </div>
        ))}
      </div>
    </div>
  );
      case 'image':
        return (
          <div className="space-y-3">
            <FileReaders setImageSrc={setImageSrc} setFormData={(e)=>{
              updateBlock(block.id, { ...block.content, url: e().coverImage })
              }}/>
               <img src={block.content.url} className="rounded shadow" />
          </div>
        );

      case 'heading':
        return (
          <div className="space-y-3">
            <Input
              value={block.content.text}
              onChange={(e) =>
                updateBlock(block.id, { ...block.content, text: e.target.value })
              }
              placeholder="Heading text"
            />
          </div>
        );

      case 'text':
        return (
          <Textarea
            value={block.content.text}
            onChange={(e) =>
              updateBlock(block.id, { ...block.content, text: e.target.value })
            }
            placeholder="Enter text"
            rows={3}
          />
        );

      case 'quote':
        return (
          <div className="space-y-3">
            <Textarea
              value={block.content.text}
              onChange={(e) =>
                updateBlock(block.id, { ...block.content, text: e.target.value })
              }
              placeholder="Quote text"
              rows={3}
            />
            <Input
              value={block.content.author}
              onChange={(e) =>
                updateBlock(block.id, { ...block.content, author: e.target.value })
              }
              placeholder="Author"
            />
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <Input
              value={block.content.title}
              onChange={(e) =>
                updateBlock(block.id, { ...block.content, title: e.target.value })
              }
              placeholder="CTA Title"
            />
            <Textarea
              value={block.content.description}
              onChange={(e) =>
                updateBlock(block.id, { ...block.content, description: e.target.value })
              }
              placeholder="CTA Description"
              rows={2}
            />
          </div>
        );

      case 'value':
        return (
          <div className="space-y-4">
            <Input
              value={block.content.title}
              onChange={(e) =>
                updateBlock(block.id, { ...block.content, title: e.target.value })
              }
              placeholder="כותרת ראשית"
            />
            <Textarea
              value={block.content.description}
              onChange={(e) =>
                updateBlock(block.id, { ...block.content, description: e.target.value })
              }
              placeholder="תיאור ראשי"
              rows={2}
            />
            <div className="space-y-3">
              {block.content.values.map((val: any, index: number) => (
                <div key={index} className="p-3 border rounded space-y-2 bg-muted/30">
                  <label>אייקון</label>
                  <Input
                    value={val.icon}
                    onChange={(e) => {
                      const updatedValues = [...block.content.values];
                      updatedValues[index].icon = e.target.value;
                      updateBlock(block.id, { ...block.content, values: updatedValues });
                    }}
                    placeholder="אייקון (למשל: Eye)"
                    disabled
                  />
                  <label>כותרת</label>
                  <Input
                    value={val.title}
                    onChange={(e) => {
                      const updatedValues = [...block.content.values];
                      updatedValues[index].title = e.target.value;
                      updateBlock(block.id, { ...block.content, values: updatedValues });
                    }}
                    placeholder="כותרת הערך"
                  />
                  <label>תוכן</label>
                  <Textarea
                    value={val.description}
                    onChange={(e) => {
                      const updatedValues = [...block.content.values];
                      updatedValues[index].description = e.target.value;
                      updateBlock(block.id, { ...block.content, values: updatedValues });
                    }}
                    placeholder="תיאור הערך"
                    rows={2}
                  />
                  {val.features? <div>
                    <label>מאפיינים</label>
                    {val.features.map((f, i) => {
                      return <Input
                      key={f}
                      value={f}
                      onChange={(e) =>
                      {
                        const values = [...block.content.values]
                        values[index].features[i] = e.target.value
                        updateBlock(block.id, { ...block.content, values: values })
                      }
                      }
                      placeholder="אפיין"
                    />
                    })}
                  </div>:
                  <></>}
                </div>
              ))}
            </div>
            {/* <Button
              variant="outline"
              onClick={() => {
                const updatedValues = [...block.content.values, {
                  icon: '',
                  title: '',
                  description: '',
                }];
                updateBlock(block.id, { ...block.content, values: updatedValues });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              הוסף ערך חדש
            </Button> */}
          </div>
        );

      default:
        return <p className="text-muted-foreground">Editor for {block.type} not implemented</p>;
    }
  };

  if (loading) return <p className="p-4 text-center text-gray-500">Loading content...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">תוכן עמוד</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToDefault}>
            חזרה לברירת מחדל
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={saveContentToFirestore}>
            <Save className="w-4 h-4 mr-2" />
            שמור הכל
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {contentBlocks
          .sort((a, b) => a.order - b.order)
          .map((block) => (
            <Card key={block.id} className={`${!block.visible ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-stone-400" />
                    <span className="capitalize font-medium">{block.type}</span>
                    <Badge variant={block.visible ? 'default' : 'secondary'}>
                      {block.visible ? 'Visible' : 'Hidden'}
                    </Badge>
                    {!block.editable && (
                      <Badge variant="outline" className="text-orange-600">
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>{renderBlockEditor(block)}</CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ContentEditor;
