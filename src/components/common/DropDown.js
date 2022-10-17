import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './Text';
import R from '@components/utils/R';
import HoverText from './HoverText';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = props => {
  const {
    placeholder = 'Select Category',
    formError,
    formErrorText,
    gutterTop = 0,
    gutterBottom = 0,
    errorMTop = 8,
    errorMBottom = 0,
    borderColor = R.color.inputFieldBordercolor,
    titleColor,
    width = 0.92,
    //FUNCTIONS
    arrayData,
    zIndex,
    zIndexInverse,
    zIndexIOS,
    // value,
    defaultValue,
    loaderParentCall,
    title = 'Email',
    isRightTitle,
    isSubTitle,
    isSubTitleText = '(Optional)',
  } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [items, setItems] = useState(arrayData);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onPress = () => {
    navigation.navigate('ForgetPassword');
  };

  return (
    <View
      style={[
        gutterTop >= 0 && {
          marginTop: gutterTop,
        },
        gutterBottom >= 0 && {
          marginBottom: gutterBottom,
        },
        Platform.OS !== 'android' && {
          zIndex: zIndexIOS,
        },
      ]}>
      <View style={{...R.styles.rowView, marginBottom: R.unit.scale(8)}}>
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={titleColor ? titleColor : R.color.gray}
          align={'left'}
          transform={'none'}>
          {title}
          {isSubTitle && (
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.bracketsTextColor}
              align={'left'}
              transform={'none'}>
              {' '}
              {isSubTitleText}
            </Text>
          )}
        </Text>
        {isRightTitle && <HoverText onPress={onPress} />}
      </View>
      <DropDownPicker
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        placeholder={placeholder}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={item => {
          loaderParentCall(item);
        }}
        style={[
          {
            ...styles.inputFieldLayout,
            borderColor:
              formError?.length > 0
                ? R.color.inputFieldErrorMessageColor
                : borderColor,
          },
          width && {
            width: R.unit.width(width),
          },
        ]}
        textStyle={{
          ...styles.inputFieldText,
          color: value?.length === 0 ? R.color.gray : R.color.black,
        }}
        listItemLabelStyle={styles.rowTextStyle}
        dropDownContainerStyle={[
          styles.dropDownContainer,
          width && {
            width: R.unit.width(width),
          },
        ]}
      />

      {formError?.length > 0 && (
        <Text
          variant={'body3'}
          font={'InterRegular'}
          gutterTop={R.unit.scale(errorMTop)}
          gutterBottom={R.unit.scale(errorMBottom)}
          color={R.color.inputFieldErrorMessageColor}
          align={'left'}
          transform={'none'}>
          {formErrorText}
        </Text>
      )}
    </View>
  );
};

export default DropDown;
const styles = StyleSheet.create({
  inputFieldLayout: {
    // width: '100%',
    height: R.unit.scale(48),
    borderWidth: R.unit.scale(1),
    borderRadius: R.unit.scale(10),
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(18),
  },
  inputFieldText: {
    textAlign: 'left',
    color: R.color.gray,
    textTransform: 'capitalize',
    fontSize: R.unit.scale(16),
    fontFamily: 'Inter-Regular',
    paddingHorizontal: R.unit.scale(13),
    paddingLeft: R.unit.scale(-2),
  },
  dropDownContainer: {
    borderColor: R.color.inputFieldBordercolor,
    borderWidth: 1,
    borderRadius: 0,
  },
  rowTextStyle: {
    color: R.color.black,
    fontSize: R.unit.scale(16),
    fontFamily: 'Inter-Regular',
  },
  tagStyle: {
    backgroundColor: R.color.blueShade1,
    paddingVertical: R.unit.scale(4),
    paddingHorizontal: R.unit.scale(8),
    borderRadius: R.unit.scale(8),
  },
});
