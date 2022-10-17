import {StyleSheet, View} from 'react-native';
import React from 'react';
import {columnWidth, getAllWeekDays} from '../data';
import R from '@components/utils/R';
import Text from '@components/common/Text';

const WeekBar = () => {
  return (
    <View style={styles.container}>
      {getAllWeekDays()?.map((day, i) => {
        return (
          <View style={styles.inner} key={i}>
            <Text variant={'body3'} color={R.color.gray} font={'InterRegular'}>
              {day}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default WeekBar;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#d3d3d3',
    paddingVertical: R.unit.scale(8),
    flexDirection: 'row',
  },
  inner: {
    width: columnWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
