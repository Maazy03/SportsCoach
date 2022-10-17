import React from 'react';
import {StyleSheet} from 'react-native';
import R from '@components/utils/R';
import Text from './Text';

const HighlightedText = props => {
  const {beforeString, keyword, afterString, onPress} = props;

  return (
    <>
      <Text
        variant={'body2'}
        font={'InterRegular'}
        color={R.color.blackShade4}
        align={'left'}
        gutterTop={16}
        style={{width: '100%'}}
        transform={'none'}>
        {beforeString}{' '}
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          color={R.color.hyperLinkColor}
          align={'left'}
          gutterTop={16}
          onPress={onPress}
          style={{width: '100%'}}
          transform={'none'}>
          {keyword}{' '}
        </Text>
        <Text
          variant={'body2'}
          font={'InterRegular'}
          color={R.color.blackShade4}
          align={'left'}
          gutterTop={16}
          style={{width: '100%'}}
          transform={'none'}>
          {afterString}
        </Text>
      </Text>
    </>
  );
};
export default HighlightedText;
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
