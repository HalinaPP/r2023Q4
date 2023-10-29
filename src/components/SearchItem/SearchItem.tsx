import { Pokemon } from '../types';

function SearchItem({ item }: { item: Pokemon }) {
  return (
    <>
      <div>
        <span>Name: </span>
        {item.name}
      </div>
      <div>
        <span>Link: </span>
        {item.url}
      </div>
    </>
  );
}

export default SearchItem;
