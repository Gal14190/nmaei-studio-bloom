
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

    </div>
  );
};

export default DesignSettings;