import React from 'react'
import "./card.css"

export default function CardProductos({titulo, img, descripcion}) {
  return (
    <article className="card">
            <h3>{titulo}</h3>
            <img src={img} alt="" />
            <p>
                {descripcion}
            </p>
            <button className="btn-joly">Mas</button>
    </article>
  )
}
