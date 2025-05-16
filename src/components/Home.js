// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Bienvenido al Catálogo de Películas</h1>
      <Link to="/register"><button>Registrarse</button></Link>
      <Link to="/login"><button>Iniciar Sesión</button></Link>
    </div>
  );
}
