import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  ActivityIndicator,
  View,
} from 'react-native';
import {Icon, Spinner} from 'native-base';
import {scale} from 'react-native-size-matters';
import Text from './Text';
import R from '@components/utils/R';
import {FacebookIcon, GoogleIcon} from '@components/utils/Svg';

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  extraLargeTitle: R.unit.scale(60, 0.3),
  largeTitle: R.unit.scale(45, 0.3),
  h0: R.unit.scale(36, 0.3),
  h1: R.unit.scale(32, 0.3),
  h2: R.unit.scale(28, 0.3),
  h3: R.unit.scale(26, 0.3),
  h4: R.unit.scale(24, 0.3),
  h5: R.unit.scale(22, 0.3),
  h6: R.unit.scale(20, 0.3),
  body1: R.unit.scale(18, 0.3),
  body2: R.unit.scale(16, 0.3),
  body3: R.unit.scale(14, 0.3),
  body4: R.unit.scale(12, 0.3),
  body5: R.unit.scale(10, 0.3),
  body6: R.unit.scale(9, 0.3),
  small: R.unit.scale(8, 0.3),
};
export const FONTVARIANTS = {
  extraLargeTitle: {
    fontSize: SIZES.extraLargeTitle,
    lineHeight: R.unit.scale(65, 0.3),
  },
  largeTitle: {fontSize: SIZES.largeTitle, lineHeight: R.unit.scale(60, 0.3)},
  h0: {fontSize: SIZES.h0, lineHeight: R.unit.scale(40, 0.3)},
  h1: {fontSize: SIZES.h1, lineHeight: R.unit.scale(38, 0.3)},
  h2: {fontSize: SIZES.h2, lineHeight: R.unit.scale(36, 0.3)},
  h3: {fontSize: SIZES.h3, lineHeight: R.unit.scale(30, 0.3)},
  h4: {fontSize: SIZES.h4, lineHeight: R.unit.scale(26, 0.3)},
  h5: {fontSize: SIZES.h5, lineHeight: R.unit.scale(24, 0.3)},
  h6: {fontSize: SIZES.h6, lineHeight: R.unit.scale(22, 0.3)},
  body1: {fontSize: SIZES.body1, lineHeight: R.unit.scale(20, 0.3)},
  body2: {fontSize: SIZES.body2, lineHeight: R.unit.scale(19, 0.3)},
  body3: {fontSize: SIZES.body3, lineHeight: R.unit.scale(18, 0.3)},
  body4: {fontSize: SIZES.body4, lineHeight: R.unit.scale(16, 0.3)},
  body5: {fontSize: SIZES.body5, lineHeight: R.unit.scale(14, 0.3)},
  body6: {fontSize: SIZES.body5, lineHeight: R.unit.scale(13, 0.3)},
  small: {fontSize: SIZES.small, lineHeight: R.unit.scale(12, 0.3)},
};
export const FONTSSTYLE = {
  //IINTER FAMILY
  InterBlack: {
    fontFamily: 'Inter-Black',
  },
  InterThin: {
    fontFamily: 'Inter-Thin',
  },
  Interlight: {
    fontFamily: 'Inter-Light',
  },
  InterExtraLight: {
    fontFamily: 'Inter-ExtraLight',
  },
  InterBold: {
    fontFamily: 'Inter-Bold',
  },
  InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
  },
  InterExtraBold: {
    fontFamily: 'Inter-ExtraBold',
  },
  InterMedium: {
    fontFamily: 'Inter-Medium',
  },
  InterRegular: {
    fontFamily: 'Inter-Regular',
  },
  InterUnderline: {
    fontFamily: 'nunito-Light',
    textDecorationLine: 'underline',
  },
  //POPPINSS FAMILY
  PoppinsBlack: {
    fontFamily: 'Poppins-Black',
  },
  PoppinsBlackItalic: {
    fontFamily: 'Poppins-BlackItalic',
  },
  PoppinsThin: {
    fontFamily: 'Poppins-Thin',
  },
  PoppinsThinItalic: {
    fontFamily: 'Poppins-ThinItalic',
  },
  PoppinsLight: {
    fontFamily: 'Poppins-Light',
  },
  PoppinsLightItalic: {
    fontFamily: 'Poppins-LightItalic',
  },
  PoppinsExtraLight: {
    fontFamily: 'Poppins-ExtraLight',
  },
  PoppinsExtraLightItalic: {
    fontFamily: 'Poppins-ExtraLightItalic',
  },
  PoppinsBold: {
    fontFamily: 'Poppins-Bold',
  },
  PoppinsBoldItalic: {
    fontFamily: 'Poppins-BoldItalic',
  },
  PoppinsSemiBold: {
    fontFamily: 'Poppins-SemiBold',
  },
  PoppinsSemiBoldItalic: {
    fontFamily: 'Poppins-SemiBoldItalic',
  },
  PoppinsExtraBold: {
    fontFamily: 'Poppins-ExtraBold',
  },
  PoppinsExtraBoldItalic: {
    fontFamily: 'Poppins-ExtraBoldItalic',
  },
  PoppinsMedium: {
    fontFamily: 'Poppins-Medium',
  },
  PoppinsMediumItalic: {
    fontFamily: 'Poppins-MediumItalic',
  },
  PoppinsRegular: {
    fontFamily: 'Poppins-Regular',
  },
  PoppinsItalic: {
    fontFamily: 'Poppins-Italic',
  },
  //SEQUEL 45
  Sequel451: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-45file1' : 'Sequel100Wide-45',
  },
  Sequel452: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-45file1' : 'Sequel100Wide-45',
  },
  //SEQUEL 55
  Sequel551: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-55file1' : 'Sequel100Wide-55',
  },
  Sequel552: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-55file2' : 'Sequel100Wide-55',
  },
  //SEQUEL 65
  Sequel651: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-65file1' : 'Sequel100Wide-65',
  },
  Sequel652: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-65file2' : 'Sequel100Wide-65',
  },
};

