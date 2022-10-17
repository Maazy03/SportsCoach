import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import OnBoardCoachBoiler from '@components/layout/CoachOnBoardingLayout/OnBoardCoachBoiler';
import {BackgroundCheckDone, BackgroundCheckStart} from '@components/utils/Svg';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import HoverText from '@components/common/HoverText';

function BackgroundCheckScreen(props) {
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

  const [checkStart, setCheckStart] = useState(false);

  const submit = () => {
    navigation.navigate('SetLessons', {
      paramsData: {},
    });
    // if (media?.length < 0) {
    //   Toast.show({
    //     type: 'danger',
    //     title: 'Kindly select atleast one picture or video',
    //   });
    // } else {
    //   usableFuncs.rightButtonNavigate();
    //   navigation.navigate('Experience', {
    //     paramsData: {
    //       sport: {...paramsData},
    //       personal: {...reqData},
    //     },
    //   });
    // }
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
            Background check
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            gutterBottom={24}
            color={R.color.gray}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            We need to check some information about you before posting your
            profile on our site.
          </Text>

          <View style={styles.imageUploadView}>
            <View
              style={{
                ...styles.svgUploadIconView,
                marginBottom: checkStart ? R.unit.scale(8) : R.unit.scale(24),
              }}>
              {checkStart ? (
                <BackgroundCheckDone height="100%" width="100%" />
              ) : (
                <BackgroundCheckStart height="100%" width="100%" />
              )}
            </View>
            <View style={{alignItems: 'center'}}>
              {checkStart && (
                <Text
                  variant={'body3'}
                  font={'InterMedium'}
                  color={R.color.black}
                  align={'center'}
                  style={{maxWidth: '60%'}}
                  numberOfLines={2}
                  gutterBottom={24}
                  transform={'none'}>
                  We will check your background info as soon as possible.
                </Text>
              )}
              <HoverText
                text={
                  checkStart
                    ? 'Change background info'
                    : 'Start background check'
                }
                onPress={() => {
                  setCheckStart(!checkStart);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </OnBoardCoachBoiler>
  );
}
export default BackgroundCheckScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },

  imageUploadRow: {
    width: '100%',
    marginBottom: R.unit.scale(24),
  },

  imageUploadView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: R.unit.scale(24),
    borderRadius: R.unit.scale(20),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
  },
  svgUploadIconView: {
    aspectRatio: 1,
    height: R.unit.scale(64),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: R.unit.scale(24),
  },
  mediaContainer: {
    width: '100%',
    borderRadius: R.unit.scale(10),
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
