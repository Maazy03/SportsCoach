import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';

function ProfileHeader(props) {
  const {navigation, title = 'Edit Profile'} = props;

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.headerLayout}>
      <TouchableOpacity
        onPress={navigateBack}
        activeOpacity={0.7}
        style={styles.backView}>
        <Icon
          type={'Entypo'}
          name={'cross'}
          color={R.color.blackShade2}
          size={20}
        />
      </TouchableOpacity>

      <View style={styles.textLayout}>
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          color={R.color.blackShade4}
          align={'left'}
          transform={'none'}>
          {title}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerLayout: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    padding: R.unit.scale(16),
    borderBottomWidth: R.unit.scale(2),
    borderBottomColor: R.color.gray4,
  },
  backView: {
    padding: R.unit.scale(10),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(10),
  },
  textLayout: {
    flex: 1,
    alignItems: 'center',
    marginRight: R.unit.scale(40),
  },
});

export default ProfileHeader;