const Button = props => {
  const sizes = {
    sm: R.unit.scale(36),
    md: R.unit.scale(48),
    lg: R.unit.scale(56),
  };

  const {
    size,
    btnWrapperStyles,
    color = 'white',
    gutterTop = 0,
    gutterBottom = 0,
    loader = false,
    loaderColor = R.color.white,
    borderColor = R.color.mainColor,
    bgColor = 'white',
    borderWidth = 0,
    iconColor = R.color.white,
    textStyles,
    variant = 'body2',
    font = 'InterSemiBold',
    iconSize = 16,
    activeOpacity,
    disabledButtonBGColor = R.color.disabledButtonColor,
    disabledButtonTextColor = R.color.disabledButtonTextColor,
    //functionality
    onPress,
    disabled,
    isSocial,
    socialType,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.6}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.mainBtn,
        {
          width: props.width,
          height: sizes[size],
          backgroundColor: disabled ? disabledButtonBGColor : bgColor,
          borderColor: borderColor,
          marginTop: R.unit.scale(gutterTop),
          marginBottom: R.unit.scale(gutterBottom),
          borderWidth: R.unit.scale(borderWidth),
        },
        btnWrapperStyles,
        props.justifyContent && {
          justifyContent: props.justifyContent,
        },
      ]}>
      {props.iconName && (
        <Icon
          name={props.iconName}
          type={props.iconType}
          style={[
            styles.iconCustom,
            props.iconStyle && props.iconStyle,
            {fontSize: iconSize, color: iconColor},
          ]}
        />
      )}
      {isSocial && (
        <View style={styles.iconCustom}>
          {socialType === 'facebook' ? <FacebookIcon /> : <GoogleIcon />}
        </View>
      )}
      <Text
        style={[
          styles.buttonText,
          {
            color: disabled ? disabledButtonTextColor : color,
          },
          variant && FONTVARIANTS[variant],
          font && FONTSSTYLE[font],
          textStyles,
        ]}>
        {!loader && props.value}
      </Text>
      {loader && (
        <ActivityIndicator
          style={styles.indicatorStyle}
          size="small"
          color={loaderColor}
        />
      )}

      <Text
        style={[
          styles.text,
          {color: props.textColor, fontSize: scale(15)},
          props.textTransform && {
            textTransform: props.textTransform,
          },
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBtn: {
    flexDirection: 'row',
    borderRadius: R.unit.scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
  indicatorStyle: {
    paddingRight: 5,
    paddingLeft: I18nManager.isRTL ? 5 : 0,
  },
  iconCustom: {
    color: '#C0C0C0',
    paddingRight: R.unit.scale(10),
  },
});

export default Button;
