import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import * as Progress from 'react-native-progress';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';
import TextInput from '@components/common/TextInput';
import Button from '@components/common/Button';
import RatingStars from '@components/common/RatingStars';
import EvalCongratsModal from '@components/view/modal/EvalCongratsModal';
import {InfoIcon} from '@components/utils/Svg';

function UpdateEvaluationScreen(props) {
  const {navigation} = props;
  const {name, evaluation} = props.route.params;
  const inputRef = useRef();
  const [text, setText] = useState(evaluation);
  const [isFocused, setIsFocused] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      // setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsFocused(false);
      inputRef.current.blur();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyNotes = [
    {title: 'Accurancy', value: 4},
    {title: 'Location', value: 5},
    {title: 'Value', value: 3},
    {title: 'Communication', value: 5},
  ];

  const openModal = () => {
    setIsModal(!isModal);
  };

  const submit = () => {
    openModal();
  };

  const cancelled = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  return (
    <ScrollView
      style={[R.styles.container, styles.mainLayout]}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: R.unit.pdBottomList(70),
      }}>
      <View style={styles.contentView}>
        <View style={{paddingTop: R.unit.scale(60)}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[R.styles.twoItemsRow, styles.goBackHeader]}>
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
            gutterBottom={24}
            align={'left'}
            transform={'none'}>
            Evaluate {name}'s performance
          </Text>
          <Text
            variant={'body1'}
            font={'Sequel551'}
            color={R.color.blackShade4}
            gutterBottom={24}
            align={'left'}
            transform={'none'}>
            {name}'s feedback to you
          </Text>
          <View
            style={{...R.styles.twoItemsRow, marginBottom: R.unit.scale(24)}}>
            <RatingStars stars={4} disabled={true} />

            <View
              style={{...R.styles.dot, marginHorizontal: R.unit.scale(12)}}
            />

            <Text
              variant={'h4'}
              font={'Sequel551'}
              color={R.color.blackShade4}
              align={'left'}
              transform={'none'}>
              4.0
            </Text>
          </View>

          {keyNotes?.map((item, index, arr) => {
            return (
              <View key={index}>
                <Text
                  variant={'body2'}
                  font={'InterRegular'}
                  color={R.color.blackShade4}
                  align={'left'}
                  transform={'none'}>
                  {item.title}
                </Text>
                <View
                  style={{
                    ...R.styles.twoItemsRow,
                    marginBottom:
                      index === arr.length - 1 ? 0 : R.unit.scale(8),
                  }}>
                  <View style={{width: '90%'}}>
                    <Progress.Bar
                      progress={item.value * 0.2}
                      width={null}
                      color={R.color.mainColor}
                      unfilledColor={R.color.gray2}
                      borderWidth={0}
                    />
                  </View>

                  <Text
                    variant={'body3'}
                    font={'InterSemiBold'}
                    color={R.color.blackShade4}
                    style={{width: '10%'}}
                    align={'right'}
                    transform={'none'}>
                    {item.value}.0
                  </Text>
                </View>
              </View>
            );
          })}

          <View style={[R.styles.twoItemsRow, styles.nameView]}>
            <Image
              source={R.image.BaseBallSport()}
              style={{
                borderRadius: R.unit.scale(10),
                height: R.unit.scale(48),
                width: R.unit.scale(48),
              }}
            />
            <View style={{flex: 1, marginLeft: R.unit.scale(16)}}>
              <Text
                variant={'body2'}
                font={'InterSemiBold'}
                color={R.color.blackShade4}
                align={'left'}
                transform={'none'}>
                {name}
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.gray}
                align={'left'}
                transform={'none'}>
                June 14, 2021
              </Text>
            </View>
          </View>

          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            gutterBottom={16}
            transform={'none'}>
            John has a knack. He can teach through his writings. He inspires
            confidence in his students, and by reading. Watch the Ball, you'll
            be inspired too.
          </Text>

          <View style={R.styles.twoItemsRow}>
            <View style={styles.svgView}>
              <InfoIcon height="100%" width="100%" />
            </View>
            <Text
              variant={'body2'}
              font={'InterRegular'}
              color={R.color.gray}
              align={'left'}
              transform={'none'}>
              This is a personal feedback that only you can see.
            </Text>
          </View>

          <Text
            variant={'h3'}
            font={'Sequel551'}
            color={R.color.blackShade4}
            gutterTop={16}
            gutterBottom={24}
            align={'left'}
            transform={'none'}>
            Your feedback of the lesson
          </Text>
          <TextInput
            secureText={false}
            forwardedRef={inputRef}
            onChangeText={text => {
              setText(text);
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            color={R.color.gray}
            value={text}
            borderColor={isFocused ? R.color.blackShade4 : R.color.gray4}
            gutterBottom={16}
            backgroundColor={'white'}
            multiline={true}
            numberOfLines={60}
            height={164}
            returnKeyType={'done'}
          />
          {isFocused && (
            <View style={R.styles.rowView}>
              <Button
                value={'Cancel'}
                bgColor={R.color.white}
                width={'48%'}
                size={'lg'}
                color={R.color.black}
                disabled={false}
                borderColor={R.color.gray4}
                borderWidth={1}
                onPress={cancelled}
              />
              <Button
                value={'Update'}
                bgColor={R.color.mainColor}
                width={'48%'}
                size={'lg'}
                color={R.color.white}
                borderColor={R.color.gray4}
                borderWidth={1}
                loaderColor={R.color.white}
                onPress={submit}
              />
            </View>
          )}
        </View>
        <View
          style={{
            ...R.styles.rowView,
            marginTop: R.unit.scale(isFocused ? 40 : 64),
          }}>
          <Button
            iconType={'AntDesign'}
            iconName={'message1'}
            iconColor={R.color.blackShade4}
            iconSize={20}
            iconStyle={{
              paddingRight: 0,
            }}
            bgColor={R.color.white}
            width={'17%'}
            size={'lg'}
            color={R.color.black}
            disabled={false}
            borderColor={R.color.gray4}
            borderWidth={1}
            loaderColor={R.color.white}
          />
          <Button
            value={'Open Lesson'}
            bgColor={R.color.white}
            width={'80%'}
            size={'lg'}
            color={R.color.black}
            borderColor={R.color.gray4}
            borderWidth={1}
            loaderColor={R.color.white}
            onPress={() => {
              navigation.navigate('LessonDetails');
            }}
          />
        </View>
      </View>
      <EvalCongratsModal
        isVisibleModal={isModal}
        navigation={navigation}
        heading={'Updated'}
        text={''}
      />
    </ScrollView>
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
  goBackHeader: {
    width: '40%',
    marginBottom: R.unit.scale(16),
  },
  tabItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  nameView: {
    marginTop: R.unit.scale(30),
    marginBottom: R.unit.scale(16),
  },
  svgView: {
    marginRight: R.unit.scale(7),
    aspectRatio: 1,
    height: R.unit.scale(15),
  },
});

export default UpdateEvaluationScreen;
