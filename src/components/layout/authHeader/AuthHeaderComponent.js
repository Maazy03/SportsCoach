import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Text from '@components/common/Text';
import {HeaderBackIcon} from '@components/utils/Svg';
import R from '@components/utils/R';

function AuthHeaderComponent(props) {
  const {navigation} = props;

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={[R.styles.twoItemsRow, styles.layout]}
      onPress={navigateBack}
      activeOpacity={0.7}>
      <View style={styles.svgView}>
        <HeaderBackIcon height="100%" width="100%" />
      </View>
      <Text
        variant={'body3'}
        font={'InterMedium'}
        color={R.color.black}
        align={'left'}
        style={{
          width: '90%',
          marginLeft: R.unit.scale(8),
        }}
        transform={'none'}>
        Go back
      </Text>
    </TouchableOpacity>
  );
}
export default AuthHeaderComponent;
const styles = StyleSheet.create({
  layout: {
    marginTop: R.unit.scale(60),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(10),
  },
});
