// src/components/AuthModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import Login from "./Login";
import Register from "./Register";

Modal.setAppElement("#root");

export default function AuthModal({ onClose }) {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Modal
      isOpen
      onRequestClose={onClose}
      style={{
        overlay: {
          // Hacemos el overlay flex para poder centrar el contenido
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        },
        content: {
          position: "relative",
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "auto",
          transform: "none", // eliminamos cualquier transform previa
          maxWidth: "400px",
          width: "90%",
          padding: "2rem",
          borderRadius: "8px",
          // ya no necesitamos top/left ni translate
        },
      }}
    >
      {isRegister ? <Register /> : <Login />}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        {isRegister ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          style={{
            background: "none",
            border: "none",
            color: "#e50914",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </button>
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          background: "transparent",
          border: "none",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
      >
        <i className="bi bi-x-lg"></i>
      </button>
    </Modal>
  );
}
