import React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput as TextInputc,
  I18nManager,
  Platform,
} from 'react-native';

import {Icon} from 'native-base';
import {useState} from 'react';
import {moderateScale, scale, ScaledSheet} from 'react-native-size-matters';
import Text from './Text';
import R from '@components/utils/R';
import HoverText from './HoverText';
import {EyeHideIcon} from '@components/utils/Svg';
import navigation from '@components/navigation/navigationService';

const TextInput = props => {
  let screenWidth = Dimensions.get('window').width;
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState('');

  const handleChangeText = text => {
    setValue(text);
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };
  const {
    placeholder,
    height = 48,
    width = 0.92,
    color = 'black',
    inputHeight = 0,
    inputWidth = 0.9,
    inputContainerStyles,
    inputStyles,
    gutterTop = 0,
    gutterBottom = 0,
    borderColor = R.color.inputFieldBordercolor,
    backgroundColor,
    placeholdercolor = R.color.gray,
    multiline = false,
    numberOfLines,
    formError,
    formErrorText,
    errorMTop = 8,
    errorMBottom = 0,
    iconName,
    iconType,
    iconColor = R.color.mainColor,
    textAlignVertical,
    eyeColor = R.color.gray,
    titleColor,
    iconRightName,
    iconLeftType,
    leftIconStyles,
    //Functionality
    title,
    subTitle = 'optional',
    forwardedRef = forwardedRef,
    onSubmitEditing,
    returnKeyType,
    isRightTitle,
    isSubTitle,
    subTitleIcon,
    blurOnSubmit,
    keyboardType,
    customIcon,
    iconPress,
    onFocus,
    onBlur,
  } = props;

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
      ]}>
      {title && (
        <View style={{...R.styles.rowView, marginBottom: R.unit.scale(8)}}>
          <View style={R.styles.twoItemsRow}>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={titleColor ? titleColor : R.color.gray}
              align={'left'}
              transform={'none'}>
              {title}{' '}
            </Text>

            {isSubTitle && (
              <>
                {subTitleIcon ? (
                  <View
                    style={{
                      paddingLeft: R.unit.scale(8),
                    }}>
                    {subTitleIcon}
                  </View>
                ) : (
                  <Text
                    variant={'body3'}
                    font={'InterRegular'}
                    color={R.color.bracketsTextColor}
                    align={'left'}
                    transform={'none'}>
                    {' '}
                    {subTitle}
                  </Text>
                )}
              </>
            )}
          </View>
          {isRightTitle && <HoverText onPress={onPress} />}
        </View>
      )}
      <View
        style={[
          styles.fieldSet,
          {
            width: screenWidth * width,
            borderColor:
              formError?.length > 0
                ? R.color.inputFieldErrorMessageColor
                : borderColor,
          },
          height && {
            height: R.unit.scale(height),
          },
          backgroundColor && {
            backgroundColor: backgroundColor,
          },
          props.alignItems && {
            alignItems: props.alignItems,
          },
          inputContainerStyles,
        ]}>
        {iconName && (
          <Icon
            name={iconName}
            type={iconType}
            style={[
              {
                color: iconColor,
                fontSize: moderateScale(18, 0.6),
                paddingLeft: iconName && R.unit.scale(16),
              },
              leftIconStyles,
            ]}
          />
        )}

        {props.secureText ? (
          <>
            <TextInputc
              style={[
                {
                  width: screenWidth * inputWidth,
                  color: color,
                  paddingRight: R.unit.scale(50),
                },
                inputHeight && {
                  height: R.unit.scale(inputHeight),
                },

                Platform.OS === 'android'
                  ? styles.inputBox
                  : [styles.inputBox, {paddingBottom: 0}],
              ]}
              onChangeText={e => handleChangeText(e)}
              value={props.value}
              secureTextEntry={!showPassword}
              placeholder={placeholder}
              placeholderTextColor={placeholdercolor}
              keyboardType={props.keyboardType}
              returnKeyType={returnKeyType}
              ref={forwardedRef}
              onSubmitEditing={onSubmitEditing}
              blurOnSubmit={blurOnSubmit}
            />
            <TouchableOpacity
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              style={{
                paddingHorizontal: Dimensions.get('window').width * 0.04,
                position: 'absolute',
                right: 0,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {showPassword ? (
                <Icon
                  name={'eye'}
                  type={'Ionicons'}
                  style={{
                    color: eyeColor,
                    fontSize: moderateScale(18, 0.6),
                    paddingRight: iconName && R.unit.scale(16),
                  }}
                />
              ) : (
                <EyeHideIcon />
              )}
            </TouchableOpacity>
          </>
        ) : (
          <TextInputc
            style={[
              {
                // width: iconRightName
                //   ? `${100 - spaceFromRight}%`
                //   : R.unit.width(inputWidth),
                color: color,
              },
              Platform.OS === 'android'
                ? styles.inputBox
                : [styles.inputBox, {paddingBottom: 0}],

              inputHeight && {
                height: R.unit.scale(inputHeight),
              },
              props.disable && {
                color: R.color.gray,
              },
              multiline && {
                paddingTop: moderateScale(16, 0.5),
              },
              inputStyles,
            ]}
            onChangeText={e => handleChangeText(e)}
            value={props.value || props.defaultValue}
            placeholder={placeholder}
            placeholderTextColor={placeholdercolor}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines || 1}
            editable={props.disable ? false : true}
            keyboardShouldPersistTaps="always"
            // showSoftInputOnFocus={props.disable ? false : true}
            returnKeyType={returnKeyType}
            ref={forwardedRef}
            onFocus={onFocus}
            onBlur={onBlur}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            textAlignVertical={numberOfLines > 1 ? 'top' : 'center'}
          />
        )}

        {iconRightName && (
          <View
            style={{
              marginRight: iconRightName && R.unit.scale(16),
            }}>
            {customIcon ? (
              <TouchableOpacity onPress={iconPress}>
                {customIcon}
              </TouchableOpacity>
            ) : (
              <Icon
                name={iconRightName}
                type={iconLeftType}
                style={[
                  {
                    color: iconColor,
                    fontSize: moderateScale(18, 0.6),
                    paddingRight: iconRightName && R.unit.scale(16),
                  },
                ]}
              />
            )}
          </View>
        )}
      </View>
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
const styles = ScaledSheet.create({
  fieldSet: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: R.color.white,
    borderWidth: R.unit.scale(1),
    borderBottomWidth: R.unit.scale(1),
    borderRadius: R.unit.scale(10),
  },
  inputBox: {
    paddingHorizontal: R.unit.scale(16, 0.6),
    paddingVertical: Platform.OS === 'ios' ? 0 : R.unit.scale(12, 0.6),
    fontSize: R.unit.scale(16),
    textAlign: 'left',
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
});
export default TextInput;
