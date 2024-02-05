import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: JSON.parse(localStorage.getItem("user")) || null,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user: user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
