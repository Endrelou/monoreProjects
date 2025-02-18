import { Component } from '@angular/core';
import { FeaturePokemonListComponent } from '@monoreprojects/feature-pokemon-list';

@Component({
  standalone: true,
  imports: [FeaturePokemonListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pokedex';
}
