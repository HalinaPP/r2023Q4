import { PeopleInfo, People, Person } from '../types';
import { apiUrl } from '../constants';

const getPeople = async (
  query: string | undefined = undefined,
  page: string | undefined = undefined
): Promise<People | undefined> => {
  let searchUrl = `${apiUrl}/?`;

  if (query) {
    searchUrl = `${searchUrl}search=${query}&`;
  }

  if (page) {
    searchUrl = `${searchUrl}page=${page}`;
  }

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
