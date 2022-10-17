import React, {useEffect, useState} from 'react';
import {
  Keyboard,
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
import DropDown from '@components/common/DropDown';
import {faqsQuestion} from '@components/constants';

function AddFaqsModal(props) {
  const {addItems, editItems, modalData, modalType} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [authUser, setAuthUser] = useState({
    question: modalData?.question ? modalData?.question : '',
    answer: modalData?.answer ? modalData?.answer : '',
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setAuthUser({
      question: modalData?.question ? modalData?.question : '',
      answer: modalData?.answer ? modalData?.answer : '',
    });
  }, [modalData]);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  useEffect(() => {
    if (authUser?.answer.length && authUser?.question.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [authUser?.answer, authUser?.question]);

  const headerProps = {
    isHeader: true,
    isBothButtons: true,
  };

  const questionDropDown = data => {
    setAuthUser({...authUser, question: data.value});
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
              headerTitle={'Add a question'}
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
                }}>
                <DropDown
                  zIndex={1000}
                  zIndexIOS={1000}
                  zIndexInverse={2000}
                  title={'Question'}
                  arrayData={faqsQuestion}
                  placeholder={'Select Question'}
                  loaderParentCall={questionDropDown}
                  value={authUser?.question}
                  gutterBottom={24}
                  defaultValue={authUser?.question}
                  width={0.79}
                  inputWidth={0.79}
                  // formError={errorField?.question}
                  // formErrorText={errorField?.question}
                />

                <TextInput
                  secureText={false}
                  title={'Answer'}
                  placeholder={'Type here...'}
                  onChangeText={text => {
                    setAuthUser({...authUser, answer: text});
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  color={R.color.black}
                  value={authUser?.answer}
                  gutterBottom={24}
                  width={0.79}
                  inputWidth={0.79}
                  isRightTitle={false}
                  blurOnSubmit={false}
                  returnKeyType={'done'}
                  backgroundColor={'white'}
                  multiline={true}
                  numberOfLines={60}
                  height={164}
                />
              </ScrollView>
            </BoilerModalOnBoard>
          </View>
        </>
      </View>
    </Modal>
  );
}
export default AddFaqsModal;

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
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(16),
  },
});
