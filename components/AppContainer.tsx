import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';

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

export default function AppContainer() {
  //@ts-ignore
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const styles = createStyles(theme, colorScheme);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.appSafeAreaView}>
        <Header />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' />
        </Stack>
        <Footer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function createStyles(theme: ThemeType, colorScheme: string) {
  return StyleSheet.create({
    appSafeAreaView: {
      backgroundColor: theme.background,
      flex: 1,
    },
  });
}
