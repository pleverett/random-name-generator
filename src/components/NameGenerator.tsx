import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWandSparkles, FaCopy } from 'react-icons/fa6';
import GenderSelector from './GenderSelector';
import GeneratedName from './GeneratedName';
import useNameGenerator from '../hooks/useNameGenerator';

type Gender = 'male' | 'female';

const NameGenerator = () => {
  const [gender, setGender] = useState<Gender>('female');
  const [generatedName, setGeneratedName] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const { generateName, isLoading, error } = useNameGenerator();

  const handleGenerateName = async () => {
    const name = await generateName(gender);
    setGeneratedName(name);
  };

  const handleCopyName = (copyType: 'full' | 'short') => {
    if (generatedName) {
      const textToCopy = copyType === 'full' 
        ? generatedName 
        : generatedName.split(' ').filter((_, i, arr) => i === 0 || i === arr.length - 1).join(' ');
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4">
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
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20 p-8 w-full max-w-md">
          <div className="text-center text-purple-300">
            <p>Loading name lists...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20 p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-blue-300 mb-2 flex items-center justify-center gap-2">
            <FaWandSparkles className="text-purple-300" />
            Mystical Name Generator
          </h1>
          <p className="text-purple-300/80">Discover your destined name</p>
        </div>

        <GenderSelector selectedGender={gender} onGenderSelect={setGender} />

        <motion.button
          onClick={handleGenerateName}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-linear-to-r from-indigo-900 to-purple-900 text-purple-100 py-3 px-6 rounded-lg font-semibold 
          shadow-lg shadow-purple-900/50 hover:shadow-purple-700/50 hover:from-indigo-800 hover:to-purple-800 
          border border-purple-700/50 transition-all duration-200 mb-6 relative overflow-hidden
          after:absolute after:inset-0 after:bg-linear-to-r after:from-purple-400/10 after:to-transparent 
          hover:after:opacity-0 after:transition-opacity"
        >
          Generate Name
        </motion.button>

        <AnimatePresence mode="wait">
          {generatedName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative"
            >
              <GeneratedName name={generatedName} />
              <div className="absolute right-0 top-0 flex gap-2">
                <motion.button
                  onClick={() => handleCopyName('full')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-purple-300 hover:text-purple-200 p-2"
                  title="Copy full name with title"
                >
                  <FaCopy />
                </motion.button>
                <motion.button
                  onClick={() => handleCopyName('short')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-purple-300 hover:text-purple-200 p-2"
                  title="Copy full name only"
                >
                  <FaCopy className="scale-90" />
                </motion.button>
              </div>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 top-10 text-sm text-green-400"
                >
                  Copied!
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default NameGenerator;