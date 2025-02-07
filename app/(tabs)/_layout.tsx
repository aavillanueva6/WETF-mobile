import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Image, Platform, View } from 'react-native';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const handleActionPress = async () => {
    // console.log('Action button pressed!');
    // Add your custom functionality here
    if (audioPlayingStatus) {
      // console.log('handle function goes to stop');
      await stopSound();
    } else {
      // console.log('handle function goes to start');
      await playSound();
    }
  };

  async function playSound() {
    // console.log('Loading Sound');
    setButtonDisabled(true);
    //@ts-ignore
    setButtonIcon('loading');
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
        // console.log('Playing Sound');
        setButtonDisabled(false);
        setAudioPlayingStatus(true);
        setButtonIcon('pause.circle.fill');
        clearInterval(intervalId); // Stop checking once the condition is met
      }
    }, 100); // Check every 100 ms
  }
  async function stopSound() {
    //@ts-ignore
    await sound.pauseAsync();
    setButtonText('Play Live Stream');
    setButtonIcon('play.circle.fill');
    setAudioPlayingStatus(false);

    // console.log('stopping Playback');
  }

  const audioSource: string =
    'https://ssl-proxy.icastcenter.com/get.php?type=Icecast&server=199.180.72.2&port=9007&mount=/stream&data=mp3';
  const [buttonText, setButtonText] = useState<string>('Listen Live');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [audioPlayingStatus, setAudioPlayingStatus] = useState<boolean>(false);
  const [buttonIcon, setButtonIcon] =
    useState<IconSymbolName>('play.circle.fill');

  const [sound, setSound] = useState<Audio.Sound>();

  const avSource = {
    uri: audioSource,
  };

  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/WETFLogo.png')}
              style={{ width: 32, height: 32 }}
              resizeMode='contain'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='action'
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            if (!buttonDisabled) {
              handleActionPress();
            }
          },
        }}
        options={{
          title: `${buttonText}`,
          tabBarIcon: () => (
            <View
              style={{
                transform: [{ translateY: -10 }],
              }}
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
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='schedule'
        options={{
          title: 'WETF Schedule',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={32}
              name='calendar'
              color={Colors[colorScheme ?? 'light'].primary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
