import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import {CheckIcon} from '@components/utils/Svg';

function EvalCongratsModal(props) {
  const {
    navigation,
    heading = ' Congrats',
    text = '  Your evaluation has been submitted.',
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const closeModal = () => {
    setIsBlur(false);
    navigation.goBack();
  };

  return (
    <>
      <Modal
        animationType={'fades'}
        transparent={true}
        visible={modalVisible}
        // visible={true}
        onRequestClose={closeModal}
        onShow={() => setIsBlur(true)}>
        <View style={styles.centeredView}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
            }}>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}></TouchableOpacity>
          </View>
          <>
            <View style={[styles.modalView]}>
              <View style={styles.notch} />
              <View style={[R.styles.rowView, styles.header]}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  activeOpacity={0.6}
                  onPress={closeModal}>
                  <Icon
                    type={'Ionicons'}
                    name={'close'}
                    color={R.color.blackShade4}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              <View style={{...R.styles.svgView, height: R.unit.scale(48)}}>
                <CheckIcon height="100%" width="100%" />
              </View>
              <Text
                variant={'h4'}
                font={'Sequel651'}
                gutterTop={16}
                color={R.color.blackShade4}
                align={'center'}
                transform={'none'}>
                {heading}
              </Text>

              <Text
                variant={'body3'}
                font={'InterRegular'}
                gutterTop={16}
                color={R.color.gray}
                align={'center'}
                transform={'none'}>
                {text}
              </Text>
            </View>
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
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: R.unit.scale(20),
    paddingBottom: R.unit.scale(32),
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
  },
  notch: {
    marginTop: R.unit.scale(8),
    height: R.unit.scale(4),
    width: R.unit.scale(40),
    backgroundColor: R.color.gray5,
    borderRadius: R.unit.scale(12),
  },
  header: {
    width: '100%',
    marginBottom: R.unit.scale(16),
    justifyContent: 'flex-start',
  },
  cancelButton: {
    padding: R.unit.scale(5),
  },
});

export default EvalCongratsModal;
