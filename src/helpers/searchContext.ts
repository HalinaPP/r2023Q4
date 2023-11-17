import { createContext } from 'react';
import { People } from '../types';

export const initialPeople: People = { count: 0, data: [] };
const initialSearchState = { searchTerm: '', results: initialPeople };

const SearchContext = createContext(initialSearchState);

export default SearchContext;
