
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Palette, Type, Layout, Grid } from 'lucide-react';

interface DesignSettingsProps {
  onContentChange: () => void;
}

const DesignSettings = ({ onContentChange }: DesignSettingsProps) => {
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
    { name: 'Stone Gray', value: '#78716c' },
    { name: 'Warm Beige', value: '#ccbfad' },
    { name: 'Deep Taupe', value: '#a08b6f' },
    { name: 'Soft Cream', value: '#fff8d1' },
    { name: 'Charcoal', value: '#44403c' },
  ];

  const fontOptions = [
    { name: 'Assistant (Current)', value: 'Assistant' },
    { name: 'Inter', value: 'Inter' },
    { name: 'Poppins', value: 'Poppins' },
    { name: 'Playfair Display', value: 'Playfair Display' },
    { name: 'Montserrat', value: 'Montserrat' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-stone-900">Design Settings</h2>
        <p className="text-stone-600">Customize the visual appearance of your website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Layout Settings */}
        <Card>
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
        </Card>

        {/* Color Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Palette
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-stone-700">Primary Color</Label>
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
                    onClick={() => handleSettingChange('primaryColor', color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-stone-700">Secondary Color</Label>
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
                    onClick={() => handleSettingChange('secondaryColor', color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Type className="w-5 h-5" />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-stone-700">Font Family</Label>
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

            <div>
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
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Grid className="w-5 h-5" />
              Preview
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
                <h3 className="text-lg font-medium">Sample Heading</h3>
                <p className="text-sm">
                  This is how your content will look with the selected design settings.
                </p>
                <div 
                  className="w-full h-8 rounded"
                  style={{ backgroundColor: settings.secondaryColor }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Settings Summary */}
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
              <p className="text-stone-600">{settings.columns}</p>
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
      </Card>
    </div>
  );
};

export default DesignSettings;
