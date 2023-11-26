import { apiLimitOnPage } from '../constants';

export const cleanInputData = (searchTerm: string): string => searchTerm.trim();

export const getIdFromUrl = (url: string = ''): string => {
  const urlChunks = url.split('/');
  return urlChunks[urlChunks.length - 2];
};

export const startApiPageNumber = (currPage: number, itemsPerPage: number) =>
  ((currPage - 1) * itemsPerPage) / apiLimitOnPage + 1;

export const numberOfGettingApiPages = (itemsPerPage: number) =>
  itemsPerPage / apiLimitOnPage;

export const createFilledArrayBySize = (size: number): number[] => {
  const pages: number[] = [];

  for (let i = 1; i <= size; i += 1) {
    pages.push(i);
  }

  return pages;
};

export const getPageNumber = (
  elementsLength: number,
  elementsPerPage: number
) => Math.ceil(elementsLength / elementsPerPage);

export const getInitialSearchTerm = () =>
  localStorage.getItem('searchTerm') || '';
