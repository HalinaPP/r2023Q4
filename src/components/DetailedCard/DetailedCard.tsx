import { useRouter } from 'next/router';

import { useGetPersonByIdQuery } from '../../store/services/SearchService';

import styles from './DetailedCard.module.css';
import { Person } from '../../types';
import Spinner from '../Spinner/Spinner';
import { useAppSelector } from '../../store/hooks/redux';

export default function DetailedCard() {
  const router = useRouter();
  const { loadingStatus } = useAppSelector((state) => state.personReducer);

  const { isFetching, data } = useGetPersonByIdQuery(router.query.id as string);
  const person = data as Person;

  const handleClose = () => {
    delete router.query.id;
    router.replace({
      pathname: '/',
      query: { ...router.query },
    });
  };

  return (
    <section>
      {loadingStatus === 'loading' || isFetching ? (
        <Spinner />
      ) : (
        <div data-testid="detailedCard" className={styles.card}>
          <button type="button" onClick={handleClose}>
            Close
          </button>
          <h1>{person.name}</h1>
          <div>
            <span>Height: </span>
            {person.height}
          </div>
          <div>
            <span>Mass: </span>
            {person.mass}
          </div>
          <div>
            <span>Birth year: </span>
            {person.birth_year}
          </div>
          <div>
            <span>Gender: </span>
            {person.gender}
          </div>
          <div>
            <span>Skin color: </span>
            {person.skin_color}
          </div>
          <div>
            <span>Hair color: </span>
            {person.hair_color}
          </div>
          <div>
            <span>url: </span>
            {person.url}
          </div>
        </div>
      )
      }
    </section>
  );
}
