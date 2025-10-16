import specialPB from "../../assets/specialPB.png";
import normalPB from "../../assets/normalPB.png";
import playIcon from "../../assets/playIcon.png";
import questionMark from "../../assets/questionMark.png";
import fail from "../../assets/Fail.webm";
import success from "../../assets/Success.webm";

import "../../css/button.css";
import "../../css/playButton.css";
import "../../css/pokemonFade.css";
import { useState } from "react";
import type { Pokemon } from "../../models/Pokemon";
import { getRandomSearchMessage } from "../../utils/loadingMessages";
import { useUser } from "../../context/userContext";
import Searching from "./Screen/Searching";
import Idle from "./Screen/Idle";
import PokemonShown from "./Screen/PokemonShown";
import Catching from "./Screen/Catching";
import Finished from "./Screen/Finished";
import Question from "../../assets/question.png"
import PokedexUpdated from "./Screen/PokedexUpdated";
import { getTypeColor } from "../../utils/typeColors";
import InfoBubble from "./InfoBubble";
import type { PokemonData, UserData } from "../../models/UserData";
type Phases = "idle" | 'searching' | 'pokemon_shown' | 'catching' | 'finished' | 'updated_pokedex'

const ScreenGame = () => {
  const {user,setUser, setRenderPokedex} = useUser()
  if(!user) return
  const [dummyPokedex, setDummyPokedex] = useState(user.pokedex || {});
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  // // const [sprite, setSprite] = useState<string>(questionMark);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("Searching...");
  const [phase, setPhase] = useState<Phases>("idle");
  const [animation, setAnimation] = useState<string>("");
  const [caught, setCaught] = useState<boolean>(false);
  const [isNewPokemon, setIsNewPokemon] = useState<boolean>(false);

  const nextScreen = async () => {
    if(isNewPokemon){
      setPhase("updated_pokedex")
    }else{
      reset()
    }
  };
  
  const reset = async () => {
    setUser({
      ...user,
      pokedex: dummyPokedex,
    });
    setRenderPokedex(true)
    setIsNewPokemon(false)
    setPokemon(null);
    setPhase('idle')
  };

  const handleCatch = async (bonus: number) => {
  if (!pokemon || !user) return;
  
  try {
    // Pasamos el bonus según la pokebola
    const res = await fetch("http://localhost:3001/api/users/catchPokemon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: user?.uid,
        pokemonId: pokemon.id,
        rarity: pokemon.rarity,
        bonus,
        isShiny: pokemon.isShiny
      }),
    });

    const data = await res.json();
    console.log(data);
    setCaught(data.caught)

    //  actualizar el dummyPokedex
    setDummyPokedex(prev => ({
      ...prev,
      [data.pokemonId]: {
        ...prev[data.pokemonId],
        ...data.updatedEntry,
      },
    }));

    //
    setUser({
      ...user, 
      masterBalls: data.updatedUser.masterBalls,
    });


    if (data.caught) {
      setPhase("catching")
      setAnimation(success)
    } else {
      setPhase("catching")
      setAnimation(fail)
    }

  } catch (err) {
    console.error(err);
    alert("Error en la captura");
    reset()
  }
};

  const play = async () => {
    if(!user) return

    setLoading(true);
    setPhase("searching")
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 2000));

    try {
    const res = await fetch("http://localhost:3001/api/users/searchPok",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        uid: user.uid
      })
    });

    if (!res.ok) throw new Error("Error en la respuesta");
    const data: any = await res.json();
    const pokemon: Pokemon = data.pokemon
    const pokemonData: PokemonData = {
      ...pokemon,               
      variants: data.updatedEntry.variants,
    };

    setDummyPokedex(prev => ({
      ...prev,
      [pokemon.id]: pokemonData,
    }));

    // Actualizamos solo los campos globales del usuario
    setUser({
      ...user,
      dailyCatches: data.dailyCatches,
      // pokedex NO se toca aquí
    });
    setIsNewPokemon(data.isNewPokemon)

      await minDelay;  


      const mainImage = pokemon.isShiny
        ? pokemon.animatedShinySprite || pokemon.shinySprite
        : pokemon.animatedSprite || pokemon.sprite;

      const fallbackImage = pokemon.isShiny ? pokemon.shinySprite : pokemon.sprite;

      // Pre-cargar la imagen principal
      const img = new Image();
      img.src = mainImage;
      img.onload = () => {
        setPokemon(pokemon);
        setLoadingMessage(getRandomSearchMessage());
        setLoading(false);
        setPhase('pokemon_shown');
      };
      img.onerror = () => {
        img.src = fallbackImage;
      };
    } catch (err) {
      console.error("Error al traer pokemon:", err);
      setPokemon(null);
      setLoading(false);
      setPhase('idle')
    }
  };


  return (
    <div
      className="relative z-10 w-full h-[65vh] md:h-[70%] rounded-[15px] border-[7px] border-black/10 flex flex-col justify-between p-3 mt-2 shadow-[0px_11px_0px_-2px_#00000078]"
      style={{ background: getTypeColor(pokemon?.types)}}
    >
    <InfoBubble />
    {
          phase == 'idle' ? (
        <Idle play={play} user={user} />
      ) : phase == 'searching' && loading ? (
        <Searching loadingMessage={loadingMessage} />
      ) : phase == 'pokemon_shown' ? (
        <PokemonShown handleCatch={handleCatch} pokemon={pokemon!} user={user!}/>
      ) : phase == 'catching' ? (
        <Catching animation={animation} setPhase={setPhase}/>
      ) : phase == 'finished' ? (
        <Finished pokemon={pokemon!} caught={caught} nextScreen={nextScreen}/>
      ) : phase == 'updated_pokedex' ? (
        <PokedexUpdated pokemon={pokemon!} retry={reset}/>
      ) : (
        <div>Error... click here to reset</div>
      )
    }
    </div>
  );
};

export default ScreenGame;
