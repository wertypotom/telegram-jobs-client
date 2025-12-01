import { Card, CardHeader, CardTitle, CardContent, Input, Button } from '@/shared/ui';
import { Search } from 'lucide-react';

interface JobFiltersProps {
  filters: {
    stack?: string;
    level?: string;
    isRemote?: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

export function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Tech Stack</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="e.g., React, Node.js"
              value={filters.stack || ''}
              onChange={(e) => onFiltersChange({ ...filters, stack: e.target.value, offset: 0 })}
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Level</label>
          <select
            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            value={filters.level || ''}
            onChange={(e) => onFiltersChange({ ...filters, level: e.target.value, offset: 0 })}
          >
            <option value="">All Levels</option>
            <option value="junior">Junior</option>
            <option value="middle">Middle</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Remote</label>
          <select
            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            value={filters.isRemote === undefined ? '' : filters.isRemote.toString()}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                isRemote: e.target.value === '' ? undefined : e.target.value === 'true',
                offset: 0,
              })
            }
          >
            <option value="">All</option>
            <option value="true">Remote Only</option>
            <option value="false">On-site Only</option>
          </select>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => onFiltersChange({ stack: '', level: '', isRemote: undefined, offset: 0 })}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}
