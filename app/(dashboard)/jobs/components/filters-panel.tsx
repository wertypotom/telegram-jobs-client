'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { X, Plus } from 'lucide-react';

const JOB_FUNCTIONS = [
  'Frontend Software Engineer',
  'React Developer',
  'UI/UX Developer',
  'Full Stack Engineer',
  'Backend Developer',
  'DevOps Engineer',
  'Mobile Developer',
  'Data Engineer',
  'QA Engineer',
  'Product Manager',
];

interface FiltersPanelProps {
  open: boolean;
  onClose: () => void;
  filters: {
    jobFunction: string;
    excludedTitles: string[];
    locationType: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export function FiltersPanel({ open, onClose, filters, onFiltersChange }: FiltersPanelProps) {
  const [excludedTitles, setExcludedTitles] = useState<string[]>(filters.excludedTitles || []);
  const [newExcludedTitle, setNewExcludedTitle] = useState('');

  const handleJobFunctionChange = (value: string) => {
    onFiltersChange({ ...filters, jobFunction: value });
  };

  const handleAddExcludedTitle = () => {
    if (newExcludedTitle.trim()) {
      const updated = [...excludedTitles, newExcludedTitle.trim()];
      setExcludedTitles(updated);
      onFiltersChange({ ...filters, excludedTitles: updated });
      setNewExcludedTitle('');
    }
  };

  const handleRemoveExcludedTitle = (index: number) => {
    const updated = excludedTitles.filter((_, i) => i !== index);
    setExcludedTitles(updated);
    onFiltersChange({ ...filters, excludedTitles: updated });
  };

  const handleLocationChange = (locationType: string, checked: boolean) => {
    const currentTypes = filters.locationType || [];
    const updated = checked
      ? [...currentTypes, locationType]
      : currentTypes.filter((t) => t !== locationType);
    onFiltersChange({ ...filters, locationType: updated });
  };

  const handleClearAll = () => {
    setExcludedTitles([]);
    onFiltersChange({
      jobFunction: '',
      excludedTitles: [],
      locationType: [],
    });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Filters</SheetTitle>
          <SheetDescription>
            Refine your job search with advanced filters
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Job Function */}
          <div className="space-y-3">
            <Label htmlFor="job-function" className="text-base font-semibold">
              Job Function
            </Label>
            <p className="text-sm text-muted-foreground">
              Select from drop-down for best results
            </p>
            <Select value={filters.jobFunction} onValueChange={handleJobFunctionChange}>
              <SelectTrigger id="job-function">
                <SelectValue placeholder="Select job function..." />
              </SelectTrigger>
              <SelectContent>
                {JOB_FUNCTIONS.map((func) => (
                  <SelectItem key={func} value={func}>
                    {func}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Excluded Titles */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Excluded Titles</Label>
            <p className="text-sm text-muted-foreground">
              Add job titles you want to exclude from results
            </p>
            
            <div className="flex gap-2">
              <Input
                placeholder="Enter job title to exclude..."
                value={newExcludedTitle}
                onChange={(e) => setNewExcludedTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddExcludedTitle();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddExcludedTitle}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {excludedTitles.length > 0 && (
              <div className="space-y-2">
                {excludedTitles.map((title, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <span className="text-sm">{title}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveExcludedTitle(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Location</Label>
            <p className="text-sm text-muted-foreground">
              Select work location preferences
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="on-site"
                  checked={filters.locationType?.includes('on-site')}
                  onCheckedChange={(checked) =>
                    handleLocationChange('on-site', checked as boolean)
                  }
                />
                <label
                  htmlFor="on-site"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  On-site
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remote"
                  checked={filters.locationType?.includes('remote')}
                  onCheckedChange={(checked) =>
                    handleLocationChange('remote', checked as boolean)
                  }
                />
                <label
                  htmlFor="remote"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remote
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hybrid"
                  checked={filters.locationType?.includes('hybrid')}
                  onCheckedChange={(checked) =>
                    handleLocationChange('hybrid', checked as boolean)
                  }
                />
                <label
                  htmlFor="hybrid"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Hybrid
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleClearAll} className="flex-1">
            Clear All
          </Button>
          <Button onClick={onClose} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
