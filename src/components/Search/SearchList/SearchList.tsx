import SearchItem from '../SearchItem/SearchItem';
import { ApiResults } from '../../types';
import styles from './SearchList.module.css';
import { getIdFromUrl } from '../../../helpers/helpers';

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
            const index = getIdFromUrl(item.url);

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
