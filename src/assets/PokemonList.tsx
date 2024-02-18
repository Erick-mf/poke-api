import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

interface PokemonProps {
    name: string;
    url: string;
}

function PokemonList() {
    const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cant, setCant] = useState(9);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon?limit=${cant}`;
        if (!isFetching) {
            setIsFetching(true);
            fetch(URL)
                .then((response) => response.json())
                .then((data) => {
                    setPokemons(data.results);
                    setIsLoading(false);
                    setTimeout(() => setIsFetching(false), 2000);
                });
        }
    }, [cant]);

    if (isLoading) {
        return <div className="m-4 text-xl">Cargando...</div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {pokemons.map((pokemon) => (
                    <div key={pokemon.name}>
                        <PokemonCard name={pokemon.name} url={pokemon.url} />
                    </div>
                ))}
            </div>
            <button
                onClick={() => setCant(cant + 9)}
                disabled={isFetching}
                className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg m-4"
            >
                Cargar más
            </button>
        </>
    );
}

export default PokemonList;
