import { NavLink, useLocation } from "react-router-dom";

interface PokemonDetailsData {
    name: string;
    url: string;
    weight: number;
    height: number;
    base_experience: number;
    abilities: {
        ability: {
            name: string;
        };
    }[];
    types: {
        type: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
}

function PokemonDetails() {
    const { state } = useLocation();
    const pokemonData: PokemonDetailsData = state?.pokemon;

    if (!pokemonData) {
        return <div>No se encontraron datos del pokemon</div>;
    }

    return (
        <>
            <NavLink to="/">
                <button className="inline-flex my-5 items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-purple-300 ">Regresar</button>
            </NavLink>
            <div className="grid grid-cols-2 w-full md:grid-cols-3 shadow-2xl p-5">
                <div className="flex justify-center">
                    <img src={pokemonData.sprites.other["official-artwork"].front_default} alt={pokemonData.name} className="w-[60%]" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mt-4">{pokemonData.name}</h1>
                    <p><span className="font-bold">Tipo: </span>{pokemonData.types.map(t => t.type.name).join(', ')}</p>
                    <p><span className="font-bold">Habilidades: </span>{pokemonData.abilities.map(a => a.ability.name).join(', ')}</p>
                    <p><span className="font-bold">Peso: </span>{pokemonData.weight}</p>
                    <p><span className="font-bold">Altura: </span>{pokemonData.height}</p>
                    <p><span className="font-bold">Experiencia base: </span>{pokemonData.base_experience}</p>
                    <p><span className="font-bold">Estadísticas: </span></p>
                    <ul className="list-disc list-inside ml-4">
                        {pokemonData.stats.map(s => (
                            <li key={s.stat.name}><span className="font-bold">{s.stat.name}: </span>{s.base_stat}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default PokemonDetails;
