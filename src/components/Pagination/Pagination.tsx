import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagintion.module.css';

interface Props {
  elementsLength: number;
}
const firstPage = 1;

export default function Pagination({ elementsLength }: Props) {
  const [pageCount, setPageCount] = useState(0);
  const elementsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState<number>(firstPage);
  const [pagesArr, setPagesArr] = useState<number[]>([]);

  useEffect(() => {
    const pagesLength = Math.ceil(elementsLength / elementsPerPage);
    setPageCount(pagesLength);
  }, [elementsLength]);

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
    setSearchParams({ page });
  };

  return (
    <div>
      Pages:
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
    </div>
  );
}
