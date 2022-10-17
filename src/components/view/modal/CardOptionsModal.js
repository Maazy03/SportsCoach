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
import {DefaultArrowIcon, TrashIcon} from '@components/utils/Svg';

function CardOptionsModal(props) {
  const {modalData, setDefaultCard, removeCard} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  console.log(modalData);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const defaultCard = () => {
    setDefaultCard(modalData.id);
    setIsBlur(false);
  };
  const remove = () => {
    removeCard(modalData.id);
    setIsBlur(false);
  };

  return (
    <>
      <Modal
        animationType={'fade'}
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
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}></TouchableOpacity>
          <>
            <SafeAreaView style={styles.modalView}>
              <View style={styles.contentView}>
                <TouchableOpacity
                  onPress={defaultCard}
                  style={{
                    ...R.styles.twoItemsRow,
                    marginBottom: R.unit.scale(12),
                  }}>
                  <View style={styles.menuSvgView}>
                    <DefaultArrowIcon height="100%" width="100%" />
                  </View>
                  <Text
                    variant={'body3'}
                    font={'InterRegular'}
                    color={R.color.blackShade4}
                    align={'left'}
                    transform={'none'}>
                    Set as Default
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={R.styles.twoItemsRow} onPress={remove}>
                  <View style={styles.menuSvgView}>
                    <TrashIcon height="100%" width="100%" />
                  </View>
                  <Text
                    variant={'body3'}
                    font={'InterRegular'}
                    color={R.color.blackShade4}
                    align={'left'}
                    transform={'none'}>
                    Remove Card
                  </Text>
                </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '40%',
    alignItems: 'center',
    borderRadius: R.unit.scale(10),
    position: 'absolute',
    right: R.unit.width(1) - R.unit.width(0.95),
    top: R.unit.height(1) - R.unit.height(0.78),
  },
  contentView: {
    width: '100%',
    padding: R.unit.scale(16),
  },
  menuSvgView: {
    aspectRatio: 1,
    marginRight: R.unit.scale(12),
    height: R.unit.scale(15),
  },
});

export default CardOptionsModal;
