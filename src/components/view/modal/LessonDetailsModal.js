import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import {
  ClockReqIcon,
  LocationReqIcon,
  WalletReqIcon,
} from '@components/utils/Svg';
import Button from '@components/common/Button';
import LessonAcceptanceModal from './ScheduleModals/LessonAcceptanceModal';

function LessonDetailsModal(props) {
  const {modalData = {}, showButtons = false} = props;
  const {
    title = '',
    location,
    eventDate,
    start,
    end,
    status = 'upcoming',
  } = modalData;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('Cancel the lesson');
  const [iconName, setIconName] = useState('');

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  useEffect(() => {
    if (status === 'upcoming') {
      setButtonTitle('Accept');
      setIconName('md-close-outline');
    } else if (status === 'pending') {
      setButtonTitle('Cancel the lesson');
      setIconName('chatbubble-ellipses-outline');
    } else {
      setButtonTitle('Evaluate');
      setIconName('flag-outline');
    }
  }, [status]);

  const submit = () => {
    if (status === 'upcoming') {
      setIsModal(!isModal);
      setIsBlur(false);
    } else if (status === 'pending') {
      //   console.log('PENDING');
    } else {
      //   console.log('PAST');
    }
  };

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        // visible={true}
        onRequestClose={() => setIsBlur(false)}
        onShow={() => {
          setIsBlur(true);
        }}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => setIsBlur(false)}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}></TouchableOpacity>
          <>
            <SafeAreaView style={styles.modalView}>
              <View style={styles.notch} />
              <View style={[R.styles.rowView, styles.header]}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setIsBlur(false);
                  }}>
                  <Icon
                    type={'Ionicons'}
                    name={'close'}
                    color={R.color.blackShade4}
                    size={20}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.contentView}>
                <Text
                  variant={'h4'}
                  font={'Sequel651'}
                  color={R.color.blackShade4}
                  align={'left'}
                  numberOfLines={2}
                  transform={'none'}>
                  Lesson details
                </Text>

                <View style={[R.styles.rowView, styles.bioView]}>
                  <Image
                    style={styles.profileImage}
                    imageStyle={{
                      borderRadius: R.unit.scale(120),
                    }}
                    source={R.image.coachPic()}
                    resizeMode="cover"
                  />
                  <Text
                    variant={'body2'}
                    font={'Sequel551'}
                    color={R.color.blackShade4}
                    align={'left'}
                    style={{flex: 1}}
                    numberOfLines={2}
                    lineHeight={24}
                    transform={'none'}>
                    {title}
                  </Text>
                </View>

                <View style={[R.styles.twoItemsRow, styles.detailView]}>
                  <View style={styles.svgView}>
                    <ClockReqIcon height="100%" width="100%" />
                  </View>
                  <Text
                    variant={'body3'}
                    font={'InterRegular'}
                    color={R.color.blackShade4}
                    align={'left'}
                    style={{marginLeft: R.unit.scale(8)}}
                    transform={'none'}>
                    {moment(eventDate).format('MMM D, YYYY')}
                  </Text>
                </View>
                <View style={[R.styles.twoItemsRow, styles.detailView]}>
                  <View style={styles.svgView}>
                    <WalletReqIcon height="100%" width="100%" />
                  </View>
                  <Text
                    variant={'body3'}
                    font={'InterRegular'}
                    color={R.color.blackShade4}
                    align={'left'}
                    style={{marginLeft: R.unit.scale(8)}}
                    transform={'none'}>
                    {moment(start).format('HH:mm a ')}-{' '}
                    {moment(end).format('HH:mm a')}
                  </Text>
                </View>
                <View style={[R.styles.twoItemsRow, styles.detailView]}>
                  <View style={styles.svgView}>
                    <LocationReqIcon height="100%" width="100%" />
                  </View>
                  <Text
                    variant={'body3'}
                    font={'InterRegular'}
                    color={R.color.blackShade4}
                    align={'left'}
                    style={{marginLeft: R.unit.scale(8)}}
                    transform={'none'}>
                    {location}
                  </Text>
                </View>
                {showButtons && (
                  <View style={[R.styles.rowView, styles.buttonContainer]}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      activeOpacity={0.6}>
                      <Icon
                        type={'Ionicons'}
                        name={iconName}
                        color={R.color.blackShade4}
                        size={20}
                      />
                    </TouchableOpacity>

                    <Button
                      value={buttonTitle}
                      bgColor={
                        status === 'upcoming'
                          ? R.color.mainColor
                          : R.color.white
                      }
                      width={'85%'}
                      size={'md'}
                      font={'InterMedium'}
                      variant={'body3'}
                      color={
                        status === 'upcoming'
                          ? R.color.white
                          : R.color.blackShade4
                      }
                      borderColor={
                        status === 'upcoming'
                          ? R.color.mainColor
                          : R.color.gray4
                      }
                      disabled={false}
                      loaderColor={R.color.white}
                      borderWidth={0.75}
                      onPress={submit}
                    />
                  </View>
                )}
              </View>
            </SafeAreaView>
          </>
        </View>
      </Modal>
      <LessonAcceptanceModal
        isVisibleModal={isModal}
        title={'Thank you for your feedback'}
        text={'We are glad that you had a positive experience.'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    alignItems: 'center',
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
  },
  notch: {
    backgroundColor: R.color.gray5,
    width: '15%',
    height: R.unit.scale(5),
    borderRadius: R.unit.scale(100),
    marginTop: R.unit.scale(8),
  },
  header: {
    paddingVertical: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
    paddingHorizontal: R.unit.scale(10),
    width: '100%',
  },
  contentView: {
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
    paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 10 : 20),
  },
  bioView: {
    marginTop: R.unit.scale(25),
    marginBottom: R.unit.scale(12),
    justifyContent: 'flex-start',
    width: '100%',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(17),
  },
  detailView: {
    marginTop: R.unit.scale(12),
  },
  profileImage: {
    width: R.unit.scale(99),
    height: R.unit.scale(99),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.white,
    borderWidth: R.unit.scale(1),
    marginRight: R.unit.scale(12),
  },
  buttonContainer: {
    borderTopColor: R.color.gray4,
    borderTopWidth: R.unit.scale(0.75),
    paddingHorizontal: R.unit.scale(16),
    paddingTop: R.unit.scale(20),
    marginTop: R.unit.scale(32),
    paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 0 : 16),
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

export default LessonDetailsModal;
