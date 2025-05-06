import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./card.css";

export default function CardProductos({clase,titulo,img,descripcion,mensajeButton}) {

  return (
    <article className={clase}>
      <h3>{titulo}</h3>
      <img src={img} alt="" />
      <p>{descripcion}</p>
      <button className="btn-joly">{mensajeButton}</button>
    </article>
  );
}
