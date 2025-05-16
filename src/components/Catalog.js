import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";

export default function Catalog() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1) Carga de datos desde Firestore
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "movies"), async (snap) => {
      const data = await Promise.all(
        snap.docs.map(async (d) => {
          const m = { id: d.id, ...d.data() };
          const imgSnap = await getDoc(doc(db, "imagenes", m.imageId));
          const imageBase64 = imgSnap.exists() ? imgSnap.data().data : "";
          return { ...m, imageBase64 };
        })
      );
      setMovies(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2) Hero aleatorio o defecto
  const featured = movies.length
    ? movies[Math.floor(Math.random() * movies.length)]
    : null;

  const defaultHero = {
    id: null,
    imageURL: "/default-hero.jpg",
    title: "Bienvenido a MovieApp",
    desc: "Pronto tendremos películas para ti. ¡Estate al pendiente!",
  };

  const hero = featured || defaultHero;

  // 3) Categorías dinámicas
  const categories = Array.from(new Set(movies.map((m) => m.genre)));

  // 4) Mientras carga, centramos el loader
  if (loading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  // 5) Render final
  return (
    <div className="catalog-page">
      {/* HERO */}
      <div
        className="catalog-hero"
        style={{
          backgroundImage: `url(${
            hero.id ? hero.imageBase64 : hero.imageURL
          })`,
        }}
      >
        <div className="catalog-hero__overlay">
          <h1 className="catalog-hero__title">{hero.title}</h1>
          <p className="catalog-hero__desc">{hero.desc || hero.synopsis}</p>
          {hero.id && (
            <Link to={`/movie/${hero.id}`} className="btn">
              <i className="bi bi-play-fill"></i> Play
            </Link>
          )}
        </div>
      </div>

      {/* FILAS */}
      {categories.map((cat) => {
        const rowItems = movies.filter(
          (m) => m.genre.toLowerCase() === cat.toLowerCase()
        );
        return (
          <section key={cat} className="catalog-row">
            <h2 className="catalog-row__title">{cat}</h2>
            <div className="catalog-row__list">
              {rowItems.map((m) => (
                <Link
                  key={m.id}
                  to={`/movie/${m.id}`}
                  className="catalog-row__item"
                >
                  <img src={m.imageBase64} alt={m.title} />
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
