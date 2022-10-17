import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import moment from 'moment';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {PaperClipIcon, UploadPhotoIcon} from '@components/utils/Svg';
import TextInput from '@components/common/TextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormValidation from '@components/utils/FormValidation';
import {
  certificates,
  focusTags,
  genderData,
  levels,
  teachingLevel,
} from '@components/constants';
import DropDown from '@components/common/DropDown';
import CoachEditPicturePanel from '@components/view/screens/onBoardingCoach/ImageEdit';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import TagDropDown from '@components/common/TagDropDown';
import CertificateView from '@components/view/screens/onBoardingCoach/CertificateView';

function PersonalInfoTab(props) {
  const {navigation, setHideBtn, hideBtn} = props;
  const dispatch = useDispatch();
  const usableFuncs = ReuseableFunctions({
    actionCall: dispatch,
  });

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [picture, setPicture] = useState();
  const [certificatePics, setCertificatePics] = useState([]);
  const [authUser, setAuthUser] = useState({
    fullName: 'Jay Baumgardner',
    gender: 'Male',
    phoneNumber: '+16102458015',
    dateOfBirth: '27/07/1984',
    bio: '',
    coachExp: '',
    IndusRecog: '',
    studentsTrust: '',
    specialize: '',
    focusTags: [],
    levels: [],
    teaches: [],
    certificates: '',
    expDate: '',
  });
  const [errorField, setErrorField] = useState({
    fullName: '',
    gender: '',
    phoneNumber: '',
    dateOfBirth: '',
    bio: '',
    coachExp: '',
    IndusRecog: '',
    studentsTrust: '',
    specialize: '',
    focusTags: '',
    levels: '',
    teaches: '',
    certificates: '',
    expDate: '',
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

  const uploadCertficateImage = async () => {
    let mediaRes = await usableFuncs.uploadMedia(40);
    return mediaRes;
  };

  const genderDropDown = data => {
    setAuthUser({...authUser, gender: data.value});
  };

  const addCertificateImage = async () => {
    let images = await uploadCertficateImage();
    if (certificatePics?.length === 0) {
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
      setCertificatePics(modifiedImages);
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
      let newArr = [...certificatePics, ...modifiedImages];
      setCertificatePics(newArr);
    }
  };

  const deleteCertificateImage = id => {
    let updatedArray = certificatePics?.filter(item => {
      return item?.id !== id;
    });
    setCertificatePics(updatedArray);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setHideBtn(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setHideBtn(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        enableOnAndroid
        contentContainerStyle={{
          paddingBottom: R.unit.scale(hideBtn ? 150 : 90),
        }}
        style={[
          hideBtn && {
            minHeight: Dimensions.get('window').height,
          },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        extraScrollHeight={!hideBtn ? R.unit.scale(30) : R.unit.scale(60)}
        scrollToOverflowEnabled={false}>
        <View style={styles.formView}>
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

          <Text
            variant={'h4'}
            font={'Sequel651'}
            color={R.color.black}
            gutterBottom={32}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            About you
          </Text>

          <DropDown
            zIndex={1000}
            zIndexIOS={1000}
            zIndexInverse={2000}
            title={'Gender'}
            arrayData={genderData}
            placeholder={'Select Gender'}
            loaderParentCall={genderDropDown}
            value={authUser?.gender}
            defaultValue={authUser?.gender}
            gutterBottom={56}
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
            gutterBottom={56}
            isRightTitle={false}
            formError={errorField?.fullName}
            formErrorText={errorField?.fullName}
            backgroundColor={'white'}
            multiline={true}
            numberOfLines={60}
            height={148}
          />

          <Text
            variant={'h4'}
            font={'Sequel651'}
            color={R.color.black}
            gutterBottom={32}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Credentials and Experience
          </Text>

          <TextInput
            secureText={false}
            title={'Extensive coaching experience'}
            onChangeText={text => {
              setAuthUser({...authUser, coachExp: text});
            }}
            color={R.color.black}
            value={authUser?.coachExp}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.coachExp}
            formErrorText={errorField?.coachExp}
            backgroundColor={'white'}
          />
          <TextInput
            secureText={false}
            title={'Industry recognition'}
            onChangeText={text => {
              setAuthUser({...authUser, IndusRecog: text});
            }}
            color={R.color.black}
            value={authUser?.IndusRecog}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.IndusRecog}
            formErrorText={errorField?.IndusRecog}
            backgroundColor={'white'}
          />
          <TextInput
            secureText={false}
            title={'Trusted by Students'}
            onChangeText={text => {
              setAuthUser({...authUser, studentsTrust: text});
            }}
            color={R.color.black}
            value={authUser?.studentsTrust}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.studentsTrust}
            formErrorText={errorField?.studentsTrust}
            backgroundColor={'white'}
          />
          <TextInput
            secureText={false}
            title={'Specialization description'}
            onChangeText={text => {
              setAuthUser({...authUser, specialize: text});
            }}
            color={R.color.black}
            value={authUser?.specialize}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.specialize}
            formErrorText={errorField?.specialize}
            backgroundColor={'white'}
          />

          <TagDropDown
            zIndex={4000}
            zIndexInverse={1000}
            zIndexIOS={40}
            title={'Levels Taught'}
            titleColor={R.color.black}
            placeholder={'Select'}
            arrayData={levels}
            loaderParentCall={data => {
              setAuthUser({...authUser, levels: data});
            }}
            open={open2}
            setOpen={setOpen2}
            gutterBottom={32}
            value={authUser?.levels}
            formError={errorField?.levels}
            formErrorText={errorField?.levels}
          />

          <TagDropDown
            zIndex={3000}
            zIndexInverse={2000}
            zIndexIOS={30}
            title={'Teaches'}
            titleColor={R.color.black}
            placeholder={'Select'}
            arrayData={teachingLevel}
            loaderParentCall={data => {
              setAuthUser({...authUser, teaches: data});
            }}
            open={open3}
            setOpen={setOpen3}
            gutterBottom={32}
            value={authUser?.teaches}
            formError={errorField?.teaches}
            formErrorText={errorField?.teaches}
          />

          <TagDropDown
            zIndex={2000}
            zIndexInverse={3000}
            zIndexIOS={20}
            title={
              'Specialization (What part of the game can you improve your student?)'
            }
            titleColor={R.color.black}
            placeholder={'Select Focus'}
            arrayData={focusTags}
            loaderParentCall={data => {
              setAuthUser({...authUser, focusTags: data});
            }}
            open={open}
            setOpen={setOpen}
            gutterBottom={32}
            value={authUser?.focusTags}
            formError={errorField?.focusTags}
            formErrorText={errorField?.focusTags}
          />

          <DropDown
            zIndex={1000}
            zIndexInverse={4000}
            zIndexIOS={10}
            isSubTitle={true}
            title={'What certifications/licenses do you hold?'}
            titleColor={R.color.black}
            arrayData={certificates}
            placeholder={'Select Certificate'}
            loaderParentCall={data => {
              setAuthUser({...authUser, certificates: data?.value});
            }}
            value={authUser?.certificates}
            gutterBottom={16}
            formError={errorField?.certificates}
            formErrorText={errorField?.certificates}
          />

          <View style={[R.styles.rowView, styles.twoFieldsRow]}>
            <TextInput
              secureText={false}
              placeholder={'Expiration date'}
              titleColor={R.color.black}
              onChangeText={text => {
                setAuthUser({...authUser, expDate: text});
              }}
              width={0.75}
              inputWidth={0.75}
              color={R.color.black}
              value={authUser?.expDate}
              isRightTitle={false}
              formError={errorField?.expDate}
              formErrorText={errorField?.expDate}
              backgroundColor={'white'}
            />
            <TouchableOpacity
              style={styles.uploadCertificateView}
              activeOpacity={0.6}
              onPress={addCertificateImage}>
              <View style={styles.editSvg}>
                <PaperClipIcon height="100%" width="100%" />
              </View>
            </TouchableOpacity>
          </View>

          {certificatePics?.map((item, index) => {
            return (
              <CertificateView
                item={item}
                key={index}
                removePic={deleteCertificateImage}
              />
            );
          })}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
export default PersonalInfoTab;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    flex: 1,
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
  twoFieldsRow: {
    marginBottom: R.unit.scale(32),
    alignItems: 'flex-end',
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.height(0.024),
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
});
