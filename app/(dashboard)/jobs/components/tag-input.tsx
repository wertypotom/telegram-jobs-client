'use client';

import { X } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';

interface TagInputProps {
  label: string;
  description: string;
  placeholder: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (index: number) => void;
  variant?: 'default' | 'warning' | 'danger';
}

export function TagInput({
  label,
  description,
  placeholder,
  tags,
  onAdd,
  onRemove,
  variant = 'default',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const variantStyles = {
    default: {
      label: 'text-gray-800',
      chip: 'bg-gray-100 text-gray-700',
      button: 'bg-gray-500 hover:bg-gray-600',
    },
    warning: {
      label: 'text-orange-600',
      chip: 'bg-orange-100 text-orange-700',
      button: 'bg-orange-500 hover:bg-orange-600',
    },
    danger: {
      label: 'text-red-600',
      chip: 'bg-red-100 text-red-700',
      button: 'bg-red-500 hover:bg-red-600',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="mb-8">
      <label className={`font-semibold text-sm ${styles.label} mb-2 block`}>{label}</label>
      <p className="text-xs text-gray-500 mb-3">{description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className={`flex items-center ${styles.chip} px-3 py-1.5 rounded-md text-sm font-medium`}
            >
              {tag}
              <button onClick={() => onRemove(idx)} className="ml-2 hover:opacity-70">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-gray-100 border-none flex-1"
        />
        <Button type="button" onClick={handleAdd} className={`${styles.button} text-white`}>
          Add
        </Button>
      </div>
    </div>
  );
}
