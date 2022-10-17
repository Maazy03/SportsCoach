import React, {useRef, useState, useEffect} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import TextInput from '@components/common/TextInput';
import uuid from 'react-native-uuid';
import PlacesTextInput from '@components/common/PlacesTextInput';
import MapViewSession from '@components/view/screens/onBoardingCoach/HostingSession/MapViewSession';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import SessionLocations from '@components/view/screens/Profile/EditLesson/SessionLocations';

function LocationTab(props) {
  const {hideBtn} = props;
  const placesField = useRef();

  const [authUser, setAuthUser] = useState({
    venue: '',
    address: '',
    lat: 32.7157,
    long: -117.161087,
  });
  const [disabled, setDisabled] = useState(true);
  const [sessionPlaces, setSessionPlaces] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    if (authUser?.address.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [authUser?.address]);

  const addPlace = () => {
    if (editId) {
      let object = sessionPlaces?.find(item => item.id === editId);
      object.venue = authUser?.venue;
      object.address = authUser?.address;
      object.lat = authUser?.lat;
      object.long = authUser?.long;
      setSessionPlaces([...sessionPlaces]);
      setEditId('');
    } else {
      const data = {
        id: uuid.v4(),
        ...authUser,
      };
      let tempArr = sessionPlaces?.length > 0 ? [...sessionPlaces] : [];
      tempArr.push(data);
      setSessionPlaces(tempArr);
    }
    setAuthUser({
      venue: '',
      address: '',
      lat: 32.7157,
      long: -117.161087,
    });
  };

  const removePlace = id => {
    let updatedArr = sessionPlaces?.filter(item => {
      return item?.id !== id;
    });
    setSessionPlaces(updatedArr);
  };

  const updatePlace = data => {
    setEditMode(true);
    setEditId(data.id);
    setAuthUser({
      ...authUser,
      venue: data.venue,
      address: data.address,
      lat: data?.lat,
      long: data?.long,
    });
  };

  const submit = () => {};

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
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'always'}
      enableOnAndroid
      contentContainerStyle={{
        paddingBottom: R.unit.scale(hideBtn ? 150 : 90),
      }}
      style={[
        hideBtn && {
          minHeight: R.unit.height(1),
        },
      ]}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      extraScrollHeight={!hideBtn ? R.unit.scale(30) : R.unit.scale(60)}
      scrollToOverflowEnabled={false}>
      <View style={styles.formView}>
        {sessionPlaces?.map((item, index, arr) => {
          let isLast;
          if (index === arr.length - 1) {
            isLast = true;
          } else {
            isLast = false;
          }
          return (
            <SessionLocations
              key={index}
              item={item}
              isLast={isLast}
              deletePlace={removePlace}
              addItems={addPlace}
              editItems={updatePlace}
            />
          );
        })}

        {sessionPlaces?.length > 0 && (
          <Divider lineStyles={{height: R.unit.scale(0.7)}} />
        )}
        <MapViewSession latitude={authUser?.lat} longitude={authUser?.long} />
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
          titleColor={R.color.black}
          selectedLocation={selectedLocation}
          value={authUser?.address}
          mode={editMode ? 'Edit' : 'Add'}
          onChangeText={text => {
            setAuthUser({...authUser, address: text});
          }}
          returnKeyType={'done'}
          forwardedRef={placesField}
          listInvertedHeight={Platform.OS === 'ios' ? -170 : 50}
        />

        <TouchableOpacity
          style={[R.styles.twoItemsRow, styles.addPlaceView]}
          onPress={addPlace}
          disabled={disabled}
          activeOpacity={0.6}>
          <Icon
            name={'plus'}
            type={'Entypo'}
            color={disabled ? R.color.gray : R.color.hyperLinkColor}
            size={16}
          />
          <Text
            variant={'body3'}
            font={'InterMedium'}
            color={disabled ? R.color.gray : R.color.hyperLinkColor}
            align={'left'}
            transform={'none'}>
            Add another place
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default LocationTab;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.blue,
    paddingHorizontal: 0,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  addPlaceView: {
    marginTop: R.unit.scale(32),
    // marginBottom: R.unit.scale(25),
  },
});
