import { useState, useEffect } from "react";

interface currentPokemon {
    name: string;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
}

function PokemonGame() {
    const [data, setData] = useState<currentPokemon | null>(null);
    const [start, setStart] = useState(false);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState("");
    const [isSurrendered, setIsSurrendered] = useState(false);
    const [revealedPokemon, setRevealedPokemon] = useState("");

    useEffect(() => {
        if (start) {
            const fetchPokemon = async () => {
                try {
                    const random = Math.floor(Math.random() * 913) + 1;
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
                    const pokemonData = await response.json();
                    setData(pokemonData);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchPokemon();
        }
    }, [start]);

    const handleAnswer = (answer: string) => {
        if (answer.toLowerCase() === data?.name.toLowerCase()) {
            setScore(score + 1);
            setStart(false);
            setTimeout(() => setStart(true), 3000);
        }
    };

    useEffect(() => {
        if (isSurrendered) {
            setStart(false);
            setTimeout(() => setStart(true), 3000);

            setIsSurrendered(false);
            setRevealedPokemon(data?.name || "");
        }
    }, [isSurrendered]);

    if (start && data) {
        return (
            <>
                <div className="flex justify-center items-center flex-col w-full">
                    <img src={data.sprites.other["official-artwork"].front_default} alt="" className="w-[40%]" />
                    <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Escribe el nombre del pokemon" className="w-[50%] border border-gray-300 rounded-lg p-2" />
                    <button onClick={handleAnswer(answer)}>Enviar</button>
                    <div className="text-blue-500 font-bold">Puntaje: {score}</div>
                    <button onClick={() => setIsSurrendered(true)} className="inline-flex my-5 items-center px-3 py-2 text-base font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300">Rendirse</button>
                </div>
            </>
        );
    } else if (revealedPokemon) {
        return (
            <div className="flex justify-center items-center flex-col w-full">
                <h1 className="text-3xl font-bold mt-4">Te rendiste. El Pokémon era: {revealedPokemon}</h1>
            </div>
        );
    } else {
        return (
            <>
                <button onClick={() => setStart(true)} className="inline-flex my-5 items-center px-3 py-2 text-base font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-purple-300">
                    Empezar juego
                </button>
            </>
        );
    }
}

export default PokemonGame;
