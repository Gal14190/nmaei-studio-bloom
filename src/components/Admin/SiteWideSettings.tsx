// app/(admin)/SiteWideSettings.tsx
import React, { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

import {
  Phone,
  Instagram,
  Facebook,
  Mail,
  Globe,
  Clock,
  MapPin,
  Settings,
  Palette,
  Languages,
} from 'lucide-react';

interface SiteWideSettingsProps {
  onContentChange: () => void; // טריגר רענון חיצוני אם יש צורך
}

/* ---------- ערכי ברירת מחדל ---------- */
const defaultSettings = {
  contact: {
    whatsapp: { number: '972532731575', message: 'שלום, אני מעוניין בייעוץ עיצוב' },
    email: 'Nofarmizr3008@gmail.com',
    phone: '053-273-1575',
    address: 'אזור המרכז, ישראל',
    workingHours: {
      sunday: { enabled: true, hours: '09:00-17:00' },
      monday: { enabled: true, hours: '09:00-17:00' },
      tuesday: { enabled: true, hours: '09:00-17:00' },
      wednesday: { enabled: true, hours: '09:00-17:00' },
      thursday: { enabled: true, hours: '09:00-17:00' },
      friday: { enabled: true, hours: '09:00-14:00' },
      saturday: { enabled: false, hours: 'סגור' },
    },
  },
  social: {
    instagram: 'https://instagram.com/nmaei_studio',
    facebook: 'https://facebook.com/nmaei.studio',
    linkedin: '',
    youtube: '',
  },
  company: {
    name: 'M I N É A Studio',
    tagline: 'Architecture | Interior Design',
    footerTagline:
      'סטודיו לאדריכלות ועיצוב פנים - תכנון חכם, עיצוב מינימליסטי וחם',
    description:
      'סטודיו מקצועי לאדריכלות ועיצוב פנים המתמחה בעיצוב מינימליסטי וחם',
    yearsOfExperience: '3',
    projectsCompleted: '50+',
    clientSatisfaction: '100%',
  },
  buttons: {
    heroContact: { text: 'צור קשר', link: '/contact', style: 'secondary' },
    heroProjects: { text: 'צפה בפרויקטים', link: '/projects', style: 'primary' },
    ctaMain: { text: 'מוכנים להתחיל?', link: '/contact', style: 'primary' },
    footerContact: { text: 'בואו נדבר', link: '/contact', style: 'outline' },
  },
  seo: {
    defaultTitle: 'M I N É A Studio - Architecture & Interior Design',
    defaultDescription: 'סטודיו מקצועי לאדריכלות ועיצוב פנים במרכז הארץ',
    ogImage: '/lovable-uploads/f911b76f-cd03-4ecc-ace0-40a934fa63db.png',
    favicon: '/favicon.ico',
  },
  language: {
    default: 'he',
    available: ['he', 'en'],
    rtl: true,
  },
};

/* ---------- קומפוננטה ---------- */
const SiteWideSettings = ({ onContentChange }: SiteWideSettingsProps) => {
  const [settings, setSettings] = useState<any>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const docRef = doc(db, 'settings', 'config');

  /* --- טעינת ההגדרות מה־Firestore --- */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setSettings(snap.data());
          toast({ title: 'הגדרות נטענו', description: 'ההגדרות הוטענו מהשרת' });
        } else {
          await setDoc(docRef, defaultSettings);
          toast({
            title: 'הוזנו הגדרות ברירת מחדל',
            description: 'נוצר מסמך חדש במסד הנתונים',
          });
        }
      } catch (err) {
        console.error(err);
        toast({
          title: 'שגיאה',
          description: 'טעינת ההגדרות נכשלה',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  /* --- שינוי ערך בשדות (גם מקוננים) --- */
  const handleSettingChange = (
    section: string,
    field: string,
    value: any,
    subfield?: string
  ) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...(subfield
          ? {
              [field]: {
                ...prev[section][field],
                [subfield]: value,
              },
            }
          : { [field]: value }),
      },
    }));
    onContentChange();
  };

  /* --- שמירה ל־Firestore --- */
  const saveSettings = async () => {
    try {
      await setDoc(docRef, settings);
      toast({ title: 'נשמר', description: 'ההגדרות נשמרו בהצלחה' });
    } catch (err) {
      console.error(err);
      toast({
        title: 'שגיאה',
        description: 'לא ניתן לשמור את ההגדרות',
        variant: 'destructive',
      });
    }
  };

  /* --- איפוס לברירת מחדל --- */
  const resetToDefault = async () => {
    if (confirm('האם לשחזר את כל ההגדרות לברירת מחדל?')) {
      try {
        setSettings(defaultSettings);
        await setDoc(docRef, defaultSettings);
        toast({ title: 'שוחזר לברירת מחדל', description: 'ההגדרות שוחזרו' });
      } catch (err) {
        console.error(err);
        toast({
          title: 'שגיאה',
          description: 'שחזור נכשל',
          variant: 'destructive',
        });
      }
    }
  };

  /* --- UI --- */
  if (loading)
    return (
      <p className="p-4 text-center text-stone-500">טוען הגדרות...</p>
    );

  return (
    <div className="space-y-6">
      {/* כותרת + כפתורים */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-900">הגדרות אתר</h2>
          <p className="text-stone-600">
            עדכון פרטי החברה, יצירת קשר, רשתות חברתיות וכו׳
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={resetToDefault}>
            חזרה לברירת מחדל
          </Button>
          <Button
            onClick={saveSettings}
            className="bg-green-600 hover:bg-green-700"
          >
            שמירת כל ההגדרות
          </Button>
        </div>
      </div>

      {/* טאבים */}
      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="contact">יצירת קשר</TabsTrigger>
          <TabsTrigger value="social">רשתות חברתיות</TabsTrigger>
          <TabsTrigger value="company">על החברה</TabsTrigger>
          {/* <TabsTrigger value="buttons">כפתורים</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="language">שפה</TabsTrigger> */}
        </TabsList>

        {/* ----- טאב יצירת קשר ----- */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> פרטי יצירת קשר
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>מספר ווצאפ</Label>
                  <Input
                    value={settings.contact.whatsapp.number}
                    onChange={(e) =>
                      handleSettingChange(
                        'contact',
                        'whatsapp',
                        e.target.value,
                        'number'
                      )
                    }
                  />
                </div>
                <div>
                  <Label>מספר טלפון</Label>
                  <Input
                    value={settings.contact.phone}
                    onChange={(e) =>
                      handleSettingChange('contact', 'phone', e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <Label>הודעת ווצאפ כברירת מחדל</Label>
                <Textarea
                  value={settings.contact.whatsapp.message}
                  onChange={(e) =>
                    handleSettingChange(
                      'contact',
                      'whatsapp',
                      e.target.value,
                      'message'
                    )
                  }
                />
              </div>

              <div>
                <Label>כתובת מייל</Label>
                <Input
                  value={settings.contact.email}
                  onChange={(e) =>
                    handleSettingChange('contact', 'email', e.target.value)
                  }
                  // icon={<Mail className="w-4 h-4" />}
                />
              </div>

              <div>
                <Label>כתובת העסק</Label>
                <Textarea
                  value={settings.contact.address}
                  onChange={(e) =>
                    handleSettingChange('contact', 'address', e.target.value)
                  }
                  // icon={<MapPin className="w-4 h-4" />}
                />
              </div>
            </CardContent>
          </Card>

          {/* שעות עבודה (לא חובה – ניתן להסתיר אם אין צורך) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" /> שעות פעילות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(settings.contact.workingHours).map(
                ([day, cfg]: any) => (
                  <div
                    key={day}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 w-56">
                      <Switch
                        checked={cfg.enabled}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
                            'contact',
                            'workingHours',
                            { ...cfg, enabled: checked },
                            day
                          )
                        }
                      />
                      <span className="capitalize">{day}</span>
                    </div>
                    <Input
                      className="w-40"
                      disabled={!cfg.enabled}
                      value={cfg.hours}
                      onChange={(e) =>
                        handleSettingChange(
                          'contact',
                          'workingHours',
                          { ...cfg, hours: e.target.value },
                          day
                        )
                      }
                    />
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ----- טאב רשתות חברתיות ----- */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="w-5 h-5" /> קישורים לרשתות חברתיות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Instagram</Label>
                <Input
                  value={settings.social.instagram}
                  onChange={(e) =>
                    handleSettingChange('social', 'instagram', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Facebook</Label>
                <Input
                  value={settings.social.facebook}
                  onChange={(e) =>
                    handleSettingChange('social', 'facebook', e.target.value)
                  }
                />
              </div>
              {/* <div>
                <Label>LinkedIn</Label>
                <Input
                  value={settings.social.linkedin}
                  onChange={(e) =>
                    handleSettingChange('social', 'linkedin', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>YouTube</Label>
                <Input
                  value={settings.social.youtube}
                  onChange={(e) =>
                    handleSettingChange('social', 'youtube', e.target.value)
                  }
                />
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ----- טאב על החברה ----- */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" /> מידע על החברה
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>שם החברה</Label>
                <Input
                  value={settings.company.name}
                  onChange={(e) =>
                    handleSettingChange('company', 'name', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>תגית/סלוגן</Label>
                <Input
                  value={settings.company.tagline}
                  onChange={(e) =>
                    handleSettingChange('company', 'tagline', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>תיאור קצר</Label>
                <Textarea
                  value={settings.company.footerTagline}
                  onChange={(e) =>
                    handleSettingChange('company', 'footerTagline', e.target.value)
                  }
                  rows={3}
                />
              </div>

              {/* <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>שנות ניסיון</Label>
                  <Input
                    value={settings.company.yearsOfExperience}
                    onChange={(e) =>
                      handleSettingChange(
                        'company',
                        'yearsOfExperience',
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label>פרויקטים שהסתיימו</Label>
                  <Input
                    value={settings.company.projectsCompleted}
                    onChange={(e) =>
                      handleSettingChange(
                        'company',
                        'projectsCompleted',
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label>שביעות רצון לקוח</Label>
                  <Input
                    value={settings.company.clientSatisfaction}
                    onChange={(e) =>
                      handleSettingChange(
                        'company',
                        'clientSatisfaction',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ----- טאב כפתורים גלובליים ----- */}
        <TabsContent value="buttons" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" /> כפתורים גלובליים
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(settings.buttons).map(([btnId, cfg]: any) => (
                <Card key={btnId} className="p-4">
                  <h4 className="font-medium mb-3 capitalize">
                    {btnId.replace(/([A-Z])/g, ' $1')}
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>טקסט</Label>
                      <Input
                        value={cfg.text}
                        onChange={(e) =>
                          handleSettingChange('buttons', btnId, {
                            ...cfg,
                            text: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>קישור</Label>
                      <Input
                        value={cfg.link}
                        onChange={(e) =>
                          handleSettingChange('buttons', btnId, {
                            ...cfg,
                            link: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>סגנון</Label>
                      <select
                        className="w-full p-2 border border-stone-300 rounded"
                        value={cfg.style}
                        onChange={(e) =>
                          handleSettingChange('buttons', btnId, {
                            ...cfg,
                            style: e.target.value,
                          })
                        }
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="outline">Outline</option>
                      </select>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ----- טאב SEO ----- */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" /> SEO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Title ברירת מחדל</Label>
                <Input
                  value={settings.seo.defaultTitle}
                  onChange={(e) =>
                    handleSettingChange(
                      'seo',
                      'defaultTitle',
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label>Description ברירת מחדל</Label>
                <Textarea
                  value={settings.seo.defaultDescription}
                  onChange={(e) =>
                    handleSettingChange(
                      'seo',
                      'defaultDescription',
                      e.target.value
                    )
                  }
                  rows={2}
                />
              </div>
              <div>
                <Label>OG Image (URL)</Label>
                <Input
                  value={settings.seo.ogImage}
                  onChange={(e) =>
                    handleSettingChange('seo', 'ogImage', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Favicon (URL)</Label>
                <Input
                  value={settings.seo.favicon}
                  onChange={(e) =>
                    handleSettingChange('seo', 'favicon', e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ----- טאב שפה ----- */}
        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5" /> שפה ונגישות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>שפה ראשית</Label>
                <select
                  className="w-full p-2 border border-stone-300 rounded"
                  value={settings.language.default}
                  onChange={(e) =>
                    handleSettingChange('language', 'default', e.target.value)
                  }
                >
                  <option value="he">עברית (he)</option>
                  <option value="en">English (en)</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={settings.language.rtl}
                  onCheckedChange={(checked) =>
                    handleSettingChange('language', 'rtl', checked)
                  }
                />
                <Label>RTL (ימין לשמאל)</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteWideSettings;
