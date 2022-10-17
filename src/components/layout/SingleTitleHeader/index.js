import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import navigationService from '@components/navigation/navigationService';
import Icon from '@components/common/Icon';

function SingleTitleHeader(props) {
  const {
    title,
    isModal = false,
    iconName = 'close',
    iconSize = 20,
    iconColor,
    isCustomBack = false,
    customBack,
  } = props;

  const goBack = () => {
    if (isCustomBack) {
      customBack();
    } else {
      if (!isModal) {
        navigationService.goBack();
      } else {
        // closeModal
      }
    }
  };

  return (
    <View style={[R.styles.rowView, styles.header]}>
      <TouchableOpacity
        style={styles.cancelButton}
        activeOpacity={0.6}
        onPress={goBack}>
        <Icon
          type={'MaterialIcons'}
          name={iconName}
          color={R.color.blackShade4}
          size={iconSize}
        />
      </TouchableOpacity>

      <View style={{flex: 1, marginRight: R.unit.scale(24)}}>
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          color={R.color.blackShade4}
          align={'center'}
          transform={'none'}>
          {title}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(20),
    borderBottomWidth: R.unit.scale(0.75),
    borderBottomColor: R.color.gray4,
    marginBottom: R.unit.scale(24),
  },
});

export default SingleTitleHeader;
