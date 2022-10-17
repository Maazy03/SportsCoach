import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import TextInput from '@components/common/TextInput';
import {
  CalendarReqIcon,
  ClockReqIcon,
  EvalErrorIcon,
  FilterIcon,
  LocationReqIcon,
  WalletReqIcon,
} from '@components/utils/Svg';
import {evaluations} from '@components/constants';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';
import ToDoErrorDisplay from '@components/view/screens/ToDo/ToDoErrorDisplay';
import ToDoFilterModal from '@components/view/modal/ToDoFilterModal';
import navigationService from '@components/navigation/navigationService';

function StudentEvaluation(props) {
  const [text, setText] = useState('');
  const [filteredArray, setFilteredArray] = useState(evaluations);
  const [isModal, setIsModal] = useState(false);

  const onChange = value => {
    setText(value);
    if (value.length > 1) {
      let updatedArr = evaluations?.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
      if (updatedArr.length > 0) {
        setFilteredArray(updatedArr);
      } else {
        setFilteredArray([]);
      }
    } else {
      setFilteredArray(evaluations);
    }
  };

  const openFilters = () => {
    setIsModal(!isModal);
  };

  const submitEvaluation = item => {
    if (!item.isEvaluated) {
      let id = item.id;
      const newData = filteredArray.slice(0);
      let isEval = newData.find(item => item.id === id).isEvaluated;
      newData.find(item => item.id === id).isEvaluated = !isEval;
      setFilteredArray(newData);
      navigationService.navigate('EvaluationScreen', {
        name: item.name,
      });
    } else {
      navigationService.navigate('UpdateEvaluation', {
        name: item.name,
        evaluation: item.evaluation,
      });
    }
  };

  return (
    <View style={[R.styles.container, styles.mainLayout]}>
      <View style={styles.contentContainer}>
        <TextInput
          secureText={false}
          placeholder={'Search'}
          onChangeText={onChange}
          color={R.color.black}
          value={text}
          returnKeyType={'done'}
          iconName={'search'}
          iconType={'Fontisto'}
          alignItems={'center'}
          iconColor={R.color.blackShade4}
          iconRightName={'search'}
          iconLeftType={'Fontisto'}
          customIcon={
            <View style={{padding: R.unit.scale(5)}}>
              <FilterIcon />
            </View>
          }
          iconPress={openFilters}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 100 : 20),
          }}>
          {filteredArray?.length === 0 ? (
            <View style={{flex: 1}}>
              <ToDoErrorDisplay
                icon={<EvalErrorIcon height="100%" width="100%" />}
                heading={'You have no student evaluations yet'}
                text={
                  'As soon as you do the first lesson, student evaluation will appear here.'
                }
              />
            </View>
          ) : (
            <>
              {filteredArray?.map((item, index, arr) => {
                return (
                  <View style={styles.notificationCard} key={index}>
                    <View
                      style={[
                        R.styles.twoItemsRow,
                        {alignItems: 'flex-start'},
                      ]}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          navigationService.navigate('Home', {
                            screen: 'StudentProfile',
                            params: {
                              type: 'Home',
                            },
                          });
                        }}>
                        <Image
                          source={R.image.BaseBallSport()}
                          resizeMode={'contain'}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                      <View style={[R.styles.twoItemsRow, styles.titleView]}>
                        <Text
                          variant={'body2'}
                          font={'InterSemiBold'}
                          color={R.color.blackShade4}
                          align={'left'}
                          gutterTop={5}
                          numberOfLines={2}
                          transform={'none'}>
                          {item.name}{' '}
                          <Text
                            variant={'body3'}
                            font={'InterRegular'}
                            color={R.color.blackShade4}
                            align={'left'}
                            transform={'none'}>
                            {item.text}
                          </Text>
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        R.styles.twoItemsRow,
                        {marginTop: R.unit.scale(16)},
                      ]}>
                      <View style={styles.svgView}>
                        <CalendarReqIcon height="100%" width="100%" />
                      </View>
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.blackShade4}
                        align={'left'}
                        style={{marginLeft: R.unit.scale(8)}}
                        transform={'none'}>
                        {item.date}
                      </Text>
                    </View>

                    <View style={[R.styles.twoItemsRow, styles.detailView]}>
                      <View style={styles.svgView}>
                        <ClockReqIcon height="100%" width="100%" />
                      </View>
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.blackShade4}
                        align={'left'}
                        style={{marginLeft: R.unit.scale(8)}}
                        transform={'none'}>
                        {item.time}
                      </Text>
                    </View>

                    <View style={[R.styles.twoItemsRow, styles.detailView]}>
                      <View style={styles.svgView}>
                        <WalletReqIcon height="100%" width="100%" />
                      </View>
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.blackShade4}
                        align={'left'}
                        style={{marginLeft: R.unit.scale(8)}}
                        transform={'none'}>
                        {item.amount}
                      </Text>
                    </View>

                    <View style={[R.styles.twoItemsRow, styles.detailView]}>
                      <View style={styles.svgView}>
                        <LocationReqIcon height="100%" width="100%" />
                      </View>
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.blackShade4}
                        align={'left'}
                        style={{marginLeft: R.unit.scale(8)}}
                        transform={'none'}>
                        {item.location}
                      </Text>
                    </View>

                    <View style={[R.styles.rowView, styles.buttonContainer]}>
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.gray}
                        align={'left'}
                        transform={'none'}>
                        {item.timeLeft}
                      </Text>
                      <View style={[R.styles.twoItemsRow, styles.buttonLayout]}>
                        <Button
                          value={
                            item?.isEvaluated ? 'Read evaluation' : 'Evaluate'
                          }
                          bgColor={
                            item?.isEvaluated
                              ? R.color.white
                              : R.color.mainColor
                          }
                          borderColor={
                            item?.isEvaluated
                              ? R.color.gray4
                              : R.color.mainColor
                          }
                          font={'InterNormal'}
                          width={'100%'}
                          size={'lg'}
                          color={
                            item?.isEvaluated
                              ? R.color.blackShade4
                              : R.color.white
                          }
                          disabled={false}
                          loaderColor={R.color.white}
                          borderWidth={1}
                          onPress={() => submitEvaluation(item)}
                        />
                      </View>
                    </View>
                    {index !== arr.length - 1 && <Divider />}
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
      <ToDoFilterModal isVisibleModal={isModal} statusFlag={true} />
    </View>
  );
}
export default StudentEvaluation;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    paddingTop: R.unit.scale(16),
  },
  titleView: {
    marginLeft: R.unit.scale(16),
    width: '75%',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(17),
  },
  notificationCard: {
    marginTop: R.unit.scale(24),
  },
  image: {
    width: R.unit.scale(48),
    height: R.unit.scale(48),
    borderRadius: R.unit.scale(8),
  },
  detailView: {
    marginTop: R.unit.scale(12),
  },
  buttonContainer: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
  },
  buttonLayout: {
    justifyContent: 'flex-end',
    width: '70%',
  },
  cancelButton: {
    padding: R.unit.scale(16),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(0.75),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
});
