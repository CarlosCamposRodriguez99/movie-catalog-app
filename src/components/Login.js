// src/components/Login.js
import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const emailRef = useRef();
  const pwRef = useRef();
  const { login } = useAuth();
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = pwRef.current.value;
    try {
      await login(email, password);
      nav("/catalog");
    } catch (error) {
      // Detectamos si el usuario no existe o credenciales inválidas
      let message = "Ha ocurrido un error. Por favor inténtalo de nuevo.";
      if (error.code === "auth/user-not-found") {
        message = "Esta cuenta no existe. ¡Regístrate por favor!";
      } else if (error.code === "auth/wrong-password") {
        message = "Contraseña incorrecta. ¿Olvidaste tu contraseña?";
      } else if (error.code === "auth/invalid-email" || error.code === "auth/invalid-credential") {
        message = "Correo o credenciales inválidas. Verifícalas e inténtalo de nuevo.";
      }
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: message,
        confirmButtonText: "Entendido"
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center", color: "#000" }}>Iniciar Sesión</h2>
      <input
        ref={emailRef}
        type="email"
        placeholder="Email"
        required
      />
      <input
        ref={pwRef}
        type="password"
        placeholder="Contraseña"
        required
      />
      <button type="submit" className="btn-login">
        Ingresar
      </button>
    </form>
  );
}
