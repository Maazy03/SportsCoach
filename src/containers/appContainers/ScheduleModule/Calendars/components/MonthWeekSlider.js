import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {columnWidth, getInitialMonthIndex} from '../data';
import moment from 'moment';
import Text from '@components/common/Text';
import R from '@components/utils/R';

const MonthWeekSlider = ({
  calenderType,
  selectedMonth,
  setSelectedMonth,
  monthWeekSliderData,
  selectedWeeklyChunk,
  setSelectedWeeklyChunk,
  selectedDailyChunk,
  setSelectedDailyChunk,
}) => {
  // handleItemClick

  const handleItemClick = month => {
    // if calendar type === month
    if (calenderType === 'month') {
      if (month === selectedMonth) return;
      setSelectedMonth(month);
    }
    // if calendar type === week
    if (calenderType === 'week') {
      setSelectedWeeklyChunk(month);
    }
    // if calendar type === day
    if (calenderType === 'day') {
      setSelectedDailyChunk(month);
    }
  };

  // get selected Styles
  const selectedContainerStyles = item => {
    if (calenderType === 'month' && selectedMonth === item) {
      return [styles.selectedContainerStyles, styles.selectedTextStyles];
    }
    if (
      calenderType === 'week' &&
      moment(selectedWeeklyChunk[0]).format() === moment(item[0]).format()
    ) {
      return [
        styles.selectedContainerStyles,
        {...styles.selectedTextStyles, ...styles.mainTextHeight},
      ];
    }
    if (
      calenderType === 'day' &&
      moment(item).format() === moment(selectedDailyChunk).format()
    ) {
      return [
        styles.selectedContainerStyles,
        {...styles.selectedTextStyles, ...styles.mainTextHeightForDay},
      ];
    }
    return [undefined, undefined];
  };

  if (!parseInt(getInitialMonthIndex())) return null;

  return (
    <FlatList
      horizontal
      data={monthWeekSliderData}
      keyExtractor={(item, index) => index.toString()}
      style={styles.flatlistStyles}
      //   initialScrollIndex={parseInt(getInitialMonthIndex())}
      renderItem={({item, index}) => {
        console.log('monthWeekSliderData', item[0], item[item.length - 1]);

        return (
          <TouchableOpacity
            activeOpacity={0.78}
            onPress={handleItemClick.bind(this, item)}
            style={[
              styles.main,
              calenderType === 'week' && styles.weekMain,
              selectedContainerStyles(item)[0],
            ]}>
            <Text
              style={[styles.mainText, selectedContainerStyles(item)[1]]}
              variant={'body3'}
              font={'InterSemiBold'}
              color={R.color.blackShade4}
              gutterBottom={2}
              align={'center'}>
              {calenderType === 'month' && item}
              {calenderType === 'week' && (
                <>{`${selectedMonth}\n${moment(item[0]).format('DD')}-${moment(
                  item[item.length - 1],
                ).format('DD')}`}</>
              )}

              {calenderType === 'day' && (
                <>
                  {`${moment(item).format('ddd')}\n ${moment(item).format(
                    'DD',
                  )}`}
                </>
              )}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default MonthWeekSlider;

const styles = StyleSheet.create({
  flatlistStyles: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  main: {
    marginHorizontal: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(15),
    paddingVertical: R.unit.scale(8),
    marginVertical: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
  },
  weekMain: {
    width: columnWidth,
    paddingHorizontal: 0,
  },
  mainText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  mainTextHeight: {
    // height: 40,
  },
  mainTextHeightForDay: {
    // height: 65,
  },
  selectedTextStyles: {
    color: '#fff',
  },
  selectedContainerStyles: {
    backgroundColor: '#4D55E5',
  },
});
