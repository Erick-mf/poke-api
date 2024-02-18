import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface PokemonProps {
    name: string;
    url: string;
}

interface PokemonCard {
    name: string;
    url: string;
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
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
}

function PokemonCard({ name, url }: PokemonProps): JSX.Element {
    const [urlData, setUrlData] = useState<PokemonCard | null>(null)

    const navigate = useNavigate()

    const handleDetailsClick = () => {
        navigate(`/details/${name}`, { state: { pokemon: urlData } })
    }

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setUrlData(data)
            })
    }, [url])

    return (
        <>
            {urlData ?
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex justify-center items-center flex-row hover:transform hover:scale-105 hover:shadow-2xl m-2">
                    <img className="rounded-t-lg w-[40%] flex-1" src={urlData.sprites.other["official-artwork"].front_default} alt={name} />
                    <div className="p-5">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 ">{name}</h5>
                        <p className="mb-2 font-normal text-gray-700 "><span className="font-bold">Tipo:</span> {urlData.types.map(t => t.type.name).join(', ')}</p>
                        <p className="mb-3 font-normal text-gray-700 "><span className="font-bold">Habilidades:</span> {urlData.abilities.map(a => a.ability.name).join(', ')}</p>
                        <button onClick={handleDetailsClick} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-purple-300 ">Ver detalles</button>
                    </div>
                </div>
                : null}
        </>
    )
}

export default PokemonCard
