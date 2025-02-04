import { Stack } from 'expo-router';
import { ThemeProvider } from '@/context/ThemeContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import AppContainer from '@/components/AppContainer';

interface ThemeType {
  text: string;
  background: string;
  icon: string;
  button: string;
  disabledButton: string;
  primary: string;
  secondary: string;
  tertiary: string;
  tertiary70: string;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
}
