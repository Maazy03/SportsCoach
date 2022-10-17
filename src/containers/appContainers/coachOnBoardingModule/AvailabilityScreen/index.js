import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import OnBoardCoachBoiler from '@components/layout/CoachOnBoardingLayout/OnBoardCoachBoiler';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import TextInput from '@components/common/TextInput';
import CheckBox from '@components/common/CheckBox';
import FormValidation from '@components/utils/FormValidation';
import Toast from '@components/common/Toast';
import CalendarMain from '@containers/appContainers/ScheduleModule/Calendars';

function AvailabilityScreen(props) {
  // const {paramsData} = props.route.params;
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
  const [selected, setSelected] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [authUser, setAuthUser] = useState({
    interval: '',
    break: '',
    intervalCheck: false,
    breakCheck: false,
  });
  const [errorField, setErrorField] = useState({
    interval: '',
    break: '',
  });

  useEffect(() => {
    let cutOffValue = authUser?.rate * 0.1;
    let newValue = authUser?.rate - cutOffValue;
    setAuthUser({...authUser, valueAfterCutOff: newValue});
  }, [authUser?.rate]);

  const openModal = () => {
    setIsModal(!isModal);
  };

  const submit = () => {
    navigation.navigate('PreviewProfile', {
      paramsData: {},
    });

    // if (selected) {
    //   const reqData = {
    //     rate: authUser?.rate,
    //   };
    //   const formError = FormValidation(reqData);
    //   if (formError) {
    //     const obj = {};
    //     formError?.errorArr?.map(item => {
    //       obj[item] = formError?.message;
    //     });
    //     setErrorField({
    //       ...{
    //         rate: '',
    //       },
    //       ...obj,
    //     });
    //   } else {
    //     usableFuncs.rightButtonNavigate();
    //     if (!common?.isShowAgain) {
    //       openModal();
    //     }
    //     navigation.navigate('PreviewProfile', {
    //       paramsData: {
    //         // sport: {...paramsData},
    //         // personal: {...reqData},
    //       },
    //     });
    //     setErrorField({
    //       rate: '',
    //     });
    //   }
    // } else {
    //   Toast.show({
    //     title: 'Error',
    //     message: 'Please accept terms & conditions',
    //     type: 'danger',
    //   });
    // }
  };

  const goBack = () => {
    // navigation.goBack();
    usableFuncs.leftButtonNavigate();
  };

  return (
    <OnBoardCoachBoiler
      {...props}
      headerProps={headerProps}
      onPressNextButton={submit}
      onPressBackButton={goBack}>
      <ScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          paddingBottom: 20,
        }}>
        <View style={styles.formView}>
          <Text
            variant={'h4'}
            font={'Sequel651'}
            gutterBottom={8}
            color={R.color.black}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Set availability
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            gutterBottom={24}
            color={R.color.gray}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Select and drag to mark available hours
          </Text>

          <View style={[R.styles.twoItemsRow, styles.policyView]}>
            <CheckBox
              onPress={() => {
                setAuthUser({
                  ...authUser,
                  intervalCheck: !authUser.intervalCheck,
                });
              }}
              id={'abcd'}
              alreadySelected={authUser?.intervalCheck}
            />
            <View style={styles.checkBoxTextView}>
              <Text
                variant={'body2'}
                font={'InterRegular'}
                color={R.color.black}
                align={'left'}
                transform={'none'}>
                The interval between lessons in different locations should be
              </Text>
            </View>
          </View>
          <View style={styles.inputTextView}>
            <TextInput
              secureText={false}
              onChangeText={text => {
                setAuthUser({...authUser, interval: text});
              }}
              width={0.23}
              inputWidth={0.23}
              color={R.color.black}
              value={authUser?.rate}
              isRightTitle={false}
              blurOnSubmit={false}
              keyboardType={'number-pad'}
              returnKeyType={'done'}
              formError={errorField?.rate}
              formErrorText={errorField?.rate}
            />
          </View>
          <View style={[R.styles.twoItemsRow, styles.policyView]}>
            <CheckBox
              onPress={() => {
                setAuthUser({
                  ...authUser,
                  breakCheck: !authUser.breakCheck,
                });
              }}
              id={'abcd'}
              alreadySelected={authUser?.breakCheck}
            />
            <View style={styles.checkBoxTextView}>
              <Text
                variant={'body2'}
                font={'InterRegular'}
                color={R.color.black}
                align={'left'}
                transform={'none'}>
                The break between lessons in one location should be
              </Text>
            </View>
          </View>
          <View style={styles.inputTextView}>
            <TextInput
              secureText={false}
              onChangeText={text => {
                setAuthUser({...authUser, break: text});
              }}
              width={0.23}
              inputWidth={0.23}
              color={R.color.black}
              value={authUser?.rate}
              isRightTitle={false}
              blurOnSubmit={false}
              keyboardType={'number-pad'}
              returnKeyType={'done'}
              formError={errorField?.rate}
              formErrorText={errorField?.rate}
            />
          </View>
          <CalendarMain typeOfCalendar={'day'} />
        </View>
      </ScrollView>
    </OnBoardCoachBoiler>
  );
}
export default AvailabilityScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  checkBoxTextView: {
    flexDirection: 'row',
    marginLeft: R.unit.scale(12),
    flex: 1,
    marginTop: R.unit.scale(2),
  },
  inputTextView: {
    marginLeft: R.unit.scale(35),
    marginBottom: R.unit.scale(24),
  },
  policyView: {
    marginBottom: R.unit.scale(24),
    alignItems: 'flex-start',
  },
});
