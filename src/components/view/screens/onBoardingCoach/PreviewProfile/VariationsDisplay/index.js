import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';

function VariationsDisplay(props) {
  const {item} = props;

  return (
    <View style={[styles.mainLayout]}>
      <View style={[R.styles.twoItemsRow, styles.listView]}>
        <View style={[R.styles.svgView, styles.svgView]}>{item.svg}</View>
        <View style={{width: '80%'}}>
          <Text
            variant={'body5'}
            font={'InterSemiBold'}
            color={R.color.gray}
            align={'left'}
            gutterBottom={4}
            transform={'none'}>
            {item?.title}
          </Text>
          <Text
            variant={'body2'}
            font={'InterSemiBold'}
            color={R.color.blackShade5}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            {item?.text}
          </Text>
        </View>
      </View>
    </View>
  );
}
export default VariationsDisplay;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  listView: {
    width: '100%',
    marginBottom: R.unit.scale(24),
  },
  svgView: {
    height: R.unit.scale(40),
    marginRight: R.unit.scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
