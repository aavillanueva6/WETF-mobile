import {
  Text,
  Pressable,
  Alert,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import React, { useCallback, useContext } from 'react';
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

const wetfURL = 'https://react-radio.onrender.com/';

type OpenURLButtonProps = {
  url: string;
  children: string;
  styles: any;
};

const OpenURLButton = ({ url, children, styles }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <Pressable onPress={handlePress}>
      <Text style={styles.linkText}>{children}</Text>
    </Pressable>
  );
};

export default function About() {
  //@ts-ignore
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.aboutContainer}>
      <View>
        <Image
          style={styles.heroImage}
          source={require('@/assets/images/home_page_hero.png')}
        ></Image>
      </View>
      <ScrollView style={styles.aboutTextContainer}>
        <Text style={[styles.text]}>WETF-LP</Text>
        <Text style={[styles.text]}>105.7 FM - The Jazz Station</Text>
        <Text style={[styles.text]}>South Bend, Indiana</Text>
        <Text style={[styles.text]}>
          At WETF 105.7, we pride ourselves on being a truly independent voice
          for jazz, bringing the best music to listeners without commercial
          influence. As a 501(c)(3) nonprofit organization, we rely on the
          generosity of our audience to keep the station thriving. Our listeners
          help us maintain our high-quality programming, support our talented
          DJs from around the country, and ensure we can continue sharing jazz's
          rich history and vibrant future with listeners near and far.
        </Text>
        <Text style={[styles.text]}>
          To learn more about WETF, visit our website:{' '}
          <OpenURLButton styles={styles} url={wetfURL}>
            WETF.
          </OpenURLButton>{' '}
          There you will find additional information about our Hosts, Programs,
          Board, and ways to contribute to help keep jazz on the airwaves.
        </Text>
      </ScrollView>
    </View>
  );
}

function createStyles(theme: ThemeType, colorScheme: string) {
  return StyleSheet.create({
    aboutContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    heroImage: {
      width: '100%',
      height: 'auto',
      aspectRatio: 180 / 91,
    },
    aboutTextContainer: {},
    linkText: { color: theme.primary, fontWeight: 'bold' },
    text: { color: theme.text },
  });
}
