import React, {useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  I18nManager,
  Platform,
} from 'react-native';

import {Icon} from 'native-base';
import {useState} from 'react';
import {GOOGLE_GEOCODE} from '@env';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Text from './Text';
import R from '@components/utils/R';
import HoverText from './HoverText';
import navigation from '@components/navigation/navigationService';

const PlacesTextInput = props => {
  const {
    placeholder,
    height = 50,
    width = 0.92,
    color = R.color.black,
    inputHeight = 0,
    inputWidth = 0.2,
    inputContainerStyles,
    gutterTop = 0,
    gutterBottom = 0,
    borderColor = R.color.inputFieldBordercolor,
    backgroundColor,
    placeholdercolor = R.color.gray,
    formError,
    formErrorText,
    errorMTop = 8,
    errorMBottom = 0,
    titleColor,
    listInvertedHeight,
    //Functionality
    value,
    title,
    mode,
    forwardedRef = forwardedRef,
    isRightTitle,
    isSubTitle,
    selectedLocation,
    returnKeyType,
  } = props;

  const [text, setText] = useState(value);

  useEffect(() => {
    // if (mode === 'Edit') {
    setText(value);
    // }
  }, [value]);

  const handleChangeText = text => {
    setText(text);
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  const onPress = () => {
    navigation.navigate('ForgetPassword');
  };

  const locationSelected = (data, details) => {
    setText(data?.description);
    let Coordiantes = {
      address: data?.description,
      latitude: details?.geometry?.location?.lat,
      longitude: details?.geometry?.location?.lng,
    };
    selectedLocation(Coordiantes);
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
                optional
              </Text>
            )}
          </Text>
          {isRightTitle && <HoverText onPress={onPress} />}
        </View>
      )}
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        fetchDetails={true}
        ref={forwardedRef}
        onPress={(data, details = null) => {
          locationSelected(data, details);
        }}
        keepResultsAfterBlur={false}
        minLength={2}
        isRowScrollable={true}
        // debounce={2000}
        enableHighAccuracyLocation={true}
        textInputProps={{
          returnKeyType: returnKeyType,
          placeholderTextColor: placeholdercolor,
          value: text,
          onChangeText: text => {
            handleChangeText(text);
          },
        }}
        enablePoweredByContainer={false}
        listViewDisplayed={false}
        styles={{
          textInputContainer: [
            styles.textInputContainer,
            {
              borderColor:
                formError?.length > 0
                  ? R.color.inputFieldErrorMessageColor
                  : borderColor,
              width: R.unit.width(width),
            },
            backgroundColor && {
              backgroundColor: backgroundColor,
            },
            height && {
              height: R.unit.scale(height),
            },
            inputContainerStyles,
          ],
          textInput: [
            styles.textInput,
            {
              color: color,
            },
            inputHeight && {
              height: R.unit.scale(inputHeight),
            },
          ],
          listView: [
            styles.listView,
            listInvertedHeight && {top: listInvertedHeight},
            {
              height: listInvertedHeight
                ? R.unit.height(0.2)
                : R.unit.height(0.3),
            },
          ],
          row: styles.row,
          // separator: styles.seperator,
          description: styles.description,
        }}
        query={{
          key: GOOGLE_GEOCODE,
          language: 'en',
        }}
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

const styles = StyleSheet.create({
  textInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.color.white,
    borderRadius: R.unit.scale(10),
    borderWidth: R.unit.scale(1),
    paddingHorizontal: R.unit.scale(18, 0.6),
    paddingVertical: Platform.OS === 'ios' ? 0 : R.unit.scale(12, 0.6),
  },
  textInput: {
    backgroundColor: R.color.white,
    color: R.color.white,
    fontFamily: 'Inter-Regular',
    fontSize: R.unit.scale(16),
    paddingHorizontal: 0,
    marginBottom: 0,
    borderBottomWidth: 0,
  },
  listView: {
    backgroundColor: R.color.white,
    position: 'absolute',
    top: 55,
    width: '100%',
    borderWidth: 0.5,
    elevation: 14,
    zIndex: 99999,
  },
  row: {
    borderColor: R.color.inputFieldBordercolor,
    // borderTopWidth: 1,
    // borderWidth: 1,
    borderBottomWidth: 1,
  },
  seperator: {
    height: 0,
    backgroundColor: R.color.mainColor,
  },
  description: {
    color: R.color.black,
    fontSize: R.unit.scale(16),
    fontFamily: 'Inter-Regular',
    padding: R.unit.scale(2),
    maxWidth: R.unit.width(0.85),
  },
});
export default PlacesTextInput;
