import { Outlet, useNavigation } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

export default function Main() {
  const { state } = useNavigation();

  return <main> {state === 'loading' ? <Spinner /> : <Outlet />}</main>;
}
