import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FavoritesProvider } from "./context/favorites.context";


import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/auth.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <FavoritesProvider>
        <App />
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);