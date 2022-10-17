import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import AuthSwitch from '@components/common/AuthSwitch';
import AuthBoiler from '@components/layout/authHeader/AuthBoiler';
import HoverText from '@components/common/HoverText';

function SignUpSuccessScreen(props) {
  const {navigation} = props;
  const [roleId, setRoleId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const headerProps = {
    isSubHeader: true,
  };

  const onPress = () => {};

  return (
    <AuthBoiler {...props} headerProps={headerProps}>
      <ScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
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
            Check your email
          </Text>
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            transform={'none'}>
            To confirm your email address, follow the link in the Email we sent
            to
          </Text>
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.black}
            align={'left'}
            gutterBottom={16}
            transform={'none'}>
            lytesnap@gmail.com
          </Text>
          <HoverText text={'Resend Email'} onPress={onPress} />
        </View>

        <AuthSwitch
          screen={'Login'}
          text="Already have an account?"
          linkText="Log in"
        />
      </ScrollView>
    </AuthBoiler>
  );
}
export default SignUpSuccessScreen;

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
});
