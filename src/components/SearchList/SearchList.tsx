import SearchItem from '../SearchItem/SearchItem';
import { Pokemon } from '../types';

interface Props {
  count: number;
  items: Pokemon[];
}

function SearchList({ count, items }: Props) {
  return (
    <>
      <h1>
        Number of Items is <strong>{count}</strong>
      </h1>
      {items.length && (
        <ul>
          {items.map((item) => {
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
