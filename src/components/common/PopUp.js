import R from '@components/utils/R';
import Toast from 'react-native-toast-message';

const PopUp = props => {
  const {
    type = 'customToast',
    heading = 'HELLO',
    visibilityTime = 1000,
    leftIcon,
    rightIcon,
    containerStyles,
  } = props;

  const hideToast = () => {
    Toast.hide();
  };

  Toast.show({
    type: type,
    text1: heading,
    position: 'bottom',
    autoHide: true,
    visibilityTime: visibilityTime,
    bottomOffset: R.unit.width(1) - R.unit.width(0.8),
    keyboardOffset: R.unit.width(1) - R.unit.width(0.94),
    props: {leftIcon: leftIcon, rightIcon: rightIcon, containerStyles},
    onPress: hideToast,
  });
};

export default PopUp;
