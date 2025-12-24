'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { JobFilters } from '../api/jobs.api';

interface FilterChipsProps {
  filters: JobFilters;
  onEditClick: () => void;
}

export function FilterChips({ filters, onEditClick }: FilterChipsProps) {
  const { t } = useTranslation('dashboard');

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Job Function Chips */}
      {(filters.jobFunction || []).map((func) => (
        <div
          key={func}
          className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
        >
          <span>{func}</span>
        </div>
      ))}

      {/* Level Chips */}
      {(filters.level || []).map((l) => (
        <div
          key={l}
          className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
        >
          <span>Level: {l}</span>
        </div>
      ))}

      {/* Stack Chips */}
      {(filters.stack || []).map((s) => (
        <div
          key={s}
          className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
        >
          <span>
            {t('filters.chips.tech')}: {s}
          </span>
        </div>
      ))}

      {/* Location Type Chips */}
      {(filters.locationType || []).map((locType) => (
        <div
          key={locType}
          className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
        >
          <span>
            {t('filters.chips.location')}: {locType}
          </span>
        </div>
      ))}

      {/* Excluded Titles Chips */}
      {(filters.excludedTitles || []).map((title) => (
        <div
          key={title}
          className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
        >
          <span>
            {t('filters.chips.excluded')}: {title}
          </span>
        </div>
      ))}

      {/* Mute Keywords Chips */}
      {(filters.muteKeywords || []).map((k) => (
        <div
          key={k}
          className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
        >
          <span>
            {t('filters.chips.muted')}: {k}
          </span>
        </div>
      ))}

      {/* Experience Years Chip */}
      {filters.experienceYears &&
        (filters.experienceYears.min !== 0 || filters.experienceYears.max !== 10) && (
          <div className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap">
            <span>
              {filters.experienceYears.min}-
              {filters.experienceYears.max >= 10 ? '10+' : filters.experienceYears.max}{' '}
              {t('filters.years')}
            </span>
          </div>
        )}

      {/* Edit Filters Button */}
      <button
        onClick={onEditClick}
        className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-2 ml-2 transition-colors"
      >
        <SlidersHorizontal size={16} />
        {t('page.editFilters')}
      </button>
    </div>
  );
}
