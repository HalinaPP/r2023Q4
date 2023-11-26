import { useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Card from '../../Card/Card';
import Pagination from '../../Pagination/Pagination';

import { getIdFromUrl } from '../../../helpers/helpers';
import styles from './SearchResults.module.css';
import { People } from '../../../types';

interface Props {
  data: People;
}

function SearchResults({ data }: Props) {
  const searchParams = useSearchParams();
  const { count, data: results } = data;

  const showCardList = useCallback(
    () =>
      results.map((item) => {
        const id = getIdFromUrl(item.url);

        return (
          <Link key={id} href={`/details/${id}?${searchParams.toString()}`}>
            <Card item={item} />
          </Link>
        );
      }),
    [results, searchParams]
  );

  return (
    <div className={styles.container}>
      <h1>Results</h1>
      {results && results.length > 0 ? (
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
