'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import { CategorySidebar } from './category-sidebar';
import { TagInput } from './tag-input';
import { JobCriteriaSection } from './job-criteria-section';
import { LocationSection } from './location-section';

interface FiltersPanelProps {
  open: boolean;
  onClose: () => void;
  filters: {
    jobFunction: string;
    level: string;
    stack: string[];
    excludedTitles: string[];
    muteKeywords: string[];
    locationType: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export function FiltersPanel({ open, onClose, filters, onFiltersChange }: FiltersPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [selectedCategory, setSelectedCategory] = useState('Job Criteria');

  // Sync local state when drawer opens
  useEffect(() => {
    if (open) {
      setLocalFilters(filters);
    }
  }, [open, filters]);

  const categories = [
    { name: 'Job Criteria', subtext: 'Role, Level, Tech Stack' },
    { name: 'Location & Work Mode', subtext: 'Remote, On-site, Hybrid' },
    { name: 'Exclusions', subtext: 'Mute Keywords, Excluded Titles' },
  ];

  const handleClearAll = () => {
    setLocalFilters({
      jobFunction: '',
      level: '',
      stack: [],
      locationType: [],
      excludedTitles: [],
      muteKeywords: [],
    });
  };

  const handleUpdate = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const activeFilterCount =
    (localFilters.jobFunction ? 1 : 0) +
    (localFilters.level ? 1 : 0) +
    (localFilters.stack?.length || 0) +
    (localFilters.locationType?.length || 0) +
    (localFilters.excludedTitles?.length || 0) +
    (localFilters.muteKeywords?.length || 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 transition-opacity" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-5xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <span className="text-xl font-bold">{'>'}</span>
            </button>
            <h2 className="text-xl font-bold">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <Button
            onClick={handleUpdate}
            className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-1.5 px-4 rounded-md text-sm"
          >
            UPDATE
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            activeFilterCount={activeFilterCount}
            onClearAll={handleClearAll}
          />

          {/* Right Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50/80 p-8">
            {selectedCategory === 'Job Criteria' && (
              <JobCriteriaSection filters={localFilters} onChange={setLocalFilters} />
            )}

            {selectedCategory === 'Location & Work Mode' && (
              <LocationSection filters={localFilters} onChange={setLocalFilters} />
            )}

            {selectedCategory === 'Exclusions' && (
              <div className="space-y-4">
                {/* Mute Keywords Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <TagInput
                    label="Mute Keywords"
                    description='Hide jobs containing these words (e.g. "Gambling", "C++", "Unpaid")'
                    placeholder="Enter keyword to mute..."
                    tags={localFilters.muteKeywords || []}
                    onAdd={(keyword) =>
                      setLocalFilters({
                        ...localFilters,
                        muteKeywords: [...(localFilters.muteKeywords || []), keyword],
                      })
                    }
                    onRemove={(index) =>
                      setLocalFilters({
                        ...localFilters,
                        muteKeywords: (localFilters.muteKeywords || []).filter(
                          (_, i) => i !== index
                        ),
                      })
                    }
                    variant="danger"
                  />
                </div>

                {/* Excluded Titles Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <TagInput
                    label="Excluded Job Titles"
                    description="Hide specific job titles you're not interested in"
                    placeholder="Enter title to exclude..."
                    tags={localFilters.excludedTitles || []}
                    onAdd={(title) =>
                      setLocalFilters({
                        ...localFilters,
                        excludedTitles: [...(localFilters.excludedTitles || []), title],
                      })
                    }
                    onRemove={(index) =>
                      setLocalFilters({
                        ...localFilters,
                        excludedTitles: (localFilters.excludedTitles || []).filter(
                          (_, i) => i !== index
                        ),
                      })
                    }
                    variant="warning"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
