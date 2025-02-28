import { Switch, StyleSheet, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/ThemeContext';

export default function Settings() {
  //@ts-ignore
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  console.log(colorScheme);
  const [isEnabled, setIsEnabled] = useState(colorScheme === 'dark');
  const toggleSwitch = () => {
    if (colorScheme === 'dark') {
      setColorScheme('light');
    } else {
      setColorScheme('dark');
    }
    setIsEnabled((previousState) => !previousState);
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ThemedText>Use dark mode?</ThemedText>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
