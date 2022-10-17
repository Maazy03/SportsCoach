import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';

function Footer(props) {
  const {
    rightButtonTitle = 'Add',
    leftButtonTitle = 'Cancel',
    onPressBackButton,
    onPressNextButton,
    disabled,
  } = props;

  return (
    <View style={[R.styles.rowView, styles.container]}>
      <Button
        value={leftButtonTitle}
        bgColor={R.color.white}
        width={'35%'}
        size={'md'}
        color={R.color.black}
        disabled={false}
        loaderColor={R.color.white}
        btnWrapperStyles={{
          marginRight: R.unit.scale(24),
        }}
        onPress={onPressBackButton}
      />
      <Button
        value={rightButtonTitle}
        bgColor={R.color.mainColor}
        width={'35%'}
        size={'md'}
        color={R.color.white}
        disabled={disabled}
        borderWidth={1}
        borderColor={disabled ? R.color.disabledButtonColor : R.color.mainColor}
        onPress={onPressNextButton}
      />
    </View>
  );
}
export default Footer;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.75,
    borderTopColor: R.color.gray4,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(24),
  },
});
