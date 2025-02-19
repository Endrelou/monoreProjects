import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListStore } from '../store/pokemon-list.store';

@Component({
  selector: 'lib-feature-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-pokemon-list.component.html',
  providers: [PokemonListStore],
  styles: ['.list-pokemon { padding-top: 50vh; }']
})
export class FeaturePokemonListComponent {
  readonly store = inject(PokemonListStore)

  currentIndex = 0; // Index de la carte courante
  previousScrollPosition = 0;

  // Méthode pour vérifier si une carte est courante
  isCurrentPokemon(index: number): boolean {
    return index === this.currentIndex;
  }

  // Écouteur d'événement pour le défilement
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const container = document.querySelector('.container');
    console.log(event)
    if (container) {
      if (this.currentIndex > 0)
        this.currentIndex--
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const container = document.querySelector('.container');
    if (container) {
      this.currentIndex++
    }
  }

  scrollToPrevious() {
    const container = document.querySelector('.container');
    if (container) {
      container.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      if (this.currentIndex > 0)
        this.currentIndex--
    }
  }

  scrollToNext() {
    const container = document.querySelector('.container');
    if (container) {
      container.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      this.currentIndex++
    }
  }

  constructor() {
    this.store.getPokemons();
  }
}
