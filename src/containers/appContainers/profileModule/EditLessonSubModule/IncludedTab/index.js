import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import OnBoardCoachBoiler from '@components/layout/CoachOnBoardingLayout/OnBoardCoachBoiler';
import TextInput from '@components/common/TextInput';
import ReuseableFunctions from '@components/utils/ReusbaleFunctions';
import Divider from '@components/common/Divider';
import SetLessonsCollapsible from '@components/view/screens/onBoardingCoach/setLessonCollapsible';
import AddItemsLessonModal from '@components/view/modal/OnBoardCoachModals/AddItemsLessonModal';
import FormValidation from '@components/utils/FormValidation';

function IncludedTab(props) {
  const {navigation} = props;

  const OptionsArray = [
    {
      id: uuid.v4(),
      mainTitle: 'What will you provide?',
      subText: 'Select the things you can provide for your future students',
      things: [
        {
          id: uuid.v4(),
          name: 'Equipment',
          items: [
            {id: uuid.v4(), isChecked: false, title: 'Grips'},
            {id: uuid.v4(), isChecked: false, title: 'Racquet string'},
            {id: uuid.v4(), isChecked: false, title: 'Tennis Balls'},
            {id: uuid.v4(), isChecked: false, title: 'Tennis racquet'},
          ],
        },
        {
          id: uuid.v4(),
          name: 'Apparel',
          items: [
            {id: uuid.v4(), isChecked: false, title: 'Track-Suit'},
            {id: uuid.v4(), isChecked: false, title: 'Hockey-Jersey'},
            {id: uuid.v4(), isChecked: false, title: 'Football-Shorts'},
            {id: uuid.v4(), isChecked: false, title: 'Ski-Shoes'},
          ],
        },
        {
          id: uuid.v4(),
          name: 'Accessories',
          items: [
            {id: uuid.v4(), isChecked: false, title: 'HockeyBat'},
            {id: uuid.v4(), isChecked: false, title: 'FootBall'},
            {id: uuid.v4(), isChecked: false, title: 'GolfBall'},
            {id: uuid.v4(), isChecked: false, title: 'BasketBall'},
          ],
        },
      ],
    },
    {
      id: uuid.v4(),
      mainTitle: 'What student should bring?',
      subText: 'Select the things that the student should take to your lesson.',
      things: [
        {
          id: uuid.v4(),
          name: 'Equipment',
          items: [
            {id: uuid.v4(), isChecked: false, title: 'Grips Students'},
            {id: uuid.v4(), isChecked: false, title: 'Racquet string'},
            {id: uuid.v4(), isChecked: false, title: 'Tennis Balls'},
            {id: uuid.v4(), isChecked: false, title: 'Tennis racquet'},
          ],
        },
        {
          id: uuid.v4(),
          name: 'Apparel',
          items: [
            {id: uuid.v4(), isChecked: false, title: 'Track-Suit Students'},
            {id: uuid.v4(), isChecked: false, title: 'Hockey-Jersey'},
            {id: uuid.v4(), isChecked: false, title: 'Football-Shorts'},
            {id: uuid.v4(), isChecked: false, title: 'Ski-Shoes'},
          ],
        },
        {
          id: uuid.v4(),
          name: 'Accessories',
          items: [
            {id: uuid.v4(), isChecked: false, title: 'HockeyBat Students'},
            {id: uuid.v4(), isChecked: false, title: 'FootBall'},
            {id: uuid.v4(), isChecked: false, title: 'GolfBall'},
            {id: uuid.v4(), isChecked: false, title: 'BasketBall'},
          ],
        },
      ],
    },
  ];

  const headerProps = {
    isHeader: true,
    isBothButtons: true,
  };

  const [equipments, setEquipments] = useState(OptionsArray);
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState({
    firstId: '',
    secondId: '',
    title: '',
  });
  const [plan, setPlan] = useState('');
  const [errorField, setErrorField] = useState({
    plan: '',
  });

  const openModal = () => {
    setIsModal(!isModal);
  };

  const updateItems = (firstLevelId, secondLevelId, thirdLevelId) => {
    const newData = equipments.slice(0);
    const check = newData
      .find(({id}) => id === firstLevelId)
      .things.find(({id}) => id === secondLevelId)
      .items.find(({id}) => id === thirdLevelId).isChecked;

    newData
      .find(({id}) => id === firstLevelId)
      .things.find(({id}) => id === secondLevelId)
      .items.find(({id}) => id === thirdLevelId).isChecked = !check;
    setEquipments(newData);
  };

  const setModalProps = (firstLevelId, secondLevelId, title) => {
    openModal();
    setModalData({
      firstId: firstLevelId,
      secondId: secondLevelId,
      title: title,
    });
  };

  const addItems = data => {
    const newData = equipments.slice(0);
    const _item = newData
      .find(({id}) => id === modalData?.firstId)
      .things.find(item => item?.id === modalData?.secondId);

    _item.items = [...data, ..._item?.items].filter(
      (v, index, arr) => arr.findIndex(v2 => v2.id === v.id) === index,
    );
    setEquipments(newData);
  };

  const submit = () => {};

  return (
    <ScrollView
      style={[R.styles.container, styles.mainLayout]}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: R.unit.scale(50),
      }}>
      <View style={styles.formView}>
        {equipments?.map((item, index) => {
          return (
            <View style={{marginBottom: R.unit.scale(56)}} key={index}>
              <Text
                variant={'h6'}
                font={'Sequel651'}
                gutterBottom={8}
                color={R.color.black}
                align={'left'}
                style={{width: '100%'}}
                transform={'none'}>
                {item?.mainTitle}
              </Text>
              <Text
                variant={'body2'}
                font={'InterRegular'}
                gutterBottom={32}
                color={R.color.gray}
                align={'left'}
                style={{width: '100%'}}
                transform={'none'}>
                {item?.subText}
              </Text>
              <Divider lineStyles={{marginBottom: 0}} />
              <SetLessonsCollapsible
                options={item?.things}
                item={item}
                updateItems={updateItems}
                onAddItemPress={setModalProps}
              />
            </View>
          );
        })}
      </View>
      <AddItemsLessonModal
        isVisibleModal={isModal}
        addItems={addItems}
        title={modalData.title}
      />
    </ScrollView>
  );
}
export default IncludedTab;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
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
});
