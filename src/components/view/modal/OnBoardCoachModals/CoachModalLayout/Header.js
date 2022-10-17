import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Text from '@components/common/Text';

function Header(props) {
  const {onCloseModal, headerTitle = ' Add equipment'} = props;
  return (
    <>
      <View style={[R.styles.rowView, styles.container]}>
        <Text
          variant={'h6'}
          font={'Sequel651'}
          gutterTop={20}
          color={R.color.black}
          align={'left'}
          transform={'none'}>
          {headerTitle}
        </Text>
        <TouchableOpacity onPress={onCloseModal}>
          <Icon
            name={'cross'}
            type={'Entypo'}
            size={25}
            color={R.color.black}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
export default Header;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: R.unit.scale(24),
    paddingHorizontal: R.unit.scale(24),
  },
});
