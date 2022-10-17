import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {coachBoarding} from '@store/coach/coachSlice';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import {BalloonsIcon} from '@components/utils/Svg';

function CongratsModal(props) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const submit = () => {
    setIsBlur(false);
    dispatch(coachBoarding(true));
  };

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      // visible={true}
      visible={modalVisible}
      onShow={() => {
        setIsBlur(true);
      }}>
      <View style={styles.centeredView}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <TouchableOpacity
            onPress={() => setIsBlur(false)}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <ScrollView
              style={[styles.mainLayout]}
              keyboardShouldPersistTaps="always"
              contentContainerStyle={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <View style={{...R.styles.svgView, height: R.unit.scale(50)}}>
                <BalloonsIcon height="100%" width="100%" />
              </View>
              <Text
                variant={'h4'}
                font={'Sequel651'}
                color={R.color.black}
                gutterTop={24}
                align={'left'}
                gutterBottom={16}
                transform={'none'}>
                Congrats!
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.black}
                align={'center'}
                style={{width: '80%'}}
                gutterBottom={8}
                transform={'none'}>
                You completed your coach profile
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.black}
                align={'center'}
                style={{width: '80%'}}
                gutterBottom={8}
                transform={'none'}>
                Keep on the look out for an email confirming your coach profile
                in the next 48 hours. Once we confirm your coach status, you can
                start scheduling lessons on Lytesnap!
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.black}
                align={'center'}
                style={{width: '80%'}}
                gutterBottom={32}
                transform={'none'}>
                There’s no further action you need to take now.
              </Text>

              <Button
                value={'Go to homepage'}
                bgColor={R.color.mainColor}
                width={'100%'}
                size={'lg'}
                color={R.color.white}
                borderWidth={1}
                gutterBottom={16}
                onPress={submit}
              />
            </ScrollView>
          </View>
        </>
      </View>
    </Modal>
  );
}
export default CongratsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: R.unit.scale(16),
  },
  modalView: {
    backgroundColor: R.color.white,
    alignItems: 'center',
    borderRadius: R.unit.scale(20),
    width: '100%',
    backgroundColor: 'red',
  },
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(16),
    paddingTop: R.unit.scale(32),
    width: '100%',
    borderRadius: R.unit.scale(20),
  },
  policyView: {
    marginBottom: R.unit.scale(32),
  },
});
