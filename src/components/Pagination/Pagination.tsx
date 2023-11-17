import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { createFilledArrayBySize, getPageNumber } from '../../helpers/helpers';
import { perPageOptions } from '../../constants';

import styles from './Pagintion.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { changeElementsPerPage } from '../../store/reducers/search.slice';

interface Props {
  elementsLength: number;
}

const firstPage = 1;

export default function Pagination({ elementsLength }: Props) {
  const [pagesArr, setPagesArr] = useState<number[]>([]);

  const [searchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState<number>(
    Number(searchParams.get('page')) ?? firstPage
  );
  const { elementsPerPage } = useAppSelector((state) => state.searchReaducer);
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();

  useEffect(() => {
    const pagesLength = getPageNumber(elementsLength, elementsPerPage);
    setPagesArr(createFilledArrayBySize(pagesLength));
  }, [elementsLength, elementsPerPage]);

  useEffect(() => {
    setCurrPage(Number(searchParams.get('page')) || firstPage);
  }, [searchParams]);

  const changeLimitParam = (limit: string) => {
    searchParams.set('limit', limit);
    searchParams.delete('page');

    navigate(`/?${searchParams.toString()}`);
  };

  const handlePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const page: string = (e.target as HTMLButtonElement).innerHTML;
    searchParams.set('page', page);

    navigate(`/?${searchParams.toString()}`);
  };

  const handlePerPage = (e: ChangeEvent) => {
    e.preventDefault();

    const selectEvent = e.target as HTMLSelectElement;
    const newElementsPerPage = selectEvent.value;

    changeLimitParam(newElementsPerPage);

    dispatch(changeElementsPerPage(Number(newElementsPerPage)));
  };

  return (
    <div className={styles.pagination}>
      {elementsLength > 0 && (
        <>
          <div data-testid="pages" className={styles.pages}>
            {pagesArr.map((page) => (
              <button
                key={page}
                type="button"
                className={currPage === page ? styles.active : undefined}
                onClick={handlePage}
              >
                {page}
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="perPage" className={styles.perPage}>
              items per page:
              <select
                id="perPage"
                onChange={handlePerPage}
                defaultValue={elementsPerPage}
              >
                {perPageOptions.map((optionValue) => (
                  <option key={optionValue} value={optionValue}>
                    {optionValue}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </>
      )}
    </div>
  );
}
