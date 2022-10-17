import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import TextInput from '@components/common/TextInput';
import FormValidation from '@components/utils/FormValidation';
import {sportType} from '@components/constants';
import DropDown from '@components/common/DropDown';
import HoverText from '@components/common/HoverText';
import navigationService from '@components/navigation/navigationService';

function BasicInfoTab(props) {
  const {navigation, hideBtn} = props;
  const [authUser, setAuthUser] = useState({
    sport: 'Tennis',
    plan: 'What will you cover in the lesson? What should students expect?',
    breakInTime: '30',
    locationTime: '30',
    rate: 50,
    cutOffRate: 0,
  });
  const [errorField, setErrorField] = useState({
    sport: '',
    plan: '',
    breakInTime: '',
    locationTime: '',
    rate: 0,
    cutOffRate: 0,
  });

  useEffect(() => {
    let cutOffValue = authUser?.rate * 0.1;
    let newValue = authUser?.rate - cutOffValue;
    setAuthUser({...authUser, cutOffRate: newValue});
  }, [authUser?.rate]);

  const sprtDropDown = data => {
    setAuthUser({...authUser, sport: data.value});
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'always'}
      enableOnAndroid
      contentContainerStyle={{
        paddingBottom: R.unit.scale(hideBtn ? 150 : 90),
      }}
      style={[
        hideBtn && {
          minHeight: R.unit.height(1),
        },
      ]}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      extraScrollHeight={!hideBtn ? R.unit.scale(30) : R.unit.scale(60)}
      scrollToOverflowEnabled={false}>
      <View style={styles.formView}>
        <DropDown
          zIndex={1000}
          zIndexIOS={1000}
          zIndexInverse={2000}
          title={'Sport type'}
          arrayData={sportType}
          placeholder={'Select Sport'}
          loaderParentCall={sprtDropDown}
          value={authUser?.sport}
          defaultValue={authUser?.sport}
          gutterBottom={32}
          formError={errorField?.sport}
          formErrorText={errorField?.sport}
        />

        <TextInput
          secureText={false}
          title={'Tell students about your session plan'}
          onChangeText={text => {
            setAuthUser({...authUser, plan: text});
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          titleColor={R.color.black}
          color={R.color.gray}
          value={authUser?.plan}
          gutterBottom={56}
          isRightTitle={false}
          formError={errorField?.plan}
          formErrorText={errorField?.plan}
          backgroundColor={'white'}
          multiline={true}
          numberOfLines={60}
          height={148}
        />

        <Text
          variant={'body2'}
          font={'Sequel551'}
          color={R.color.black}
          gutterBottom={32}
          align={'left'}
          style={{width: '100%'}}
          transform={'none'}>
          Break in-between lessons
        </Text>

        <TextInput
          secureText={false}
          title={'How much time would you need for a break in-between lessons?'}
          onChangeText={text => {
            setAuthUser({...authUser, breakInTime: text});
          }}
          color={R.color.black}
          value={authUser?.breakInTime}
          gutterBottom={32}
          isRightTitle={false}
          formError={errorField?.breakInTime}
          formErrorText={errorField?.breakInTime}
          backgroundColor={'white'}
        />

        <TextInput
          secureText={false}
          title={
            'You are available at multipe locations. How much time would you like in-between lessons at different locations? '
          }
          onChangeText={text => {
            setAuthUser({...authUser, locationTime: text});
          }}
          color={R.color.black}
          value={authUser?.locationTime}
          gutterBottom={56}
          isRightTitle={false}
          formError={errorField?.locationTime}
          formErrorText={errorField?.locationTime}
          backgroundColor={'white'}
        />

        <Text
          variant={'body2'}
          font={'Sequel551'}
          color={R.color.black}
          gutterBottom={32}
          align={'left'}
          style={{width: '100%'}}
          transform={'none'}>
          Set your lesson price
        </Text>

        <View style={R.styles.twoItemsRow}>
          <TextInput
            secureText={false}
            titleColor={R.color.black}
            title={'Set the price for 1 hour lessons'}
            subTitleColor={R.color.gray}
            subTitle={'USD'}
            isSubTitle={true}
            onChangeText={text => {
              setAuthUser({...authUser, rate: text});
            }}
            width={0.76}
            inputWidth={0.76}
            color={R.color.black}
            value={authUser?.rate}
            keyboardType={'number-pad'}
            returnKeyType={'done'}
            formError={errorField?.rate}
            formErrorText={errorField?.rate}
          />
          <Text
            variant={'body2'}
            font={'Sequel551'}
            gutterTop={25}
            color={R.color.black}
            style={{
              marginLeft: R.unit.scale(8),
              flex: 1,
            }}
            align={'left'}
            transform={'none'}>
            /1 hour
          </Text>
        </View>

        <View style={[R.styles.rowView, styles.displayRateView]}>
          <View>
            <Text
              variant={'body2'}
              font={'Sequel551'}
              color={R.color.white}
              align={'left'}
              gutterBottom={5}
              transform={'none'}>
              Amount you’ll earn
            </Text>
            <Text
              variant={'body2'}
              font={'Sequel551'}
              color={R.color.white}
              align={'left'}
              transform={'none'}>
              for 1 hour lessons
            </Text>
          </View>

          <Text
            variant={'h4'}
            font={'Sequel651'}
            color={R.color.white}
            align={'right'}
            style={{
              maxWidth: '40%',
            }}
            numberOfLines={1}
            transform={'none'}>
            ${authUser?.cutOffRate}
          </Text>
        </View>
        <Text
          variant={'body3'}
          font={'InterSemiBold'}
          color={R.color.black}
          gutterBottom={8}
          align={'left'}
          transform={'none'}>
          Lytesnap charges 10%{' '}
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.black}
            align={'left'}
            transform={'none'}>
            of your listed lesson price
          </Text>
        </Text>

        <HoverText
          text={'System fee info'}
          onPress={() => {
            navigationService.navigate('PricingInfo');
          }}
          hoverStyles={{
            marginBottom: R.unit.scale(56),
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
export default BasicInfoTab;

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
  //
  displayRateView: {
    backgroundColor: R.color.black,
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(16),
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
    borderRadius: R.unit.scale(10),
  },
});
