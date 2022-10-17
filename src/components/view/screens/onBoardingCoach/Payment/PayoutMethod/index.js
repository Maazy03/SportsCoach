import React from 'react';
import {View, StyleSheet} from 'react-native';
import R from '@components/utils/R';
import {MasterCardIcon, VisaText} from '@components/utils/Svg';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';

function PayoutMethod(props) {
  return (
    <View style={[R.styles.rowView, styles.methodContainer]}>
      <View style={[R.styles.twoItemsRow, styles.iconView]}>
        <View style={[styles.editSvg]}>
          <MasterCardIcon height="100%" width="100%" />
        </View>
        <View style={[styles.editSvg, {marginLeft: R.unit.scale(4)}]}>
          <VisaText height="100%" width="100%" />
        </View>
      </View>
      <View style={R.styles.rowView}>
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          color={R.color.black}
          align={'left'}
          transform={'none'}>
          Credit or Debit Card
        </Text>
        <Icon
          name={'keyboard-arrow-right'}
          type={'MaterialIcons'}
          color={R.color.black}
          size={20}
          iconStyles={{
            marginLeft: R.unit.scale(12),
          }}
        />
      </View>
    </View>
  );
}
export default PayoutMethod;

const styles = StyleSheet.create({
  methodContainer: {
    width: '100%',
    alignItems: 'center',
    borderRadius: R.unit.scale(8),
    borderWidth: R.unit.scale(0.7),
    borderColor: R.color.gray4,
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(16),
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.scale(35),
  },
});
