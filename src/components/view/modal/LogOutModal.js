import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {URL, apiHeader} from '@config/apiUrl';
import {Post} from '@axios/AxiosInterceptorFunction';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import Toast from '@components/common/Toast';

function LogOutModal(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const {modalData} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [loading, setLoading] = useState(false);
  const header = apiHeader(auth?.userToken, false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const buttonSubmit = async flag => {
    setLoading(true);
    if (flag) {
      const reqData = {
        fcmToken: auth?.deviceToken,
      };
      const logOutUrl = URL('auth/logout');
      const response = await Post(logOutUrl, reqData, header);
      if (response !== undefined) {
        Toast.show({
          title: 'Hurrah!',
          message: 'LogOut Succesfully',
          type: 'success',
        });

        setLoading(false);
      }
    } else {
      setIsBlur(false);
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      // visible={true}
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
            // onPress={() => setIsBlur(false)}
            onPress={() => !loading && setIsBlur(false)}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}></TouchableOpacity>
        </View>
        <>
          {loading ? (
            <Loader size={'large'} color={R.color.mainColor} />
          ) : (
            <View style={[styles.modalView]}>
              <Text
                variant={'h3'}
                font={'semiBold'}
                gutterTop={20}
                gutterBottom={25}
                color={R.color.gray}
                style={{paddingHorizontal: 20}}
                align={'center'}
                transform={'none'}>
                Are you sure you want to logout?
              </Text>
              <View style={R.styles.rowView}>
                <Button
                  value={`LogOut`}
                  bgColor={R.color.mainColor}
                  width={'49%'}
                  size={'xmd'}
                  gutterTop={R.unit.scale(20)}
                  variant={'h6'}
                  font={'bold'}
                  color={R.color.white}
                  borderRadius={100}
                  onPress={() => buttonSubmit(true)}
                  borderColor={R.color.mainColor}
                  loaderColor={'white'}
                  borderWidth={R.unit.scale(1)}
                />

                <Button
                  value={`Cancel`}
                  bgColor={R.color.white}
                  width={'49%'}
                  size={'xmd'}
                  gutterTop={R.unit.scale(20)}
                  variant={'h6'}
                  font={'bold'}
                  color={R.color.mainColor}
                  borderRadius={100}
                  onPress={() => buttonSubmit(false)}
                  borderColor={R.color.mainColor}
                  loaderColor={'white'}
                  borderWidth={R.unit.scale(1)}
                />
              </View>
            </View>
          )}
        </>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 10,
  },
});

export default LogOutModal;
