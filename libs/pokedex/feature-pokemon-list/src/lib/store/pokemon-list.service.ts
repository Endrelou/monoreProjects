import { inject, Injectable } from '@angular/core';
import * as _ from 'lodash'
import { ApiPokemon, Pokemon, PokemonStats } from '../model/pokemon-list.model';
import { catchError, map, Observable, of, pipe, startWith, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  private http = inject(HttpClient)
  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<any>(
        `https://pokebuildapi.fr/api/v1/pokemon/limit/10`)
      .pipe(
        tap((data) => JSON.stringify(data)),
        map((data): Pokemon[] =>
           _.map(data, function(pokemon: ApiPokemon): Pokemon {
             return {
                  id: pokemon.id,
                  name: pokemon.name,
                  types: pokemon.apiTypes,
                  stats: pokemon.stats,
                  generation: pokemon.apiGeneration
                }
              }
            )
        )
      )
  }
}
