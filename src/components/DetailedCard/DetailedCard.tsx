import { useLoaderData, useNavigate } from 'react-router-dom';
import { Person } from '../../types';
import styles from './DetailedCard.module.css';

export default function DetailedCard() {
  const person = useLoaderData() as Person;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <section>
      <div className={styles.card}>
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
          <span>Birth_year: </span>
          {person.birth_year}
        </div>
        <div>
          <span>Gender: </span>
          {person.gender}
        </div>
      </div>
    </section>
  );
}
