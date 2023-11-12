import {
  LoaderFunction,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../../types';
import { getPersonById } from '../../services/Wapi.service';
import styles from './DetailedCard.module.css';

export default function DetailedCard() {
  const person = useLoaderData() as Person;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <section>
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
    </section>
  );
}

export const detailedCardLoader: LoaderFunction = async ({
  params: { id },
}) => {
  const typedId = id as unknown as string;
  let person;

  if (typedId) {
    person = await getPersonById(typedId);
  }

  return person;
};
