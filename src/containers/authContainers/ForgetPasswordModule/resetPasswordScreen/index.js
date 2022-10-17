import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import TextInput from '@components/common/TextInput';
import Button from '@components/common/Button';
import AuthBoiler from '@components/layout/authHeader/AuthBoiler';
import AuthSwitch from '@components/common/AuthSwitch';
import {BoxPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import FormValidation from '@components/utils/FormValidation';

function ResetPasswordScreen(props) {
  const dispatch = useDispatch();
  const {navigation} = props;

  const [isLoading, setIsLoading] = useState(false);
  const headerProps = {
    isSubHeader: true,
  };

  const [authUser, setAuthUser] = useState({
    password: '',
  });
  const [errorField, setErrorField] = useState({
    password: '',
  });

  const onSubmit = () => {
    setIsLoading(true);
    const reqData = {
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
          password: '',
        },
        ...obj,
      });
    } else {
      setErrorField({
        password: '',
      });
      setIsLoading(false);
      navigation.navigate('Login', {
        password: authUser?.password,
      });
    }
  };

  return (
    <AuthBoiler {...props} headerProps={headerProps}>
      <ScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View style={styles.formView}>
          <Text
            variant={'h3'}
            font={'Sequel551'}
            color={R.color.black}
            align={'left'}
            gutterBottom={16}
            transform={'none'}>
            Reset password{' '}
          </Text>
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            gutterBottom={24}
            transform={'none'}>
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </Text>
          <TextInput
            secureText={false}
            title={'New Password'}
            onChangeText={text => {
              setAuthUser({...authUser, password: text});
            }}
            color={R.color.black}
            value={authUser?.password}
            gutterBottom={12}
            returnKeyType={'done'}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            formError={errorField?.password}
            formErrorText={errorField?.password}
          />
          <View
            style={{
              alignItems: 'center',
            }}>
            <BoxPasswordStrengthDisplay
              password={authUser?.password}
              minLength={4}
              labelVisible={true}
              wrapperStyle={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom:
                  authUser?.password?.length >= 4
                    ? R.unit.scale(50.5)
                    : R.unit.scale(12),
              }}
              width={R.unit.width(0.94)}
              labelStyle={{
                marginTop: authUser?.password?.length >= 4 && R.unit.scale(12),
                width: '100%',
                fontFamily: 'Inter-Regular',
                fontSize: R.unit.scale(14),
                lineHeight: R.unit.scale(18, 0.3),
              }}
              boxSpacing={2}
              levels={[
                {
                  label: 'Weak',
                  labelColor: '#FF6B6B',
                  activeBarColor: '#FF6B6B',
                },
                {
                  label: 'So-so',
                  labelColor: '#FDCB35',
                  activeBarColor: '#FDCB35',
                },
                {
                  label: 'Good password',
                  labelColor: '#7ACB6B',
                  activeBarColor: '#7ACB6B',
                },
                {
                  label: 'Great password',
                  labelColor: '#4D55E5',
                  activeBarColor: '#4D55E5',
                },
              ]}
            />
            {authUser?.password?.length < 4 && (
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.gray}
                align={'left'}
                style={{width: '100%'}}
                gutterBottom={24}
                transform={'none'}>
                Please use 8+ characters for secure password
              </Text>
            )}
          </View>

          <Button
            value="Reset password"
            bgColor={R.color.mainColor}
            width={'100%'}
            size={'lg'}
            color={R.color.white}
            loader={isLoading}
            disabled={false}
            loaderColor={R.color.white}
            onPress={onSubmit}
            borderWidth={1}
          />
        </View>

        <AuthSwitch
          screen={'SelectRole'}
          text="Don’t have an account?"
          linkText="Get started"
        />
      </ScrollView>
    </AuthBoiler>
  );
}
export default ResetPasswordScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(16),
  },

  forgetPassView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
