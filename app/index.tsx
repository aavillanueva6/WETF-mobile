import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

const audioSource =
  'https://ssl-proxy.icastcenter.com/get.php?type=Icecast&server=199.180.72.2&port=9007&mount=/stream&data=mp3';

export default function App() {
  const player = useAudioPlayer(audioSource);
  const [buttonText, setButtonText] = useState('Play Live Stream');

  console.log(player.currentStatus);

  return (
    <View style={styles.container}>
      <Button
        title={buttonText}
        onPress={() => {
          if (player.playing) {
            player.pause();
            setButtonText('Play Live Stream');
          } else {
            player.play();
            setButtonText('Stream Loading');
            const intervalId = setInterval(() => {
              if (player.currentStatus.playing) {
                setButtonText('Pause Stream');
                clearInterval(intervalId); // Stop checking once the condition is met
              }
            }, 100); // Check every 100 ms
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
