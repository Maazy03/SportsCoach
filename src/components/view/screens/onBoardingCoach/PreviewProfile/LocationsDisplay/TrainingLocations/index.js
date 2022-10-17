import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import HoverText from '@components/common/HoverText';

function TrainingLocations(props) {
  const {item} = props;

  const onPress = () => {};

  return (
    <View style={[styles.mainLayout]}>
      <View style={[R.styles.twoItemsRow, styles.listView]}>
        <View>
          {item?.venue?.length > 0 && (
            <Text
              variant={'body2'}
              font={'InterSemiBold'}
              color={R.color.blackShade3}
              align={'left'}
              gutterBottom={8}
              transform={'none'}>
              {item?.venue}
            </Text>
          )}

          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            numberOfLines={4}
            gutterBottom={16}
            transform={'none'}>
            {item?.address}
          </Text>
          <HoverText text={'Get directions'} onPress={onPress} />
        </View>
      </View>
    </View>
  );
}
export default TrainingLocations;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  listView: {
    width: '100%',
    marginBottom: R.unit.scale(32),
  },
});
