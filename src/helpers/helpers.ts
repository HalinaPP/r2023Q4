export const cleanInputData = (searchTerm: string): string => searchTerm.trim();

export const getIdFromUrl = (url: string): string => url.slice(-3, -1);
