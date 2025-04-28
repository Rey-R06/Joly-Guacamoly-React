import Home from "../pages/home/Home"
import Productos from "../pages/productos/Productos"

export let enrutador = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/productos',
        element: <Productos />
    }
]