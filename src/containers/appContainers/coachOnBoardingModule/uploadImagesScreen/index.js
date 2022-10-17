import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import uuid from 'react-native-uuid';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import OnBoardCoachBoiler from '@components/layout/CoachOnBoardingLayout/OnBoardCoachBoiler';
import {UploadPhotoIcon} from '@components/utils/Svg';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import ImagesViewCoach from '@components/view/screens/onBoardingCoach/ImagesViewCoach';
import Toast from '@components/common/Toast';

function UploadImagesScreen(props) {
  const {paramsData} = props.route.params;
  const {navigation} = props;
  const dispatch = useDispatch();
  const common = useSelector(state => state.common);
  const usableFuncs = ReuseableFunctions({
    actionCall: dispatch,
    count: common?.progressCount,
  });
  const headerProps = {
    isHeader: true,
    isBothButtons: true,
  };

  const [media, setMedia] = useState([]);
  const [remaining, setRemaining] = useState(8);
  const [totalMedia, setTotalPictures] = useState(false);

  useEffect(() => {
    if (media?.length >= 8) {
      setTotalPictures(true);
    } else {
      setTotalPictures(false);
    }
  }, [media]);

  const uploadImage = async () => {
    let mediaRes = await usableFuncs.uploadMedia(remaining, 'any');
    if (!!mediaRes) {
      uploadMedia(mediaRes);
    }
  };

  const submit = () => {
    // navigation.navigate('BackgroundCheck', {
    //   // paramsData: {
    //   //   sport: {...paramsData},
    //   //   personal: {...reqData},
    //   // },
    //   paramsData: {},
    // });
    // console.log('S', media?.length);
    if (media?.length <= 0) {
      Toast.show({
        type: 'danger',
        title: 'Kindly select atleast one picture or video',
      });
    } else {
      usableFuncs.rightButtonNavigate();
      navigation.navigate('BackgroundCheck', {
        // paramsData: {
        //   sport: {...paramsData},
        //   personal: {...reqData},
        // },
        paramsData: {},
      });
    }
  };

  const goBack = () => {
    usableFuncs.leftButtonNavigate();
  };

  const uploadMedia = images => {
    if (media?.length === 0) {
      let modifiedImages = images?.map(item => {
        return {
          id: uuid.v4(),
          path: item.path,
          size: item?.size / 1000000,
          modificationDate: moment(Number(item?.modificationDate)).format(
            ' h:mm a, Do MMMM',
          ),
        };
      });
      let filled = 8 - modifiedImages?.length;
      setRemaining(filled);
      setMedia(modifiedImages);
    } else {
      let modifiedImages = images?.map(item => {
        return {
          id: uuid.v4(),
          path: item.path,
          size: item?.size / 1000000,
          modificationDate: moment(Number(item?.modificationDate)).format(
            ' h:mm a, Do MMMM',
          ),
        };
      });
      let newArr = [...media, ...modifiedImages];
      let filled = 8 - newArr?.length;
      setRemaining(filled);
      setMedia(newArr);
    }
  };

  const deleteMedia = id => {
    let updatedArray = media?.filter(item => {
      return item?.id !== id;
    });
    let filled = 8 - updatedArray?.length;
    setRemaining(filled);
    setMedia(updatedArray);
  };

  return (
    <OnBoardCoachBoiler
      {...props}
      headerProps={headerProps}
      onPressNextButton={submit}
      onPressBackButton={goBack}>
      <ScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View style={styles.formView}>
          <Text
            variant={'h4'}
            font={'Sequel651'}
            color={R.color.black}
            align={'left'}
            gutterBottom={8}
            style={{width: '100%'}}
            transform={'none'}>
            Gallery
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            gutterBottom={20}
            color={R.color.gray}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Optional
          </Text>
          <Text
            variant={'body2'}
            font={'InterRegular'}
            gutterTop={4}
            gutterBottom={20}
            color={R.color.gray}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            You can upload a maximum of 8 photos or videos
          </Text>

          <View style={[styles.imageUploadRow]}>
            <TouchableOpacity
              style={styles.imageUploadView}
              activeOpacity={totalMedia ? 1 : 0.6}
              disabled={totalMedia}
              onPress={uploadImage}>
              <View style={styles.svgUploadIconView}>
                <UploadPhotoIcon
                  height="100%"
                  width="100%"
                  fill={totalMedia ? R.color.gray5 : R.color.hyperLinkColor}
                />
              </View>
              <View>
                <Text
                  variant={'body3'}
                  font={'InterMedium'}
                  color={totalMedia ? R.color.gray5 : R.color.hyperLinkColor}
                  transform={'none'}>
                  Add photo or video
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {media?.length > 0 && (
            <Text
              variant={'body3'}
              font={'InterSemiBold'}
              gutterTop={4}
              gutterBottom={32}
              color={R.color.black}
              align={'left'}
              style={{width: '100%'}}
              transform={'none'}>
              Uploaded{' '}
              <Text
                variant={'body3'}
                font={'InterSemiBold'}
                gutterTop={4}
                gutterBottom={32}
                color={R.color.hyperLinkColor}
                align={'left'}
                style={{width: '100%'}}
                transform={'none'}>
                {media?.length}
              </Text>{' '}
              of 8 files
            </Text>
          )}

          <View style={styles.mediaContainer}>
            {media?.map((item, index) => {
              return (
                <ImagesViewCoach
                  item={item}
                  key={index}
                  removePic={deleteMedia}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </OnBoardCoachBoiler>
  );
}
export default UploadImagesScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  uploadCertificateView: {
    height: R.unit.scale(48),
    padding: R.unit.scale(15),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: R.unit.scale(10),
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.height(0.024),
  },
  twoFieldsRow: {
    marginBottom: R.unit.scale(32),
    alignItems: 'flex-end',
  },
  imageUploadRow: {
    width: '100%',
    marginBottom: R.unit.scale(24),
  },

  imageUploadView: {
    width: '100%',
    height: R.unit.scale(60),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: R.unit.scale(16),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    borderStyle: 'dotted',
  },
  svgUploadIconView: {
    aspectRatio: 1,
    height: R.unit.scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: R.unit.scale(4),
  },
  mediaContainer: {
    width: '100%',
    borderRadius: R.unit.scale(10),
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
