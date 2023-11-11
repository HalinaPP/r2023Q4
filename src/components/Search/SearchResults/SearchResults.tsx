import { useContext } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import Card from '../../Card/Card';
import Pagination from '../../Pagination/Pagination';

import { getIdFromUrl } from '../../../helpers/helpers';
import SearchContext from '../../../helpers/context';

import styles from './SearchResults.module.css';

function SearchResults() {
  const { results } = useContext(SearchContext);
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <div className={styles.resultsInfo}>
        Number of Items is <span>{results.count}</span>
      </div>
      {results.data.length && (
        <div className={styles.cardList}>
          {results.data.map((item) => {
            const id = getIdFromUrl(item.url);

            return (
              <NavLink
                key={id}
                to={`/details/${id}?${searchParams.toString()}`}
              >
                <Card item={item} />
              </NavLink>
            );
          })}
        </div>
      )}
      <Pagination elementsLength={results.count} />
    </div>
  );
}

export default SearchResults;
