import { createContext, useContext, useState } from "react";
import usersService from "../services/usersService";
import httpService from "../services/httpService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(usersService.getLoggedInUser());

  const createUser = async (userData) => {
    const { data: users } = await httpService.get("/users");

    const exists = users.find((u) => u.email === userData.email);
    if (exists) {
      throw { response: { status: 400, data: "User already registered." } };
    }

    const newUser = { ...userData, favorites: [] };
    await httpService.post("/users", newUser);
  };

  const updateUser = async (id, updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    await usersService.updateUser(id, updatedData);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    return { success: true, message: "Profile updated successfully!" };
  };

  const login = async (credentials) => {
    const { data: users } = await httpService.get("/users");

    const loggedUser = users.find(
      (u) =>
        u.email.toLowerCase() === credentials.email.toLowerCase() &&
        u.password === credentials.password.trim()
    );

    if (!loggedUser) throw new Error("Invalid credentials");

    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  const logout = () => {
    usersService.logout();
    setUser(null);
  };

  const updateUserFavorites = (favorites) => {
    const updatedUser = { ...user, favorites };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        createUser,
        login,
        logout,
        updateUserFavorites,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
