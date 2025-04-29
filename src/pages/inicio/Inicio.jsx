import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import CardProductos from '../../components/card_Producto/CardProductos'
import "./inicio.css"

export default function Inicio() {
  return (
    <>
    <Header />
    <main>
        <section className='banner'>
            <img src="/img/banner/jolym.png" alt="" />
        </section>
        <h2>Productos mas destacados</h2>
        <section className='seccion-productos'>
            <CardProductos 
                titulo={"guacamole natural"} 
                img={"/img/productos/producto-natural.png"} 
                descripcion={"El tradicional, el que combina con todo, el de sabor inigualable, así es nuestro jolyguacamoly natural. Disfruta de su naturalidad y frescura🥑"}
            />
            <CardProductos 
                titulo={"guacamole Picante"} 
                img={"/img/productos/producto-picante.png"} 
                descripcion={"El cosquilleo delicioso y sabroso en la lengua, el balance perfecto de picor para que le des un toque inigualable a tus comidas🌶"}
            />
        </section>
        
        <section className="beneficios">
            <h3>¿Por qué elegir JolyGuacamoly?</h3>
            <div className="beneficios-container">
              <div className="beneficio">
                <span>🌿</span>
                <h4>Ingredientes Naturales</h4>
                <p>Solo usamos aguacates y garbanzos de la mejor calidad.</p>
              </div>
              <div className="beneficio">
                <span>🚚</span>
                <h4>Entrega Rápida</h4>
                <p>Recibe tu pedido en tiempo récord con empaques seguros.</p>
              </div>
              <div className="beneficio">
                <span>💚</span>
                <h4>Hecho con Amor</h4>
                <p>Cada porción está pensada para sorprender a tu paladar.</p>
              </div>
            </div>
          </section>
    </main>
    <Footer />
    </>
  )
}
