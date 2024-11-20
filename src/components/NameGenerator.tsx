import { useState } from 'react';
import GenderSelector from './GenderSelector';
import GeneratedName from './GeneratedName';
import useNameGenerator from '../hooks/useNameGenerator';

type Gender = 'male' | 'female';

const NameGenerator = () => {
  const [gender, setGender] = useState<Gender>('female');
  const [generatedName, setGeneratedName] = useState<string>('');
  const { generateName, isLoading, error } = useNameGenerator();

  const handleGenerateName = async () => {
    const name = await generateName(gender);
    setGeneratedName(name);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20 p-8 w-full max-w-md">
          <div className="text-center text-red-400">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20 p-8 w-full max-w-md">
          <div className="text-center text-purple-300">
            <p>Loading name lists...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 mb-2">
            Mystical Name Generator
          </h1>
          <p className="text-purple-300/80">Discover your destined name</p>
        </div>

        <GenderSelector selectedGender={gender} onGenderSelect={setGender} />

        <button
          onClick={handleGenerateName}
          className="w-full bg-gradient-to-r from-indigo-900 to-purple-900 text-purple-100 py-3 px-6 rounded-lg font-semibold 
          shadow-lg shadow-purple-900/50 hover:shadow-purple-700/50 hover:from-indigo-800 hover:to-purple-800 
          border border-purple-700/50 transition-all duration-200 mb-6 relative overflow-hidden
          after:absolute after:inset-0 after:bg-gradient-to-r after:from-purple-400/10 after:to-transparent 
          after:hover:opacity-0 after:transition-opacity"
        >
          Generate Name
        </button>

        <GeneratedName name={generatedName} />
      </div>
    </div>
  );
};

export default NameGenerator;