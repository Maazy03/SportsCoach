import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import Text from './Text';
import HoverText from './HoverText';
import navigation from '@components/navigation/navigationService';

const AuthSwitch = props => {
  const {screen, text, linkText} = props;
  const navigateScreen = () => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.mainLayout}>
      <Text
        variant={'body3'}
        font={'InterRegular'}
        color={R.color.gray}
        align={'center'}
        style={{marginRight: R.unit.scale(2)}}
        transform={'none'}>
        {text}
      </Text>
      <HoverText text={linkText} onPress={navigateScreen} />
    </View>
  );
};
export default AuthSwitch;
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: R.unit.scale(16),
    flexDirection: 'row',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.03),
  },
});
