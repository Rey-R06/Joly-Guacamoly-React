import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./header.css"

export default function Header() {
  const navegador = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
const [animacionActiva, setAnimacionActiva] = useState(false);

function toggleMenu() {
  if (menuAbierto) {
    // activa animación de cierre
    setAnimacionActiva(true);
    setTimeout(() => {
      setMenuAbierto(false);
      setAnimacionActiva(false);
    }, 400); // dura 0.4s, igual que la animación
  } else {
    setMenuAbierto(true);
  }
}
  return (
    <header>
        <section className='logo-nav'>
            <button className="menu-hamburguesa" onClick={toggleMenu}>
                ☰
            </button>
            <Link className='logo' to="/"><img src="/img/logos/Logo_JolyDips.png" alt=""/></Link>
            <nav className={menuAbierto ? (animacionActiva ? "menu-oculto" : "menu-abierto") : "oculto"}>
            <ul >
                <Link to="/"><li>Inicio</li></Link>
                <Link to="/productos"><li>Productos</li></Link>
                <Link to="/clientes"><li>Clientes</li></Link>
            </ul>
            </nav>
        </section>
        <section className='botones-login'>
            <Link to="/login" className='boton-registrarse'><p>login</p></Link>
            <Link to="/registrarse" className='boton-sesion'><p>Sing up</p></Link>
        </section>
    </header>
  )
}
