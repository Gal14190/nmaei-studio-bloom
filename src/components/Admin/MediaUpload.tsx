
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, ImageIcon } from 'lucide-react';

interface MediaUploadProps {
  onUpload: (files: FileList) => void;
  onClose: () => void;
}

const MediaUpload = ({ onUpload, onClose }: MediaUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(files);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            const fileList = new DataTransfer();
            selectedFiles.forEach(file => fileList.items.add(file));
            onUpload(fileList.files);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-light text-stone-900">Upload Media</h3>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-stone-400 bg-stone-50' 
                : 'border-stone-300 hover:border-stone-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-stone-900 mb-2">
              Drop files here or click to upload
            </h4>
            <p className="text-stone-600 mb-4">
              Support for JPG, PNG, WebP files up to 10MB each
            </p>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline" className="mb-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-stone-900 mb-3">Selected Files:</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-stone-50 rounded">
                    <div className="flex items-center space-x-3">
                      <ImageIcon className="w-5 h-5 text-stone-500" />
                      <span className="text-sm text-stone-700">{file.name}</span>
                      <span className="text-xs text-stone-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-stone-600 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div 
                      className="bg-stone-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setSelectedFiles([])}>
                  Clear
                </Button>
                <Button 
                  onClick={handleUpload}
                  className="bg-stone-600 hover:bg-stone-700"
                  disabled={uploadProgress > 0 && uploadProgress < 100}
                >
                  Upload {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaUpload;
