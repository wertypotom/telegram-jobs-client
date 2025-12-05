'use client';

import { Slider } from '@/shared/ui/slider';

interface ExperienceSliderProps {
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
}

export function ExperienceSlider({ value, onChange }: ExperienceSliderProps) {
  const handleChange = (values: number[]) => {
    onChange({ min: values[0], max: values[1] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm font-medium">
        <span>Required Experience</span>
        <span className="text-brand-green font-semibold">
          {value.min}-{value.max >= 10 ? '10+' : value.max} Years
        </span>
      </div>

      <div className="px-2 pt-2">
        <Slider
          min={0}
          max={10}
          step={1}
          value={[value.min, value.max]}
          onValueChange={handleChange}
          className="w-full"
          aria-label="Experience Range"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-3">
          <span>0 years</span>
          <span>10+ years</span>
        </div>
      </div>
    </div>
  );
}
