export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonsInfo {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
