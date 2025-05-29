import Login from "../pages/login/Login"
import RutaProtegida from "../components/RutaProtegida"
import Inicio from "../pages/inicio/Inicio"
import Registrarse from "../pages/registrarse/Registrarse" 
import Productos from "../pages/productos/Productos"
import Carrito from "../pages/carrito/Carrito"
import Joly from "../pages/joly/Joly"
import Recetas from "../pages/recetas/Recetas"
import AdminHome from "../pages/home/AdminHome"
import ClienteHome from "../pages/home/ClienteHome"
import GestionProductos from "../pages/gestionAdmin/gestionProductos/GestionProductos"
import GestionAdmins from "../pages/gestionAdmin/gestionAdmins/GestionAdmins"
import GestionClientes from "../pages/gestionAdmin/gestionClientes/GestionClientes"
import GestionPedidos from "../pages/gestionAdmin/gestionPedidos/GestionPedidos"

export let enrutador = [
    {
        path: '/',
        element: <Inicio />
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
    },
    {
        path: '/recetas',
        element: <Recetas />
    },
    {
        path: '/joly',
        element: <Joly />
    },
    {
        path: '/admin-home/',
        element: <RutaProtegida proteger = {<AdminHome />}/>,
    children: [
      {
        path: "gestion-productos",
        element: <GestionProductos />,
      },
      {
        path: "gestion-admins",
        element: <GestionAdmins />,
      },
      {
        path: "gestion-clientes",
        element: <GestionClientes />
      },
      {
        path: "gestion-pedidos",
        element: <GestionPedidos />
      }
    ],
    },,
    {
        path: '/cliente-home/',
        element: <RutaProtegida proteger = {<ClienteHome />}/>,
    children: [],
    },
]