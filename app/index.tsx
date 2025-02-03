import { useState, useContext } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Audio } from 'expo-av';
import { ThemeContext } from '@/context/ThemeContext';
import { Octicons } from '@expo/vector-icons';

interface ThemeType {
  text: string;
  background: string;
  icon: string;
  button: string;
  primary: string;
  secondary: string;
  tertiary: string;
  tertiary70: string;
}

export default function App() {
  const audioSource: string =
    'https://ssl-proxy.icastcenter.com/get.php?type=Icecast&server=199.180.72.2&port=9007&mount=/stream&data=mp3';
  const [buttonText, setButtonText] = useState<string>('Play Live Stream');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [audioPlayingStatus, setAudioPlayingStatus] = useState<boolean>(false);
  //@ts-ignore
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  const [sound, setSound] = useState<Audio.Sound>();

  const avSource = {
    uri: audioSource,
  };

  async function handleButtonClick() {
    if (audioPlayingStatus) {
      // console.log('handle function goes to stop');
      await stopSound();
    } else {
      // console.log('handle function goes to start');
      await playSound();
    }
  }

  async function playSound() {
    // console.log('Loading Sound');
    setButtonDisabled(true);
    setButtonText('Stream Loading');

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
        clearInterval(intervalId); // Stop checking once the condition is met
      }
    }, 100); // Check every 100 ms
  }
  async function stopSound() {
    //@ts-ignore
    await sound.pauseAsync();
    setButtonText('Play Live Stream');

    // console.log('stopping Playback');
  }

  const styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
        }
        style={{ marginLeft: 10 }}
      >
        <Octicons
          name={colorScheme === 'dark' ? 'moon' : 'sun'}
          size={36}
          color={theme.text}
          selectable={undefined}
          style={{ width: 36 }}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          handleButtonClick();
        }}
        style={styles.audioButton}
        disabled={buttonDisabled}
      >
        <Text style={styles.audioButtonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
}

function createStyles(theme: ThemeType, colorScheme: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.background,
      padding: 10,
    },
    audioButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
    },
    audioButtonText: {
      fontSize: 18,
      color: theme.primary,
      fontWeight: 'bold',
    },
  });
}
