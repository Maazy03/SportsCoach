import React from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import Text from '../../common/Text';
import Icon from '@components/common/Icon';
import R from '@components/utils/R';

const width = Dimensions.get('window').width;

function SubHeaderComponent(props) {
  const {navigation, headerProps} = props;
  const {mainHeading} = headerProps;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={goBack}
        activeOpacity={0.9}
        style={{padding: 10}}>
        <Icon
          name={'arrow-back-outline'}
          type={'Ionicons'}
          color={R.color.black}
          size={25}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginRight: R.unit.width(0.09),
        }}>
        {mainHeading && (
          <Text
            variant={'h6'}
            font={'semiBold'}
            gutterTop={10}
            color={R.color.black}
            align={'left'}
            transform={'capitalize'}>
            {mainHeading}
          </Text>
        )}
      </View>
    </View>
  );
}
export default SubHeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width,
    height: R.unit.scale(70),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: R.unit.scale(10),
    backgroundColor: R.color.white,
    borderBottomLeftRadius: R.unit.scale(20),
    borderBottomRightRadius: R.unit.scale(20),
    paddingVertical: R.unit.scale(10),
    shadowColor: R.color.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
