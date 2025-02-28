import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme, View } from 'react-native';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingBottom: 80 }}>
          <Stack>
            <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
          </Stack>
          <Footer />
        </View>
      </View>
      <StatusBar style='auto' />
    </ThemeProvider>
  );
}
