import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';

function InfoModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  return (
    <>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setIsBlur(false)}
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
                backgroundColor: 'rgba(0,0,0,0.15)',
              }}></TouchableOpacity>
          </View>
          <>
            <View style={[styles.modalView]}>
              <Text
                variant={'boddy3'}
                font={'InterRegular'}
                color={R.color.gray}
                align={'left'}
                numberOfLines={2}
                gutterBottom={12}
                transform={'none'}>
                What did you work on with Jessica?
              </Text>
              <Text
                variant={'boddy3'}
                font={'InterRegular'}
                color={R.color.gray}
                align={'left'}
                gutterBottom={12}
                numberOfLines={2}
                transform={'none'}>
                What did Jessica do well on?
              </Text>
              <Text
                variant={'boddy3'}
                font={'InterRegular'}
                color={R.color.gray}
                align={'left'}
                gutterBottom={0}
                numberOfLines={2}
                transform={'none'}>
                What can Jessica improve on?
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
    alignItems: 'flex-start',
    paddingTop: R.unit.height(0.25),
    paddingHorizontal: R.unit.scale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '65%',
    justifyContent: 'space-between',
    padding: R.unit.scale(20),
    borderRadius: R.unit.scale(10),
  },
});

export default InfoModal;
