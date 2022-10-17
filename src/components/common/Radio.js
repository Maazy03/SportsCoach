import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import R from '@components/utils/R';

const Radio = props => {
  const {
    text,
    onPress,
    containerStyles,
    selected,
    activeColor = R.color.blackShade4,
    inActiveColor = R.color.white,
    activeBorderColor = R.color.blackShade4,
    inActiveBorderColor = R.color.gray4,
    textColor = R.color.black,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.mainLayout,
        borderColor: selected ? activeBorderColor : inActiveBorderColor,
      }}>
      {selected && (
        <View
          style={{
            ...styles.selectedBox,
            backgroundColor: selected ? activeColor : inActiveColor,
          }}
        />
      )}
    </TouchableOpacity>
  );
};
export default Radio;
const styles = StyleSheet.create({
  mainLayout: {
    borderRadius: R.unit.scale(100),
    height: R.unit.scale(20),
    width: R.unit.scale(20),
    borderColor: R.color.black,
    borderWidth: R.unit.scale(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: R.unit.scale(12),
  },
  selectedBox: {
    padding: R.unit.scale(2),
    backgroundColor: 'red',
    width: '75%',
    height: '75%',
    borderRadius: R.unit.scale(90),
  },
});
