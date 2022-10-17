import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';

function CoachHeaderModal(props) {
  const {
    closeModal,
    title = 'Filters',
    openSaveModal,
    isRightIcon = true,
    isRightIconSize = 25,
  } = props;

  const closedModal = () => {
    closeModal();
  };

  const openSavedModal = () => {
    openSaveModal && openSaveModal();
  };

  return (
    <View>
      <View style={[R.styles.rowView, styles.header]}>
        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.6}
          onPress={closedModal}>
          <Icon
            type={'Ionicons'}
            name={'close'}
            color={R.color.blackShade4}
            size={isRightIconSize}
          />
        </TouchableOpacity>

        <View
          style={[{flex: 1}, !isRightIcon && {marginRight: R.unit.scale(25)}]}>
          <Text
            variant={'body2'}
            font={'InterSemiBold'}
            color={R.color.blackShade4}
            align={'center'}
            transform={'none'}>
            {title}
          </Text>
        </View>

        {isRightIcon && (
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.6}
            onPress={openSavedModal}>
            <Icon
              type={'MaterialCommunityIcons'}
              name={'bookmark-outline'}
              color={R.color.blackShade4}
              size={25}
            />
          </TouchableOpacity>
        )}
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
  cancelButton: {
    padding: R.unit.scale(5),
  },
});

export default CoachHeaderModal;
