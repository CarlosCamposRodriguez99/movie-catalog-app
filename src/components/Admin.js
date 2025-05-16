// src/components/Admin.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

export default function Admin() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    year: "",
    director: "",
    genre: "",
    synopsis: "",
    imageFile: null
  });
  const [editingId, setEditingId] = useState(null);

  // 1) Escucha la colección 'movies'
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "movies"), snap => {
      setMovies(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 2) Convertir File a base64
  const toBase64 = file =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result);
      reader.onerror = err => rej(err);
    });

  // 3) Maneja tanto agregar como actualizar
  const handleSubmit = async e => {
    e.preventDefault();

    let imageId = null;
    if (form.imageFile) {
      // guardamos la imagen nueva
      const base64 = await toBase64(form.imageFile);
      const imgRef = await addDoc(collection(db, "imagenes"), {
        name: form.imageFile.name,
        data: base64,
        createdAt: new Date()
      });
      imageId = imgRef.id;
    }

    const payload = {
      title: form.title,
      year: form.year,
      director: form.director,
      genre: form.genre,
      synopsis: form.synopsis,
      ...(imageId && { imageId }),
      updatedAt: new Date()
    };

    if (editingId) {
      // 3a) actualizar
      await updateDoc(doc(db, "movies", editingId), payload);
    } else {
      // 3b) agregar
      await addDoc(collection(db, "movies"), {
        ...payload,
        createdAt: new Date()
      });
    }

    // limpiar
    setForm({
      title: "",
      year: "",
      director: "",
      genre: "",
      synopsis: "",
      imageFile: null
    });
    setEditingId(null);
  };

  // 4) Eliminar
  const handleDelete = async id => {
    await deleteDoc(doc(db, "movies", id));
    if (editingId === id) {
      setEditingId(null);
      setForm({
        title: "",
        year: "",
        director: "",
        genre: "",
        synopsis: "",
        imageFile: null
      });
    }
  };

  // 5) Cargar datos en el form para editar
  const handleEdit = m => {
    setEditingId(m.id);
    setForm({
      title: m.title,
      year: m.year,
      director: m.director,
      genre: m.genre,
      synopsis: m.synopsis,
      imageFile: null // si no elige otra, mantenemos la antigua
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="admin container">
      <h2 className="admin-title">
        {editingId ? "Editar Película" : "Administrar Películas"}
      </h2>
      <div className="admin-content">
        {/* Formulario */}
        <div className="admin-form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={form.title}
              onChange={e =>
                setForm(f => ({ ...f, title: e.target.value }))
              }
              placeholder="Título"
              required
            />
            <input
              type="text"
              value={form.year}
              onChange={e =>
                setForm(f => ({ ...f, year: e.target.value }))
              }
              placeholder="Año"
              required
            />
            <input
              type="text"
              value={form.director}
              onChange={e =>
                setForm(f => ({ ...f, director: e.target.value }))
              }
              placeholder="Director"
              required
            />
            <input
              type="text"
              value={form.genre}
              onChange={e =>
                setForm(f => ({ ...f, genre: e.target.value }))
              }
              placeholder="Género"
              required
            />
            <textarea
              value={form.synopsis}
              onChange={e =>
                setForm(f => ({ ...f, synopsis: e.target.value }))
              }
              placeholder="Sinopsis"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={e =>
                setForm(f => ({ ...f, imageFile: e.target.files[0] }))
              }
            />
            <button type="submit" className="btn-login">
              {editingId ? "Guardar Cambios" : "Agregar Película"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn-back"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    title: "",
                    year: "",
                    director: "",
                    genre: "",
                    synopsis: "",
                    imageFile: null
                  });
                }}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>

        {/* Listado */}
        <div className="movie-list-container">
          <ul className="movie-list">
            {movies.map(m => (
              <li key={m.id} className="movie-list-item">
                <div className="movie-info">
                  <h3 className="movie-title">{m.title}</h3>
                  <p className="movie-genre">{m.genre}</p>
                </div>
                <div className="movie-actions">
                  <button
                    className="movie-btn movie-edit"
                    onClick={() => handleEdit(m)}
                  >
                    Editar
                  </button>
                  <button
                    className="movie-btn movie-delete"
                    onClick={() => handleDelete(m.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
