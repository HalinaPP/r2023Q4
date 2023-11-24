import { delay, http, HttpResponse } from 'msw';
import { searchResultsMock } from '../People.mock';

const handlers = [
  http.get(
    '/',
    async () => {
      await delay(150);
      return HttpResponse.json(searchResultsMock, { headers: {}, status: 200 });
    }
  ),
];

export default handlers;
