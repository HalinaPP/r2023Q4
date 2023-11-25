import { PeopleInfo, People, Person } from '../types';
import { apiUrl, apiLimitOnPage, firstPage } from '../constants';
import {
  startApiPageNumber,
  numberOfGettingApiPages,
} from '../helpers/helpers';

const getApiPagesCount = (count: number): number =>
  Math.ceil(count / apiLimitOnPage);

const fetchResults = async (url: string): Promise<PeopleInfo> => {
  const searchRes = await fetch(url);
  return searchRes.json();
};

const getPeople = async (
  currPage: number = firstPage,
  itemsPerPage: number = apiLimitOnPage,
  query: string | undefined = undefined
): Promise<People | undefined> => {
  let searchUrl = `${apiUrl}/?`;

  if (query) {
    searchUrl = `${searchUrl}search=${query}&`;
  }

  const { count } = await fetchResults(searchUrl);
  const apiPagesCount = getApiPagesCount(count);

  try {
    const startPage = startApiPageNumber(currPage, itemsPerPage);
    const endPage = startPage - 1 + numberOfGettingApiPages(itemsPerPage);
    const searchInfoArrPromises = [];

    for (let i = startPage; i <= endPage && i <= apiPagesCount; i += 1) {
      const url = `${searchUrl}page=${i}`;
      const searchInfo = fetchResults(url);
      searchInfoArrPromises.push(searchInfo);
    }

    const searchInfoArr = await Promise.allSettled(searchInfoArrPromises);

    const resultsFromPages = searchInfoArr
      .filter(({ status }) => status === 'fulfilled')
      .map((item) => (item as PromiseFulfilledResult<PeopleInfo>).value.results)
      .flat();

    return {
      count,
      data: resultsFromPages,
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
