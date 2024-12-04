import { db } from '../lib/database';

export type Gender = 'male' | 'female';
export type NameType = 'first' | 'last';

export async function getRandomName(gender: Gender, type: NameType): Promise<string> {
  const names = await db.getNames({ gender, type });
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex].name;
}

export async function getRandomTitle(gender: Gender): Promise<string> {
  const titles = await db.getTitles({ gender });
  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex].title;
}

export async function generateFullName(gender: Gender): Promise<string> {
  const firstName = await getRandomName(gender, 'first');
  const lastName = await getRandomName(gender, 'last');
  const title = await getRandomTitle(gender);
  
  return `${firstName} ${lastName}, ${title}`;
}
