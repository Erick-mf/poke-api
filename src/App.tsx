import { Route, Routes } from "react-router-dom"
import PokemonList from "./assets/PokemonList"
import PokemonDetails from "./assets/PokemonDetails"
import Register from "./assets/Register"
import Login from "./assets/Login"
import Header from "./assets/Header"
import PrivateRoute from "./assets/PrivateRoute"
import PokemonGame from "./assets/PokemonGame"

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/details/:name" element={<PokemonDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/private" element={<PrivateRoute children={<PokemonGame />} />} />
            </Routes>
        </>
    )
}

export default App
