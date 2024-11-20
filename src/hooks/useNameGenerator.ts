import { useState } from 'react';
import { generateFullName } from '../services/nameService';

type Gender = 'male' | 'female';

const useNameGenerator = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateName = async (gender: Gender): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);
      return await generateFullName(gender);
    } catch (err) {
      console.error('Error generating name:', err);
      setError('Error generating name');
      return 'Error generating name';
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateName,
    error,
    isLoading,
  };
};

export default useNameGenerator;