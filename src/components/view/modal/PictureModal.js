import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Patch} from '@axios/AxiosInterceptorFunction';
import {apiHeader, URL, imageUrl} from '@config/apiUrl';
import {updateUser} from '@store/user/userSlice';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from '@components/common/Toast';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Loader from '@components/common/Loader';

function PictureModal(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userToken = user?.userToken;
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [picture, setPicture] = useState();
  const Header = apiHeader(userToken, true);
  let photo = imageUrl + user?.user?.photo;

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const uploadImage = async () => {
    try {
      let pickerResult;
      pickerResult = await ImagePicker.openPicker({mediaType: 'photo'});
      if (pickerResult) {
        if (
          pickerResult.path.includes('.jpeg') ||
          pickerResult.path.includes('.jpg') ||
          pickerResult.path.includes('.png') ||
          pickerResult.path.includes('.JPG') ||
          pickerResult.path.includes('.PNG') ||
          pickerResult.path.includes('.JPEG') ||
          pickerResult.path.includes('.HEIC')
        ) {
          setPicture(pickerResult);
        } else {
          Toast.show({
            title: 'Picture Error',
            message: 'Image path is wrong',
            type: 'danger',
          });
        }
      }
    } catch (error) {
      Toast.show({
        title: 'Picture Error',
        message: 'Image not uploaded',
        type: 'danger',
      });
    }
  };

  const formData = () => {
    var formData = new FormData();
    if (picture !== undefined) {
      formData.append('photo', {
        uri: picture?.path,
        type: picture.mime,
        name: new Date() + '_image',
      });
    }
    return formData;
  };

  const saveImage = async () => {
    setIsLoading(true);
    try {
      const updatePicUrl = URL('users/updatePhoto');
      const userData = await formData();
      const response = await Patch(updatePicUrl, userData, Header);
      const updatedUser = response?.data?.user;
      if (response !== undefined) {
        Toast.show({
          title: 'Hurrah!',
          message: 'Pciture Updated Successfully',
          type: 'success',
        });
        setIsLoading(false);
        setIsBlur(false);
        setPicture(undefined);
        dispatch(updateUser(updatedUser));
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      Toast.show({
        title: 'Ooops!',
        message: 'Profile Not Updated',
        type: 'danger',
      });
      setIsLoading(false);
    }
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
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <ImageBackground
              style={styles.backgroundImage}
              imageStyle={{borderRadius: R.unit.scale(20)}}
              source={
                user?.user?.photo?.length === 0 ||
                user?.user?.photo === undefined
                  ? R.image.userPin()
                  : picture
                  ? {uri: picture.path}
                  : {uri: photo}
              }>
              {isLoading ? (
                <Loader color={R.color.mainColor} size="large" />
              ) : (
                <>
                  <View style={styles.cancelButtonView}>
                    <Icon
                      type={'Entypo'}
                      name={'cross'}
                      iconStyles={{
                        backgroundColor: R.color.lightSilver,
                        borderRadius: R.unit.scale(100),
                        padding: R.unit.scale(2),
                      }}
                      onPress={() => {
                        setIsBlur(false);
                        setPicture(undefined);
                      }}
                      color={R.color.blackShade2}
                      size={30}
                    />
                  </View>
                  <View style={styles.editButtonView}>
                    {picture !== undefined && (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={saveImage}
                        style={styles.saveButton}>
                        <Icon
                          name={'save'}
                          size={25}
                          type={'FontAwesome'}
                          color={R.color.mainColor}
                        />
                        <Text
                          variant={'body2'}
                          font={'regular'}
                          align={'center'}
                          color={R.color.mainColor}
                          gutterTop={5}
                          style={{marginLeft: 8}}>
                          Save Picture
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={styles.button}
                      onPress={uploadImage}>
                      <Icon
                        name={'pencil'}
                        size={20}
                        type={'Octicons'}
                        color={R.color.white}
                      />
                      <Text
                        variant={'body2'}
                        font={'regular'}
                        align={'center'}
                        color={R.color.white}
                        gutterTop={5}
                        style={{marginLeft: 8}}>
                        Edit Picture
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ImageBackground>
          </View>
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
    paddingHorizontal: 10,
  },
  modalView: {
    backgroundColor: R.color.blackShade2,
    width: '100%',
    height: R.unit.height(0.5),
    borderRadius: R.unit.scale(20),
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  cancelButtonView: {
    zIndex: 9999,
    position: 'absolute',
    top: 12,
    right: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButtonView: {
    zIndex: 9999,
    position: 'absolute',
    bottom: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    borderBottomLeftRadius: R.unit.scale(25),
    borderBottomRightRadius: R.unit.scale(25),
  },

  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.color.mainColor,
    paddingHorizontal: R.unit.scale(20),
    borderRadius: R.unit.scale(10),
  },
  saveButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.color.blackShade2,
    paddingHorizontal: R.unit.scale(25),
    borderRadius: R.unit.scale(10),
  },
});

export default PictureModal;
