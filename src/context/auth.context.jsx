import { createContext, useContext, useState, useEffect } from "react";
import httpService from "../services/httpService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpService.setAuthToken(token);
      return { token };
    }
    return null;
  });

  const login = async ({ email, password }) => {
    const { data } = await httpService.post("/auth", { email, password });
    const token = data.token;
    localStorage.setItem("token", token);
    httpService.setAuthToken(token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    httpService.setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
