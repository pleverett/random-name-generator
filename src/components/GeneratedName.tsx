import React from 'react';

interface GeneratedNameProps {
  name: string;
}

const GeneratedName: React.FC<GeneratedNameProps> = ({ name }) => {
  if (!name) return null;

  // Split the name into parts (name and title)
  const [fullName, title] = name.split(',').map(part => part.trim());

  return (
    <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-purple-500/20 shadow-inner shadow-purple-900/20">
      <p className="text-sm text-purple-300/80 mb-2">Your Mystical Identity:</p>
      <p className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-200 to-blue-200 mb-2">
        {fullName}
      </p>
      <p className="text-lg italic text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-purple-200">
        {title}
      </p>
    </div>
  );
};

export default GeneratedName;