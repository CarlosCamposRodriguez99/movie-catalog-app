// src/components/MovieDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      const movSnap = await getDoc(doc(db, "movies", id));
      if (!movSnap.exists()) {
        navigate("/catalog");
        return;
      }
      const data = movSnap.data();
      const imgSnap = await getDoc(doc(db, "imagenes", data.imageId));
      const imageBase64 = imgSnap.exists() ? imgSnap.data().data : "";
      setMovie({ id, ...data, imageBase64 });
      setLoading(false);
    }
    fetchMovie();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {/* Hero banner */}
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${movie.imageBase64})` }}
      >
        <div className="detail-overlay" />
        <h1 className="detail-title">{movie.title}</h1>
      </div>

      {/* Info section */}
      <div className="detail-content container">
        <div className="detail-poster">
          <img src={movie.imageBase64} alt={movie.title} />
        </div>
        <div className="detail-meta">
          <p>
            <strong>Año:</strong> {movie.year}
          </p>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Género:</strong> {movie.genre}
          </p>
          <p className="detail-synopsis">
            <strong>Sinopsis:</strong> {movie.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
}
