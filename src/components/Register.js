// src/components/Register.js
import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const emailRef = useRef();
  const pwRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();

  // simple validación de email
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = pwRef.current.value;

    if (!validateEmail(email)) {
      return Swal.fire({
        icon: "error",
        title: "Email inválido",
        text: "Por favor ingresa un correo con formato válido.",
      });
    }

    if (password.length < 6) {
      return Swal.fire({
        icon: "warning",
        title: "Contraseña muy corta",
        text: "Debe tener al menos 6 caracteres.",
      });
    }

    try {
      await signup(email, password);
      navigate("/catalog");
    } catch (error) {
      // Error.code contiene cosas como 'auth/email-already-in-use', etc.
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{textAlign: "center"}}>Registrarse</h2>
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
        minLength={6}
      />
      <button type="submit" className="btn-login">
        Crear cuenta
      </button>
    </form>
  );
}
