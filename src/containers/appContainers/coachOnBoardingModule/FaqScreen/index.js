import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import OnBoardCoachBoiler from '@components/layout/CoachOnBoardingLayout/OnBoardCoachBoiler';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import AddFaqsModal from '@components/view/modal/OnBoardCoachModals/AddFaqsModal';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import FaqsCollapsible from '@components/view/screens/onBoardingCoach/FaqsCollapsible';
import Toast from '@components/common/Toast';

function FAQScreen(props) {
  const {paramsData} = props.route.params;
  const {navigation} = props;
  const dispatch = useDispatch();

  const common = useSelector(state => state.common);

  const usableFuncs = ReuseableFunctions({
    actionCall: dispatch,
    count: common?.progressCount,
  });

  const headerProps = {
    isHeader: true,
    isBothButtons: true,
  };
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [faqsList, setFaqsList] = useState([]);

  const setModalProps = item => {
    setModalData(item);
    openModal();
  };

  const openModal = () => {
    setIsModal(!isModal);
  };

  const addFAQS = data => {
    let tempArr = faqsList?.length > 0 ? [...faqsList] : [];
    tempArr.push(data);
    setFaqsList(tempArr);
  };

  const editFAQS = data => {
    const newArr = faqsList.map(obj => {
      if (obj.id === data.id) {
        return {...obj, question: data?.question, answer: data?.answer};
      }

      return obj;
    });
    setFaqsList(newArr);
  };

  const deleteFaq = id => {
    let updatedArr = faqsList?.filter(item => {
      return item?.id !== id;
    });
    setFaqsList(updatedArr);
  };

  const submit = () => {
    // navigation.navigate('Payment', {
    //   paramsData: {},
    // });
    if (faqsList?.length > 0) {
      usableFuncs.rightButtonNavigate();
      navigation.navigate('Payment', {
        paramsData: {
          // sport: {...paramsData},
          // personal: {...reqData},
        },
      });
    } else {
      Toast.show({
        title: 'Error',
        message: 'Please add atleast 1 FAQ',
        type: 'danger',
      });
    }
  };

  const goBack = () => {
    // navigation.goBack();
    usableFuncs.leftButtonNavigate();
  };

  return (
    <OnBoardCoachBoiler
      {...props}
      headerProps={headerProps}
      onPressNextButton={submit}
      onPressBackButton={goBack}>
      <KeyboardAwareScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View style={styles.formView}>
          <Text
            variant={'h4'}
            font={'Sequel651'}
            gutterBottom={8}
            color={R.color.black}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Add Faq
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            gutterBottom={32}
            color={R.color.gray}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            1-on-1 lesson
          </Text>
          {faqsList?.length > 0 && (
            <>
              <FaqsCollapsible
                options={faqsList}
                deleteFAQ={deleteFaq}
                editItems={editFAQS}
              />
            </>
          )}

          {faqsList?.length > 0 && (
            <Divider lineStyles={{height: R.unit.scale(0.7)}} />
          )}
          <TouchableOpacity
            style={[R.styles.twoItemsRow, styles.addFaqView]}
            onPress={() => {
              setModalProps({});
            }}
            activeOpacity={0.6}>
            <Icon
              name={'plus'}
              type={'Entypo'}
              color={R.color.hyperLinkColor}
              size={16}
            />
            <Text
              variant={'body3'}
              font={'InterMedium'}
              color={R.color.hyperLinkColor}
              align={'left'}
              transform={'none'}>
              {faqsList?.length > 0 ? 'Add more' : 'Add a question'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <AddFaqsModal
        isVisibleModal={isModal}
        modalData={modalData}
        addItems={addFAQS}
        modalType={false}
      />
    </OnBoardCoachBoiler>
  );
}
export default FAQScreen;

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
