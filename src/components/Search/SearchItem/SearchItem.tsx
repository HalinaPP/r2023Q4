import { ApiData } from '../../../types';

function SearchItem({ item }: { item: ApiData }) {
  return (
    <div>
      <div>
        <span>Name: </span>
        {item.name}
      </div>
      <div>
        <span>Height: </span>
        {item.height}
      </div>
      <div>
        <span>Mass: </span>
        {item.mass}
      </div>
      <div>
        <span>Birth_year: </span>
        {item.birth_year}
      </div>
      <div>
        <span>Gender: </span>
        {item.gender}
      </div>
    </div>
  );
}

export default SearchItem;
