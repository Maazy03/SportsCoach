import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import Icon from '@components/common/Icon';
import NotiFeedBackModal from '@components/view/modal/NotificationModals/NotiFeedBackModal';
import NotiReviewModal from '@components/view/modal/NotificationModals/NotiReviewModal';
import navigationService from '@components/navigation/navigationService';
import NotiReportModal from '@components/view/modal/NotificationModals/NotiReportModal';
import HighlightedText from '@components/common/HighIightedText';
import NotiInfoModal from '@components/view/modal/NotificationModals/NotiInfoModal';
import {modifyString} from '@components/utils/ReusbaleFunctions';

function Notification(props) {
  const {item, readNotification} = props;
  const {title, description, image, isSeen, status, sessionText, date} = item;
  const [isFeedBackModal, setIsFeedBackModal] = useState(false);
  const [isReviewModal, setIsReviewModal] = useState(false);
  const [isReportModal, setIsReportModal] = useState(false);
  const [isKeyWord, setIsKeyWord] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    text: '',
    primaryButtonText: '',
  });
  const [isInfoModal, setIsInfoModal] = useState(false);
  const [highlightedText, setHighlightedText] = useState({
    beforeString: '',
    keyword: '',
    afterString: '',
  });

  useEffect(() => {
    let keywords = ['declined', 'expired'];
    setIsKeyWord(false);
    for (let i = 0; i < keywords.length; i++) {
      if (description.includes(keywords[i])) {
        setIsKeyWord(true);
        let result = modifyString(description, keywords[i]);
        const {beforeString, keyword, afterString} = result;
        setHighlightedText({
          beforeString: beforeString?.length > 0 ? beforeString : '',
          keyword: keyword,
          afterString: afterString?.length > 0 ? afterString : '',
        });
      }
    }
    return () => {
      setHighlightedText({
        beforeString: '',
        keyword: '',
        afterString: '',
      });
      setIsKeyWord(false);
    };
  }, [description]);

  useEffect(() => {
    if (highlightedText.keyword === 'declined') {
      setModalData({
        title: 'Certification declined',
        text: 'There should be an explanation of why you declined the user certificate',
        primaryButtonText: 'Update certificate',
      });
    } else if (highlightedText.keyword === 'expired') {
      setModalData({
        title: 'Profile onboarding declined',
        text: 'There should be an explanation of why you declined the user certificate',
        primaryButtonText: 'Go to onboarding',
      });
    }
  }, [highlightedText.keyword]);

  const openInfoModal = () => {
    setIsInfoModal(!isInfoModal);
  };

  const openReviewModal = () => {
    if (status === 'Leave review') {
      setIsReviewModal(!isReviewModal);
    }
  };

  const openFeedBackModal = () => {
    setIsFeedBackModal(!isFeedBackModal);
  };

  const secondaryPress = () => {
    if (item?.title?.toLowerCase().includes('Training'.toLowerCase())) {
      setIsReportModal(!isReportModal);
    } else {
      navigationService.navigate('Inbox', {
        screen: 'ChatsList',
      });
    }
  };

  const thirdButtonType =
    item?.title?.toLowerCase().includes('Training'.toLowerCase()) ||
    (item?.title?.toLowerCase().includes('Lesson'.toLowerCase()) && status);

  return (
    <TouchableOpacity
      disabled={isSeen}
      style={styles.mainLayout}
      activeOpacity={0.7}
      onPress={() => readNotification(item.id)}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.notiImage} resizeMode={'contain'} />
      </View>
      <View style={styles.contentContainer}>
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          style={{width: '97%'}}
          color={R.color.blackShade4}
          align={'left'}
          transform={'none'}>
          {title}:{' '}
          {isKeyWord ? (
            <HighlightedText
              beforeString={highlightedText.beforeString}
              keyword={highlightedText.keyword}
              afterString={highlightedText.afterString}
              onPress={openInfoModal}
            />
          ) : (
            <Text
              variant={'body2'}
              font={'InterRegular'}
              color={R.color.blackShade4}
              align={'left'}
              style={{width: '100%'}}
              transform={'none'}>
              {description}
            </Text>
          )}
        </Text>
        {sessionText && (
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.blackShade4}
            align={'left'}
            gutterTop={16}
            style={{width: '100%'}}
            transform={'none'}>
            {sessionText}
          </Text>
        )}
        {date && (
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.blackShade4}
            align={'left'}
            gutterTop={16}
            style={{width: '100%'}}
            transform={'none'}>
            {moment(Number(date)).format('MMM Do, YYYY')}
          </Text>
        )}

        <View style={{marginTop: R.unit.scale(16)}}>
          {item?.title
            ?.toLowerCase()
            .includes('Announcement'.toLowerCase()) && (
            <Button
              value={status}
              bgColor={R.color.white}
              width={'99%'}
              size={'md'}
              variant={'body3'}
              font={'InterMedium'}
              color={R.color.blackShade4}
              borderColor={R.color.gray4}
              borderWidth={0.75}
              disabled={false}
              loaderColor={R.color.white}
              onPress={openFeedBackModal}
            />
          )}
          {item?.title?.toLowerCase().includes('OnBoarding'.toLowerCase()) && (
            <View style={R.styles.rowView}>
              <Button
                value={'OnBoarding'}
                bgColor={R.color.mainColor}
                width={'64%'}
                size={'md'}
                variant={'body3'}
                font={'InterMedium'}
                color={R.color.white}
                disabled={false}
                loaderColor={R.color.white}
              />
              <Button
                value={'Contact us'}
                bgColor={R.color.white}
                width={'33%'}
                size={'md'}
                variant={'body3'}
                font={'InterMedium'}
                color={R.color.blackShade4}
                borderColor={R.color.gray4}
                borderWidth={0.75}
                disabled={false}
                loaderColor={R.color.white}
              />
            </View>
          )}
          {thirdButtonType && (
            <View style={{...R.styles.rowView, justifyContent: 'flex-end'}}>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.6}
                onPress={secondaryPress}>
                <Icon
                  type={'Ionicons'}
                  name={
                    item?.title
                      ?.toLowerCase()
                      .includes('Training'.toLowerCase())
                      ? 'flag-outline'
                      : 'chatbubble-ellipses-outline'
                  }
                  color={R.color.blackShade4}
                  size={20}
                />
              </TouchableOpacity>
              <Button
                value={status}
                bgColor={R.color.white}
                width={'80%'}
                size={'md'}
                variant={'body3'}
                font={'InterMedium'}
                color={R.color.blackShade4}
                borderColor={R.color.gray4}
                borderWidth={0.75}
                disabled={false}
                loaderColor={R.color.white}
                onPress={openReviewModal}
              />
            </View>
          )}
        </View>
      </View>
      {!isSeen && <View style={styles.unReadDot} />}
      <NotiFeedBackModal isVisibleModal={isFeedBackModal} />
      <NotiReviewModal isVisibleModal={isReviewModal} />
      <NotiReportModal isVisibleModal={isReportModal} />
      <NotiInfoModal
        isIcon={true}
        isVisibleModal={isInfoModal}
        title={modalData?.title}
        isPassed={false}
        text={modalData?.text}
        primaryButtonText={modalData?.primaryButtonText}
        secondaryButtonText={'Contact us'}
      />
    </TouchableOpacity>
  );
}
export default Notification;

const styles = StyleSheet.create({
  mainLayout: {
    // backgroundColor: R.color.lightSilver,
    width: '100%',
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: R.unit.scale(24),
  },
  notiImage: {
    height: R.unit.scale(48),
    width: R.unit.scale(48),
    borderRadius: R.unit.scale(60),
  },
  contentContainer: {
    flex: 1,
  },
  unReadDot: {
    width: R.unit.scale(10),
    height: R.unit.scale(10),
    backgroundColor: R.color.mainColor,
    borderRadius: R.unit.scale(20),
  },
  cancelButton: {
    padding: R.unit.scale(12),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(0.75),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
});
