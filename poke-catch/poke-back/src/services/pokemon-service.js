import fetch from "node-fetch";
import { getRandomRarity } from "../utils/randomRarity.js";
import { getRandomPokemonIdByRarity } from "../utils/getPokemonByRarity.js";

export const fetchRandomPokemon = async () => {
  const rarity = getRandomRarity();
  const id = getRandomPokemonIdByRarity(rarity);

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/3`);
  const data = await res.json();

  const isShiny = Math.random() < 0.0;

  const nameLower = data.name.toLowerCase();

  const animatedSprite = `https://img.pokemondb.net/sprites/black-white/anim/normal/${nameLower}.gif`;
  const animatedShinySprite = `https://img.pokemondb.net/sprites/black-white/anim/shiny/${nameLower}.gif`;

  return {
    id: data.id,
    name: data.name,
    rarity,
    sprite: data.sprites.front_default,
    shinySprite: data.sprites.front_shiny,
    animatedSprite,
    animatedShinySprite,
    height: data.height / 10,
    weight: data.weight / 10,
    isShiny,
    types: data.types.map((t) => t.type.name), 

  };
};
