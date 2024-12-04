import { createClient } from '@supabase/supabase-js';
import type { Gender, NameType } from '../services/nameService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

interface Name {
  id: number;
  name: string;
  gender: Gender;
  type: NameType;
  created_at: string;
}

interface Title {
  id: number;
  title: string;
  gender: Gender;
  created_at: string;
}

export class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async getNames({ gender, type }: { gender: Gender; type: NameType }): Promise<Name[]> {
    const { data, error } = await supabase
      .from('names')
      .select('*')
      .eq('gender', gender)
      .eq('type', type);

    if (error) {
      console.error('Error fetching names:', error);
      throw error;
    }

    return data || [];
  }

  async getTitles({ gender }: { gender: Gender }): Promise<Title[]> {
    const { data, error } = await supabase
      .from('titles')
      .select('*')
      .eq('gender', gender);

    if (error) {
      console.error('Error fetching titles:', error);
      throw error;
    }

    return data || [];
  }
}

// Export a singleton instance
export const db = Database.getInstance();
