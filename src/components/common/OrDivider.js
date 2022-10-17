import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import Text from './Text';

const OrDivider = props => {
  return (
    <View style={styles.mainLayout}>
      <View style={styles.horizontalLine} />
      <Text
        variant={'body3'}
        font={'InterMedium'}
        color={R.color.gray3}
        align={'center'}
        style={{width: '10%'}}
        transform={'none'}>
        or
      </Text>
      <View style={styles.horizontalLine} />
    </View>
  );
};
export default OrDivider;
const styles = StyleSheet.create({
  mainLayout: {
    paddingHorizontal: 0,
    width: R.unit.width(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  horizontalLine: {
    height: R.unit.scale(1),
    width: R.unit.width(0.6),
    backgroundColor: R.color.gray2,
  },
});
