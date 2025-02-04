import { Text, StyleSheet, View, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
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

export default function Footer() {
  //@ts-ignore
  const { colorScheme, theme } = useContext(ThemeContext);
  const styles = createStyles(theme, colorScheme);

  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const handleScheduleLink = () => {
    router.push('/schedule');
  };

  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        <Text style={styles.text}>© {currentYear} AAV Solutions</Text>
        <Pressable onPress={() => handleScheduleLink()}>
          <Text style={styles.text}>View Our Weekly Schedule</Text>
        </Pressable>
      </View>
    </View>
  );
}

function createStyles(theme: ThemeType, colorScheme: string) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    footerContainer: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
    },
    text: {
      color: theme.text,
    },
  });
}
