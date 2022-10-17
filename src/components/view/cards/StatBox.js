import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import R from '@components/utils/R';
import Text from '@components/common/Text';

const StatBox = props => {
  const {item} = props;
  const user = useSelector(state => state.user);
  return (
    <View style={styles.statBox}>
      <Text
        variant={'body3'}
        font={'regular'}
        gutterBottom={R.unit.scale(5)}
        color={R.color.black}
        align={'left'}
        transform={'none'}>
        {item?.title}
      </Text>
      <View style={{...R.styles.rowView}}>
        <Text
          variant={R.unit.width(1) > 800 ? 'h3' : 'h6'}
          font={'bold'}
          color={R.color.gray5}
          align={'left'}
          transform={'none'}>
          {item?.id === 0
            ? user?.companyStats?.allTimeLeadCount
            : item?.id === 1
            ? user?.user?.profileVisits
            : user?.user?.wallet?.balance}
        </Text>
        <View
          style={{
            ...styles.svgView,
            // height: item.id === 0 ? R.unit.height(0.03) : R.unit.height(0.03),
          }}>
          {item?.svg}
        </View>
      </View>
    </View>
  );
};
export default StatBox;

const styles = StyleSheet.create({
  statBox: {
    width: R.unit.width(0.27),
    backgroundColor: R.color.white,
    borderRadius: R.unit.scale(15),
    padding: R.unit.width(0.035),
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 100,
    elevation: 24,
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.03),
  },
});
