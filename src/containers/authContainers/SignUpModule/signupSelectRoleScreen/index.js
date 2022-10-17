import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import {CoachRoleIcon, StudentRoleIcon} from '@components/utils/Svg';
import AuthSwitch from '@components/common/AuthSwitch';
import AuthBoiler from '@components/layout/authHeader/AuthBoiler';

function SignUpSuccessScreen(props) {
  const roleData = [
    {
      id: 0,
      svg: <StudentRoleIcon width="100%" height="100%" />,
      title: 'I’m Student',
      desc: 'I want to find a coach and book a training through this service.',
    },
    {
      id: 1,
      svg: <CoachRoleIcon width="100%" height="100%" />,
      title: 'I’m Coach',
      desc: 'I want to do sports training and also get paid easily.',
    },
  ];
  const {navigation} = props;
  const [roleId, setRoleId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const headerProps = {
    isSubHeader: false,
  };

  const selectedRole = item => {
    setRoleId(item?.id);
  };

  const onSubmit = () => {
    navigation.navigate('SignUpAuthOptions', {
      role: roleId,
    });
  };

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
          {roleData?.map((item, index) => {
            return (
              <TouchableOpacity
                style={[R.styles.twoItemsRow, styles.optionView]}
                activeOpacity={0.8}
                onPress={() => selectedRole(item)}
                key={index}>
                <View
                  style={{
                    ...styles.verticalLine,
                    backgroundColor:
                      item?.id === roleId
                        ? R.color.selectedVerticalLineColor
                        : R.color.gray4,
                  }}
                />

                <View style={styles.descriptionView}>
                  <View style={styles.svgView}>{item?.svg}</View>
                  <Text
                    variant={'h2'}
                    font={'Sequel451'}
                    color={R.color.black}
                    align={'left'}
                    gutterBottom={16}
                    transform={'none'}>
                    {item?.title}
                  </Text>
                  <Text
                    variant={'body2'}
                    font={'InterRegular'}
                    color={R.color.gray}
                    align={'left'}
                    transform={'none'}>
                    {item?.desc}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          <Button
            value="Continue"
            bgColor={R.color.mainColor}
            width={'100%'}
            size={'lg'}
            color={R.color.white}
            loader={isLoading}
            gutterTop={60}
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
    alignItems: 'center',
    marginTop: R.unit.scale(80),
  },
  optionView: {
    marginBottom: R.unit.scale(49),
  },
  descriptionView: {
    marginLeft: R.unit.scale(24),
    flex: 1,
  },
  verticalLine: {
    width: R.unit.scale(2),
    height: R.unit.scale(164),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.06),
    marginBottom: R.unit.scale(20.5),
  },
});
