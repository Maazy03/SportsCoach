import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import Icon from './Icon';
import Text from './Text';
import Button from './Button';

const SocialButtons = props => {
  const {text = 'Forgot Password', onSubmit} = props;
  const [isLoading, setIsLoading] = useState(false);

  const pressed = () => {
    // console.log('RESS');
  };

  return (
    <>
      <Button
        value="Sign in with Facebook"
        bgColor={R.color.white}
        width={'100%'}
        size={'lg'}
        color={R.color.black}
        loader={isLoading}
        disabled={false}
        loaderColor={R.color.white}
        onPress={() => onSubmit('facebook')}
        borderWidth={1}
        borderColor={R.color.inputFieldBordercolor}
        isSocial={true}
        socialType={'facebook'}
      />
      <Button
        value="Sign in with Google"
        bgColor={R.color.white}
        width={'100%'}
        size={'lg'}
        color={R.color.black}
        loader={isLoading}
        gutterTop={12}
        disabled={false}
        loaderColor={R.color.white}
        onPress={() => onSubmit('google')}
        isSocial={true}
        borderWidth={1}
        borderColor={R.color.inputFieldBordercolor}
        socialType={'google'}
      />
    </>
  );
};
export default SocialButtons;
const styles = StyleSheet.create({
  mainLayout: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.03),
  },
});
