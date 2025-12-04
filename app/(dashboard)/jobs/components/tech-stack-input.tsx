'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Label } from '@/shared/ui/label';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { TECH_SKILLS } from '@/shared/constants/tech-skills';

interface TechStackInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export function TechStackInput({ skills, onChange }: TechStackInputProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (skill: string) => {
    if (!skills.includes(skill)) {
      onChange([...skills, skill]);
    }
    setOpen(false);
  };

  const handleRemove = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const availableSkills = TECH_SKILLS.filter((skill) => !skills.includes(skill));

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <Label className="font-semibold text-base text-gray-900">Skill</Label>
        {skills.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1.5 font-medium"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            Clear All
          </button>
        )}
      </div>

      {/* Selected Skills */}
      <div className="space-y-2 mb-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
              <span className="text-sm font-medium text-gray-900">{skill}</span>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Skill Combobox */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white hover:bg-gray-50 border-gray-200 h-11"
          >
            <span className="text-gray-500 text-sm font-normal">Search and select skills...</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search skills..." className="h-9" />
            <CommandList>
              <CommandEmpty>No skill found.</CommandEmpty>
              <CommandGroup>
                {availableSkills.map((skill) => (
                  <CommandItem
                    key={skill}
                    value={skill}
                    onSelect={() => handleSelect(skill)}
                    className="cursor-pointer"
                  >
                    {skill}
                    <Check
                      className={`ml-auto h-4 w-4 ${
                        skills.includes(skill) ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <p className="text-xs text-gray-500 mt-3">Search and select from popular tech skills</p>
    </div>
  );
}
