import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

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

  const searchParams = useSearchParams();
  const router = useRouter();

  const [currPage, setCurrPage] = useState<number>(
    Number(searchParams.get('page')) ?? firstPage
  );
  const { elementsPerPage } = useAppSelector((state) => state.searchReaducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const pagesLength = getPageNumber(elementsLength, elementsPerPage);
    setPagesArr(createFilledArrayBySize(pagesLength));
  }, [elementsLength, elementsPerPage]);

  useEffect(() => {
    setCurrPage(Number(searchParams.get('page')) || firstPage);
  }, [searchParams]);

  const changeLimitParam = (limit: string) => {
    setCurrPage(firstPage);
    delete router.query.id;
    router.push({
      pathname: '/',
      query: { ...router.query, limit, page: firstPage },
    });
  };

  const handlePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const page: string = (e.target as HTMLButtonElement).innerHTML;
    delete router.query.id;
    router.replace({
      pathname: '/',
      query: { ...router.query, page },
    });
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
