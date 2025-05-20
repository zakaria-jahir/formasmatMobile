import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Fonction de déconnexion
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// ✅ Hook personnalisé pour accéder au contexte
export const useUser = () => useContext(UserContext);
