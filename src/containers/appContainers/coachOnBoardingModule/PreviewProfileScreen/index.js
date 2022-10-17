import React, {useEffect, useState} from 'react';
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
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import MediaDisplay from '@components/view/screens/onBoardingCoach/PreviewProfile/MediaDisplay';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import VariationsDisplay from '@components/view/screens/onBoardingCoach/PreviewProfile/VariationsDisplay';
import CommonQuestions from '@components/view/screens/onBoardingCoach/PreviewProfile/CommonQuestions';
import LocationsDisplay from '@components/view/screens/onBoardingCoach/PreviewProfile/LocationsDisplay';
import CertificatesDisplay from '@components/view/screens/onBoardingCoach/PreviewProfile/CertificatesDisplay';
import CredentialsDisplay from '@components/view/screens/onBoardingCoach/PreviewProfile/CredentialsDisplay';
import CongratsModal from '@components/view/modal/OnBoardCoachModals/CongratsModal';
import {
  bioUser,
  commonQuestions,
  credentails,
  variations,
} from '@components/constants';
import {InfoIcon} from '@components/utils/Svg';

function PreviewProfileScreen(props) {
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
    notchHeader: true,
    rightButtonTitle: 'Finish',
    leftButtonTitle: 'Back to Edit',
  };

  const [isActive, setIsActive] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [bio, setBio] = useState(bioUser);

  useEffect(() => {
    if (!isActive) {
      const length = 120;
      let trimmedString = bio.substring(0, length);
      trimmedString = trimmedString + '....';
      setBio(trimmedString);
    } else {
      setBio(bioUser);
    }
  }, [isActive]);

  const openModal = () => {
    setIsModal(!isModal);
  };

  const submit = () => {
    openModal();
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
          paddingBottom: 20,
        }}>
        <View style={styles.mediaView}>
          <MediaDisplay />
        </View>
        <View style={styles.formView}>
          <View style={[R.styles.twoItemsRow, styles.nameView]}>
            <Image
              source={R.image.BaseBallSport()}
              style={{borderRadius: R.unit.scale(10)}}
            />
            <Text
              variant={'h3'}
              font={'Sequel651'}
              color={R.color.black}
              align={'left'}
              style={{flex: 1, marginLeft: R.unit.scale(16)}}
              transform={'none'}>
              Michael Baumgardner
            </Text>
          </View>

          <View style={[R.styles.rowView, styles.locationView]}>
            <View style={R.styles.rowView}>
              <Icon
                name={'star'}
                type={'Foundation'}
                color={R.color.mainColor}
                size={25}
              />
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.blackShade4}
                align={'left'}
                style={{marginLeft: R.unit.scale(8)}}
                transform={'none'}>
                5.0
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.gray}
                align={'left'}
                style={{
                  marginLeft: R.unit.scale(4),
                  textDecorationLine: 'underline',
                }}
                transform={'none'}>
                (7 reviews)
              </Text>
            </View>

            <View style={R.styles.rowView}>
              <Text
                variant={'body3'}
                font={'InterSemiBold'}
                color={R.color.blackShade4}
                align={'left'}
                style={{marginRight: R.unit.scale(8)}}
                transform={'none'}>
                Tennis coach
              </Text>
              <View style={R.styles.dot} />
              <Text
                variant={'body3'}
                font={'InterSemiBold'}
                color={R.color.blackShade4}
                align={'left'}
                style={{
                  marginLeft: R.unit.scale(8),
                }}
                transform={'none'}>
                New York
              </Text>
            </View>
          </View>

          <Divider />

          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.black}
            align={'left'}
            transform={'none'}>
            {bio}
          </Text>

          <View>
            <TouchableOpacity
              onPress={() => setIsActive(!isActive)}
              activeOpacity={0.9}
              style={[R.styles.twoItemsRow, styles.showMoreLayout]}>
              <Icon
                name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-right'}
                type={'MaterialIcons'}
                color={R.color.blackShade4}
                size={25}
              />
              <Text
                variant={'body3'}
                font={'InterSemiBold'}
                color={R.color.blackShade4}
                align={'left'}
                style={{marginLeft: R.unit.scale(5)}}
                transform={'none'}>
                {isActive ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          </View>

          {variations?.map((item, index) => {
            return <VariationsDisplay key={index} item={item} />;
          })}

          {credentails?.length > 0 && (
            <>
              <CredentialsDisplay options={credentails} />
            </>
          )}

          <Divider lineStyles={{height: R.unit.scale(0.7), marginBottom: 0}} />

          <CertificatesDisplay />

          <Text
            variant={'h3'}
            font={'Sequel551'}
            color={R.color.black}
            align={'left'}
            gutterTop={48}
            gutterBottom={24}
            transform={'none'}>
            Training locations
          </Text>

          <LocationsDisplay />

          <Text
            variant={'h3'}
            font={'Sequel551'}
            color={R.color.black}
            align={'left'}
            gutterTop={48}
            gutterBottom={24}
            transform={'none'}>
            Common questions
          </Text>

          <Divider lineStyles={{height: R.unit.scale(0.7), marginBottom: 0}} />
          {commonQuestions?.length > 0 && (
            <>
              <CommonQuestions options={commonQuestions} />
            </>
          )}
        </View>

        <Divider
          lineStyles={{height: R.unit.scale(0.7), marginTop: R.unit.scale(48)}}
        />

        <View style={[R.styles.rowView, styles.infoView]}>
          <Text
            variant={'body4'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            numberOfLines={2}
            style={{width: '70%'}}
            transform={'none'}>
            You can continue to edit your profile once your account is
            established.
          </Text>
          <View style={R.styles.svgView}>
            <InfoIcon height="100%" width="100%" />
          </View>
        </View>
      </ScrollView>
      <CongratsModal isVisibleModal={isModal} />
    </OnBoardCoachBoiler>
  );
}
export default PreviewProfileScreen;

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
    marginTop: R.unit.scale(30),
  },
  mediaView: {
    width: '100%',
    marginTop: R.unit.scale(50),
  },
  nameView: {
    marginTop: R.unit.scale(16),
  },
  locationView: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(16),
  },
  listView: {
    width: '100%',
    marginBottom: R.unit.scale(24),
  },
  svgView: {
    height: R.unit.scale(40),
    marginRight: R.unit.scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
