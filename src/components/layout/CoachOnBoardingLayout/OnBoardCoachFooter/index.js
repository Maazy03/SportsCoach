import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {progressBar} from '@store/common/commonSlice';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import navigation from '@components/navigation/navigationService';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function OnBoardCoachFooter(props) {
  const {headerProps, onPressBackButton, onPressNextButton} = props;

  const {
    isBothButtons,
    rightButtonTitle = 'Next',
    leftButtonTitle = 'Go Back',
    singleButtonTitle = 'Start profile setup',
  } = headerProps;

  return (
    <View style={[R.styles.rowView, styles.container]}>
      {isBothButtons ? (
        <>
          <Button
            value={leftButtonTitle}
            bgColor={R.color.white}
            width={'40%'}
            size={'lg'}
            color={R.color.black}
            disabled={false}
            loaderColor={R.color.white}
            btnWrapperStyles={{
              justifyContent: 'flex-start',
            }}
            onPress={onPressBackButton}
          />
          <Button
            value={rightButtonTitle}
            bgColor={R.color.mainColor}
            width={'40%'}
            size={'lg'}
            color={R.color.white}
            disabled={false}
            borderWidth={1}
            borderColor={R.color.gray4}
            onPress={onPressNextButton}
          />
        </>
      ) : (
        <Button
          value={singleButtonTitle}
          bgColor={R.color.mainColor}
          width={'100%'}
          size={'lg'}
          color={R.color.white}
          disabled={false}
          onPress={onPressNextButton}
        />
      )}
    </View>
  );
}
export default OnBoardCoachFooter;

const styles = StyleSheet.create({
  container: {
    width: R.unit.width(1),
    padding: R.unit.scale(16),
    borderTopWidth: 1,
    borderTopColor: R.color.gray4,
  },
});
