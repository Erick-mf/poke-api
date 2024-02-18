import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { NavLink } from "react-router-dom"

function Header() {
    const LOGO = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    const [isLogged, setIsLogged] = useState(false)
    const [name, setName] = useState("")

    const handleLogout = () => {
        const auth = getAuth()
        auth.signOut()
        setIsLogged(false)
        localStorage.removeItem("user")
    }

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                const name = user.displayName
                setIsLogged(true)
                setName(name)
                localStorage.setItem("user", JSON.stringify({ isLogged: true, name }))
            } else {
                setIsLogged(false)
            }
        });

        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const { isLogged, name } = JSON.parse(storedUser)
            setIsLogged(isLogged)
            setName(name)
        }
    }, [])

    if (isLogged) {
        return (
            <div className="flex flex-row justify-between items-center m-4 w-full border-b-2 border-purple-200 p-2">
                <NavLink to="/">
                    <img src={LOGO} alt="" className="w-40 h-17" />
                </NavLink>
                <div>
                    <NavLink to="/private">
                        <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 min-[430px]:mx-4 rounded-lg">
                            Jugar
                        </button>
                    </NavLink>
                    <NavLink to="/">
                        <button onClick={handleLogout} className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 min-[430px]:mx-4 rounded-lg">
                            {name} - cerrar sesión
                        </button>
                    </NavLink>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-row justify-between items-center m-4 w-full border-b-2 border-purple-200 p-2">
            <NavLink to="/">
                <img src={LOGO} alt="" className="w-40 h-17" />
            </NavLink>
            <NavLink to="/login">
                <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 min-[430px]:mx-4 rounded-lg">
                    Iniciar sesión
                </button>
            </NavLink>
        </div>
    )
}
export default Header
