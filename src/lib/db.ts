import namesData from '../data/names.json';
import titlesData from '../data/titles.json';

interface Name {
  id: number;
  name: string;
  gender: 'male' | 'female';
  type: 'first' | 'last';
  created_at: string;
}

interface Title {
  id: number;
  title: string;
  gender: 'male' | 'female';
  created_at: string;
}

class DatabaseManager {
  private static instance: DatabaseManager;
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'nameGeneratorDB';
  private readonly DB_VERSION = 1;

  private constructor() {
    this.init();
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  private init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        this.db = request.result;
        this.checkAndPopulateData().then(resolve).catch(reject);
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create names store with indexes
        const namesStore = db.createObjectStore('names', { keyPath: 'id' });
        namesStore.createIndex('gender', 'gender', { unique: false });
        namesStore.createIndex('type', 'type', { unique: false });

        // Create titles store with indexes
        const titlesStore = db.createObjectStore('titles', { keyPath: 'id' });
        titlesStore.createIndex('gender', 'gender', { unique: false });
      };
    });
  }

  private async checkAndPopulateData(): Promise<void> {
    const namesCount = await this.count('names');
    const titlesCount = await this.count('titles');

    if (namesCount === 0) {
      await this.populateStore('names', namesData);
    }

    if (titlesCount === 0) {
      await this.populateStore('titles', titlesData);
    }
  }

  private count(storeName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.count();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private populateStore(storeName: string, data: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      data.forEach(item => {
        store.add({
          ...item,
          created_at: new Date().toISOString()
        });
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  public async query<T>(storeName: string, options: {
    index?: string;
    range?: IDBKeyRange;
    limit?: number;
  } = {}): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = options.index
        ? store.index(options.index).getAll(options.range, options.limit)
        : store.getAll(options.range, options.limit);

      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  }

  public async checkMigrationStatus(): Promise<void> {
    const namesData = await this.query<Name>('names', { index: 'gender_type' });
    const titlesData = await this.query<Title>('titles', { index: 'gender' });

    console.log('\n=== Database Status ===');
    console.log('\nNames Table:');
    console.table(namesData);
    console.log('\nTitles Table:');
    console.table(titlesData);

    // Sample queries to verify data
    const maleName: Name | undefined = (await this.query<Name>('names', { index: 'gender_type', range: IDBKeyRange.only(['male', 'first']) }))[0];

    const femaleName: Name | undefined = (await this.query<Name>('names', { index: 'gender_type', range: IDBKeyRange.only(['female', 'first']) }))[0];

    const lastName: Name | undefined = (await this.query<Name>('names', { range: IDBKeyRange.only('last') }))[0];

    const femaleTitle: Title | undefined = (await this.query<Title>('titles', { index: 'gender', range: IDBKeyRange.only('female') }))[0];

    console.log('\nSample Data:');
    console.log('- Male first name:', maleName);
    console.log('- Female first name:', femaleName);
    console.log('- Last name:', lastName);
    console.log('- Title:', femaleTitle);
  }

  public async getNames(filter?: Partial<Name>): Promise<Name[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['names'], 'readonly');
      const store = transaction.objectStore('names');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const names = request.result;
        const filteredNames = filter 
          ? names.filter(name => 
              Object.entries(filter).every(([key, value]) => name[key] === value)
            )
          : names;
        resolve(filteredNames);
      };
    });
  }

  public async getTitles(filter?: Partial<Title>): Promise<Title[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['titles'], 'readonly');
      const store = transaction.objectStore('titles');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const titles = request.result;
        const filteredTitles = filter 
          ? titles.filter(title => 
              Object.entries(filter).every(([key, value]) => title[key] === value)
            )
          : titles;
        resolve(filteredTitles);
      };
    });
  }

  public async getNamesByGender(gender: 'male' | 'female'): Promise<Name[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['names'], 'readonly');
      const store = transaction.objectStore('names');
      const index = store.index('gender');
      const request = index.getAll(gender);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }
}

// Export a singleton instance
export const db = DatabaseManager.getInstance();
