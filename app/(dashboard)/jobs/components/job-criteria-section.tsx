'use client';

import { Check } from 'lucide-react';
import { Label } from '@/shared/ui/label';
import { TechStackInput } from './tech-stack-input';
import { JobFunctionInput } from './job-function-input';
import { ExperienceSlider } from './experience-slider';

const LEVELS = ['Junior', 'Middle', 'Senior', 'Lead', 'Principal'];

interface JobCriteriaSectionProps {
  filters: {
    jobFunction: string[];
    level: string[];
    stack: string[];
    experienceYears?: { min: number; max: number };
  };
  onChange: (filters: any) => void;
}

import { useTranslation } from 'react-i18next';

export function JobCriteriaSection({ filters, onChange }: JobCriteriaSectionProps) {
  const { t } = useTranslation('dashboard');

  const handleLevelToggle = (level: string) => {
    const currentLevels = filters.level || [];
    const isSelected = currentLevels.includes(level);

    const newLevels = isSelected
      ? currentLevels.filter((l) => l !== level)
      : [...currentLevels, level];

    onChange({ ...filters, level: newLevels });
  };

  return (
    <div className="space-y-4">
      {/* Job Function Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <JobFunctionInput
          jobFunctions={filters.jobFunction || []}
          onChange={(jobFunctions) => onChange({ ...filters, jobFunction: jobFunctions })}
        />
      </div>

      {/* Level Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <Label className="text-base font-semibold text-gray-800 mb-3 block">
          {t('filters.seniorityLevel')}
        </Label>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((level) => {
            const isSelected = (filters.level || []).includes(level);
            return (
              <button
                key={level}
                onClick={() => handleLevelToggle(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-green text-black shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isSelected && <Check className="inline h-4 w-4 mr-1" />}
                {level}
              </button>
            );
          })}
        </div>
      </div>

      {/* Experience Range Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <ExperienceSlider
          value={filters.experienceYears || { min: 0, max: 10 }}
          onChange={(value) => onChange({ ...filters, experienceYears: value })}
        />
      </div>

      {/* Tech Stack Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <TechStackInput
          skills={filters.stack || []}
          onChange={(skills) => onChange({ ...filters, stack: skills })}
        />
      </div>
    </div>
  );
}
