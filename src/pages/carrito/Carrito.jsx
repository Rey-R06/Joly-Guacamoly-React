import React, { useState } from "react";
import { MenuLateral } from "../../components/menuLateral/MenuLateral";
import "./carrito.css";

export default function Carrito() {
  // Estados para controlar el menú lateral
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [animacionActiva, setAnimacionActiva] = useState(false);

  // Función para alternar el menú
  const toggleMenu = () => {
    if (menuAbierto) {
      setAnimacionActiva(true);
      setTimeout(() => {
        setMenuAbierto(false);
        setAnimacionActiva(false);
      }, 400);
    } else {
      setMenuAbierto(true);
    }
  };

  return (
    <div className="contenedor-contenido">
      {/* Botón de hamburguesa para móviles */}
      <button 
        className={menuAbierto ? "menu-hamburguesa-carrito menu-hamburguesa-carrito-desplegado" : "menu-hamburguesa-carrito"} 
        onClick={toggleMenu}
      >
        ☰
      </button>

      <MenuLateral
        menuAbierto={menuAbierto}
        animacionActiva={animacionActiva}
        tipo="carrito"
        onToggleMenu={toggleMenu}
      />

      <main className="contenedor-carrito">
        <h2 className="titulo-carrito">Tu Carrito de Compras</h2>
        
        <div className="lista-productos-carrito">
          {/* Ejemplo de producto en el carrito */}
          <div className="producto-carrito">
            <img src="/img/productos/producto-natural.png" alt="Guacamole" />
            <div className="info-producto">
              <h3>Guacamole Clásico</h3>
              <p>Precio: $15.000</p>
              <div className="contador-cantidad">
                <button className="boton-cantidad">-</button>
                <span>1</span>
                <button className="boton-cantidad">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Total y botón de compra */}
        <div className="resumen-compra">
          <p className="total">Total: $15.000</p>
          <button className="boton-comprar">Proceder al Pedido</button>
        </div>
      </main>
    </div>
  );
}