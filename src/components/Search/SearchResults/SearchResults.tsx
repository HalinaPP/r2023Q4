import { useCallback, useContext } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import Card from '../../Card/Card';
import Pagination from '../../Pagination/Pagination';

import { getIdFromUrl } from '../../../helpers/helpers';
import SearchContext from '../../../helpers/context';

import styles from './SearchResults.module.css';

function SearchResults() {
   const { results:{count, data} } = useContext(SearchContext);
   const [searchParams] = useSearchParams();

  
  const showCardList = useCallback(()=>
    (data.map((item) => {
      const id = getIdFromUrl(item.url);

      return (
        <NavLink
          key={id}
          to={`/details/${id}?${searchParams.toString()}`}
        >
          <Card item={item} />
        </NavLink>
      );
    })), [data,searchParams])


  return (
    <div className={styles.container}>
      <h1>Results</h1>
      {data.length > 0 ? (
        <>
          <div className={styles.resultsInfo}>
            Number of Items is <span>{count}</span>
          </div>
          <div className={styles.cardList}>
            { showCardList()}
          </div>
          <Pagination elementsLength={count} />
        </>
      ) : (
        <div>Items not found</div>
      )}
    </div>
  );
}

export default SearchResults;

/*
 
      */