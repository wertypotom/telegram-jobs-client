'use client';

import { Check } from 'lucide-react';
import { Label } from '@/shared/ui/label';

const LOCATION_TYPES = ['on-site', 'remote', 'hybrid'];

interface LocationSectionProps {
  filters: {
    locationType: string[];
  };
  onChange: (filters: any) => void;
}

export function LocationSection({ filters, onChange }: LocationSectionProps) {
  const handleLocationChange = (locationType: string, checked: boolean) => {
    const currentTypes = filters.locationType || [];
    const updated = checked
      ? [...currentTypes, locationType]
      : currentTypes.filter((t) => t !== locationType);
    onChange({ ...filters, locationType: updated });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <Label className="font-semibold text-sm text-gray-800 mb-3 block">Work Location Type</Label>
      <div className="grid grid-cols-2 gap-3">
        {LOCATION_TYPES.map((type) => (
          <label
            key={type}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
              filters.locationType?.includes(type)
                ? 'bg-cyan-50/30 border-cyan-100'
                : 'bg-white border-gray-100 hover:bg-gray-50'
            }`}
          >
            <div
              className={`w-5 h-5 rounded flex items-center justify-center mr-3 transition-colors ${
                filters.locationType?.includes(type) ? 'bg-cyan-500' : 'border border-gray-300'
              }`}
              onClick={() => handleLocationChange(type, !filters.locationType?.includes(type))}
            >
              {filters.locationType?.includes(type) && <Check size={14} className="text-white" />}
            </div>
            <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
