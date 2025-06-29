
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Palette, Type, Layout, Grid } from 'lucide-react';
import { db } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';

interface DesignSettingsProps {
  onContentChange: () => void;
}

const DesignSettings = ({ onContentChange }: DesignSettingsProps) => {
  const [darkColor, setDarkColor] = useState('#111827');
  const [lightColor, setLightColor] = useState('#faf9f7');

  const [settings, setSettings] = useState({
    layoutStyle: 'grid',
    primaryColor: '#78716c',
    secondaryColor: '#f5f5f4',
    fontFamily: 'Assistant',
    fontSize: 'medium',
    columns: '3',
    spacing: 'normal',
  });

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    onContentChange();
  };

  const colorOptions = [
    { name: 'Stone Gray', value: '#111827' }, 
    { name: 'Warm Beige', value: '#faf9f7' },
  ];

  const fontOptions = [
    { name: 'Assistant (Current)', value: 'Assistant' },
    { name: 'Inter', value: 'Inter' },
    { name: 'Poppins', value: 'Poppins' },
    { name: 'Playfair Display', value: 'Playfair Display' },
    { name: 'Montserrat', value: 'Montserrat' },
  ];

  const saveDesignSettings = async () => {
    const payload = {
      ...settings,
      darkColor,
      lightColor,
    };

    try {
      await setDoc(doc(db, 'settings', 'design'), payload);
      toast({
        title: 'הצלחה',
        description: 'ההגדרות נשמרו בהצלחה',
      });
    } catch (error) {
      console.error('Error saving design settings:', error);
      toast({
        title: 'שגיאה',
        description: 'שמירת ההגדרות נכשלה',
        variant: 'destructive',
      });
    }
  };

  const loadDesignSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'design');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setSettings((prev) => ({
          ...prev,
          ...data,
        }));
        setDarkColor(data.darkColor || '#111827');
        setLightColor(data.lightColor || '#faf9f7');
      }
    } catch (error) {
      console.error('Error loading design settings:', error);
    }
  };

  useEffect(() => {
    loadDesignSettings();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-stone-900">Design Settings</h2>
        <p className="text-stone-600">Customize the visual appearance of your website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Layout Settings */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Layout Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-stone-700">Layout Style</Label>
              <Select value={settings.layoutStyle} onValueChange={(value) => handleSettingChange('layoutStyle', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid Layout</SelectItem>
                  <SelectItem value="masonry">Masonry Layout</SelectItem>
                  <SelectItem value="slider">Slider Layout</SelectItem>
                  <SelectItem value="list">List Layout</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-stone-700">Number of Columns</Label>
              <Select value={settings.columns} onValueChange={(value) => handleSettingChange('columns', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                  <SelectItem value="5">5 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-stone-700">Spacing</Label>
              <Select value={settings.spacing} onValueChange={(value) => handleSettingChange('spacing', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tight">Tight</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="relaxed">Relaxed</SelectItem>
                  <SelectItem value="loose">Loose</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card> */}

        {/* Color Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="w-5 h-5" />
              צבעים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-stone-700">עיצוב כהה (חלק תחתון, קו שבירה)</Label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`w-full h-10 rounded-lg border-2 transition-all ${
                      settings.primaryColor === color.value
                        ? 'border-stone-400 scale-105'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => {handleSettingChange('primaryColor', color.value); setDarkColor(color.value)}}
                    title={color.name}
                  />
                ))}
                <div>
                  <input
                    type="color"
                    id="dark_color"
                    name="dark_color"
                    style={{ margin: '0.4rem' }}
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                  />
                  <label htmlFor="dark_color">בחירה</label>
              </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-stone-700">עיצוב בהיר</Label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`w-full h-10 rounded-lg border-2 transition-all ${
                      settings.secondaryColor === color.value
                        ? 'border-stone-400 scale-105'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => {handleSettingChange('secondaryColor', color.value); setLightColor(color.value)}}
                    title={color.name}
                  />
                ))}
                <div>
                  <input
                    type="color"
                    id="light_color"
                    name="light_color"
                    style={{ margin: '0.4rem' }}
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                  />
                  <label htmlFor="dark_color">בחירה</label>
              </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Type className="w-5 h-5" />
              טופולוגיה
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-stone-700">פונט</Label>
              <Select value={settings.fontFamily} onValueChange={(value) => handleSettingChange('fontFamily', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <div>
              <Label className="text-sm font-medium text-stone-700">Font Size</Label>
              <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange('fontSize', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="extra-large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Grid className="w-5 h-5" />
              תצוגה מקדימה
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-stone-200 rounded-lg p-4 bg-white">
              <div 
                className="space-y-3"
                style={{ 
                  fontFamily: settings.fontFamily,
                  color: settings.primaryColor 
                }}
              >
                {/* <h3 className="text-lg font-medium">Sample Heading</h3> */}
                <div 
                  className="w-full h-8 rounded"
                  style={{ backgroundColor: darkColor }}
                >
                <p className="text-sm" style={{color: '#fff'}}>
                  כך הטקסט יראה על עיצוב כהה
                </p>
                  </div>
                <div 
                  className="w-full h-8 rounded"
                  style={{ backgroundColor: lightColor }}
                >
                <p className="text-sm" style={{color: '#000'}}>
                  כך הטקסט יראה על עיצוב בהיר
                </p>
                  </div>
              </div>
            </div>

            <Button onClick={saveDesignSettings} className="bg-green-600 hover:bg-green-700">
              שמור הגדרות
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Current Settings Summary
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Settings Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-stone-700">Layout:</span>
              <p className="text-stone-600 capitalize">{settings.layoutStyle}</p>
            </div>
            <div>
              <span className="font-medium text-stone-700">Columns:</span>
              <p className="te'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Palette, Type, Grid } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DesignSettingsProps {
  pageId: string; // ניתן להעביר pageId או userId לפי הצורך
  onContentChange: () => void;
}

const DesignSettings = ({ pageId, onContentChange }: DesignSettingsProps) => {
  const [darkColor, setDarkColor] = useState('#111827');
  const [lightColor, setLightColor] = useState('#faf9f7');

  const [settings, setSettings] = useState({
    layoutStyle: 'grid',
    primaryColor: '#78716c',
    secondaryColor: '#f5f5f4',
    fontFamily: 'Assistant',
    fontSize: 'medium',
    columns: '3',
    spacing: 'normal',
  });

  const handleSettingChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    onContentChange();
  };

  const saveDesignSettings = async () => {
    const payload = {
      ...settings,
      darkColor,
      lightColor,
    };

    try {
      await setDoc(doc(db, 'designSettings', pageId), payload);
      toast({
        title: 'הצלחה',
        description: 'ההגדרות נשמרו בהצלחה',
      });
    } catch (error) {
      console.error('Error saving design settings:', error);
      toast({
        title: 'שגיאה',
        description: 'שמירת ההגדרות נכשלה',
        variant: 'destructive',
      });
    }
  };

  const loadDesignSettings = async () => {
    try {
      const docRef = doc(db, 'designSettings', pageId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setSettings((prev) => ({
          ...prev,
          ...data,
        }));
        setDarkColor(data.darkColor || '#111827');
        setLightColor(data.lightColor || '#faf9f7');
      }
    } catch (error) {
      console.error('Error loading design settings:', error);
    }
  };

  useEffect(() => {
    loadDesignSettings();
  }, [pageId]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-stone-900">Design Settings</h2>
        <p className="text-stone-600">Customize the visual appearance of your website</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="w-5 h-5" />
            צבעים
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>צבע כהה</Label>
            <input
              type="color"
              value={darkColor}
              onChange={(e) => setDarkColor(e.target.value)}
            />
          </div>
          <div>
            <Label>צבע בהיר</Label>
            <input
              type="color"
              value={lightColor}
              onChange={(e) => setLightColor(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Type className="w-5 h-5" />
            טיפוגרפיה
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Font Family</Label>
          <select
            value={settings.fontFamily}
            onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
          >
            <option value="Assistant">Assistant</option>
            <option value="Inter">Inter</option>
            <option value="Poppins">Poppins</option>
            <option value="Montserrat">Montserrat</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Grid className="w-5 h-5" />
            תצוגה
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label>מספר עמודות</Label>
          <select
            value={settings.columns}
            onChange={(e) => handleSettingChange('columns', e.target.value)}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveDesignSettings} className="bg-green-600 hover:bg-green-700">
          שמור הגדרות
        </Button>
      </div>
    </div>
  );
};

export default DesignSettings;
xt-stone-600">{settings.columns}</p>
            </div>
            <div>
              <span className="font-medium text-stone-700">Font:</span>
              <p className="text-stone-600">{settings.fontFamily}</p>
            </div>
            <div>
              <span className="font-medium text-stone-700">Spacing:</span>
              <p className="text-stone-600 capitalize">{settings.spacing}</p>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default DesignSettings;