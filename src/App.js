// src/App.js
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import Onboarding from "./components/Onboarding";
import Catalog from "./components/Catalog";
import MovieDetail from "./components/MovieDetail";
import Admin from "./components/Admin";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

// Layout que oculta NavBar en “/”
function MainLayout({ children }) {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/" && <NavBar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route
              path="/catalog"
              element={
                <PrivateRoute>
                  <Catalog />
                </PrivateRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <PrivateRoute>
                  <MovieDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}
