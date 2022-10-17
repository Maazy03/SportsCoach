import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import TextInput from '@components/common/TextInput';
import FormValidation from '@components/utils/FormValidation';
import HoverText from '@components/common/HoverText';
import navigationService from '@components/navigation/navigationService';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';

function PrivacyInfoTab(props) {
  const {hideBtn} = props;

  const [authUser, setAuthUser] = useState({
    email: 'kate@gmail.com',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errorField, setErrorField] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

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
        <Text
          variant={'body2'}
          font={'Sequel551'}
          color={R.color.black}
          gutterBottom={8}
          align={'left'}
          style={{width: '100%'}}
          transform={'none'}>
          Email Address
        </Text>

        <Text
          variant={'body2'}
          font={'InterRegular'}
          color={R.color.black}
          gutterBottom={32}
          align={'left'}
          style={{width: '100%'}}
          transform={'none'}>
          Your email address is{' '}
          <Text
            variant={'body2'}
            font={'InterSemiBold'}
            color={R.color.black}
            gutterBottom={32}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            kate@gmail.com
          </Text>
        </Text>

        <TextInput
          secureText={false}
          title={'New email address'}
          onChangeText={text => {
            setAuthUser({...authUser, email: text});
          }}
          color={R.color.black}
          value={authUser?.email}
          backgroundColor={R.color.gray4}
          gutterBottom={56}
          isRightTitle={false}
          formError={errorField?.email}
          formErrorText={errorField?.email}
          disable={true}
        />

        <Text
          variant={'body2'}
          font={'Sequel551'}
          color={R.color.black}
          gutterBottom={8}
          align={'left'}
          style={{width: '100%'}}
          transform={'none'}>
          Password
        </Text>

        <TextInput
          secureText={true}
          title={'Current password'}
          onChangeText={text => {
            setAuthUser({...authUser, oldPassword: text});
          }}
          color={R.color.black}
          value={authUser?.oldPassword}
          gutterBottom={24}
          isRightTitle={false}
          formError={errorField?.oldPassword}
          formErrorText={errorField?.oldPassword}
          backgroundColor={'white'}
        />

        <TextInput
          secureText={true}
          title={'New password'}
          onChangeText={text => {
            setAuthUser({...authUser, newPassword: text});
          }}
          titleColor={R.color.black}
          color={R.color.black}
          value={authUser?.newPassword}
          gutterBottom={24}
          isRightTitle={false}
          formError={errorField?.newPassword}
          formErrorText={errorField?.newPassword}
          backgroundColor={'white'}
        />

        <TextInput
          secureText={true}
          title={'Confirm new password'}
          onChangeText={text => {
            setAuthUser({...authUser, confirmNewPassword: text});
          }}
          titleColor={R.color.black}
          color={R.color.black}
          value={authUser?.confirmNewPassword}
          gutterBottom={24}
          isRightTitle={false}
          formError={errorField?.confirmNewPassword}
          formErrorText={errorField?.confirmNewPassword}
          backgroundColor={'white'}
        />

        <View style={[R.styles.rowView, styles.updateChangesContainer]}>
          <Button
            value={'Cancel'}
            bgColor={R.color.white}
            width={'47%'}
            size={'lg'}
            color={R.color.blackShade4}
            disabled={false}
            loaderColor={R.color.white}
            borderWidth={R.unit.scale(1)}
            borderColor={R.color.gray4}
          />
          <Button
            value={'Save changes'}
            bgColor={R.color.mainColor}
            width={'47%'}
            size={'lg'}
            color={R.color.white}
            disabled={false}
            loaderColor={R.color.white}
          />
        </View>

        <Divider />

        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.gray}
          align={'left'}
          transform={'none'}>
          Can't remember your current password?
        </Text>

        <HoverText
          text={'Reset password via email'}
          onPress={() => {
            navigationService.navigate('PricingInfo');
          }}
          hoverStyles={{
            marginBottom: R.unit.scale(50),
          }}
        />

        <Text
          variant={'h6'}
          font={'Sequel651'}
          color={R.color.blackShade5}
          align={'left'}
          gutterBottom={12}
          transform={'none'}>
          Disable account
        </Text>
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          color={R.color.inputFieldErrorMessageColor}
          align={'left'}
          gutterBottom={24}
          transform={'none'}>
          PLEASE NOTE!{' '}
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.blackShade5}
            align={'left'}
            transform={'none'}>
            This means your account will be hidden until you reactivate it by
            logging back in.
          </Text>
        </Text>
        <Button
          value={'Disable account'}
          bgColor={R.color.white}
          width={'100%'}
          size={'lg'}
          color={R.color.blackShade4}
          disabled={false}
          loaderColor={R.color.white}
          borderWidth={R.unit.scale(1)}
          borderColor={R.color.gray4}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
export default PrivacyInfoTab;

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
  emailButtonContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: R.unit.scale(48),
  },
  updateChangesContainer: {
    marginBottom: R.unit.scale(24),
  },
});
