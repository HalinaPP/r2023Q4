import SearchItem from '../SearchItem/SearchItem';
import { ApiResults } from '../../types';
import styles from './SearchList.module.css';

interface Props {
  results: ApiResults;
}

function SearchList({ results }: Props) {
  const { count, data } = results;
  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <div className={styles.resultsInfo}>
        Number of Items is <span>{count}</span>
      </div>
      {data.length && (
        <ul>
          {data.map((item) => {
            const index = item.url.slice(-3, -1);

            return (
              <li key={index}>
                <SearchItem item={item} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchList;
