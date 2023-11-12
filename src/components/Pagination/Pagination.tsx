import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { createFilledArrayBySize, getPageNumber } from '../../helpers/helpers';
import { perPageOptions } from '../../constants';

import styles from './Pagintion.module.css';

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
  const [elementsPerPage, setElementsPerPage] = useState<number>(
    Number(searchParams.get('limit')) || perPageOptions[0]
  );

  const navigate = useNavigate();

  useEffect(() => {
    const pagesLength = getPageNumber(elementsLength, elementsPerPage);
    setPagesArr(createFilledArrayBySize(pagesLength));
  }, [elementsLength, elementsPerPage]);

  useEffect(() => {
    setCurrPage(Number(searchParams.get('page')) || firstPage);
    setElementsPerPage(Number(searchParams.get('limit')) || perPageOptions[0]);
  }, [searchParams]);

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

    searchParams.set('limit', newElementsPerPage);
    searchParams.delete('page');
    navigate(`/?${searchParams.toString()}`);
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
