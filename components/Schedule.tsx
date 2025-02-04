import { useQuery, gql } from '@apollo/client';
import { Text, StyleSheet, View } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext, useState } from 'react';
import scheduleData from '@/data/schedule.json';

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
  // const [displayDay, SetDisplayDay] = useState(`${daysOfWeek[date.getDay()]}`);
  const [displayDay, SetDisplayDay] = useState(`Sunday`);

  //@ts-ignore
  const { colorScheme, theme } = useContext(ThemeContext);

  const styles = createStyles(theme, colorScheme);

  /*
  // I tried to connect the db to this application, but was unsuccessful due to a CORS issue, for MVP, I have manually pulled the data from the db and hardcoded it into @/data/schedule.json. I am using this hardcoded data to display the schedule. 
  // Use the useQuery hook to fetch data from the GraphQL API
  const QUERY_SINGLE_DAY = gql`
    query singleDay($day: String!) {
      schedule(day: $day) {
        day
        show {
          name
          url
          shortDescription
          host {
            nickName
            fullName
            url
          }
        }
        startTime24
        startTime12
        endTime12
      }
    }
  `;

  const { loading, data } = useQuery(QUERY_SINGLE_DAY, {
    variables: { day: 'Monday' }, //update to pull in day later. just using Monday for initial testing
  });

  const queryResults = data?.schedule || [];
  let orderedResults = [...queryResults];
  */
  //@ts-ignore
  let orderedResults = [];
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
  let pairedResults = [];
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

  let results = JSON.stringify(pairedResults);
  return (
    <View>
      <View>
        {pairedResults.map((shows, i) => {
          return (
            <View style={styles.scheduleRow} key={i}>
              {console.log(shows)}
              <View style={styles.scheduleColumn}>
                {shows[0].show ? (
                  <Text>{shows[0].show.name}</Text>
                ) : (
                  <Text>column 1 empty</Text>
                )}
              </View>
              <View style={styles.scheduleColumn}>
                <Text>{shows[1].show.name}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <Text style={styles.text}>schedule query results: {results}</Text>
    </View>
  );
}

function createStyles(theme: any, colorScheme: string) {
  return StyleSheet.create({
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
  });
}
