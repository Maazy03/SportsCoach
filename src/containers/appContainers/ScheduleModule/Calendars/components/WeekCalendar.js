import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CalendarWeekRow from './CalendarWeekRow';
import R from '@components/utils/R';

const WeekCalendar = ({monthArray, reservations, calenderType}) => {
  return (
    <FlatList
      data={monthArray}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({item, index}) => (
        <CalendarWeekRow
          item={item}
          reservations={reservations}
          calenderType={calenderType}
        />
      )}
    />
  );
};

export default WeekCalendar;

const styles = StyleSheet.create({
  container: {
    marginTop: R.unit.scale(30),
    paddingTop: R.unit.scale(30),
    paddingBottom: R.unit.scale(50),
  },
});
