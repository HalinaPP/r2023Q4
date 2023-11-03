import { Link } from 'react-router-dom';

import Card from '../../Card/Card';
import { People } from '../../../types';
import { getIdFromUrl } from '../../../helpers/helpers';

import styles from './SearchResults.module.css';
import Pagination from '../../Pagination/Pagination';

interface Props {
  results: People;
}

function SearchResults({ results }: Props) {
  const { count, data } = results;
  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <div className={styles.resultsInfo}>
        Number of Items is <span>{count}</span>
      </div>
      {data.length && (
        <>
          <div className={styles.cardList}>
            {data.map((item) => {
              const id = getIdFromUrl(item.url);

              return (
                <Link key={id} to={`/details/${id}`}>
                  <Card item={item} />
                </Link>
              );
            })}
          </div>
          <Pagination elementsLength={count} />
        </>
      )}
    </div>
  );
}

export default SearchResults;
