import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {
  CalendarReqIcon,
  ClockReqIcon,
  LocationReqIcon,
  WalletReqIcon,
} from '@components/utils/Svg';
import {provided, sessionLocations, skillLevel} from '@components/constants';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';
import SingleTitleHeader from '@components/layout/SingleTitleHeader';
import moment from 'moment';
import HoverText from '@components/common/HoverText';
import CancelLessonModal from '@components/view/modal/CancelLessonModal';

function LessonDetailsScreen(props) {
  const {navigation} = props;
  const {type} = props.route.params;
  const [isModal, setIsModal] = useState(false);
  const [status, setStatus] = useState('upcoming');
  const [buttonTitle, setButtonTitle] = useState('Cancel the lesson');
  const [iconName, setIconName] = useState('');

  useEffect(() => {
    if (status === 'upcoming') {
      setButtonTitle('Cancel the lesson');
      setIconName('chatbubble-ellipses-outline');
    } else if (status === 'pending') {
      setButtonTitle('Accept');
      setIconName('md-close-outline');
    } else {
      setButtonTitle('Evaluate student');
      setIconName('flag-outline');
    }
  }, [status]);

  const submit = () => {
    if (status === 'upcoming') {
      setIsModal(!isModal);
    } else if (status === 'pending') {
      //   console.log('PENDING');
    } else {
      //   console.log('PAST');
    }
  };

  const goBack = () => {
    console.log('GP BACK', type);
    if (type === 'Profile') {
      navigation.navigate('Reviews');
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScrollView
      style={[R.styles.container, styles.mainLayout]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 100 : 20),
      }}>
      <SingleTitleHeader
        title={'Lesson details'}
        isCustomBack={true}
        customBack={goBack}
      />
      <View style={styles.contentContainer}>
        <Text
          variant={'h3'}
          font={'Sequel551'}
          color={R.color.blackShade4}
          align={'left'}
          gutterBottom={8}
          transform={'none'}>
          1-on-1 Tennis Lesson with Michael Baumgardner
        </Text>

        <Divider lineStyles={styles.divider} />

        <View style={R.styles.twoItemsRow}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={R.image.BaseBallSport()}
              resizeMode={'contain'}
              style={styles.image}
            />
          </TouchableOpacity>

          <View style={styles.nameView}>
            <Text
              variant={'body3'}
              font={'Sequel551'}
              color={R.color.blackShade4}
              align={'left'}
              gutterBottom={4}
              transform={'none'}>
              Kate Smith
            </Text>

            <View style={R.styles.twoItemsRow}>
              <Icon
                name={'star'}
                type={'Foundation'}
                color={R.color.mainColor}
                size={16}
                iconStyles={{marginRight: R.unit.scale(8)}}
              />
              <Text
                variant={'body3'}
                font={'InterSemiBold'}
                color={R.color.blackShade4}
                align={'left'}
                transform={'none'}>
                5.0
              </Text>
              <View style={styles.dot} />
              <Text
                variant={'body3'}
                font={'InterSemiBold'}
                color={R.color.blackShade4}
                align={'left'}
                transform={'none'}>
                Beginner
              </Text>
            </View>
          </View>
        </View>

        <Divider lineStyles={styles.divider} />

        <View style={R.styles.rowView}>
          <Text
            variant={'body1'}
            font={'Sequel551'}
            color={R.color.blackShade4}
            align={'left'}
            style={{top: 3}}
            transform={'none'}>
            Lesson details
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray5}
            align={'left'}
            transform={'none'}>
            24 hrs left
          </Text>
        </View>

        <View style={[R.styles.twoItemsRow, {marginTop: R.unit.scale(16)}]}>
          <View style={styles.svgView}>
            <CalendarReqIcon height="100%" width="100%" />
          </View>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            style={{marginLeft: R.unit.scale(8)}}
            transform={'none'}>
            {moment().format('MMM DD, YYYY')}
          </Text>
        </View>

        <View style={[R.styles.twoItemsRow, styles.detailView]}>
          <View style={styles.svgView}>
            <ClockReqIcon height="100%" width="100%" />
          </View>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            style={{marginLeft: R.unit.scale(8)}}
            transform={'none'}>
            {moment().format('hh:mm a')} -{' '}
            {moment().add(2, 'hours').format('hh:mm a')}
          </Text>
        </View>

        <View style={[R.styles.twoItemsRow, styles.detailView]}>
          <View style={styles.svgView}>
            <LocationReqIcon height="100%" width="100%" />
          </View>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            style={{marginLeft: R.unit.scale(8)}}
            numberOfLines={1}
            transform={'none'}>
            DeWitt Clinton Park, W 54th St, New...
          </Text>
        </View>

        <View style={[R.styles.twoItemsRow, styles.detailView]}>
          <View style={styles.svgView}>
            <WalletReqIcon height="100%" width="100%" />
          </View>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            style={{marginLeft: R.unit.scale(8)}}
            transform={'none'}>
            Earning: $64
          </Text>
        </View>

        <Text
          variant={'body3'}
          font={'InterRegular'}
          gutterTop={16}
          color={R.color.gray}
          align={'left'}
          transform={'none'}>
          Please make sure to arrive 10 min before your lesson starts
        </Text>

        <Divider lineStyles={styles.divider} />

        <Text
          variant={'body2'}
          font={'InterRegular'}
          color={R.color.gray}
          align={'left'}
          gutterBottom={16}
          transform={'none'}>
          Every session is based on the athlete's skill level and prior
          knowledge of the sport. If my student needs to work on improving a
          specific move or drill for a team or their own personal aspirations, I
          am always open to working through it.
        </Text>

        {skillLevel?.map((item, index) => {
          return (
            <Text
              variant={'body2'}
              font={'InterRegular'}
              color={R.color.gray}
              align={'left'}
              gutterBottom={4}
              transform={'none'}>
              {index + 1}. {item.title}
            </Text>
          );
        })}

        <Text
          variant={'h6'}
          font={'Sequel551'}
          color={R.color.blackShade4}
          align={'left'}
          gutterTop={48}
          gutterBottom={8}
          transform={'none'}>
          Notes from the coach
        </Text>

        <Text
          variant={'body2'}
          font={'InterRegular'}
          color={R.color.blackShade4}
          align={'left'}
          transform={'none'}>
          Please bring a tennis racket. See you then!
        </Text>

        <Text
          variant={'h6'}
          font={'Sequel551'}
          color={R.color.blackShade4}
          align={'left'}
          gutterTop={48}
          gutterBottom={16}
          transform={'none'}>
          What’s provided
        </Text>

        <View style={{...R.styles.rowView, flexWrap: 'wrap'}}>
          {provided?.map((item, index) => {
            return (
              <View style={[R.styles.twoItemsRow, styles.items]}>
                <Icon
                  name={'check'}
                  type={'MaterialIcons'}
                  color={R.color.hyperLinkColor}
                  size={16}
                  iconStyles={{marginRight: R.unit.scale(16)}}
                />
                <Text
                  variant={'body2'}
                  font={'InterRegular'}
                  color={R.color.blackShade4}
                  align={'left'}
                  transform={'none'}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </View>

        <Text
          variant={'h6'}
          font={'Sequel551'}
          color={R.color.blackShade4}
          align={'left'}
          gutterTop={48}
          gutterBottom={8}
          transform={'none'}>
          What to bring
        </Text>

        <Text
          variant={'body2'}
          font={'InterRegular'}
          color={R.color.blackShade4}
          align={'left'}
          gutterBottom={16}
          transform={'none'}>
          Things that the coach does not provide should be taken by yourself.
        </Text>

        <View style={{...R.styles.rowView, flexWrap: 'wrap'}}>
          {provided?.map((item, index) => {
            return (
              <View style={[R.styles.twoItemsRow, styles.items]}>
                <Icon
                  type={'MaterialIcons'}
                  name={'close'}
                  color={R.color.mainColor}
                  size={16}
                  iconStyles={{marginRight: R.unit.scale(16)}}
                />
                <Text
                  variant={'body2'}
                  font={'InterRegular'}
                  color={R.color.blackShade4}
                  align={'left'}
                  transform={'none'}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </View>

        <Text
          variant={'h6'}
          font={'Sequel551'}
          color={R.color.blackShade4}
          align={'left'}
          gutterTop={48}
          gutterBottom={16}
          transform={'none'}>
          Getting there
        </Text>

        {sessionLocations?.map((item, index) => {
          return (
            <View style={{marginBottom: R.unit.scale(24)}}>
              <Text
                variant={'body2'}
                font={'InterSemiBold'}
                color={R.color.blackShade4}
                align={'left'}
                gutterBottom={8}
                transform={'none'}>
                {item.venue}
              </Text>
              <Text
                variant={'body2'}
                font={'InterRegular'}
                color={R.color.blackShade4}
                align={'left'}
                gutterBottom={12}
                transform={'none'}>
                {item.direction}
              </Text>
              <HoverText text={'Get directions'} />
            </View>
          );
        })}
        <View style={[R.styles.rowView, styles.buttonContainer]}>
          <TouchableOpacity style={styles.cancelButton} activeOpacity={0.6}>
            <Icon
              type={'Ionicons'}
              name={iconName}
              color={R.color.blackShade4}
              size={20}
            />
          </TouchableOpacity>

          <Button
            value={buttonTitle}
            bgColor={status === 'upcoming' ? R.color.white : R.color.mainColor}
            width={'85%'}
            size={'md'}
            font={'InterMedium'}
            variant={'body3'}
            color={status === 'upcoming' ? R.color.blackShade4 : R.color.white}
            borderColor={
              status === 'upcoming' ? R.color.gray4 : R.color.mainColor
            }
            disabled={false}
            loaderColor={R.color.white}
            borderWidth={0.75}
            onPress={submit}
          />
        </View>
      </View>
      <CancelLessonModal isVisibleModal={isModal} />
    </ScrollView>
  );
}
export default LessonDetailsScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  contentContainer: {
    marginTop: R.unit.scale(32),
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  divider: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(16),
  },
  dot: {
    height: R.unit.scale(4),
    width: R.unit.scale(4),
    backgroundColor: R.color.gray5,
    borderRadius: R.unit.scale(29),
    marginHorizontal: R.unit.scale(8),
  },
  image: {
    width: R.unit.scale(50),
    height: R.unit.scale(50),
    borderRadius: R.unit.scale(8),
  },

  nameView: {
    marginLeft: R.unit.scale(16),
  },
  titleView: {
    marginLeft: R.unit.scale(16),
    width: '75%',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(14),
  },
  items: {
    width: '50%',
    paddingBottom: R.unit.scale(16),
  },
  popupSvg: {
    aspectRatio: 1,
    height: R.unit.scale(30),
  },
  detailView: {
    marginTop: R.unit.scale(12),
  },
  buttonContainer: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
  },
  cancelButton: {
    padding: R.unit.scale(
      Platform.OS == 'ios' && R.unit.width(1) > 1000 ? 16 : 12,
    ),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(0.75),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
});
