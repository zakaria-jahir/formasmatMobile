import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemColorScheme = Appearance.getColorScheme(); // 'light' ou 'dark'
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);
