import { NavLink, useSearchParams } from 'react-router-dom';

import Card from '../../Card/Card';
import { People } from '../../../types';
import { getIdFromUrl } from '../../../helpers/helpers';

import styles from './SearchResults.module.css';

interface Props {
  results: People;
}

function SearchResults({ results }: Props) {
  const { count, data } = results;
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <div className={styles.resultsInfo}>
        Number of Items is <span>{count}</span>
      </div>
      {data.length && (
          <div className={styles.cardList}>
            {data.map((item) => {
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
    </div>
  );
}

export default SearchResults;
