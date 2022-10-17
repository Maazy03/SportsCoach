import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import Text from '@components/common/Text';
import AuthBoiler from '@components/layout/authHeader/AuthBoiler';
import Button from '@components/common/Button';
import R from '@components/utils/R';
import OrDivider from '@components/common/OrDivider';
import SocialButtons from '@components/common/SocialButtons';
import AuthSwitch from '@components/common/AuthSwitch';
import {CoachRoleIcon, StudentRoleIcon} from '@components/utils/Svg';

function SignUpAuthOptionsScreen(props) {
  const dispatch = useDispatch();
  const {role} = props?.route?.params;
  const headerProps = {
    isSubHeader: false,
  };
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitSocial = type => {
    if (type === 'facebook') {
      // console.log('ON SUBIT CALLED FB');
    } else {
      // console.log('ON SUBIT CALLED GOOGLE');
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
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View style={styles.formView}>
          <View style={{...R.styles.svgView, height: R.unit.scale(48)}}>
            {role === 0 ? (
              <StudentRoleIcon height="100%" width="100%" />
            ) : (
              <CoachRoleIcon height="100%" width="100%" />
            )}
          </View>
          <Text
            variant={'h6'}
            font={'Sequel651'}
            gutterTop={16}
            gutterBottom={R.unit.scale(24)}
            color={R.color.black}
            align={'center'}
            transform={'none'}>
            {role === 0 ? 'I’m Student' : 'I’m Coach'}
          </Text>

          <View style={styles.socialButtonLayout}>
            <SocialButtons onSubmit={onSubmitSocial} />
          </View>

          <OrDivider />

          <Button
            value="Sign up with email"
            bgColor={R.color.white}
            width={'100%'}
            size={'lg'}
            color={R.color.black}
            loader={isLoading}
            gutterTop={12}
            disabled={false}
            loaderColor={R.color.white}
            onPress={() => navigation.navigate('Signup')}
            borderWidth={1}
            borderColor={R.color.gray4}
          />
        </View>

        <AuthSwitch
          screen={'Login'}
          text="Already have an account?"
          linkText="Login"
        />
      </ScrollView>
    </AuthBoiler>
  );
}
export default SignUpAuthOptionsScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: R.unit.scale(10),
    marginTop: R.unit.scale(100),
  },
  socialButtonLayout: {
    marginTop: R.unit.scale(32),
    width: '100%',
    marginBottom: R.unit.scale(16),
  },
});
