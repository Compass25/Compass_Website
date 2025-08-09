import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTravelContext, TravelPackage } from '@/contexts/TravelContext';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2 } from 'lucide-react';
interface PackageListProps {
  onEditPackage: (pkg: TravelPackage) => void;
}
const PackageList: React.FC<PackageListProps> = ({
  onEditPackage
}) => {
  const {
    packages,
    deletePackage
  } = useTravelContext();
  const {
    toast
  } = useToast();
  const handleDeletePackage = async (id: string) => {
    try {
      await deletePackage(id);
      toast({
        title: 'Success',
        description: 'Package deleted successfully!'
      });
    } catch (error) {
      // Error is handled in the context
    }
  };
  return <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Existing Packages ({packages.length})</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[600px] overflow-y-auto">
        <div className="space-y-4">
          {packages.map(pkg => <div key={pkg.id} className="border rounded-lg p-4">
              <div className="flex flex-col gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg leading-tight">{pkg.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{pkg.destination} - {pkg.price}</p>
                  {pkg.featured && <span className="inline-block text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-2">
                      Featured
                    </span>}
                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">{pkg.description}</p>
                </div>
                
                {pkg.images.length > 0 && pkg.images[0] && <div className="mt-2">
                    <img src={pkg.images[0]} alt={pkg.title} className="w-20 h-20 object-cover rounded" />
                  </div>}
                
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <Button onClick={() => onEditPackage(pkg)} variant="outline" size="sm" className="flex items-center justify-center gap-2 w-full sm:flex-1 min-h-[44px]">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button onClick={() => handleDeletePackage(pkg.id)} variant="destructive" size="sm" className="flex items-center justify-center gap-2 w-full sm:flex-1 min-h-[44px]">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>)}
          {packages.length === 0 && <p className="text-gray-500 text-center py-8">No packages found. Add your first package!</p>}
        </div>
      </CardContent>
    </Card>;
};
export default PackageList;