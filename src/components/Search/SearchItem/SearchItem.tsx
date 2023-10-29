import { ApiData } from '../../types';

function SearchItem({ item }: { item: ApiData }) {
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
