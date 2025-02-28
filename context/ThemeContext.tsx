import { createContext, useState } from 'react';
import { Appearance } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ThemeContextType {
  colorScheme: string;
  setColorScheme: (scheme: 'light' | 'dark') => void;
  theme: typeof Colors.light | typeof Colors.dark;
}

export const ThemeContext = createContext<ThemeContextType>({
  colorScheme: 'light',
  setColorScheme: () => {},
  theme: Colors.light,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useState(
    Appearance.getColorScheme() || 'light'
  );
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
