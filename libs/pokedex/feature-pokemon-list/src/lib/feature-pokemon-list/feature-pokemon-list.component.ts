import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListStore } from '../store/pokemon-list.store';

@Component({
  selector: 'lib-feature-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-pokemon-list.component.html',
  providers: [PokemonListStore]
})
export class FeaturePokemonListComponent {
  readonly store = inject(PokemonListStore)

  constructor() {
    this.store.getPokemons();
  }
}
