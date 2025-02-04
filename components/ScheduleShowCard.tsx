import { Text, StyleSheet, View } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';

// Type definitions
interface Host {
  nickName: string;
  fullName: string;
  url: string;
}

interface Show {
  name: string;
  url: string;
  shortDescription: string;
  host: Host[];
}

interface ScheduleItem {
  day: string;
  show: Show;
  startTime24: number;
  startTime12: string;
  endTime12: string;
}

interface ScheduleShowCardProps {
  show: ScheduleItem;
}

export default function ScheduleShowCard(show: ScheduleShowCardProps) {
  //@ts-ignore
  const { colorScheme, theme } = useContext(ThemeContext);

  const styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.scheduleRow}>
      <View style={styles.scheduleColumn}>
        <Text style={[styles.text]}>
          {show.show.startTime12} - {show.show.endTime12}
        </Text>
        <Text style={[styles.text]}>{show.show.show.name}</Text>
        <Text style={[styles.text, styles.hostNameText]}>
          {show.show.show.host.map((host: any, i: number) => {
            return i === 0 ? host.fullName : `, ${host.fullName}`;
          })}
        </Text>
      </View>
    </View>
  );
}

function createStyles(theme: any, colorScheme: string) {
  return StyleSheet.create({
    text: {
      color: theme.text,
    },
    scheduleRow: {
      paddingBottom: 10,
      marginHorizontal: 20,
      marginBottom: 10,
    },
    scheduleColumn: {
      width: '100%',
    },
    hostNameText: {
      color: theme.secondary,
    },
  });
}
