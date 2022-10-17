import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import OnBoardCoachBoiler from '@components/layout/CoachOnBoardingLayout/OnBoardCoachBoiler';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import SessionPlaces from '@components/view/screens/onBoardingCoach/HostingSession/SessionPlaces';
import AddSessionPlace from '@components/view/screens/onBoardingCoach/HostingSession/AddSessionPlace';
import Toast from '@components/common/Toast';

function HostSessionScreen(props) {
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

  const [sessionPlaces, setSessionPlaces] = useState();

  const addPlace = data => {
    let tempArr = sessionPlaces?.length > 0 ? [...sessionPlaces] : [];
    tempArr.push(data);
    setSessionPlaces(tempArr);
  };

  const updatePlace = data => {
    const newArr = sessionPlaces.map(obj => {
      if (obj.id === data.id) {
        return {...obj, venue: data?.venue, address: data?.address};
      }

      return obj;
    });
    setSessionPlaces(newArr);
  };

  const removePlace = id => {
    let updatedArr = sessionPlaces?.filter(item => {
      return item?.id !== id;
    });
    setSessionPlaces(updatedArr);
  };

  const submit = () => {
    // navigation.navigate('FAQ', {
    //   paramsData: {},
    // });
    if (sessionPlaces?.length > 0) {
      usableFuncs.rightButtonNavigate();
      navigation.navigate('FAQ', {
        paramsData: {
          // sport: {...paramsData},
          // personal: {...reqData},
        },
      });
    } else {
      Toast.show({
        title: 'Error',
        message: 'Please add atleast 1 hosting place',
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
      <ScrollView
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
            Where would you host your lesson?
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            gutterBottom={32}
            color={R.color.gray}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            1-on-1 lesson
          </Text>
          {sessionPlaces?.length > 0 ? (
            <>
              {sessionPlaces?.map((item, index, arr) => {
                let isLast;
                if (index === arr.length - 1) {
                  isLast = true;
                } else {
                  isLast = false;
                }
                return (
                  <SessionPlaces
                    key={index}
                    item={item}
                    isLast={isLast}
                    deletePlace={removePlace}
                    addItems={addPlace}
                    editItems={updatePlace}
                  />
                );
              })}
            </>
          ) : (
            <View
              style={{
                height: '80%',
              }}>
              <AddSessionPlace addItems={addPlace} />
            </View>
          )}
        </View>
      </ScrollView>
    </OnBoardCoachBoiler>
  );
}
export default HostSessionScreen;

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
  uploadCertificateView: {
    height: R.unit.scale(48),
    padding: R.unit.scale(15),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: R.unit.scale(10),
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.height(0.024),
  },
  twoFieldsRow: {
    marginBottom: R.unit.scale(32),
    alignItems: 'flex-end',
  },
});
