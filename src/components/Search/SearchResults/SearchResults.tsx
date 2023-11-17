import { useCallback } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import Card from '../../Card/Card';
import Pagination from '../../Pagination/Pagination';

import { getIdFromUrl } from '../../../helpers/helpers';
import styles from './SearchResults.module.css';
import { People } from '../../../types';

interface Props {
  results: People;
}

function SearchResults({ results }: Props) {
  const [searchParams] = useSearchParams();
  const { count, data } = results;

  const showCardList = useCallback(
    () =>
      data.map((item) => {
        const id = getIdFromUrl(item.url);

        return (
          <NavLink key={id} to={`/details/${id}?${searchParams.toString()}`}>
            <Card item={item} />
          </NavLink>
        );
      }),
    [data, searchParams]
  );

  return (
    <div className={styles.container}>
      <h1>Results</h1>
      {data && data.length > 0 ? (
        <>
          <div className={styles.resultsInfo}>
            Number of Items is <span>{count}</span>
          </div>
          <div data-testid="cardList" className={styles.cardList}>
            {showCardList()}
          </div>
          <Pagination elementsLength={count} />
        </>
      ) : (
        <div>Items not found</div>
      )}
    </div>
  );
}

export default SearchResults;
