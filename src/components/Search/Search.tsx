import React from 'react';
import SearchList from '../SearchList/SearchList';
import { Pokemon, PokemonsInfo } from '../types';
import SearchForm from '../SearchForm/SearchForm';

const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20';

interface State {
  count: number;
  pokemons: Pokemon[];
}
interface Props {}

export default class Search extends React.Component<Props, State> {
  state: State = { count: 0, pokemons: {} as Pokemon };

  async componentDidMount(): Promise<void> {
    const pokemonsRes = await fetch(pokemonApiUrl);

    if (pokemonsRes.ok) {
      const pokemonsInfo: PokemonsInfo = await pokemonsRes.json();

      this.setState({
        pokemons: pokemonsInfo.results,
        count: pokemonsInfo.count,
      });
    } else {
      throw new Error(`Ошибка HTTP: ${pokemonsRes.status}`);
    }
  }

  componentWillUnmount(): void {}

  render() {
    const { count, pokemons } = this.state;
    return (
      <>
        <SearchForm />
        <SearchList count={count} items={pokemons} />
      </>
    );
  }
}
