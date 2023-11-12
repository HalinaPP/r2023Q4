import { People, Person } from '../types';

export const searchResultsMock: People = {
  count: 10,
  data: [
    {
      birth_year: '19BBY',
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      eye_color: 'blue',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      gender: 'male',
      hair_color: 'blond',
      height: 172,
      homeworld: 'https://swapi.dev/api/planets/1/',
      mass: 77,
      name: 'Luke Skywalker',
      skin_color: 'fair',
      species: [],
      starships: [
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/22/',
      ],
      url: 'https://swapi.dev/api/people/1/',
      vehicles: [
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/30/',
      ],
    },
    {
      birth_year: '58BBY',
      created: '2014-12-20T16:45:53.668000Z',
      edited: '2014-12-20T21:17:50.455000Z',
      eye_color: 'blue',
      films: [
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      gender: 'female',
      hair_color: 'black',
      height: 170,
      homeworld: 'https://swapi.dev/api/planets/51/',
      mass: 56.2,
      name: 'Luminara Unduli',
      skin_color: 'yellow',
      species: ['https://swapi.dev/api/species/29/'],
      starships: [],
      url: 'https://swapi.dev/api/people/64/',
      vehicles: [],
    },
  ],
};

export const personMock: Person = {
  birth_year: '19BBY',
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  eye_color: 'blue',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/6/',
  ],
  gender: 'male',
  hair_color: 'blond',
  height: 172,
  homeworld: 'https://swapi.dev/api/planets/1/',
  mass: 77,
  name: 'Luke Skywalker',
  skin_color: 'fair',
  species: [],
  starships: [
    'https://swapi.dev/api/starships/12/',
    'https://swapi.dev/api/starships/22/',
  ],
  url: 'https://swapi.dev/api/people/1/',
  vehicles: [
    'https://swapi.dev/api/vehicles/14/',
    'https://swapi.dev/api/vehicles/30/',
  ],
};

export const queryMock = 'lu';

export const currDetailedCardID = 1;
