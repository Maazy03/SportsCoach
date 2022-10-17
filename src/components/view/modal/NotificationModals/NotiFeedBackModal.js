import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import TextInput from '@components/common/TextInput';
import RatingStars from '@components/common/RatingStars';

function NotiFeedBackModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [authUser, setAuthUser] = useState({
    feedback: '',
    rating: 0,
  });
  const [errorField, setErrorField] = useState({
    feedback: '',
    rating: '',
  });

  const ratingCallBack = data => {
    setAuthUser({...authUser, rating: data});
  };

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

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
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
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
              </View>

              <View style={styles.contentView}>
                <Text
                  variant={'h4'}
                  font={'Sequel651'}
                  color={R.color.blackShade4}
                  align={'left'}
                  gutterBottom={24}
                  style={{width: '100%'}}
                  transform={'none'}>
                  We would be grateful for your feedback. This way we can get
                  better.
                </Text>
                <Text
                  variant={'body2'}
                  font={'InterRegular'}
                  color={R.color.blackShade4}
                  align={'left'}
                  gutterBottom={16}
                  style={{width: '100%'}}
                  transform={'none'}>
                  How would you rate your experience?
                </Text>

                <View style={styles.ratingView}>
                  <RatingStars
                    stars={authUser?.rating}
                    disabled={false}
                    starSize={30}
                    ratingCallBack={ratingCallBack}
                  />
                </View>

                <TextInput
                  secureText={false}
                  title={'Your feedback'}
                  onChangeText={text => {
                    setAuthUser({...authUser, feedback: text});
                  }}
                  placeholder={'Details'}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  titleColor={R.color.black}
                  color={R.color.black}
                  value={authUser?.feedback}
                  gutterBottom={56}
                  isRightTitle={false}
                  // formError={errorField?.fullName}
                  // formErrorText={errorField?.fullName}
                  backgroundColor={'white'}
                  multiline={true}
                  numberOfLines={60}
                  height={148}
                />
              </View>
              <View style={[R.styles.rowView, styles.footerButton]}>
                <Button
                  value={'Cancel'}
                  bgColor={R.color.white}
                  width={'30%'}
                  size={'lg'}
                  variant={'body3'}
                  font={'InterMedium'}
                  color={R.color.blackShade4}
                  disabled={false}
                  loaderColor={R.color.white}
                  onPress={() => setIsBlur(false)}
                />
                <Button
                  value={'Submit'}
                  bgColor={R.color.mainColor}
                  width={'40%'}
                  size={'lg'}
                  variant={'body3'}
                  font={'InterMedium'}
                  color={R.color.white}
                  borderColor={R.color.mainColor}
                  disabled={false}
                  loaderColor={R.color.white}
                  btnWrapperStyles={{marginLeft: R.unit.scale(20)}}
                  onPress={() => setIsBlur(false)}
                />
              </View>
            </SafeAreaView>
          </>
        </View>
      </Modal>
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
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
    paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 80 : 0),
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
    paddingHorizontal: R.unit.scale(10),
    width: '100%',
  },
  contentView: {
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
    alignItems: 'center',
    flex: 1,
  },
  ratingView: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: R.unit.scale(24),
  },
  footerButton: {
    borderTopColor: R.color.gray4,
    borderTopWidth: R.unit.scale(0.75),
    justifyContent: 'flex-end',
    width: '100%',
    padding: R.unit.scale(16),
    backgroundColor: R.color.white,
  },
});

export default NotiFeedBackModal;
