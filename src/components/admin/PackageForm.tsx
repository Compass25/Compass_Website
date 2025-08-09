import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTravelContext, TravelPackage } from '@/contexts/TravelContext';
import { useToast } from '@/hooks/use-toast';
import { useImagePropagation } from '@/hooks/useImagePropagation';
import ImageUpload from '@/components/ImageUpload';
import { getCurrencyOptions } from '@/lib/currency';
import { Loader2, Plus, X } from 'lucide-react';
interface PackageFormProps {
  editingPackage: string | null;
  onCancelEdit: () => void;
  onPackageSubmitted: () => void;
  initialPackage: Omit<TravelPackage, 'id'>;
  setInitialPackage: React.Dispatch<React.SetStateAction<Omit<TravelPackage, 'id'>>>;
}
const PackageForm: React.FC<PackageFormProps> = ({
  editingPackage,
  onCancelEdit,
  onPackageSubmitted,
  initialPackage,
  setInitialPackage
}) => {
  const {
    budgetOptions,
    addPackage,
    updatePackage
  } = useTravelContext();
  const {
    toast
  } = useToast();
  const {
    propagateImageToRelatedPackages
  } = useImagePropagation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (!initialPackage.title || !initialPackage.destination || !initialPackage.price) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const processedPackage = {
        ...initialPackage,
        tags: initialPackage.tags.filter(tag => tag.trim() !== ''),
        images: initialPackage.images.filter(img => img.trim() !== ''),
        inclusions: initialPackage.inclusions.filter(inc => inc.trim() !== ''),
        exclusions: initialPackage.exclusions.filter(exc => exc.trim() !== ''),
        itinerary: initialPackage.itinerary.filter(item => item.title.trim() !== '')
      };
      if (editingPackage) {
        await updatePackage(editingPackage, processedPackage);
        toast({
          title: 'Success',
          description: 'Package updated successfully!'
        });
      } else {
        await addPackage(processedPackage);
        toast({
          title: 'Success',
          description: 'Package added successfully!'
        });
      }
      onPackageSubmitted();
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsSubmitting(false);
    }
  };
  const addArrayItem = (field: keyof Pick<TravelPackage, 'tags' | 'images' | 'inclusions' | 'exclusions'>) => {
    setInitialPackage(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  const updateArrayItem = (field: keyof Pick<TravelPackage, 'tags' | 'images' | 'inclusions' | 'exclusions'>, index: number, value: string) => {
    setInitialPackage(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };
  const removeArrayItem = (field: keyof Pick<TravelPackage, 'tags' | 'images' | 'inclusions' | 'exclusions'>, index: number) => {
    setInitialPackage(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };
  const addItineraryDay = () => {
    setInitialPackage(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, {
        day: `Day ${prev.itinerary.length + 1}`,
        title: '',
        description: ''
      }]
    }));
  };
  const updateItineraryDay = (index: number, field: keyof TravelPackage['itinerary'][0], value: string | number) => {
    setInitialPackage(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => i === index ? {
        ...item,
        [field]: value
      } : item)
    }));
  };
  const handleImageUpload = (index: number, imageUrl: string) => {
    updateArrayItem('images', index, imageUrl);

    // Propagate to related packages if tags are set
    if (initialPackage.tags.length > 0) {
      propagateImageToRelatedPackages(imageUrl, initialPackage.tags);
    }
  };
  return <Card>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-lg">{editingPackage ? 'Edit Package' : 'Add New Package'}</span>
          {editingPackage && <Button onClick={onCancelEdit} variant="outline" size="sm" className="w-full sm:w-auto">
              Cancel Edit
            </Button>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title*</Label>
            <Input id="title" value={initialPackage.title} onChange={e => setInitialPackage(prev => ({
            ...prev,
            title: e.target.value
          }))} />
          </div>
          <div>
            <Label htmlFor="destination">Destination*</Label>
            <Input id="destination" value={initialPackage.destination} onChange={e => setInitialPackage(prev => ({
            ...prev,
            destination: e.target.value
          }))} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input id="duration" value={initialPackage.duration} onChange={e => setInitialPackage(prev => ({
            ...prev,
            duration: e.target.value
          }))} />
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select value={initialPackage.currency || 'INR'} onValueChange={(value: string) => setInitialPackage(prev => ({
            ...prev,
            currency: value
          }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50 max-h-[200px] overflow-y-auto">
                {getCurrencyOptions().map(option => 
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Price*</Label>
            <Input id="price" value={initialPackage.price} onChange={e => setInitialPackage(prev => ({
            ...prev,
            price: e.target.value
          }))} />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select value={initialPackage.type} onValueChange={(value: string) => setInitialPackage(prev => ({
            ...prev,
            type: value
          }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                {budgetOptions.map(option => <SelectItem key={option.id} value={option.name}>
                    {option.name}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={initialPackage.description} onChange={e => setInitialPackage(prev => ({
          ...prev,
          description: e.target.value
        }))} rows={3} />
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <input type="checkbox" id="featured" checked={initialPackage.featured} onChange={e => setInitialPackage(prev => ({
            ...prev,
            featured: e.target.checked
          }))} />
            <Label htmlFor="featured">Featured Package</Label>
          </div>
        </div>

        {/* Images Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium flex-shrink-0">
              Images
            </Label>
            <Button type="button" size="sm" onClick={() => addArrayItem('images')} variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Image Slot
            </Button>
          </div>
          {initialPackage.images.map((image, index) => <div key={index} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm bg-gray-100 border border-gray-300 px-2 py-1 rounded">Image {index + 1}</Label>
                {initialPackage.images.length > 1 && <Button type="button" size="sm" onClick={() => removeArrayItem('images', index)} variant="destructive">
                    <X className="h-4 w-4" />
                  </Button>}
              </div>
              <ImageUpload value={image} onChange={url => handleImageUpload(index, url)} onRemove={() => updateArrayItem('images', index, '')} packageTags={initialPackage.tags} onPropagateToRelated={propagateImageToRelatedPackages} />
            </div>)}
        </div>

        {/* Dynamic Arrays */}
        {(['tags', 'inclusions', 'exclusions'] as const).map(field => <div key={field}>
            <div className="flex items-center justify-between mb-2">
              <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Button type="button" size="sm" onClick={() => addArrayItem(field)} variant="outline">
                Add
              </Button>
            </div>
            {initialPackage[field].map((item, index) => <div key={index} className="flex gap-2 mb-2">
                <Input value={item} onChange={e => updateArrayItem(field, index, e.target.value)} placeholder={`Enter ${field.slice(0, -1)}`} />
                <Button type="button" size="sm" onClick={() => removeArrayItem(field, index)} variant="destructive">
                  Remove
                </Button>
              </div>)}
          </div>)}

        {/* Itinerary with text input instead of dropdown */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Itinerary</Label>
            <Button type="button" size="sm" onClick={addItineraryDay} variant="outline">
              Add Day
            </Button>
          </div>
          {initialPackage.itinerary.map((day, index) => <div key={index} className="border p-3 rounded mb-4 bg-white dark:bg-card shadow-sm transition-all duration-300">
              <div className="grid grid-cols-12 gap-2 sm:gap-3 mb-2 items-center">
                <div className="col-span-5 xs:col-span-5 sm:col-span-2">
                  <Input className="w-full" value={typeof day.day === 'string' ? day.day : `Day ${day.day}`} onChange={e => updateItineraryDay(index, "day", e.target.value)} placeholder="Enter label (e.g. Day 1, Week 1)" />
                </div>
                <div className="col-span-7 xs:col-span-7 sm:col-span-10">
                  <Input className="w-full" value={day.title} onChange={e => updateItineraryDay(index, "title", e.target.value)} placeholder="Day title" />
                </div>
              </div>
              <Textarea className="w-full mt-1" value={day.description} onChange={e => updateItineraryDay(index, "description", e.target.value)} placeholder="Day description" rows={2} />
            </div>)}
        </div>

        <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {editingPackage ? 'Updating...' : 'Adding...'}
            </> : editingPackage ? 'Update Package' : 'Add Package'}
        </Button>
      </CardContent>
    </Card>;
};
export default PackageForm;