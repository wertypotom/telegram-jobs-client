'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import { useSaveFilters } from '../hooks/use-preferences';
import { CategorySidebar } from './category-sidebar';
import { SimpleTagInput } from './simple-tag-input';
import { JobCriteriaSection } from './job-criteria-section';
import { LocationSection } from './location-section';
import { useTranslation } from 'react-i18next';

interface FiltersPanelProps {
  open: boolean;
  onClose: () => void;
  filters: {
    jobFunction: string[];
    level: string[];
    stack: string[];
    excludedTitles: string[];
    muteKeywords: string[];
    locationType: string[];
    experienceYears?: { min: number; max: number };
  };
  onFiltersChange: (filters: any) => void;
}

export function FiltersPanel({ open, onClose, filters, onFiltersChange }: FiltersPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [selectedCategoryId, setSelectedCategoryId] = useState('JOB_CRITERIA');
  const { t } = useTranslation('dashboard');

  // Sync local state when drawer opens
  useEffect(() => {
    if (open) {
      setLocalFilters(filters);
    }
  }, [open, filters]);

  const categories = [
    {
      id: 'JOB_CRITERIA',
      name: t('filters.categories.jobCriteria'),
      subtext: t('filters.categories.jobCriteriaSubtext'),
    },
    {
      id: 'LOCATION_WORK_MODE',
      name: t('filters.categories.locationWorkMode'),
      subtext: t('filters.categories.locationWorkModeSubtext'),
    },
    {
      id: 'EXCLUSIONS',
      name: t('filters.categories.exclusions'),
      subtext: t('filters.categories.exclusionsSubtext'),
    },
  ];

  const handleClearAll = () => {
    setLocalFilters({
      jobFunction: [],
      level: [],
      stack: [],
      locationType: [],
      excludedTitles: [],
      muteKeywords: [],
    });
  };

  const { mutate: saveFilters } = useSaveFilters();

  const handleUpdate = () => {
    // Save to backend
    saveFilters(localFilters);
    // Update parent state
    onFiltersChange(localFilters);
    onClose();
  };

  const activeFilterCount =
    (localFilters.jobFunction?.length || 0) +
    (localFilters.level?.length || 0) +
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
            <h2 className="text-xl font-bold">{t('filters.title')}</h2>
            {activeFilterCount > 0 && (
              <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <Button
            onClick={handleUpdate}
            className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-1 px-3 rounded-md text-xs"
          >
            {t('buttons.update', { ns: 'common' })}
          </Button>
        </div>

        {/* Mobile Category Tabs */}
        <div className="md:hidden flex overflow-x-auto border-b bg-gray-50/50 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`flex-none px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedCategoryId === cat.id
                  ? 'border-cyan-500 text-cyan-600 bg-cyan-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          {/* Left Sidebar - Desktop Only */}
          <div className="hidden md:block w-64 border-r bg-white">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
              activeFilterCount={activeFilterCount}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Right Content */}
          <div className="flex-1 w-full overflow-y-auto bg-gray-50/80 p-4 md:p-8">
            {selectedCategoryId === 'JOB_CRITERIA' && (
              <JobCriteriaSection filters={localFilters} onChange={setLocalFilters} />
            )}

            {selectedCategoryId === 'LOCATION_WORK_MODE' && (
              <LocationSection filters={localFilters} onChange={setLocalFilters} />
            )}

            {selectedCategoryId === 'EXCLUSIONS' && (
              <div className="space-y-4">
                {/* Mute Keywords Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <SimpleTagInput
                    label={t('filters.muteKeywords')}
                    description={t('filters.muteKeywordsDesc')}
                    placeholder={t('filters.muteKeywordsPlaceholder')}
                    tags={localFilters.muteKeywords || []}
                    onChange={(keywords: string[]) =>
                      setLocalFilters({
                        ...localFilters,
                        muteKeywords: keywords,
                      })
                    }
                  />
                </div>

                {/* Excluded Titles Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <SimpleTagInput
                    label={t('filters.excludedTitles')}
                    description={t('filters.excludedTitlesDesc')}
                    placeholder={t('filters.excludedTitlesPlaceholder')}
                    tags={localFilters.excludedTitles || []}
                    onChange={(titles: string[]) =>
                      setLocalFilters({
                        ...localFilters,
                        excludedTitles: titles,
                      })
                    }
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
