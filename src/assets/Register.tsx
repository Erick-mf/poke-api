import { useState } from "react";
import { RegisterWithEmail } from "../firebase/firebase";

function Register(): JSX.Element {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await RegisterWithEmail(name, email, password);
    }
    return (
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl ">Registrarse</h1>

                <div className="relative flex items-center mt-8">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </span>

                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-purple-400  focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Nombre" />
                </div>
                <div className="relative flex items-center mt-8">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </span>

                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-purple-400  focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Correo electrónico" />
                </div>

                <div className="relative flex items-center mt-4">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </span>

                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-purple-400 dark:focus:border-purple-300 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Constraseña" />
                </div>

                <div className="mt-6">
                    <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-500 rounded-lg hover:bg-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-50">
                        Registrar Cuenta
                    </button>
                </div>
            </form >
        </div >
    )

}

export default Register
