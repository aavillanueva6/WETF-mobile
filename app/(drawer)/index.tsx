import {
  Image,
  StyleSheet,
  Linking,
  Alert,
  Pressable,
  Text,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, { useCallback } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExternalLink } from '@/components/ExternalLink';

type OpenURLButtonProps = {
  url: string;
  children: string;
  styles: any;
};

const wetfURL = 'https://react-radio.onrender.com/';

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
      <ThemedText type='defaultSemiBold'>{children}</ThemedText>
    </Pressable>
  );
};

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/home_page_hero.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>WETF-LP</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>105.7 FM - The Jazz Station</ThemedText>
        <ThemedText type='subtitle'>South Bend, Indiana</ThemedText>
        <ThemedText>
          At WETF 105.7, we pride ourselves on being a truly independent voice
          for jazz, bringing the best music to listeners without commercial
          influence. As a 501(c)(3) nonprofit organization, we rely on the
          generosity of our audience to keep the station thriving. Our listeners
          help us maintain our high-quality programming, support our talented
          DJs from around the country, and ensure we can continue sharing jazz's
          rich history and vibrant future with listeners near and far.
        </ThemedText>

        <ThemedText>
          To learn more about WETF, visit our website:{' '}
          <ExternalLink href={wetfURL}>
            <ThemedText type='link'>WETF.</ThemedText>
          </ExternalLink>{' '}
          There you can find additional information about our Hosts, Programs,
          Board, and ways to contribute to help keep jazz on the airwaves.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: '100%',
    height: 'auto',
    aspectRatio: 2 / 1,
  },
});
