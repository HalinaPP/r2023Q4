export const cleanInputData = (searchTerm: string): string => searchTerm.trim();

export const getIdFromUrl = (url: string): string => {
  const urlChunks = url.split('/');
  return urlChunks[urlChunks.length - 2];
};
