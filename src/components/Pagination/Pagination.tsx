import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import {createFilledArrayBySize} from '../../helpers/helpers';
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
   const [pagesArr, setPagesArr] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const [searchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState<number>(Number(searchParams.get("page")) ?? firstPage);

  const navigate = useNavigate();

  useEffect(() => {
    const pagesLength = Math.ceil(elementsLength / elementsPerPage);
    setPageCount(pagesLength);
  }, [elementsLength, elementsPerPage]);

  useEffect(() => {
    setCurrPage(Number(searchParams.get('page')) || firstPage);
  }, [searchParams]);

  useEffect(() => {
    setPagesArr( createFilledArrayBySize(pageCount));
  }, [pageCount]);

  const handlePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const page: string = (e.target as HTMLButtonElement).innerHTML;
    searchParams.set('page', page);
    navigate(`/?${searchParams.toString()}`);
  };

  return (
  <div className={styles.pagination}>
      {elementsLength > 0 && (
        <div>
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
      </div>);
}


/**/