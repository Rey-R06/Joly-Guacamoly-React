import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Inicio from "../pages/inicio/Inicio"

export let enrutador = [
    {
        path: '/',
        element: <Inicio />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    }
]