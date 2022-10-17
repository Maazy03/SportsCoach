import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import OnBoardCoachBoiler from '@components/layout/CoachOnBoardingLayout/OnBoardCoachBoiler';
import {SportsData} from '@components/constants/sportsData';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import Toast from '@components/common/Toast';

function SelectSportScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const common = useSelector(state => state.common);
  const usableFuncs = ReuseableFunctions({
    actionCall: dispatch,
    count: common?.progressCount,
  });
  const [params, setParams] = useState({});

  const selectedSport = data => {
    setParams(data);
  };
  const headerProps = {
    isHeader: true,
    isBothButtons: false,
  };

  const submit = () => {
    // navigation.navigate('PersonalInfo', {
    //   paramsData: {},
    // });

    if (Object.keys(params).length === 0) {
      Toast.show({
        title: 'Please select an option',
        type: 'danger',
      });
    } else {
      usableFuncs.rightButtonNavigate();
      navigation.navigate('PersonalInfo', {
        paramsData: params,
      });
    }
  };

  return (
    <OnBoardCoachBoiler
      {...props}
      headerProps={headerProps}
      onPressNextButton={submit}>
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
          <Text
            variant={'h2'}
            font={'Sequel451'}
            gutterBottom={32}
            color={R.color.black}
            align={'center'}
            transform={'none'}>
            What sport will you be coaching?
          </Text>
          {SportsData?.map((item, index) => {
            return (
              <TouchableOpacity
                style={[R.styles.twoItemsRow, styles.listView]}
                activeOpacity={0.9}
                onPress={() => selectedSport(item)}
                key={index}>
                <Image source={item?.image} />
                <Text
                  variant={'h6'}
                  font={'Sequel551'}
                  color={
                    params?.id === item?.id ? R.color.mainColor : R.color.black
                  }
                  align={'center'}
                  style={{marginLeft: R.unit.scale(24)}}
                  transform={'none'}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </OnBoardCoachBoiler>
  );
}
export default SelectSportScreen;

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
    marginTop: R.unit.scale(21),
  },
  listView: {
    width: '100%',
    marginBottom: R.unit.scale(24),
  },
});
