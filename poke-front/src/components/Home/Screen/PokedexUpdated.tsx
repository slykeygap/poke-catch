import React from "react";
import type { Pokemon } from "../../../models/Pokemon";
import { motion } from "framer-motion";
import playIcon from "../../../assets/playIcon.png";
import { getRarityColor } from "../../../utils/rareColors";

const PokedexUpdated = ({
  pokemon,
  retry,
}: {
  pokemon: Pokemon;
  retry: () => void;
}) => {
  return (
    <>
      <div className="flex justify-center items-center flex-1 relative">
        <div className="  rounded-[15px] border-[3px] border-black/10 px-2 py-1 text-black/70 absolute z-1 top-2 left-2"
            style={{ background: getRarityColor(pokemon.rarity)}}
        >
            {pokemon.rarity}
        </div> 
        <motion.img
          key={pokemon.id}
          src={pokemon.isShiny ? pokemon.animatedShinySprite : pokemon.animatedSprite}
          alt={pokemon.name}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{
            scale: 1,
            rotate: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 120, damping: 10 },
          }}
          className={`w-52 h-52 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] ${
            pokemon.isShiny ? "animate-pulse" : ""
          }`}
          onError={(e) => {
            e.currentTarget.src = pokemon.isShiny ? pokemon.shinySprite : pokemon.sprite;
          }}
        />
      </div>

      <div className="bg-white border-[10px] border-double border-black/70 text-center py-5 px-4">
        <div className="flex flex-col items-center gap-3">
          <span className="text-base lg:text-lg">
            Pokédex updated! You just discovered a{" "}
            <b
              className={`uppercase font-bold ${
                pokemon.isShiny
                  ? "text-yellow-400 drop-shadow-lg"
                  : "text-blue-500"
              }`}
            >
              {pokemon.isShiny ? "Shiny " : ""}
              {pokemon.name}
            </b>
            !
          </span>

          <button
            onClick={retry}
            className="continueButton flex items-center justify-center text-3xl px-4 py-2 mt-2 bg-yellow-400 hover:bg-yellow-300 rounded-xl font-bold shadow-lg transition-colors"
          >
            CONTINUE
            <img src={playIcon} alt="" className="ml-3 w-5 opacity-70" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PokedexUpdated;
