import {
  StyleSheet,
  Image,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import scheduleData from '@/data/schedule.json';
import { useContext, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import ScheduleShowCard from '@/components/ScheduleShowCard';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

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

const date: Date = new Date();
const daysOfWeek: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const dropdownData = [
  { key: 'Sunday', value: 'Sunday' },
  { key: 'Monday', value: 'Monday' },
  { key: 'Tuesday', value: 'Tuesday' },
  { key: 'Wednesday', value: 'Wednesday' },
  { key: 'Thursday', value: 'Thursday' },
  { key: 'Friday', value: 'Friday' },
  { key: 'Saturday', value: 'Saturday' },
];

export default function Schedule() {
  const theme = useColorScheme() ?? 'light';

  const [displayDay, setDisplayDay] = useState(`${daysOfWeek[date.getDay()]}`);

  let orderedResults: ScheduleItem[] = [];
  let pairedResults: ScheduleItem[][] = [];
  switch (displayDay) {
    case 'Sunday':
      orderedResults = scheduleData.Sunday;
      break;
    case 'Monday':
      orderedResults = scheduleData.Monday;
      break;
    case 'Tuesday':
      orderedResults = scheduleData.Tuesday;
      break;
    case 'Wednesday':
      orderedResults = scheduleData.Wednesday;
      break;
    case 'Thursday':
      orderedResults = scheduleData.Thursday;
      break;
    case 'Friday':
      orderedResults = scheduleData.Friday;
      break;
    default:
      orderedResults = scheduleData.Saturday;
  }

  for (
    let i = 0, j = Math.floor(orderedResults.length / 2);
    j < orderedResults.length;
    i++, j++
  ) {
    if (i === Math.floor(orderedResults.length / 2)) {
      // @ts-ignore
      pairedResults.push([{}, orderedResults[j]]);
    } else {
      pairedResults.push([orderedResults[i], orderedResults[j]]);
    }
  }
  console.log('displayDay: ', displayDay);
  console.log(pairedResults[0]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color='#808080'
          name='chevron.left.forwardslash.chevron.right'
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>WETF On Air Schedule</ThemedText>
      </ThemedView>
      <ThemedView>
        <SelectList
          setSelected={setDisplayDay}
          data={dropdownData}
          search={false}
          boxStyles={{ borderRadius: 0 }}
          inputStyles={{ color: Colors[theme]['primary'], fontWeight: 'bold' }}
          dropdownTextStyles={{
            color: Colors[theme]['text'],
            fontWeight: '600',
          }}
          defaultOption={{ key: displayDay, value: displayDay.valueOf() }}
        />
      </ThemedView>
      <ThemedText style={[styles.centeredText, styles.timezoneText]}>
        All show times listed in Eastern time zone (EST/EDT)
      </ThemedText>
      <ScrollView style={styles.container}>
        <ThemedView>
          {pairedResults.map((shows, i) => {
            return (
              <ThemedView style={styles.scheduleRow} key={i}>
                <ThemedView style={styles.scheduleColumn}>
                  {shows[0].show ? (
                    <ScheduleShowCard show={shows[0]} />
                  ) : (
                    <ThemedText></ThemedText>
                  )}
                </ThemedView>
                <View
                  style={[
                    styles.verticalLine,
                    { backgroundColor: Colors[theme]['text'] },
                  ]}
                />
                <ThemedView style={styles.scheduleColumn}>
                  <ScheduleShowCard show={shows[1]} />
                </ThemedView>
              </ThemedView>
            );
          })}
        </ThemedView>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: -1,
  },
  scheduleRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxWidth: 1024,
  },
  scheduleColumn: {
    width: '50%',
  },
  verticalLine: {
    width: 1,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  centeredText: {
    alignSelf: 'center',
  },
  timezoneText: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
});
