import { PeopleInfo, People, Person } from '../types';
import { apiUrl } from '../constants';

const getPeople = async (query: string): Promise<People | undefined> => {
  const searchUrl = query ? `${apiUrl}/?search=${query}` : apiUrl;

  try {
    const searchRes = await fetch(searchUrl);

    const searchInfo: PeopleInfo = await searchRes.json();

    return {
      count: searchInfo.count,
      data: searchInfo.results,
    };
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Ошибка HTTP: ${error.message}`);
    return undefined;
  }
};

const getPersonById = async (id: string): Promise<Person | undefined> => {
  try {
    const searchRes = await fetch(`${apiUrl}/${id}`);
    const person: Person = await searchRes.json();

    return person;
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Ошибка HTTP: ${error.message}`);
    return undefined;
  }
};

export { getPeople, getPersonById };
