import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Save,
  Phone,
  Instagram,
  Facebook,
  Mail
} from 'lucide-react';

interface SiteSettingsProps {
  onContentChange: () => void;
}

const SiteSettings = ({ onContentChange }: SiteSettingsProps) => {
  const [settings, setSettings] = useState({
    contact: {
      whatsapp: {
        number: '972532731575',
        message: 'שלום, אני מעוניין בייעוץ עיצוב',
      },
      email: 'Nofarmizr3008@gmail.com',
      phone: '0523-273-1575',
    },
    social: {
      instagram: 'https://instagram.com/nmaei_studio',
      facebook: 'https://facebook.com/nmaei.studio',
    },
    company: {
      name: 'M I N É A Studio',
      tagline: 'Architecture | Interior Design',
      address: 'אזור המרכז, ישראל',
      description: 'סטודיו לאדריכלות ועיצוב פנים - תכנון חכם, עיצוב מינימליסטי וחם',
    },
    hero: {
      title: 'N M A E I',
      subtitle: 'Architecture | Interior Design',
      tagline: 'לראות | להבין | להרגיש',
      description: 'תכנון שמתרגם חלומות ומדבר עם השטח',
      ctaButton: 'צפה בפרויקטים',
      contactButton: 'צור קשר',
    },
  });

  const handleSettingChange = (
    category: string,
    field: string,
    value: string,
    subfield?: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        ...(subfield
          ? {
              [field]: {
                ...prev[category as keyof typeof prev][field as keyof any],
                [subfield]: value,
              },
            }
          : {
              [field]: value,
            }),
      },
    }));

    onContentChange();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-stone-900">Site Settings</h2>
        <p className="text-stone-600">
          Manage global site settings, contact information, and social links
        </p>
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
        </TabsList>

        {/* --- Contact Info Tab --- */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>WhatsApp Number</Label>
                <Input
                  value={settings.contact.whatsapp.number}
                  onChange={(e) =>
                    handleSettingChange('contact', 'whatsapp', e.target.value, 'number')
                  }
                />
              </div>

              <div>
                <Label>הודעת ווצאפ</Label>
                <Textarea
                  value={settings.contact.whatsapp.message}
                  onChange={(e) =>
                    handleSettingChange('contact', 'whatsapp', e.target.value, 'message')
                  }
                />
              </div>

              <div>
                <Label>Email Address</Label>
                <Input
                  value={settings.contact.email}
                  onChange={(e) =>
                    handleSettingChange('contact', 'email', e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input
                  value={settings.contact.phone}
                  onChange={(e) =>
                    handleSettingChange('contact', 'phone', e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Social Links Tab --- */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="w-5 h-5" />
                Social Media Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Instagram URL</Label>
                <Input
                  value={settings.social.instagram}
                  onChange={(e) =>
                    handleSettingChange('social', 'instagram', e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Facebook URL</Label>
                <Input
                  value={settings.social.facebook}
                  onChange={(e) =>
                    handleSettingChange('social', 'facebook', e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Company Info Tab --- */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  value={settings.company.name}
                  onChange={(e) =>
                    handleSettingChange('company', 'name', e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Tagline</Label>
                <Input
                  value={settings.company.tagline}
                  onChange={(e) =>
                    handleSettingChange('company', 'tagline', e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Address</Label>
                <Textarea
                  value={settings.company.address}
                  onChange={(e) =>
                    handleSettingChange('company', 'address', e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={settings.company.description}
                  onChange={(e) =>
                    handleSettingChange('company', 'description', e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Hero Section Tab --- */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Main Title</Label>
                <Input
                  value={settings.hero.title}
                  onChange={(e) =>
                    handleSettingChange('hero', 'title', e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Subtitle</Label>
                <Input
                  value={settings.hero.subtitle}
                  onChange={(e) =>
                    handleSettingChange('hero', 'subtitle', e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Hebrew Tagline</Label>
                <Input
                  value={settings.hero.tagline}
                  onChange={(e) =>
                    handleSettingChange('hero', 'tagline', e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={settings.hero.description}
                  onChange={(e) =>
                    handleSettingChange('hero', 'description', e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Button Text</Label>
                  <Input
                    value={settings.hero.ctaButton}
                    onChange={(e) =>
                      handleSettingChange('hero', 'ctaButton', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Contact Button Text</Label>
                  <Input
                    value={settings.hero.contactButton}
                    onChange={(e) =>
                      handleSettingChange('hero', 'contactButton', e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettings;
