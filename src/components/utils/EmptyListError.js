import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import {NotificationIcon} from '@components/utils/Svg';

function EmptyListError(props) {
  const {errorText} = props;
  return (
    <View style={styles.mainLayout}>
      <View style={styles.onNotificationLayout}>
        <View style={styles.svgView}>
          <NotificationIcon
            fill={R.color.white}
            height={'100%'}
            width={'100%'}
          />
        </View>
      </View>
      <Text
        variant={'body2'}
        font={'italic'}
        color={R.color.gray}
        align={'center'}
        gutterTop={20}
        transform={'capitalize'}>
        {errorText}
      </Text>
    </View>
  );
}
export default EmptyListError;

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onNotificationLayout: {
    backgroundColor: R.color.mainColor,
    height: R.unit.scale(120),
    borderRadius: R.unit.scale(200),
    width: R.unit.scale(120),
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgView: {
    aspectRatio: 0.5,
    height: R.unit.height(0.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
