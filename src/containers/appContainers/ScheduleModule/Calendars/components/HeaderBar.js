import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';

const HeaderBar = ({
  selectedYear = 'Year',
  setSelectedYear,
  selectedMonth = 'Month',
  setSelectedMonth,
  calenderType,
}) => {
  // calculateHeading
  const calculateHeading = () => {
    if (calenderType === 'month') {
      return (
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          color={R.color.blackShade4}
          align={'center'}
          transform={'none'}>
          {selectedYear}
        </Text>
      );
    }
    if (['week', 'day'].includes(calenderType)) {
      return (
        <View style={styles.weekContainer}>
          <Text
            variant={'body2'}
            font={'InterSemiBold'}
            color={R.color.blackShade4}
            gutterBottom={2}
            align={'center'}
            transform={'none'}>{`${moment(selectedMonth, 'MMM').format(
            'MMMM',
          )}, `}</Text>
          <Text
            variant={'body2'}
            font={'InterSemiBold'}
            color={R.color.gray5}
            gutterBottom={2}
            align={'center'}>
            {selectedYear}
          </Text>
        </View>
      );
    }
  };

  // handleChange
  const handleChange = type => {
    if (calenderType === 'month') {
      if (type === 'decrement') setSelectedYear(p => parseInt(p) - 1);
      if (type === 'increment') setSelectedYear(p => parseInt(p) + 1);
    }
    if (['week', 'day'].includes(calenderType)) {
      if (type === 'decrement') {
        let calculatedDate = moment(
          `${selectedMonth} ${selectedYear}`,
          'MMM YYYY',
        )
          .add(-1, 'month')
          .format();
        setSelectedYear(moment(calculatedDate).format('YYYY'));
        setSelectedMonth(moment(calculatedDate).format('MMM'));
      }
      if (type === 'increment') {
        let calculatedDate = moment(
          `${selectedMonth} ${selectedYear}`,
          'MMM YYYY',
        )
          .add(1, 'month')
          .format();
        setSelectedYear(moment(calculatedDate).format('YYYY'));
        setSelectedMonth(moment(calculatedDate).format('MMM'));
      }
    }
  };

  return (
    <View style={[R.styles.rowView, styles.container]}>
      <TouchableOpacity onPress={handleChange.bind(this, 'decrement')}>
        <Icon
          type={'MaterialIcons'}
          name={'keyboard-arrow-left'}
          size={20}
          color={R.color.black}
        />
      </TouchableOpacity>
      {calculateHeading()}
      <TouchableOpacity onPress={handleChange.bind(this, 'increment')}>
        <Icon
          type={'MaterialIcons'}
          name={'keyboard-arrow-right'}
          size={20}
          color={R.color.black}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: R.unit.scale(20),
    paddingVertical: R.unit.scale(15),
    borderTopWidth: R.unit.scale(1),
    borderTopColor: R.color.gray2,
    borderBottomWidth: R.unit.scale(1),
    borderBottomColor: R.color.gray2,
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
