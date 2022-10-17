import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import uuid from 'react-native-uuid';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import FaqsCollapsible from '@components/view/screens/onBoardingCoach/FaqsCollapsible';
import DropDown from '@components/common/DropDown';
import TextInput from '@components/common/TextInput';
import {faqsQuestion} from '@components/constants';

function FaqTab(props) {
  const {navigation, hideBtn} = props;
  const [modalData, setModalData] = useState();
  const [faqsList, setFaqsList] = useState([]);
  const [editId, setEditId] = useState('');
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
  }, []);

  useEffect(() => {
    if (authUser?.answer.length && authUser?.question.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [authUser?.answer, authUser?.question]);

  const addFAQS = () => {
    let reqData;

    if (editId) {
      let tempObj = faqsList.find(item => item.id === editId);
      tempObj.answer = authUser?.answer;
      tempObj.question = authUser?.question;
      setFaqsList([...faqsList]);
      setAuthUser({
        question: '',
        answer: '',
      });
    } else {
      reqData = {
        id: uuid.v4(),
        ...authUser,
      };
      let tempArr = faqsList?.length > 0 ? [...faqsList] : [];
      tempArr.push(reqData);
      setFaqsList(tempArr);
      setAuthUser({
        question: '',
        answer: '',
      });
    }
  };

  const editFAQS = data => {
    setEditId(data.id);
    setAuthUser({
      question: data.question,
      answer: data.answer,
    });
  };

  const deleteFaq = id => {
    let updatedArr = faqsList?.filter(item => {
      return item?.id !== id;
    });
    setFaqsList(updatedArr);
  };

  const questionDropDown = data => {
    setAuthUser({...authUser, question: data.value});
  };

  const submit = () => {};

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'always'}
      enableOnAndroid
      contentContainerStyle={{
        paddingBottom: R.unit.scale(hideBtn ? 150 : 90),
      }}
      style={[
        hideBtn && {
          minHeight: Dimensions.get('window').height,
        },
      ]}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      extraScrollHeight={!hideBtn ? R.unit.scale(30) : R.unit.scale(60)}
      scrollToOverflowEnabled={false}>
      <View style={styles.formView}>
        {faqsList?.length > 0 && (
          <>
            <FaqsCollapsible
              options={faqsList}
              deleteFAQ={deleteFaq}
              editItems={editFAQS}
              showBorder={false}
            />
          </>
        )}

        {faqsList?.length > 0 && (
          <Divider lineStyles={{height: R.unit.scale(0.7)}} />
        )}

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
          titleColor={R.color.blackShade4}
          defaultValue={authUser?.question}
        />

        <TextInput
          secureText={false}
          title={'Answer'}
          onChangeText={text => {
            setAuthUser({...authUser, answer: text});
          }}
          color={R.color.black}
          titleColor={R.color.blackShade4}
          value={authUser?.answer}
          gutterBottom={24}
          isRightTitle={false}
          blurOnSubmit={false}
          returnKeyType={'done'}
          backgroundColor={'white'}
          multiline={true}
          numberOfLines={60}
          height={164}
        />

        <TouchableOpacity
          style={[R.styles.twoItemsRow, styles.addFaqView]}
          disabled={disabled}
          onPress={addFAQS}
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
            Add More
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default FaqTab;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  uploadCertificateView: {
    height: R.unit.scale(48),
    padding: R.unit.scale(15),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: R.unit.scale(10),
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.height(0.024),
  },
  twoFieldsRow: {
    marginBottom: R.unit.scale(32),
    alignItems: 'flex-end',
  },
  addFaqView: {
    marginTop: R.unit.scale(8),
    marginBottom: R.unit.scale(25),
  },
});
