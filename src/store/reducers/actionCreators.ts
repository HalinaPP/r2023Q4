/* import { getPeople } from '../../services/Wapi.service';
import { People } from '../../types';
import { AppDispatch } from '../store';
import {
  searchFetching,
  searchFetchingSuccess,
  searchFetchingError,
} from './search.slice';

const fetchPeople =
  (currPage: number, itemsPerPage: number, query: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(searchFetching());

      const peopleInfo: People | undefined = await getPeople(
        currPage,
        itemsPerPage,
        query
      );

      dispatch(searchFetchingSuccess(peopleInfo));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(searchFetchingError(e.message));
      }
    }
  };

export default fetchPeople;
*/
