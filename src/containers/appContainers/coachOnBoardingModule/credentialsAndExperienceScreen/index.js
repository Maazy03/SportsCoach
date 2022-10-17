import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import uuid from 'react-native-uuid';
import moment from 'moment';
import ImageCropPicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import OnBoardCoachBoiler from '@components/layout/CoachOnBoardingLayout/OnBoardCoachBoiler';
import {PaperClipIcon} from '@components/utils/Svg';
import Toast from '@components/common/Toast';
import TextInput from '@components/common/TextInput';
import FormValidation from '@components/utils/FormValidation';
import {
  certificates,
  focusTags,
  levels,
  teachingLevel,
} from '@components/constants';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import TagDropDown from '@components/common/TagDropDown';
import DropDown from '@components/common/DropDown';
import CertificateView from '@components/view/screens/onBoardingCoach/CertificateView';

function ExperienceScreen(props) {
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

  const [certificatePics, setCertificatePics] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [authUser, setAuthUser] = useState({
    coachExperience: '',
    industryRecog: '',
    trustedByStudents: '',
    specialization: '',
    focusTags: [],
    levels: [],
    teaches: [],
    certificates: '',
    expDate: '',
  });

  const [errorField, setErrorField] = useState({
    coachExperience: '',
    industryRecog: '',
    trustedByStudents: '',
    specialization: '',
    focusTags: '',
    levels: '',
    teaches: '',
    certificates: '',
    expDate: '',
  });

  const uploadImage = async () => {
    try {
      let pickerResult;
      pickerResult = await ImageCropPicker.openPicker({
        multiple: true,
        mediaType: 'photo',
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
            item?.path.includes('.HEIC')
          );
        });
        if (correctFormat) {
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

  const submit = () => {
    // navigation.navigate('UploadImages', {
    //   paramsData: {},
    // });
    // usableFuncs.rightButtonNavigate();
    const reqData = {
      coachExperience: authUser?.coachExperience,
      industryRecog: authUser?.industryRecog,
      trustedByStudents: authUser?.trustedByStudents,
      specialization: authUser?.specialization,
      expDate: authUser?.expDate,
    };
    const formError = FormValidation(reqData);
    if (formError) {
      const obj = {};
      formError?.errorArr?.map(item => {
        obj[item] = formError?.message;
      });
      setErrorField({
        ...{
          coachExperience: '',
          industryRecog: '',
          trustedByStudents: '',
          specialization: '',
          expDate: '',
        },
        ...obj,
      });
    } else {
      usableFuncs.rightButtonNavigate();
      navigation.navigate('UploadImages', {
        data: {},
      });
      setErrorField({
        coachExperience: '',
        industryRecog: '',
        trustedByStudents: '',
        specialization: '',
        expDate: '',
      });
    }
  };

  const goBack = () => {
    usableFuncs.leftButtonNavigate();
  };

  const addCertificateImage = async () => {
    let images = await uploadImage();
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

  return (
    <OnBoardCoachBoiler
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
            align={'left'}
            gutterBottom={8}
            style={{width: '100%'}}
            transform={'none'}>
            Credentials and Experience
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            gutterBottom={32}
            color={R.color.gray}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Optional
          </Text>
          <TextInput
            secureText={false}
            title={'Extensive coaching experience'}
            titleColor={R.color.black}
            onChangeText={text => {
              setAuthUser({...authUser, coachExperience: text});
            }}
            color={R.color.black}
            value={authUser?.coachExperience}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.coachExperience}
            formErrorText={errorField?.coachExperience}
            backgroundColor={'white'}
          />
          <TextInput
            secureText={false}
            title={'Industry recognition'}
            titleColor={R.color.black}
            onChangeText={text => {
              setAuthUser({...authUser, industryRecog: text});
            }}
            color={R.color.black}
            value={authUser?.industryRecog}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.industryRecog}
            formErrorText={errorField?.industryRecog}
            backgroundColor={'white'}
          />
          <TextInput
            secureText={false}
            title={'Trusted by Students'}
            titleColor={R.color.black}
            onChangeText={text => {
              setAuthUser({...authUser, trustedByStudents: text});
            }}
            color={R.color.black}
            value={authUser?.trustedByStudents}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.trustedByStudents}
            formErrorText={errorField?.trustedByStudents}
            backgroundColor={'white'}
          />
          <TextInput
            secureText={false}
            title={'Speicalized in Forehand and backhand'}
            titleColor={R.color.black}
            onChangeText={text => {
              setAuthUser({...authUser, specialization: text});
            }}
            color={R.color.black}
            value={authUser?.specialization}
            gutterBottom={32}
            isRightTitle={false}
            formError={errorField?.specialization}
            formErrorText={errorField?.specialization}
            backgroundColor={'white'}
          />

          <TagDropDown
            zIndex={4000}
            zIndexInverse={1000}
            zIndexIOS={40}
            title={
              'Focus tags (What part of the game can you improve your student?'
            }
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

          <TagDropDown
            zIndex={3000}
            zIndexInverse={2000}
            zIndexIOS={30}
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
            zIndex={2000}
            zIndexInverse={2000}
            zIndexIOS={20}
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
          <DropDown
            zIndex={1000}
            zIndexInverse={2000}
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
    </OnBoardCoachBoiler>
  );
}
export default ExperienceScreen;

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
});
