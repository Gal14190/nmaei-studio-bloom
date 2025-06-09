
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Phone, Instagram, Facebook, Mail, Globe, MessageCircle,
  Clock, MapPin, Settings, Palette, Languages
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SiteWideSettingsProps {
  onContentChange: () => void;
}

const SiteWideSettings = ({ onContentChange }: SiteWideSettingsProps) => {
  const [settings, setSettings] = useState({
    contact: {
      whatsapp: {
        number: '972501234567',
        message: 'שלום, אני מעוניין בייעוץ עיצוב'
      },
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
        saturday: { enabled: false, hours: 'סגור' }
      }
    },
    social: {
      instagram: 'https://instagram.com/nmaei_studio',
      facebook: 'https://facebook.com/nmaei.studio',
      linkedin: '',
      youtube: ''
    },
    company: {
      name: 'NMAEI Studio',
      tagline: 'Architecture | Interior Design',
      footerTagline: 'סטודיו לאדריכלות ועיצוב פנים - תכנון חכם, עיצוב מינימליסטי וחם',
      description: 'סטודיו מקצועי לאדריכלות ועיצוב פנים המתמחה בעיצוב מינימליסטי וחם',
      yearsOfExperience: '3',
      projectsCompleted: '50+',
      clientSatisfaction: '100%'
    },
    buttons: {
      heroContact: {
        text: 'צור קשר',
        link: '/contact',
        style: 'secondary'
      },
      heroProjects: {
        text: 'צפה בפרויקטים',
        link: '/projects',
        style: 'primary'
      },
      ctaMain: {
        text: 'מוכנים להתחיל?',
        link: '/contact',
        style: 'primary'
      },
      footerContact: {
        text: 'בואו נדבר',
        link: '/contact',
        style: 'outline'
      }
    },
    seo: {
      defaultTitle: 'NMAEI Studio - Architecture & Interior Design',
      defaultDescription: 'סטודיו מקצועי לאדריכלות ועיצוב פנים במרכז הארץ',
      ogImage: '/lovable-uploads/f911b76f-cd03-4ecc-ace0-40a934fa63db.png',
      favicon: '/favicon.ico'
    },
    language: {
      default: 'he',
      available: ['he', 'en'],
      rtl: true
    }
  });

  const handleSettingChange = (section: string, field: string, value: any, subfield?: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        ...(subfield ? {
          [field]: {
            ...prev[section as keyof typeof prev][field as keyof any],
            [subfield]: value
          }
        } : {
          [field]: value
        })
      }
    }));
    onContentChange();
  };

  const saveSettings = () => {
    // Simulate saving to backend
    toast({
      title: "Settings saved",
      description: "All site-wide settings have been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-900">Site-Wide Settings</h2>
          <p className="text-stone-600">Manage global settings, contact info, and site configuration</p>
        </div>
        <Button onClick={saveSettings} className="bg-green-600 hover:bg-green-700">
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>WhatsApp Number</Label>
                  <Input
                    value={settings.contact.whatsapp.number}
                    onChange={(e) => handleSettingChange('contact', 'whatsapp', e.target.value, 'number')}
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    value={settings.contact.phone}
                    onChange={(e) => handleSettingChange('contact', 'phone', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>WhatsApp Default Message</Label>
                <Textarea
                  value={settings.contact.whatsapp.message}
                  onChange={(e) => handleSettingChange('contact', 'whatsapp', e.target.value, 'message')}
                />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input
                  value={settings.contact.email}
                  onChange={(e) => handleSettingChange('contact', 'email', e.target.value)}
                />
              </div>
              <div>
                <Label>Business Address</Label>
                <Textarea
                  value={settings.contact.address}
                  onChange={(e) => handleSettingChange('contact', 'address', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Working Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(settings.contact.workingHours).map(([day, daySettings]) => (
                  <div key={day} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={daySettings.enabled}
                        onCheckedChange={(checked) => 
                          handleSettingChange('contact', 'workingHours', { ...daySettings, enabled: checked }, day)
                        }
                      />
                      <span className="capitalize w-20">{day}</span>
                    </div>
                    <Input
                      value={daySettings.hours}
                      onChange={(e) => 
                        handleSettingChange('contact', 'workingHours', { ...daySettings, hours: e.target.value }, day)
                      }
                      className="w-32"
                      disabled={!daySettings.enabled}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
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
                  onChange={(e) => handleSettingChange('social', 'instagram', e.target.value)}
                />
              </div>
              <div>
                <Label>Facebook URL</Label>
                <Input
                  value={settings.social.facebook}
                  onChange={(e) => handleSettingChange('social', 'facebook', e.target.value)}
                />
              </div>
              <div>
                <Label>LinkedIn URL</Label>
                <Input
                  value={settings.social.linkedin}
                  onChange={(e) => handleSettingChange('social', 'linkedin', e.target.value)}
                />
              </div>
              <div>
                <Label>YouTube URL</Label>
                <Input
                  value={settings.social.youtube}
                  onChange={(e) => handleSettingChange('social', 'youtube', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  value={settings.company.name}
                  onChange={(e) => handleSettingChange('company', 'name', e.target.value)}
                />
              </div>
              <div>
                <Label>Main Tagline</Label>
                <Input
                  value={settings.company.tagline}
                  onChange={(e) => handleSettingChange('company', 'tagline', e.target.value)}
                />
              </div>
              <div>
                <Label>Footer Tagline</Label>
                <Textarea
                  value={settings.company.footerTagline}
                  onChange={(e) => handleSettingChange('company', 'footerTagline', e.target.value)}
                />
              </div>
              <div>
                <Label>Company Description</Label>
                <Textarea
                  value={settings.company.description}
                  onChange={(e) => handleSettingChange('company', 'description', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Years of Experience</Label>
                  <Input
                    value={settings.company.yearsOfExperience}
                    onChange={(e) => handleSettingChange('company', 'yearsOfExperience', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Projects Completed</Label>
                  <Input
                    value={settings.company.projectsCompleted}
                    onChange={(e) => handleSettingChange('company', 'projectsCompleted', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Client Satisfaction</Label>
                  <Input
                    value={settings.company.clientSatisfaction}
                    onChange={(e) => handleSettingChange('company', 'clientSatisfaction', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buttons" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site-Wide Buttons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(settings.buttons).map(([buttonId, buttonSettings]) => (
                <Card key={buttonId} className="p-4">
                  <h4 className="font-medium mb-3 capitalize">{buttonId.replace(/([A-Z])/g, ' $1')}</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Button Text</Label>
                      <Input
                        value={buttonSettings.text}
                        onChange={(e) => handleSettingChange('buttons', buttonId, { ...buttonSettings, text: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Link URL</Label>
                      <Input
                        value={buttonSettings.link}
                        onChange={(e) => handleSettingChange('buttons', buttonId, { ...buttonSettings, link: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Style</Label>
                      <select
                        value={buttonSettings.style}
                        onChange={(e) => handleSettingChange('buttons', buttonId, { ...buttonSettings, style: e.target.value })}
                        className="w-full p-2 border border-stone-300 rounded"
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

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                SEO Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Page Title</Label>
                <Input
                  value={settings.seo.defaultTitle}
                  onChange={(e) => handleSettingChange('seo', 'defaultTitle', e.target.value)}
                />
              </div>
              <div>
                <Label>Default Meta Description</Label>
                <Textarea
                  value={settings.seo.defaultDescription}
                  onChange={(e) => handleSettingChange('seo', 'defaultDescription', e.target.value)}
                />
              </div>
              <div>
                <Label>Default OG Image URL</Label>
                <Input
                  value={settings.seo.ogImage}
                  onChange={(e) => handleSettingChange('seo', 'ogImage', e.target.value)}
                />
              </div>
              <div>
                <Label>Favicon URL</Label>
                <Input
                  value={settings.seo.favicon}
                  onChange={(e) => handleSettingChange('seo', 'favicon', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Language & Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Language</Label>
                <select
                  value={settings.language.default}
                  onChange={(e) => handleSettingChange('language', 'default', e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded"
                >
                  <option value="he">עברית (Hebrew)</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  checked={settings.language.rtl}
                  onCheckedChange={(checked) => handleSettingChange('language', 'rtl', checked)}
                />
                <Label>Enable RTL (Right-to-Left) Layout</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteWideSettings;
