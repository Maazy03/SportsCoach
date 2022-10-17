import {Dimensions, PixelRatio, Platform} from 'react-native';

const containerWidth = Dimensions.get('window').width;
const containerHeight = Dimensions.get('window').height;
import {moderateScale} from 'react-native-size-matters';

// const initialScale = Math.min(containerWidth, containerHeight) / 375;
const unit = {
  scale: (value, factor = 0.3) => moderateScale(value, factor),
  height: value => containerHeight * value,
  width: value => containerWidth * value,
  pdBottomList: value => {
    if (Platform.OS === 'ios') {
      return value;
    } else {
      return value / 2;
    }
  },
  fontSize: value => {
    if (PixelRatio.get() === 1) {
    } else if (PixelRatio.get() === 1.5) {
      return moderateScale(value - 1.5, 0.3);
    } else if (PixelRatio.get() > 1.5 && PixelRatio.get() < 2) {
      return moderateScale(value - 1.6, 0.3);
    } else if (PixelRatio.get() >= 2 && PixelRatio.get() < 3) {
      return moderateScale(value - 1, 0.3);
    } else if (PixelRatio.get() >= 3 && PixelRatio.get() <= 3.5) {
      return moderateScale(value, 0.3);
    } else if (PixelRatio.get() > 3.5) {
      return moderateScale(value + 2, 0.3);
    }
  },
  //   fontSize: (multi?) => (multi ? initialScale * 16 * multi : initialScale * 16),
  //   windowHeight: (multi?: number) =>
  //     multi ? containerHeight * multi : containerHeight,
  //   windowWidth: (multi?: number) =>
  //     multi ? containerWidth * multi : containerWidth,
  //   screenHeader: () => initialScale * 48,
};

export default unit;
