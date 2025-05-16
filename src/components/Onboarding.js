// src/components/Onboarding.js
import React, { useState } from "react";
import AuthModal from "./AuthModal";

export default function Onboarding() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="onboarding">
      <div className="onboarding__overlay">
        <h1 className="onboarding__title">Bienvenido a MovieApp</h1>
        <p className="onboarding__subtitle">
          Disfruta tu catálogo de películas favorito.
        </p>
        <button
          className="onboarding__btn"
          onClick={() => setShowAuth(true)}
        >
          Continuar
        </button>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
