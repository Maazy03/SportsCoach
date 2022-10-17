import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import OnBoardCoachBoiler from '@components/layout/CoachOnBoardingLayout/OnBoardCoachBoiler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {UploadPhotoIcon} from '@components/utils/Svg';
import Toast from '@components/common/Toast';
import TextInput from '@components/common/TextInput';
import FormValidation from '@components/utils/FormValidation';
import {genderData} from '@components/constants';
import DropDown from '@components/common/DropDown';
import CoachEditPicturePanel from '@components/view/screens/onBoardingCoach/ImageEdit';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import {useEffect} from 'react';

function PersonalInfoScreen(props) {
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

  const [picture, setPicture] = useState();
  const [authUser, setAuthUser] = useState({
    fullName: '',
    gender: '',
    phoneNumber: '',
    dateOfBirth: '',
    bio: '',
  });
  const [errorField, setErrorField] = useState({
    fullName: '',
    gender: '',
    phoneNumber: '',
    dateOfBirth: '',
    bio: '',
  });

  const uploadImage = async () => {
    const options = {
      mediaType: 'photo',
      cropping: true,
    };
    let mediaRes = await usableFuncs.uploadPictures(options);
    if (!!mediaRes) {
      setPicture(mediaRes.path);
    }
  };

  const submit = () => {
    // navigation.navigate('Experience', {
    //   paramsData: {},
    // });
    // usableFuncs.rightButtonNavigate();

    const reqData = {
      fullName: authUser?.fullName,
      gender: authUser?.gender,
      bio: authUser?.bio,
      phoneNumber: authUser?.phoneNumber,
      dateOfBirth: authUser?.dateOfBirth,
    };
    const formError = FormValidation(reqData);
    if (formError) {
      const obj = {};
      formError?.errorArr?.map(item => {
        obj[item] = formError?.message;
      });
      setErrorField({
        ...{
          fullName: '',
          gender: '',
          bio: '',
          phoneNumber: '',
          dateOfBirth: '',
        },
        ...obj,
      });
    } else {
      usableFuncs.rightButtonNavigate();
      navigation.navigate('Experience', {
        paramsData: {
          // sport: {...paramsData},
          // personal: {...reqData},
        },
      });
      setErrorField({
        fullName: '',
        gender: '',
        bio: '',
        phoneNumber: '',
        dateOfBirth: '',
      });
    }
  };

  const goBack = () => {
    usableFuncs.leftButtonNavigate();
  };

  const genderDropDown = data => {
    setAuthUser({...authUser, gender: data.value});
  };

  return (
    <OnBoardCoachBoiler
      // {...props}
      headerProps={headerProps}
      onPressNextButton={submit}
      onPressBackButton={goBack}>
      <KeyboardAwareScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
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
            gutterBottom={8}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Personal info
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            gutterBottom={32}
            color={R.color.gray}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Introduce yourself to your students
          </Text>

          <View style={[styles.imageUploadRow, R.styles.twoItemsRow]}>
            {picture?.length > 0 ? (
              <View style={styles.imageView}>
                <Image
                  source={{uri: picture}}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: R.unit.scale(16),
                  }}
                  resizeMode={'cover'}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.imageUploadView}
                activeOpacity={0.6}
                onPress={uploadImage}>
                <View style={styles.svgUploadIconView}>
                  <UploadPhotoIcon
                    height="100%"
                    width="100%"
                    fill={R.color.hyperLinkColor}
                  />
                </View>
                <View>
                  <Text
                    variant={'body3'}
                    font={'InterRegular'}
                    color={R.color.hyperLinkColor}
                    transform={'none'}>
                    Add cover photo
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            <CoachEditPicturePanel
              removePic={() => setPicture('')}
              editPic={uploadImage}
              disabled={picture?.length > 0 ? false : true}
            />
          </View>

          <DropDown
            zIndex={1000}
            zIndexIOS={1000}
            zIndexInverse={2000}
            title={'Gender'}
            arrayData={genderData}
            placeholder={'Select Gender'}
            loaderParentCall={genderDropDown}
            value={authUser?.gender}
            gutterBottom={32}
            formError={errorField?.gender}
            formErrorText={errorField?.gender}
          />

          <Text
            variant={'h4'}
            font={'Sequel651'}
            color={R.color.black}
            gutterBottom={32}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Personal info
          </Text>

          <TextInput
            secureText={false}
            title={'Full Name'}
            onChangeText={text => {
              setAuthUser({...authUser, fullName: text});
            }}
            color={R.color.black}
            value={authUser?.fullName}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.fullName}
            formErrorText={errorField?.fullName}
            backgroundColor={'white'}
          />

          <TextInput
            secureText={false}
            title={'Phone number'}
            isSubTitle={true}
            subTitle={'(Optional)'}
            onChangeText={text => {
              setAuthUser({...authUser, phoneNumber: text});
            }}
            color={R.color.black}
            value={authUser?.phoneNumber}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.phoneNumber}
            formErrorText={errorField?.phoneNumber}
            backgroundColor={'white'}
          />

          <TextInput
            secureText={false}
            title={'Date of Birth'}
            onChangeText={text => {
              setAuthUser({...authUser, dateOfBirth: text});
            }}
            color={R.color.black}
            value={authUser?.dateOfBirth}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.dateOfBirth}
            formErrorText={errorField?.dateOfBirth}
            backgroundColor={'white'}
          />

          <TextInput
            secureText={false}
            title={
              'Tell a little about yourself. What makes you a great coach? '
            }
            onChangeText={text => {
              setAuthUser({...authUser, bio: text});
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            titleColor={R.color.black}
            color={R.color.black}
            value={authUser?.bio}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.fullName}
            formErrorText={errorField?.fullName}
            backgroundColor={'white'}
            multiline={true}
            numberOfLines={60}
            height={148}
          />
        </View>
      </KeyboardAwareScrollView>
    </OnBoardCoachBoiler>
  );
}
export default PersonalInfoScreen;

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
  imageUploadRow: {
    width: '100%',
    marginBottom: R.unit.scale(32),
  },
  imageView: {
    width: R.unit.scale(160),
    height: R.unit.scale(165),
    borderRadius: R.unit.scale(16),
  },
  imageUploadView: {
    width: R.unit.scale(160),
    height: R.unit.scale(165),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: R.unit.scale(16),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
  },
  svgUploadIconView: {
    aspectRatio: 1,
    height: R.unit.height(0.017),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEditView: {
    width: R.unit.scale(160),
    height: R.unit.scale(165),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: R.unit.scale(16),
    paddingLeft: R.unit.scale(16),
  },
  editIconView: {
    padding: R.unit.scale(15),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: R.unit.scale(10),
    marginBottom: R.unit.scale(12),
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.height(0.02),
  },
});
