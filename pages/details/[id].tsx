import { InferGetServerSidePropsType } from 'next';
import { searchAPI } from '../../src/store/services/SearchService';
import { wrapper } from '../../src/store/store';
import Home, { getServerSideProps as indexGetServerSideProps } from '../index';
import { DetailIdProps } from '../../src/types';

function Person(
  props: InferGetServerSidePropsType<typeof getServerSideProps> & DetailIdProps
) {
  return Home(props);
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.query;
    const indexProps = await indexGetServerSideProps(context);

    store.dispatch(searchAPI.endpoints.getPersonById.initiate(id as string));
    await Promise.all(store.dispatch(searchAPI.util.getRunningQueriesThunk()));

    return {
      props: {
        ...indexProps,
        detailedId: id as string,
      },
    };
  }
);

export default Person;
