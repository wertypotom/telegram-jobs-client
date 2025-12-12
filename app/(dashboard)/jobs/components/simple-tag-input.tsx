'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { Label } from '@/shared/ui/label';

import { useTranslation } from 'react-i18next';

interface SimpleTagInputProps {
  label: string;
  description: string;
  placeholder: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function SimpleTagInput({
  label,
  description,
  tags,
  placeholder,
  onChange,
}: SimpleTagInputProps) {
  const { t } = useTranslation('dashboard');
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when entering add mode
  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleAddClick = () => {
    setIsAdding(true);
    setInputValue('');
  };

  const handleAddTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      onChange([...tags, trimmedValue]);
    }
    setIsAdding(false);
    setInputValue('');
  };

  const handleRemove = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setInputValue('');
    }
  };

  const handleBlur = () => {
    // Save on blur if there's content
    if (inputValue.trim()) {
      handleAddTag();
    } else {
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <Label className="font-semibold text-base text-gray-900">{label}</Label>
      </div>

      {/* Selected Tags */}
      <div className="space-y-2 mb-3">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
              <span className="text-sm font-medium text-gray-900">{tag}</span>
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

      {/* Add Button or Input */}
      {!isAdding ? (
        <button
          onClick={handleAddClick}
          className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <Plus size={18} />
          {t('filters.add')}
        </button>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      )}

      <p className="text-xs text-gray-500 mt-3">{description}</p>
    </div>
  );
}
