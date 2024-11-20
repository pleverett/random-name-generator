import React from 'react';
import { UserRound, Users } from 'lucide-react';

type Gender = 'male' | 'female';

interface GenderSelectorProps {
  selectedGender: Gender;
  onGenderSelect: (gender: Gender) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({
  selectedGender,
  onGenderSelect,
}) => {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onGenderSelect('female')}
        className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
          selectedGender === 'female'
            ? 'bg-purple-900/80 text-purple-100 shadow-lg shadow-purple-900/50 border border-purple-500/50'
            : 'bg-slate-700/50 text-purple-300 hover:bg-slate-600/50 border border-purple-800/30'
        }`}
      >
        <UserRound size={20} />
        Female
      </button>
      <button
        onClick={() => onGenderSelect('male')}
        className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
          selectedGender === 'male'
            ? 'bg-indigo-900/80 text-indigo-100 shadow-lg shadow-indigo-900/50 border border-indigo-500/50'
            : 'bg-slate-700/50 text-purple-300 hover:bg-slate-600/50 border border-purple-800/30'
        }`}
      >
        <Users size={20} />
        Male
      </button>
    </div>
  );
};

export default GenderSelector;