import { createContext, useContext, useEffect, useState } from "react";
import usersService from "../services/usersService";
import { useAuth } from "./auth.context";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user, updateUserFavorites } = useAuth();

  useEffect(() => {
    if (user) {
      setFavorites(user.favorites || []);
    } else {
      setFavorites([]);
    }
  }, [user]);

  const toggleFavorite = async (cardId) => {
    if (!user) return;
  
    try {
      const updatedFavorites = favorites.includes(cardId)
        ? favorites.filter((id) => id !== cardId)
        : [...favorites, cardId];
  
      await usersService.toggleFavorite(user.id, cardId);
  
      setFavorites(updatedFavorites);
      updateUserFavorites(updatedFavorites); 
    } catch (err) {
      console.error("Failed to update favorites", err);
    }
  };

  const isFavorite = (cardId) => favorites.includes(cardId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
