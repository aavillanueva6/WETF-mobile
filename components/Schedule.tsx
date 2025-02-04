import { Text, StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext, useState } from 'react';
import scheduleData from '@/data/schedule.json';
import ScheduleShowCard from './ScheduleShowCard';

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

export default function Schedule() {
  const [displayDay, SetDisplayDay] = useState(`${daysOfWeek[date.getDay()]}`);

  //@ts-ignore
  const { colorScheme, theme } = useContext(ThemeContext);

  const styles = createStyles(theme, colorScheme);

  //@ts-ignore
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
      //@ts-ignore
      pairedResults.push([{}, orderedResults[j]]);
    } else {
      pairedResults.push([orderedResults[i], orderedResults[j]]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        {daysOfWeek.map((day) => {
          return (
            <Pressable
              onPress={() => {
                SetDisplayDay(day);
              }}
              key={day}
              style={[
                styles.dayButton,
                day === displayDay && styles.selectedDayButton,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  day === displayDay && styles.selectedButtonText,
                ]}
              >
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.centeredText, styles.text, styles.dayOfWeekText]}>
        {displayDay}
      </Text>
      <Text style={[styles.centeredText, styles.text, styles.timezoneText]}>
        All show times listed in Eastern time zone (EST/EDT)
      </Text>

      <ScrollView style={styles.container}>
        <View>
          {pairedResults.map((shows, i) => {
            return (
              <View style={styles.scheduleRow} key={i}>
                <View style={styles.scheduleColumn}>
                  {shows[0].show ? (
                    <ScheduleShowCard show={shows[0]} />
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <View style={styles.verticalLine} />
                <View style={styles.scheduleColumn}>
                  <ScheduleShowCard show={shows[1]} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function createStyles(theme: any, colorScheme: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    text: {
      color: theme.text,
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
      backgroundColor: theme.text,
    },
    centeredText: {
      alignSelf: 'center',
    },
    dayOfWeekText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    timezoneText: {
      fontStyle: 'italic',
      marginBottom: 10,
    },
    dayButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
      margin: 5,
    },
    buttonText: {
      color: theme.primary,
      fontWeight: 'bold',
    },
    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    selectedDayButton: {
      backgroundColor: theme.primary,
    },
    selectedButtonText: {
      color: theme.button,
    },
  });
}
