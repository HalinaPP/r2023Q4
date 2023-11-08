import { PeopleInfo, People, Person } from '../types';
import { apiUrl, apiLimitOnPage } from '../constants';
import {
  startApiPageNumber,
  numberOfGettingApiPages,
} from '../helpers/helpers';

const getPeople = async (
  query: string | undefined = undefined,
  currPage: number,
  itemsPerPage: number
): Promise<People | undefined> => {
  let searchUrl = `${apiUrl}/?`;

  if (query) {
    searchUrl = `${searchUrl}search=${query}&`;
  }

  try {
    const results = [];

    if (currPage) {
      let page = startApiPageNumber(currPage, itemsPerPage);

      const lastPage = page - 1 + numberOfGettingApiPages(itemsPerPage);

      let count = 0;
      let pageCount = lastPage;

      for (let i = page; i <= lastPage && i <= pageCount; i += 1) {
        const url = `${searchUrl}page=${i}`;

        const searchRes = await fetch(url);
        const searchInfo: PeopleInfo = await searchRes.json();

        count = searchInfo.count;
        pageCount = Math.ceil(count / apiLimitOnPage);

        results.push(...searchInfo.results);
      }

      return {
        count,
        data: results,
      };
    } else {
      const searchRes = await fetch(searchUrl);

      const searchInfo: PeopleInfo = await searchRes.json();

      return {
        count: searchInfo.count,
        data: searchInfo.results,
      };
    }
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
