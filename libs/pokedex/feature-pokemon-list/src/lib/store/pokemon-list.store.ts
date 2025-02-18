import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState, WritableStateSource
} from '@ngrx/signals';
import { Pokemon } from '../model/pokemon-list.model';
import { computed, inject, InjectionToken } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { PokemonListService } from './pokemon-list.service';


type PokemonListState = {
  pokemons: Pokemon[]
  filter: { query: string; order: 'asc' | 'desc'}
}

const initialState: PokemonListState = {
  pokemons: [],
  filter: { query: '', order: 'asc' }
}

export const PokemonListStateToken = new InjectionToken<PokemonListState>('PokemonListStateToken', {
  factory: () => (initialState)
});

export const PokemonListStore = signalStore(
  { providedIn: 'root' },
  withState<PokemonListState>(() => inject(PokemonListStateToken)),
  withComputed((store) => ({
    pokemonFirstGen: computed(() => store.pokemons().filter(pokemon => pokemon.generation === 1)),
  })),
  withMethods((store: WritableStateSource<PokemonListState>, pokemonListService = inject(PokemonListService)) =>  ({
      getPokemons: rxMethod<void>(
        pipe(
          switchMap(() => pokemonListService.getPokemons()),
          tap(pokemons => patchState(store , { pokemons }))
        )
      )
    })
  ),
  withDevtools('pokemon-app-store')
);
