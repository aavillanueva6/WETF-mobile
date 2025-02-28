import React, { useState } from 'react';
import { View, Platform, StyleSheet, Pressable } from 'react-native';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { BlurView } from 'expo-blur';

export function Footer() {
  const [buttonText, setButtonText] = useState<string>('Listen Live');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [audioPlayingStatus, setAudioPlayingStatus] = useState<boolean>(false);
  const [buttonIcon, setButtonIcon] =
    useState<IconSymbolName>('play.circle.fill');
  const [sound, setSound] = useState<Audio.Sound>();
  const colorScheme = useColorScheme();

  const audioSource: string =
    'https://ssl-proxy.icastcenter.com/get.php?type=Icecast&server=199.180.72.2&port=9007&mount=/stream&data=mp3';
  const avSource = { uri: audioSource };

  const handleActionPress = async () => {
    if (audioPlayingStatus) {
      await stopSound();
    } else {
      await playSound();
    }
  };

  async function playSound() {
    setButtonDisabled(true);
    setButtonIcon('play.circle.fill');
    setButtonText('Stream Loading');

    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
    });

    const { sound } = await Audio.Sound.createAsync(avSource);
    setSound(sound);

    await sound.playAsync();

    const intervalId = setInterval(async () => {
      let audioStatus = await sound.getStatusAsync();
      //@ts-ignore
      if (audioStatus.isPlaying) {
        setButtonText('Pause Stream');
        setButtonDisabled(false);
        setAudioPlayingStatus(true);
        setButtonIcon('pause.circle.fill');
        clearInterval(intervalId);
      }
    }, 100);
  }

  async function stopSound() {
    await sound?.pauseAsync();
    setButtonText('Listen Live');
    setButtonIcon('play.circle.fill');
    setAudioPlayingStatus(false);
  }

  const FooterContent = () => (
    <View style={styles.footerContent}>
      <Pressable
        style={styles.playButton}
        onPress={() => {
          if (!buttonDisabled) {
            handleActionPress();
          }
        }}
        disabled={buttonDisabled}
      >
        <IconSymbol
          size={60}
          name={buttonIcon}
          color={
            buttonDisabled
              ? Colors[colorScheme ?? 'light'].primary40
              : Colors[colorScheme ?? 'light'].primary
          }
        />
        <ThemedText type='defaultSemiBold' style={styles.buttonText}>
          {buttonText}
        </ThemedText>
      </Pressable>
    </View>
  );

  return Platform.OS === 'ios' ? (
    <BlurView intensity={80} style={styles.footer}>
      <FooterContent />
    </BlurView>
  ) : (
    <View style={[styles.footer, styles.androidFooter]}>
      <FooterContent />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  androidFooter: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  footerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 4,
  },
});
