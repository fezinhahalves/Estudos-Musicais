// Esta deve ser a ÚNICA linha de importação do 'react' neste arquivo.
// Se você usa JSX (como <ThemeContext.Provider>), você precisa do 'React' aqui.
import React, { createContext, useContext, useState } from 'react'; 

const ThemeContext = createContext();

const lightTheme = {
  isDark: false,
  colors: {
    background: '#FFF0F5', // rosa clarinho
    text: '#4A4A4A',
    primary: '#DB7093',    // rosa queimado
    card: '#FFDDEE',
  },
};

const darkTheme = {
  isDark: true,
  colors: {
    background: '#1E1E1E',
    text: '#FFFFFF',
    primary: '#FF69B4',
    card: '#333333',
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.isDark ? lightTheme : darkTheme);
  };

  return (
    // Aqui estamos usando JSX, então 'React' é necessário por trás dos panos.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}