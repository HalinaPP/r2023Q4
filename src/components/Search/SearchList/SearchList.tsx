import SearchItem from '../SearchItem/SearchItem';
import { ApiResults } from '../../types';

interface Props {
  results: ApiResults;
}

function SearchList({ results }: Props) {
  const { count, data } = results;
  return (
    <>
      <h1>
        Number of Items is <strong>{count}</strong>
      </h1>
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
    </>
  );
}

export default SearchList;
