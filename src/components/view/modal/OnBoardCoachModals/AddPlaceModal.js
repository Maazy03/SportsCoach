import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import TextInput from '@components/common/TextInput';
import uuid from 'react-native-uuid';
import BoilerModalOnBoard from './CoachModalLayout/BoilerModal';
import PlacesTextInput from '@components/common/PlacesTextInput';
import MapViewSession from '@components/view/screens/onBoardingCoach/HostingSession/MapViewSession';

function AddPlaceModal(props) {
  const {addItems, editItems, modalData, modalType} = props;

  const placesField = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [authUser, setAuthUser] = useState({
    venue: modalData?.venue ? modalData?.venue : '',
    address: modalData?.address ? modalData?.address : '',
    lat: modalData?.lat ? modalData?.lat : 0,
    long: modalData?.long ? modalData?.long : 0,
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    console.log('modalData?.address', modalData?.address);
    setAuthUser({
      venue: modalData?.venue ? modalData?.venue : '',
      address: modalData?.address ? modalData?.address : '',
      lat: modalData?.lat ? modalData?.lat : 0,
      long: modalData?.long ? modalData?.long : 0,
    });
  }, [modalData]);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const headerProps = {
    isHeader: true,
    isBothButtons: true,
  };

  const submit = () => {
    setIsBlur(false);
    if (modalType) {
      const reqData = {
        id: modalData?.id,
        ...authUser,
      };
      editItems(reqData);
    } else {
      const reqData = {
        id: uuid.v4(),
        ...authUser,
      };
      addItems(reqData);
    }
  };

  const goBack = () => {
    setIsBlur(false);
    setAuthUser({
      venue: '',
      address: '',
      lat: 0,
      long: 0,
    });
  };

  const selectedLocation = data => {
    if (data?.address?.length > 0) {
      setAuthUser({
        ...authUser,
        address: data?.address,
        lat: data?.latitude,
        long: data?.longitude,
      });
      setDisabled(false);
    } else {
      setDisabled(false);
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
            <BoilerModalOnBoard
              {...props}
              headerProps={headerProps}
              disabled={!modalType && disabled}
              headerTitle={'Add a place'}
              onCloseModal={() => setIsBlur(false)}
              onPressNextButton={submit}
              onPressBackButton={goBack}>
              <ScrollView
                style={[styles.mainLayout]}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'column',
                  paddingBottom: 30,
                }}>
                <MapViewSession
                  latitude={authUser?.lat}
                  longitude={authUser?.long}
                />
                <TextInput
                  secureText={false}
                  title={'Venue Name (Optional)'}
                  titleColor={R.color.black}
                  placeholder={'Type here...'}
                  onChangeText={text => {
                    setAuthUser({...authUser, venue: text});
                  }}
                  color={R.color.black}
                  value={authUser?.venue}
                  gutterTop={32}
                  width={0.79}
                  inputWidth={0.79}
                  gutterBottom={24}
                  isRightTitle={false}
                  blurOnSubmit={false}
                  returnKeyType={'next'}
                  backgroundColor={'white'}
                  onSubmitEditing={() => {
                    placesField.current.focus();
                  }}
                />
                <PlacesTextInput
                  placeholder={'Type here...'}
                  title={'Address'}
                  width={0.79}
                  inputWidth={0.79}
                  titleColor={R.color.black}
                  selectedLocation={selectedLocation}
                  value={authUser?.address}
                  mode={modalType ? 'Edit' : 'Add'}
                  onChangeText={text => {
                    setAuthUser({...authUser, address: text});
                  }}
                  listInvertedHeight={-130}
                  returnKeyType={'done'}
                  forwardedRef={placesField}
                />
              </ScrollView>
            </BoilerModalOnBoard>
          </View>
        </>
      </View>
    </Modal>
  );
}
export default AddPlaceModal;

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
  },
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(22),
    width: '100%',
  },
  tag: {
    backgroundColor: R.color.blueShade1,
    paddingVertical: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(8),
    borderRadius: R.unit.scale(8),
    justifyContent: 'space-between',
    marginRight: R.unit.scale(12),
    marginBottom: R.unit.scale(12),
  },
});
