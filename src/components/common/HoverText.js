import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import Icon from './Icon';
import Text from './Text';

const HoverText = props => {
  const {text = 'Forgot Password', onPress, hoverStyles} = props;
  return (
    <TouchableOpacity
      style={[styles.mainLayout, hoverStyles]}
      onPress={onPress}>
      <Text
        variant={'body3'}
        font={'InterMedium'}
        color={R.color.hyperLinkColor}
        align={'left'}
        transform={'none'}>
        {text}
      </Text>
      <Icon
        name={'arrow-top-right'}
        size={15}
        type={'MaterialCommunityIcons'}
        color={R.color.hyperLinkColor}
      />
    </TouchableOpacity>
  );
};
export default HoverText;
const styles = StyleSheet.create({
  mainLayout: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.03),
  },
});
