import React, {useState, useRef} from 'react';
import {View, StyleSheet, Keyboard, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthBoiler from '@components/layout/authHeader/AuthBoiler';
import Button from '@components/common/Button';
import TextInput from '@components/common/TextInput';
import Toast from '@components/common/Toast';
import validators from '@components/utils/Validators';
import R from '@components/utils/R';
import AuthSwitch from '@components/common/AuthSwitch';
import FormValidation from '@components/utils/FormValidation';

function SignupScreen(props) {
  const {navigation} = props;
  const [authUser, setAuthUser] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    password: '',
  });
  const [errorField, setErrorField] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const headerProps = {
    isSubHeader: true,
  };

  const emailField = useRef();
  const fullNameField = useRef();
  const phoneNoField = useRef();
  const passwordField = useRef();

  const onSubmit = async () => {
    setIsLoading(true);
    const reqData = {
      email: authUser?.email,
      fullName: authUser?.fullName,
      phoneNumber: authUser?.phoneNumber,
      password: authUser?.password,
    };

    const formError = FormValidation(reqData);
    if (formError) {
      setIsLoading(false);
      const obj = {};
      formError?.errorArr?.map(item => {
        obj[item] = formError?.message;
      });
      setErrorField({
        ...{
          email: '',
          fullName: '',
          phoneNumber: '',
          password: '',
        },
        ...obj,
      });
    } else {
      setErrorField({
        email: '',
        fullName: '',
        phoneNumber: '',
        password: '',
      });
      setIsLoading(false);
      navigation.navigate('SignupSuccess');
    }

    //     const signUrl = URL('auth/signup');
    //     const response = await Post(signUrl, reqData);
    //     if (response !== undefined) {
    //       Toast.show({
    //         title: 'whoopee! Registered Successfully',
    //         message: 'Your company is registered',
    //       });
    //       navigation.navigate('Login');
    //       setAuthUser({
    //         name: '',
    //         email: '',
    //         zipCode: '',
    //         phoneNumber: '',
    //         password: '',
    //         confirmPassword: '',
    //       });
    //     }
    //   }
    //   setIsLoading(false);
    // }
  };

  return (
    <AuthBoiler {...props} headerProps={headerProps}>
      <KeyboardAwareScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 50 : 0),
        }}>
        <View style={styles.formView}>
          <TextInput
            secureText={false}
            title={'Email'}
            onChangeText={text => {
              setAuthUser({...authUser, email: text});
            }}
            color={R.color.black}
            value={authUser?.email}
            gutterBottom={24}
            returnKeyType={'next'}
            forwardedRef={emailField}
            onSubmitEditing={() => {
              fullNameField.current.focus();
            }}
            titleColor={R.color.black}
            formError={errorField.email}
            formErrorText={errorField.email}
          />
          <TextInput
            secureText={false}
            title={'Full name'}
            onChangeText={text => {
              setAuthUser({...authUser, fullName: text});
            }}
            color={R.color.black}
            value={authUser?.fullName}
            gutterBottom={24}
            returnKeyType={'next'}
            forwardedRef={fullNameField}
            onSubmitEditing={() => {
              phoneNoField.current.focus();
            }}
            titleColor={R.color.black}
            formError={errorField.fullName}
            formErrorText={errorField.fullName}
          />
          <TextInput
            secureText={false}
            title={'Phone number'}
            onChangeText={text => {
              setAuthUser({...authUser, phoneNumber: text});
            }}
            isSubTitle={true}
            color={R.color.black}
            value={authUser?.phoneNumber}
            gutterBottom={24}
            returnKeyType={'next'}
            forwardedRef={phoneNoField}
            onSubmitEditing={() => {
              passwordField.current.focus();
            }}
            titleColor={R.color.black}
            formError={errorField.phoneNumber}
            formErrorText={errorField.phoneNumber}
          />
          <TextInput
            secureText={true}
            title={'Password'}
            onChangeText={text => {
              setAuthUser({...authUser, password: text});
            }}
            forwardedRef={passwordField}
            titleColor={R.color.black}
            color={R.color.black}
            value={authUser?.password}
            gutterBottom={32}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            isRightTitle={true}
            formError={errorField.password}
            formErrorText={errorField.password}
            backgroundColor={'white'}
          />

          <Button
            value="Sign up"
            bgColor={R.color.mainColor}
            width={'100%'}
            size={'lg'}
            color={R.color.white}
            loader={isLoading}
            gutterBottom={16}
            disabled={false}
            loaderColor={R.color.white}
            onPress={onSubmit}
            borderWidth={1}
          />
        </View>

        <AuthSwitch
          screen={'Login'}
          text="Already have an account?"
          linkText="Log in"
        />
      </KeyboardAwareScrollView>
    </AuthBoiler>
  );
}
export default SignupScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(15),
  },
  formView: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    marginTop: R.unit.scale(24),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.3),
  },
});
