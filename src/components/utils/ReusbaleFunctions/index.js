import navigationRef from '@components/navigation/navigationService';
import {progressBar} from '@store/common/commonSlice';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from '@components/common/Toast';

export const ReuseableFunctions = props => {
  const {actionCall, count} = props;
  let value = 0.11;
  const rightButtonNavigate = () => {
    if (count < 1) {
      let updatedCount = count + value;
      actionCall && actionCall(progressBar(updatedCount));
    }
  };

  const leftButtonNavigate = () => {
    if (count > 0) {
      let updatedCount = count - value;
      navigationRef.goBack();
      actionCall && actionCall(progressBar(updatedCount));
    }
  };

  const uploadMedia = async (remaining, type = 'photo') => {
    try {
      let pickerResult;
      pickerResult = await ImageCropPicker.openPicker({
        multiple: true,
        mediaType: type,
      });
      if (pickerResult) {
        let correctFormat = pickerResult.every(item => {
          return (
            item?.path.includes('.jpeg') ||
            item?.path.includes('.jpg') ||
            item?.path.includes('.png') ||
            item?.path.includes('.JPG') ||
            item?.path.includes('.PNG') ||
            item?.path.includes('.JPEG') ||
            item?.path.includes('.HEIC') ||
            item.path.includes('.mp4')
          );
        });
        if (correctFormat) {
          if (remaining < pickerResult?.length) {
            Toast.show({
              title: 'Picture Limit Exceeds',
              message: 'The total number of images are greater than 8 ',
              type: 'danger',
            });
          } else {
            return pickerResult;
          }
        } else {
          Toast.show({
            title: 'Picture Error',
            message: 'Image path is wrong',
            type: 'danger',
          });
        }
      }
    } catch (error) {
      Toast.show({
        title: 'Picture Error',
        message: 'Image not uploaded',
        type: 'danger',
      });
    }
  };

  const uploadPictures = async (options, remaining) => {
    try {
      let pickerResult;
      pickerResult = await ImageCropPicker.openPicker(options);
      if (pickerResult) {
        if (
          pickerResult.path.includes('.jpeg') ||
          pickerResult.path.includes('.jpg') ||
          pickerResult.path.includes('.png') ||
          pickerResult.path.includes('.JPG') ||
          pickerResult.path.includes('.PNG') ||
          pickerResult.path.includes('.JPEG') ||
          pickerResult.path.includes('.HEIC')
        ) {
          return pickerResult;
        } else {
          Toast.show({
            title: 'Picture Error',
            message: 'Image path is wrong',
            type: 'danger',
          });
        }
      }
    } catch (error) {
      Toast.show({
        title: 'Picture Error',
        message: 'Image not uploaded',
        type: 'danger',
      });
    }
  };

  return {
    rightButtonNavigate,
    leftButtonNavigate,
    uploadMedia,
    uploadPictures,
  };
};

export const modifyString = (description, keyword) => {
  let refinedtext = description.replace(/[^a-zA-Z0-9 ]/g, '');
  let textFound = refinedtext.split(' ');
  let indexToBe = textFound.indexOf(keyword);
  let bt = textFound.slice(0, indexToBe);
  let at = textFound.slice(indexToBe + 1);
  let beforeString = bt.join(' ');
  let afterString = at.join(' ');
  return {
    beforeString,
    afterString,
    keyword,
  };
};

export default ReuseableFunctions;
