'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';
import { Label } from '@/shared/ui/label';
import { useSearchSkills } from '@/shared/hooks/use-jobs';
import { useTranslation } from 'react-i18next';

interface TechStackInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export function TechStackInput({ skills, onChange }: TechStackInputProps) {
  const { t } = useTranslation('dashboard');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Use React Query hook for search
  const { data: searchResults = [], isLoading } = useSearchSkills(debouncedQuery, isSearching);

  // Reset highlighted index when results change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchResults]);

  // Focus input when entering search mode
  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  const handleAddClick = () => {
    setIsSearching(true);
    setSearchQuery('');
  };

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      onChange([...skills, skill]);
    }
    setIsSearching(false);
    setSearchQuery('');
  };

  const handleRemove = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearching(false);
      setSearchQuery('');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault();
      handleAddSkill(searchResults[highlightedIndex]);
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (resultsRef.current) {
      const highlightedElement = resultsRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <Label className="font-semibold text-base text-gray-900">{t('filters.skill')}</Label>
        {skills.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1.5 font-medium"
          >
            <Trash2 size={16} />
            {t('filters.clearAll')}
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

      {/* Add Button or Search Input */}
      {!isSearching ? (
        <button
          onClick={handleAddClick}
          className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <Plus size={18} />
          {t('filters.add')}
        </button>
      ) : (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              // Delay to allow click on results
              setTimeout(() => {
                setIsSearching(false);
                setSearchQuery('');
              }, 200);
            }}
            placeholder={t('filters.searchSkills')}
            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div
              ref={resultsRef}
              className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {searchResults.map((skill, index) => (
                <div
                  key={skill}
                  onClick={() => handleAddSkill(skill)}
                  className={`p-3 cursor-pointer text-sm transition-colors ${
                    index === highlightedIndex
                      ? 'bg-cyan-50 text-cyan-900'
                      : 'hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="absolute right-3 top-3 text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-3">{t('filters.searchSkillsDesc')}</p>
    </div>
  );
}
