// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      {user && <Link to="/catalog">Catálogo</Link>}
      {user && <Link to="/admin">Administrar</Link>}
      {user
        ? <button onClick={logout}>Cerrar sesión</button>
        : <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
      }
    </nav>
  );
}
