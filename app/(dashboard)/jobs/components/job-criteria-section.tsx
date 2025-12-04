'use client';

import { X, Check } from 'lucide-react';
import { Label } from '@/shared/ui/label';
import { TechStackInput } from './tech-stack-input';

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

const LEVELS = ['Junior', 'Middle', 'Senior', 'Lead', 'Principal'];

interface JobCriteriaSectionProps {
  filters: {
    jobFunction: string;
    level: string;
    stack: string[];
  };
  onChange: (filters: any) => void;
}

export function JobCriteriaSection({ filters, onChange }: JobCriteriaSectionProps) {
  const handleJobFunctionChange = (func: string) => {
    onChange({ ...filters, jobFunction: func });
  };

  const handleLevelToggle = (level: string) => {
    onChange({ ...filters, level: filters.level === level ? '' : level });
  };

  return (
    <div className="space-y-4">
      {/* Job Function Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <Label className="font-semibold text-sm text-gray-800 mb-2 block">Job Function</Label>
        <p className="text-xs text-gray-500 mb-3">Select from dropdown for best results</p>

        {filters.jobFunction && (
          <div className="flex items-center bg-emerald-100 text-emerald-900 px-3 py-2 rounded-md text-sm font-medium mb-3 w-fit">
            {filters.jobFunction}
            <button
              onClick={() => handleJobFunctionChange('')}
              className="ml-2 hover:text-emerald-700"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <select
          value={filters.jobFunction}
          onChange={(e) => handleJobFunctionChange(e.target.value)}
          className="w-full bg-gray-50 border border-gray-100 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition-all"
        >
          <option value="">Select job function...</option>
          {JOB_FUNCTIONS.map((func) => (
            <option key={func} value={func}>
              {func}
            </option>
          ))}
        </select>
      </div>

      {/* Seniority Level Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <Label className="font-semibold text-sm text-gray-800 mb-3 block">Seniority Level</Label>
        <div className="grid grid-cols-2 gap-3">
          {LEVELS.map((level) => (
            <label
              key={level}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                filters.level === level
                  ? 'bg-emerald-50/30 border-emerald-100'
                  : 'bg-white border-gray-100 hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center mr-3 transition-colors ${
                  filters.level === level ? 'bg-emerald-500' : 'border border-gray-300'
                }`}
                onClick={() => handleLevelToggle(level)}
              >
                {filters.level === level && <Check size={14} className="text-white" />}
              </div>
              <span className="text-sm font-medium text-gray-700">{level}</span>
            </label>
          ))}
        </div>
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
