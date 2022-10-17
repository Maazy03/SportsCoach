import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';
import TextInput from '@components/common/TextInput';
import InfoModal from '@components/view/modal/InfoModal';
import Button from '@components/common/Button';
import EvalCongratsModal from '@components/view/modal/EvalCongratsModal';

export default function EvaluationScreen(props) {
  const {navigation} = props;
  const [text, setText] = useState('');
  const {name} = props.route.params;
  const [disabled, setDisabled] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isCongratsModal, setIsCongratsModal] = useState(false);

  const openModal = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    if (text.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [text]);

  const submit = () => {
    setIsCongratsModal(!isCongratsModal);
  };

  return (
    <KeyboardAwareScrollView
      style={[R.styles.container, styles.mainLayout]}
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: R.unit.pdBottomList(80),
      }}>
      <View style={styles.contentView}>
        <View style={{paddingTop: R.unit.scale(60)}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              ...R.styles.twoItemsRow,
              width: '40%',
            }}>
            <Icon
              type={'MaterialIcons'}
              name={'keyboard-arrow-left'}
              color={R.color.blackShade4}
              size={20}
              iconStyles={{marginLeft: -5, marginRight: R.unit.scale(5)}}
            />
            <Text
              variant={'body3'}
              font={'InterMedium'}
              color={R.color.blackShade4}
              align={'left'}
              style={{}}
              transform={'none'}>
              Go back
            </Text>
          </TouchableOpacity>
          <Text
            variant={'h3'}
            font={'Sequel551'}
            color={R.color.blackShade4}
            gutterTop={16}
            gutterBottom={24}
            align={'left'}
            transform={'none'}>
            Evaluate {name}'s performance
          </Text>
          <TextInput
            secureText={false}
            title={'Share your feedback about the lesson'}
            isSubTitle={true}
            subTitle={'dsadsa'}
            subTitleIcon={
              <TouchableOpacity onPress={openModal}>
                <Icon
                  type={'MaterialIcons'}
                  name={'info-outline'}
                  color={R.color.blackShade4}
                  size={15}
                />
              </TouchableOpacity>
            }
            onChangeText={text => {
              setText(text);
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            titleColor={R.color.black}
            color={R.color.black}
            value={text}
            gutterBottom={32}
            backgroundColor={'white'}
            multiline={true}
            numberOfLines={60}
            height={164}
          />
        </View>
        <View>
          <Button
            value={'Open Lessons'}
            bgColor={R.color.white}
            width={'100%'}
            size={'lg'}
            gutterBottom={12}
            color={R.color.black}
            disabled={false}
            borderColor={R.color.gray4}
            borderWidth={1}
            loaderColor={R.color.white}
          />
          <Button
            value={'Submit'}
            bgColor={R.color.mainColor}
            width={'100%'}
            size={'lg'}
            color={R.color.white}
            disabled={disabled}
            onPress={submit}
          />
        </View>
      </View>
      <InfoModal isVisibleModal={isModal} />
      <EvalCongratsModal
        isVisibleModal={isCongratsModal}
        navigation={navigation}
        heading={'Updated'}
        text={'We’ve updated your feedback and send Jessica the notification!'}
      />
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  contentView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: R.unit.scale(20),
  },
  horizontalScroll: {
    width: '100%',
    marginTop: R.unit.scale(16),
    height: R.unit.scale(40),
    borderBottomColor: R.color.gray2,
    borderBottomWidth: 1,
  },
  tab: {
    width: R.unit.width(0.5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '90%',
    alignItems: 'center',
  },
  tabItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  underLine: {
    backgroundColor: R.color.mainColor,
    height: R.unit.scale(4),
    width: R.unit.scale(130),
    borderTopRightRadius: R.unit.scale(5),
    borderTopLeftRadius: R.unit.scale(5),
  },
});
