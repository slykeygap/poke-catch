import React, { useMemo, useState } from 'react';
import PokeList from './PokeList';
import { Pagination } from './Pagination';

const TOTAL_POKEMON = 151;
const POKEMON_PER_PAGE = 5;

const Pokedex = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(TOTAL_POKEMON / POKEMON_PER_PAGE);

  const pageIds = useMemo(() => {
    const start = (page - 1) * POKEMON_PER_PAGE + 1;
    return Array.from({ length: POKEMON_PER_PAGE }, (_, i) => start + i)
                 .filter(id => id <= TOTAL_POKEMON);
  }, [page]);

  return (
    <div className="relative z-10 h-[100%] w-full bg-white rounded-[15px] border-[7px] border-black/10 flex flex-col justify-between items-center p-3 my-2">
      <div className='bg-red-300 rounded-[30px] shadow-[4px_5px_1px_-2px_#00000035] px-10 py-2 m-2'>
        <span className='text-4xl text-white'>Pokedex</span>
      </div>

      <div className='w-full flex justify-center'>
        <PokeList isShinyList={false} listIds={pageIds} />
      </div>

      <div className='w-full'>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
};

export default Pokedex;
