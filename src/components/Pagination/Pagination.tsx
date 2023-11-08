import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { perPageOptions } from '../../constants';

import styles from './Pagintion.module.css';

interface Props {
  elementsLength: number;
  elementsPerPage: number;
  handlePerPage: (e: ChangeEvent) => void;
}

const firstPage = 1;

export default function Pagination({
  elementsLength,
  elementsPerPage,
  handlePerPage,
}: Props) {
  const [currPage, setCurrPage] = useState<number>(firstPage);
  const [pagesArr, setPagesArr] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const pagesLength = Math.ceil(elementsLength / elementsPerPage);
    setPageCount(pagesLength);
  }, [elementsLength, elementsPerPage]);

  useEffect(() => {
    setCurrPage(Number(searchParams.get('page')) || firstPage);
  }, [searchParams]);

  useEffect(() => {
    const pages: number[] = [];

    for (let i = 1; i <= pageCount; i += 1) {
      pages.push(i);
    }

    setPagesArr(pages);
  }, [pageCount]);

  const handlePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const page: string = (e.target as HTMLButtonElement).innerHTML;
    searchParams.set('page', page);
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <>
      {elementsLength > 0 && (
        <div className={styles.pagination}>
          <div className={styles.pages}>
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
        </div>
      )}
    </>
  );
}
