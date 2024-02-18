import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PrivateRoute({ children }: any) {
    const [isLogged, setIsLogged] = useState(false)
    const location = useLocation();

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setIsLogged(true)
            } else {
                const path = location.pathname
                const redirect = `/login?redirect=${path}`
                window.location.replace(redirect)
            }
        })
    })
    return isLogged ? children : null
}

export default PrivateRoute
