import React, {useRef, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import TextInput from '@components/common/TextInput';
import uuid from 'react-native-uuid';
import PlacesTextInput from '@components/common/PlacesTextInput';
import MapViewSession from '@components/view/screens/onBoardingCoach/HostingSession/MapViewSession';
import Icon from '@components/common/Icon';

function AddSessionPlace(props) {
  const {addItems} = props;
  const placesField = useRef();

  const [authUser, setAuthUser] = useState({
    venue: '',
    address: '',
    lat: 0,
    long: 0,
  });

  const [disabled, setDisabled] = useState(true);

  const headerProps = {
    isHeader: true,
    isBothButtons: true,
  };

  const submit = () => {
    const reqData = {
      id: uuid.v4(),
      ...authUser,
    };
    addItems(reqData);
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
    <KeyboardAwareScrollView
      style={[styles.mainLayout]}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View style={styles.formView}>
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
          width={0.91}
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
          mode={'Add'}
          width={0.91}
          onChangeText={text => {
            setAuthUser({...authUser, address: text});
          }}
          returnKeyType={'done'}
          forwardedRef={placesField}
          listInvertedHeight={Platform.OS === 'ios' ? -170 : -160}
        />

        <TouchableOpacity
          style={[R.styles.twoItemsRow, styles.addPlaceView]}
          onPress={submit}
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
            Add location
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default AddSessionPlace;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.blue,
    paddingHorizontal: 0,
  },
  formView: {
    width: '100%',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  addPlaceView: {
    marginTop: R.unit.scale(32),
    // marginBottom: R.unit.scale(25),
  },
});
