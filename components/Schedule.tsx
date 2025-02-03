import { useQuery, gql } from '@apollo/client';
import { Text, StyleSheet } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';

export default function Schedule() {
  //@ts-ignore
  const { colorScheme, theme } = useContext(ThemeContext);

  const styles = createStyles(theme, colorScheme);
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
  orderedResults.sort((a, b) => {
    return a.startTime24 - b.startTime24;
  });
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
  console.log(pairedResults);

  let results = JSON.stringify(pairedResults);
  return <Text style={styles.text}>schedule query results: {results}</Text>;
}

function createStyles(theme: any, colorScheme: string) {
  return StyleSheet.create({
    text: {
      color: theme.text,
    },
  });
}
