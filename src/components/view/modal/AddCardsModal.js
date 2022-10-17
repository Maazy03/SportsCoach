import Button from '@components/common/Button';
import Text from '@components/common/Text';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {URL, apiHeader} from '@config/apiUrl';
// import {STRIPE_KEY} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {Post} from '@axios/AxiosInterceptorFunction';
import {getUserCards} from '@store/user/userSlice';
// import {
//   StripeProvider,
//   CardField,
//   useStripe,
// } from '@stripe/stripe-react-native';
import Toast from '@components/common/Toast';
import R from '@components/utils/R';

function AddCardsModal(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const authToken = auth?.userToken;
  const header = apiHeader(authToken, false);
  // const {createPaymentMethod} = useStripe();
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const {refreshList} = props;
  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const addCard = async () => {
    setIsLoading(true);
    const responseCard = await createPaymentMethod({type: 'Card'});
    if (responseCard?.error) {
      Toast.show({
        title: 'Oops!',
        message: responseCard?.error?.message,
        type: 'danger',
      });
      setIsLoading(false);
    } else {
      const id = responseCard?.paymentMethod?.id;
      const data = {
        pmId: id,
      };
      const addCardUrl = URL('users/attach-payment-methods');
      const response = await Post(addCardUrl, data, header);
      if (response !== undefined) {
        Toast.show({
          title: 'Hurrah!',
          message: 'Card Added Succesfully',
          type: 'success',
        });
        setIsBlur(false);
        dispatch(getUserCards(response?.data?.data));
        refreshList(response?.data?.data);
        setIsLoading(false);
      } else {
        Toast.show({
          title: 'Oops!',
          message: 'Card Not Added',
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal
      animationType={'fades'}
      transparent={true}
      visible={modalVisible}
      // visible={true}
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
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <Text
              variant={'h2'}
              font={'bold'}
              gutterTop={5}
              gutterBottom={30}
              color={R.color.mainColor}
              align={'center'}
              transform={'none'}>
              Card
            </Text>
            <Text
              variant={'body1'}
              font={'semiBold'}
              gutterTop={5}
              gutterBottom={0}
              color={R.color.gray}
              align={'left'}
              transform={'none'}>
              Enter card details
            </Text>

            {/* <StripeProvider
              publishableKey={STRIPE_KEY}
              merchantIdentifier="merchant.identifier">
              <CardField
                postalCodeEnabled={false}
                autofocus
                placeholder={{
                  number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                  backgroundColor: R.color.lightSilverShade2,
                  textColor: R.color.black,
                  placeholderColor: R.color.gray2,
                }}
                style={{
                  width: '100%',
                  height: 50,
                  marginVertical: 10,
                }}
                onCardChange={e => {
                  if (e.complete) {
                    setValid(true);
                  } else {
                    setValid(false);
                  }
                }}
              />
            </StripeProvider> */}

            <Button
              value="Done"
              bgColor={R.color.mainColor}
              width={'70%'}
              size={'xmd'}
              disabled={isLoading}
              color={R.color.white}
              borderRadius={100}
              gutterTop={40}
              fontSize={20}
              variant={'body2'}
              font={'semiBold'}
              loaderColor={'white'}
              loader={isLoading}
              onPress={addCard}
            />
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

export default AddCardsModal;
