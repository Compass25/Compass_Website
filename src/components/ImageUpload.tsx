
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  packageTags?: string[];
  onPropagateToRelated?: (imageUrl: string, tags: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  packageTags = [],
  onPropagateToRelated
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file format
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (!allowedFormats.includes(file.type)) {
      toast({
        title: 'Invalid File Format',
        description: 'Please upload a PNG, JPG, or GIF image.',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: 'File Too Large',
        description: 'Please upload an image smaller than 5MB.',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);

    try {
      // Create a data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onChange(imageUrl);

        // Propagate to related packages if function is provided
        if (onPropagateToRelated && packageTags.length > 0) {
          onPropagateToRelated(imageUrl, packageTags);
        }

        toast({
          title: 'Success',
          description: 'Image uploaded successfully!'
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onRemove();
    toast({
      title: 'Image Removed',
      description: 'Image has been removed successfully.'
    });
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.gif"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {value ? (
        <div className="relative group">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <img
              src={value}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div 
          onClick={handleUploadClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center space-y-2">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="text-sm text-gray-600">Uploading...</p>
              </>
            ) : (
              <>
                <Image className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Click to upload image</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
