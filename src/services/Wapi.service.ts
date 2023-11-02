import { ApiResultInfo, ApiResults } from '../types';
import { apiUrl } from '../constants';

const getPlanets = async (query: string): Promise<ApiResults | undefined> => {
  const searchUrl = query ? `${apiUrl}/?search=${query}` : apiUrl;

  try {
    const searchRes = await fetch(searchUrl);

    const searchInfo: ApiResultInfo = await searchRes.json();

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

export default getPlanets;
