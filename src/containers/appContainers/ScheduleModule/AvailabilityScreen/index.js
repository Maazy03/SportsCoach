import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import TextInput from '@components/common/TextInput';
import CheckBox from '@components/common/CheckBox';
import SingleTitleHeader from '@components/layout/SingleTitleHeader';
import CalendarMain from '../Calendars';

function ScheduleAvailabilityScreen(props) {
  const {navigation} = props;

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

  const goBack = () => {
    console.log('GP BACK');
  };

  return (
    <ScrollView
      style={[R.styles.container, styles.mainLayout]}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.scrollContent}>
      <SingleTitleHeader
        title={'Set availability'}
        isCustomBack={true}
        customBack={goBack}
      />

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
            alreadySelected={authUser.intervalCheck}
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
            value={authUser?.interval}
            isRightTitle={false}
            blurOnSubmit={false}
            keyboardType={'number-pad'}
            returnKeyType={'done'}
            formError={errorField?.interval}
            formErrorText={errorField?.interval}
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
            value={authUser?.break}
            isRightTitle={false}
            blurOnSubmit={false}
            keyboardType={'number-pad'}
            returnKeyType={'done'}
            formError={errorField?.break}
            formErrorText={errorField?.break}
          />
        </View>

        <CalendarMain typeOfCalendar={'day'} />
      </View>
    </ScrollView>
  );
}
export default ScheduleAvailabilityScreen;

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
    marginTop: R.unit.scale(10),
  },

  checkBoxTextView: {
    flexDirection: 'row',
    marginLeft: R.unit.scale(12),
    flex: 1,
  },
  inputTextView: {
    marginLeft: R.unit.scale(35),
    marginBottom: R.unit.scale(24),
  },
  policyView: {
    marginBottom: R.unit.scale(24),
    alignItems: 'flex-start',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    // paddingBottom: R.unit.pdBottomList(100),
  },
});
