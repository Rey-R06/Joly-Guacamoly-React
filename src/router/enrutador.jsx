import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Inicio from "../pages/inicio/Inicio"
import Registrarse from "../pages/registrarse/Registrarse" 
import Productos from "../pages/productos/Productos"
import Carrito from "../pages/carrito/Carrito"

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
    },
    {
        path: '/registrarse',
        element: <Registrarse />
    },
    {
        path: '/productos',
        element: <Productos />
    },
    {
        path: '/carrito',
        element: <Carrito />
    }
]