
import { useTravelContext } from '@/contexts/TravelContext';
import { useToast } from '@/hooks/use-toast';

export const useImagePropagation = () => {
  const { packages, updatePackage } = useTravelContext();
  const { toast } = useToast();

  const propagateImageToRelatedPackages = async (imageUrl: string, tags: string[]) => {
    try {
      // Find packages that share at least one tag
      const relatedPackages = packages.filter(pkg => 
        pkg.tags.some(tag => tags.includes(tag))
      );

      if (relatedPackages.length === 0) {
        return;
      }

      // Update all related packages with the new image
      const updatePromises = relatedPackages.map(pkg => {
        const updatedImages = pkg.images.length > 0 ? [imageUrl, ...pkg.images.slice(1)] : [imageUrl];
        return updatePackage(pkg.id, { 
          ...pkg,
          images: updatedImages 
        });
      });

      await Promise.all(updatePromises);

      toast({
        title: 'Images Updated',
        description: `Image propagated to ${relatedPackages.length} related package(s) with shared tags.`
      });
    } catch (error) {
      console.error('Error propagating image:', error);
      toast({
        title: 'Propagation Failed',
        description: 'Failed to update related packages. Some updates may have succeeded.',
        variant: 'destructive'
      });
    }
  };

  return { propagateImageToRelatedPackages };
};
