import React from 'react';
import { X } from 'lucide-react';

interface SkillTagProps {
  skill: string;
  onRemove?: () => void;
  variant?: 'offered' | 'wanted' | 'default';
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, onRemove, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'offered':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'wanted':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getVariantStyles()}`}>
      {skill}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 p-0.5 rounded-full hover:bg-black/10 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

export default SkillTag;