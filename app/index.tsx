import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import About from '@/components/About';

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

export default function Home() {
  //@ts-ignore
  const { colorScheme, theme } = useContext(ThemeContext);
  const styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.container}>
      <About />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
}

function createStyles(theme: ThemeType, colorScheme: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      marginTop: -1,
    },
  });
}
