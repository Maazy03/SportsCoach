import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import AuthBoiler from '@components/layout/authHeader/AuthBoiler';
import AuthSwitch from '@components/common/AuthSwitch';

function CheckEmailScreen(props) {
  const {navigation} = props;
  const {email} = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const headerProps = {
    isSubHeader: true,
  };

  const onSubmit = async () => {
    navigation.navigate('ResetPassword');
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
            Check your email{' '}
          </Text>
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            gutterBottom={12}
            transform={'none'}>
            Instructions to reset your password have been sent to
            <Text
              variant={'body2'}
              font={'InterRegular'}
              color={R.color.black}
              align={'left'}
              gutterBottom={24}
              transform={'none'}>
              {' '}
              {email}
            </Text>
          </Text>
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            gutterBottom={32}
            transform={'none'}>
            If no email is received within ten minutes, check that the submitted
            address is correct.
          </Text>

          <Button
            value="Back to sign in"
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
export default CheckEmailScreen;

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
