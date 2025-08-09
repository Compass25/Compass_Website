import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTravelContext } from '@/contexts/TravelContext';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Plus } from 'lucide-react';
const BudgetManager: React.FC = () => {
  const {
    budgetOptions,
    addBudgetOption,
    updateBudgetOption,
    deleteBudgetOption
  } = useTravelContext();
  const {
    toast
  } = useToast();
  const [newBudgetName, setNewBudgetName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const handleAddBudget = async () => {
    if (!newBudgetName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a budget option name',
        variant: 'destructive'
      });
      return;
    }
    try {
      await addBudgetOption(newBudgetName.trim());
      setNewBudgetName('');
      toast({
        title: 'Success',
        description: 'Budget option added successfully!'
      });
    } catch (error) {
      // Error is handled in the context
    }
  };
  const handleUpdateBudget = async (id: string) => {
    if (!editingName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a budget option name',
        variant: 'destructive'
      });
      return;
    }
    try {
      await updateBudgetOption(id, editingName.trim());
      setEditingId(null);
      setEditingName('');
      toast({
        title: 'Success',
        description: 'Budget option updated successfully!'
      });
    } catch (error) {
      // Error is handled in the context
    }
  };
  const handleDeleteBudget = async (id: string) => {
    try {
      await deleteBudgetOption(id);
      toast({
        title: 'Success',
        description: 'Budget option deleted successfully!'
      });
    } catch (error) {
      // Error is handled in the context
    }
  };
  const startEditing = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };
  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };
  return <Card>
      <CardHeader>
        <CardTitle className="text-xl">Manage Budget Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Budget Option */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="newBudget" className="my-0 py-[8px]">Add New Budget Option

          </Label>
            <div className="flex gap-2">
              <Input id="newBudget" value={newBudgetName} onChange={e => setNewBudgetName(e.target.value)} placeholder="Enter budget option name" onKeyPress={e => {
              if (e.key === 'Enter') {
                handleAddBudget();
              }
            }} />
              <Button onClick={handleAddBudget} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Existing Budget Options */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold">Existing Budget Options</h3>
          {budgetOptions.length === 0 ? <p className="text-gray-500">No budget options available.</p> : <div className="space-y-2">
              {budgetOptions.map(option => <div key={option.id} className="flex items-center justify-between p-3 border rounded-lg">
                  {editingId === option.id ? <div className="flex items-center gap-2 flex-1">
                      <Input value={editingName} onChange={e => setEditingName(e.target.value)} onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleUpdateBudget(option.id);
                }
                if (e.key === 'Escape') {
                  cancelEditing();
                }
              }} autoFocus />
                      <Button onClick={() => handleUpdateBudget(option.id)} size="sm" className="bg-green-500 hover:bg-green-600">
                        Save
                      </Button>
                      <Button onClick={cancelEditing} size="sm" variant="outline">
                        Cancel
                      </Button>
                    </div> : <>
                      <span className="font-medium">{option.name}</span>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => startEditing(option.id, option.name)} size="sm" variant="outline" className="flex items-center gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteBudget(option.id)} size="sm" variant="destructive" className="flex items-center gap-1">
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </>}
                </div>)}
            </div>}
        </div>
      </CardContent>
    </Card>;
};
export default BudgetManager;