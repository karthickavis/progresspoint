import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <-- important!

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    const username = localStorage.getItem("username");

    if (isAuth === "true" && username) {
      setUser({ name: username });
    }
    setLoading(false); // set loading to false after checking
  }, []);

  const login = (username) => {
    setUser({ name: username });
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

