import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {login} from '@store/auth/authSlice';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import OnBoardCoachBoiler from '@components/layout/CoachOnBoardingLayout/OnBoardCoachBoiler';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import TextInput from '@components/common/TextInput';
import HoverText from '@components/common/HoverText';
import PayoutMethod from '@components/view/screens/onBoardingCoach/Payment/PayoutMethod';
import NotifyModal from '@components/view/modal/OnBoardCoachModals/NotifyModal';
import CheckBox from '@components/common/CheckBox';
import FormValidation from '@components/utils/FormValidation';
import Toast from '@components/common/Toast';

function PaymentScreen(props) {
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
  const [selected, setSelected] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [authUser, setAuthUser] = useState({
    rate: '',
    valueAfterCutOff: 0,
  });
  const [errorField, setErrorField] = useState({
    rate: '',
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
    // navigation.navigate('PreviewProfile', {
    //   paramsData: {},
    // });

    if (selected) {
      const reqData = {
        rate: authUser?.rate,
      };
      const formError = FormValidation(reqData);
      if (formError) {
        const obj = {};
        formError?.errorArr?.map(item => {
          obj[item] = formError?.message;
        });
        setErrorField({
          ...{
            rate: '',
          },
          ...obj,
        });
      } else {
        usableFuncs.rightButtonNavigate();
        // dispatch(login({isAuth: false}));
        if (!common?.isShowAgain) {
          openModal();
        }
        navigation.navigate('Availability', {
          paramsData: {
            // sport: {...paramsData},
            // personal: {...reqData},
          },
        });
        setErrorField({
          rate: '',
        });
      }
    } else {
      Toast.show({
        title: 'Error',
        message: 'Please accept terms & conditions',
        type: 'danger',
      });
    }
  };

  const goBack = () => {
    usableFuncs.leftButtonNavigate();
  };

  return (
    <OnBoardCoachBoiler
      {...props}
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
            gutterBottom={8}
            color={R.color.black}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Start work and get paid
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            gutterBottom={32}
            color={R.color.gray}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Set your lesson price for your 1-on-1 lesson
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
              isRightTitle={false}
              blurOnSubmit={false}
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
              ${authUser?.valueAfterCutOff}
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
              navigation.navigate('Pricing', {
                paramsData: {},
              });
            }}
            hoverStyles={{
              marginBottom: R.unit.scale(56),
            }}
          />
          <Text
            variant={'h6'}
            font={'Sequel651'}
            color={R.color.black}
            align={'left'}
            gutterBottom={8}
            transform={'none'}>
            Payout methods
          </Text>
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.black}
            align={'left'}
            gutterBottom={16}
            transform={'none'}>
            To get paid, you need to set up a payout method. Our secure payment
            system supports several payout methods, which can be set up below.
            <Text
              variant={'body2'}
              font={'InterRegular'}
              color={R.color.hyperLinkColor}
              align={'left'}
              onPress={() => {
                navigation.navigate('FAQ', {
                  paramsData: {},
                });
              }}
              transform={'none'}>
              Go to FAQ
            </Text>
          </Text>
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.black}
            align={'left'}
            gutterBottom={24}
            transform={'none'}>
            Lytesnap releases payouts about 24 hours after the end of the
            lesson. The time it takes for the funds to appear in your account
            depends on your payout method.
          </Text>
          <PayoutMethod />

          <View style={[R.styles.twoItemsRow, styles.policyView]}>
            <CheckBox
              onPress={() => {
                setSelected(!selected);
              }}
              id={'abcd'}
              alreadySelected={selected}
            />
            <View
              style={{
                flexDirection: 'row',
                marginLeft: R.unit.scale(12),
                flex: 1,
              }}>
              <Text
                variant={'body2'}
                font={'InterRegular'}
                color={R.color.black}
                align={'left'}
                transform={'none'}>
                I have read and agreed to the{' '}
                <Text
                  variant={'body2'}
                  font={'InterRegular'}
                  color={R.color.hyperLinkColor}
                  align={'left'}
                  style={{
                    textDecorationLine: 'underline',
                  }}
                  transform={'none'}>
                  Pricing Policy
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <NotifyModal isVisibleModal={isModal} />
    </OnBoardCoachBoiler>
  );
}
export default PaymentScreen;

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
  displayRateView: {
    backgroundColor: R.color.black,
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(16),
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
    borderRadius: R.unit.scale(10),
  },
  policyView: {
    marginTop: R.unit.scale(32),
    marginBottom: R.unit.scale(24),
  },
});
