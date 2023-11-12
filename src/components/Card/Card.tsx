import { Person } from '../../types';
import styles from './Card.module.css';

function Card({ item }: { item: Person }) {
  return (
    <div className={styles.card}>
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

export default Card;
