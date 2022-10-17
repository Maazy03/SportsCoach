import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {columnWidth} from '../data';
import moment from 'moment';
import ReservationPointer from './ReservationPointer';
import R from '@components/utils/R';
import Text from '@components/common/Text';

const MonthCalendar = ({
  monthArray,
  selectedMonth,
  reservations,
  calenderType,
}) => {
  return (
    <View style={styles.container}>
      {monthArray?.map((day, i) => {
        let isDisabled = selectedMonth !== moment(day).format('MMM');
        let thisDaysReservations = reservations?.filter(
          reservation =>
            moment(reservation.start).format('YYYY-MM-DD') ===
            moment(day).format('YYYY-MM-DD'),
        );

        return (
          <View style={styles.monthBox} key={i}>
            <Text
              style={[styles.dayCount, isDisabled && styles.disabledText]}
              variant={'body2'}
              color={R.color.blackShade4}
              font={'InterRegular'}>
              {moment(day).format('DD')}
            </Text>
            {thisDaysReservations?.length > 0 && (
              <ScrollView
                style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollviewContentContainer}>
                {thisDaysReservations?.map((reservation, i) => (
                  <ReservationPointer
                    key={i}
                    reservation={reservation}
                    calenderType={calenderType}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default MonthCalendar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: R.unit.width(1),
  },
  monthBox: {
    width: columnWidth - 0.05,
    minHeight: R.unit.scale(100),
    borderWidth: R.unit.scale(0.2),
    borderRightWidth: 0,
    borderColor: R.color.gray2,
  },
  dayCount: {
    margin: 5,
  },
  disabledText: {
    color: '#717171',
  },
  scrollViewContainer: {
    maxHeight: 80,
  },
  scrollviewContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
