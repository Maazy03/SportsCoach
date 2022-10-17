import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import Text from '@components/common/Text';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import Icon from '@components/common/Icon';
import {MasterCardIcon, MoneyIcon, VisaCardIcon} from '@components/utils/Svg';
import CardOptionsModal from '@components/view/modal/CardOptionsModal';

function PayoutMethodsTab(props) {
  const [open, setOpen] = useState(false);
  const [creditCards, setCreditCards] = useState([
    {id: 1, last4: '3679', isDefault: true, type: 'MasterCard'},
    {id: 2, last4: '6543', isDefault: false, type: 'VisaCard'},
  ]);
  const [modalData, setModalData] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [defaultId, setDefaultId] = useState(1);

  const removeCard = id => {
    let tempArr = creditCards.filter(item => item.id !== id);
    setCreditCards(tempArr);
  };

  const setDefaultCard = id => {
    setDefaultId(id);
  };

  const openModal = item => {
    setIsModal(!isModal);
    setModalData(item);
  };

  // const onTriggerPress = () => {
  //   setOpen(!open);
  // };

  // const onBackdropPress = () => {
  //   setOpen(false);
  // };

  return (
    <ScrollView
      style={[R.styles.container, styles.mainLayout]}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: R.unit.scale(50),
      }}>
      <View style={styles.formView}>
        {creditCards?.map((item, index) => {
          return (
            <View style={[R.styles.rowView, styles.cardView]} key={index}>
              <View style={R.styles.twoItemsRow}>
                <View style={styles.svgView}>
                  {item.type === 'MasterCard' ? (
                    <MasterCardIcon height="100%" width="100%" />
                  ) : (
                    <VisaCardIcon height="100%" width="100%" />
                  )}
                </View>

                <View>
                  <Text
                    variant={'body3'}
                    font={'InterRegular'}
                    color={R.color.blackShade4}
                    gutterBottom={2}
                    align={'left'}
                    transform={'none'}>
                    {item.type} •••• {item.last4}
                  </Text>
                  {defaultId === item.id && (
                    <Text
                      variant={'body4'}
                      font={'InterBold'}
                      color={R.color.blackShade4}
                      align={'left'}
                      transform={'none'}>
                      This is your default payment method
                    </Text>
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => {
                  // setOpen(true);
                  openModal(item);
                }}>
                <Icon
                  name={'dots-horizontal'}
                  type={'MaterialCommunityIcons'}
                  size={30}
                  color={R.color.blackShade4}
                />
              </TouchableOpacity>

              {/* <Menu
                opened={open}
                onBackdropPress={onBackdropPress}
                rendererProps={{
                  anchorStyle: {
                    marginTop: R.unit.scale(30),
                  },
                }}
                backHandler={true}>
                <MenuTrigger onPress={onTriggerPress}>
                  <TouchableOpacity
                    style={styles.backIcon}
                    onPress={() => {
                      setOpen(true);
                    }}>
                    <Icon
                      name={'dots-horizontal'}
                      type={'MaterialCommunityIcons'}
                      size={30}
                      color={R.color.blackShade4}
                    />
                  </TouchableOpacity>
                </MenuTrigger>

                <MenuOptions optionsContainerStyle={styles.menuOptionContainer}>
                  <MenuOption
                    style={R.styles.twoItemsRow}
                    onSelect={() => setDefaultCard(index)}>
                    <View style={styles.menuSvgView}>
                      <DefaultArrowIcon height="100%" width="100%" />
                    </View>
                    <Text
                      variant={'body3'}
                      font={'InterRegular'}
                      color={R.color.blackShade4}
                      align={'left'}
                      transform={'none'}>
                      Set as Default
                    </Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => removeCard(item.id)}
                    style={R.styles.twoItemsRow}>
                    <View style={styles.menuSvgView}>
                      <TrashIcon height="100%" width="100%" />
                    </View>
                    <Text
                      variant={'body3'}
                      font={'InterRegular'}
                      color={R.color.blackShade4}
                      gutterBottom={2}
                      align={'left'}
                      transform={'none'}>
                      {item.last4}
                    </Text>
                  </MenuOption>
                </MenuOptions>
              </Menu> */}
            </View>
          );
        })}
        <Button
          value={'Add new payment method'}
          bgColor={R.color.mainColor}
          width={'100%'}
          size={'lg'}
          gutterTop={16}
          gutterBottom={32}
          color={R.color.white}
          disabled={false}
          loaderColor={R.color.white}
          borderWidth={R.unit.scale(1)}
          borderColor={R.color.mainColor}
        />
        <View style={styles.infoBox}>
          <View style={styles.svgView}>
            <MoneyIcon />
          </View>
          <Text
            variant={'body2'}
            font={'Sequel551'}
            color={R.color.blackShade4}
            align={'left'}
            gutterTop={24}
            transform={'none'}>
            Make all payments through Lytesnap
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            gutterTop={24}
            transform={'none'}>
            Always pay and communicate through Lytesnap to ensure you're
            protected under our{' '}
            <Text
              variant={'body2'}
              font={'InterRegular'}
              color={R.color.hyperLinkColor}
              align={'left'}
              style={{textDecorationLine: 'underline'}}
              gutterTop={24}
              transform={'none'}>
              Terms of Service
            </Text>
            , cancellation, and other safeguards.
          </Text>
        </View>
      </View>
      <CardOptionsModal
        isVisibleModal={isModal}
        modalData={modalData}
        setDefaultCard={setDefaultCard}
        removeCard={removeCard}
      />
    </ScrollView>
  );
}
export default PayoutMethodsTab;

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
  emailButtonContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: R.unit.scale(48),
  },
  menuOptionContainer: {
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(12),
    borderRadius: R.unit.scale(10),
    marginTop: R.unit.scale(40),
    width: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  svgView: {
    aspectRatio: 1,
    marginRight: R.unit.scale(16),
    height: R.unit.scale(30),
  },
  menuSvgView: {
    aspectRatio: 1,
    marginRight: R.unit.scale(12),
    height: R.unit.scale(15),
  },
  cardView: {
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(18),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    borderRadius: R.unit.scale(10),
    marginBottom: R.unit.scale(8),
  },
  infoBox: {
    padding: R.unit.scale(24),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    borderRadius: R.unit.scale(10),
    marginBottom: R.unit.scale(8),
  },
});
