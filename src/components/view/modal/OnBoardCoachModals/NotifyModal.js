import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import R from '@components/utils/R';
import {notifyModal} from '@store/common/commonSlice';
import {useDispatch} from 'react-redux';
import Text from '@components/common/Text';
import {BulbIcon} from '@components/utils/Svg';
import Divider from '@components/common/Divider';
import CheckBox from '@components/common/CheckBox';
import Button from '@components/common/Button';
import CheckBoxLine from '@components/common/CheckBoxLine';

function NotifyModal(props) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const checkBoxPress = () => {
    setSelected(!selected);
  };
  const submit = () => {
    setIsBlur(false);
    if (selected === true) {
      dispatch(notifyModal(true));
    }
  };

  return (
    <Modal
      animationType={'slide'}
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
                <BulbIcon height="100%" width="100%" />
              </View>
              <Text
                variant={'h4'}
                font={'Sequel651'}
                color={R.color.black}
                gutterTop={24}
                align={'left'}
                gutterBottom={16}
                transform={'none'}>
                Just notify you
              </Text>
              <Text
                variant={'body3'}
                font={'InteRegular'}
                color={R.color.black}
                align={'center'}
                style={{width: '80%'}}
                gutterBottom={12}
                transform={'none'}>
                If you skip required steps we wouldn’t be able to show your
                profile in our search results.
              </Text>
              <Text
                variant={'body3'}
                font={'InteRegular'}
                color={R.color.black}
                align={'center'}
                style={{width: '80%'}}
                gutterBottom={24}
                transform={'none'}>
                We care that our users get full information about coaches.
              </Text>
              <Divider lineStyles={{marginBottom: R.unit.scale(16)}} />
              <CheckBoxLine
                onPress={checkBoxPress}
                text={'Don’t show this message again'}
                selected={selected}
              />
              <Button
                value={'Got it'}
                bgColor={R.color.mainColor}
                width={'100%'}
                size={'lg'}
                color={R.color.white}
                borderWidth={1}
                gutterTop={16}
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
export default NotifyModal;

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
