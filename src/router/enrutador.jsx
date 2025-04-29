import Home from "../pages/home/Home"
import Productos from "../pages/productos/Productos"
import Inicio from "../pages/inicio/Inicio"

export let enrutador = [
    {
        path: '/',
        element: <Inicio />
    },
    {
        path: '/home',
        element: <Home />
    }
]