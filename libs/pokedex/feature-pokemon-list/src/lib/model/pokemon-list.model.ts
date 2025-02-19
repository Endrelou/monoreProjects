export type Pokemon = {
  id: string
  name: string
  image: string
  types: string[]
  stats: PokemonStats
  generation: number
}

export type ApiPokemon = {
  id: string
  name: string
  image: string
  apiTypes: string[]
  stats: PokemonStats
  apiGeneration: number
}

export type PokemonStats = {
  attack: number,
  defense: number,
  special_attack: number,
  special_defense: number,
  speed: number
}

