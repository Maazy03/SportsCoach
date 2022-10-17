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
import {lessonSchedules} from '@components/constants';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';
import ToDoErrorDisplay from '@components/view/screens/ToDo/ToDoErrorDisplay';
import {
  CalendarReqIcon,
  ClockReqIcon,
  FilterIcon,
  LessonRequestErrorIcon,
  LocationReqIcon,
  MiniCalendarIcon,
  WalletReqIcon,
} from '@components/utils/Svg';
import PopUp from '@components/common/PopUp';
import CalendarMain from '../Calendars';
import ScheduleFilterModal from '@components/view/modal/ScheduleModals/ScheduleFilterModal';

function ScheduleScreen(props) {
  const {navigation} = props;
  const [text, setText] = useState('');
  const [filteredArray, setFilteredArray] = useState(lessonSchedules);
  const [isModal, setIsModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState('List');

  const onChange = value => {
    setText(value);
    if (value.length > 1) {
      let updatedArr = filteredArray?.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
      if (updatedArr.length > 0) {
        setFilteredArray(updatedArr);
      } else {
        setFilteredArray([]);
      }
    } else {
      setFilteredArray(lessonSchedules);
    }
  };

  const openFilters = () => {
    setIsModal(!isModal);
  };

  const onAccept = item => {
    let id = item.id;
    let obj = filteredArray.find(item => item.id === id);
    let isChecked = obj.isAccepted;
    if (!isChecked) {
      obj.isAccepted = !isChecked;
      setFilteredArray([...filteredArray]);
      PopUp({
        heading: 'New lesson added to calendar',
        leftIcon: (
          <View style={styles.popupSvg}>
            <MiniCalendarIcon height="100%" width="100%" />
          </View>
        ),
      });
    } else {
      obj.isAccepted = !isChecked;
      setFilteredArray([...filteredArray]);
      PopUp({
        heading: 'New lesson removed from calendar',
        leftIcon: (
          <View style={styles.popupSvg}>
            <MiniCalendarIcon height="100%" width="100%" />
          </View>
        ),
      });
    }
  };

  const onRemove = id => {
    let arr = filteredArray.filter(item => item.id !== id);
    setFilteredArray(arr);
  };

  return (
    <View style={[R.styles.container, styles.mainLayout]}>
      <View style={styles.contentContainer}>
        <Text
          variant={'h3'}
          font={'Sequel551'}
          color={R.color.blackShade4}
          align={'left'}
          lineHeight={45}
          gutterBottom={16}
          transform={'none'}>
          Schedule
        </Text>
        <View style={R.styles.rowView}>
          <TextInput
            secureText={false}
            placeholder={'Search'}
            onChangeText={onChange}
            color={R.color.black}
            value={text}
            width={0.65}
            returnKeyType={'done'}
            iconName={'search'}
            iconType={'Fontisto'}
            iconLeftType={'Fontisto'}
            alignItems={'center'}
            iconColor={R.color.blackShade4}
            iconRightName={'search'}
            customIcon={
              <View style={{padding: R.unit.scale(5)}}>
                <FilterIcon />
              </View>
            }
            iconPress={openFilters}
          />
          <Button
            value={'Availability'}
            bgColor={R.color.mainColor}
            width={'27%'}
            size={'md'}
            variant={'body3'}
            font={'InterMedium'}
            color={R.color.white}
            disabled={false}
            loaderColor={R.color.white}
            onPress={() => navigation.navigate('ScheduleAvailability')}
          />
        </View>
        {calendarType !== 'List' ? (
          <ScrollView
            contentContainerStyle={{paddingBottom: R.unit.pdBottomList(100)}}>
            <CalendarMain typeOfCalendar={calendarType} />
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingTop: R.unit.scale(30)}}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: R.unit.pdBottomList(150),
            }}>
            {filteredArray?.length === 0 ? (
              <View style={{flex: 1}}>
                <ToDoErrorDisplay
                  icon={<LessonRequestErrorIcon height="100%" width="100%" />}
                  heading={'You have no upcoming lesson requests yet'}
                  text={
                    'As soon as someone gives a review it will appear in this list.'
                  }
                />
              </View>
            ) : (
              <>
                {filteredArray?.map((item, index, arr) => {
                  return (
                    <View key={index}>
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
                          {item.createdAt}
                        </Text>
                        <View
                          style={[R.styles.twoItemsRow, styles.buttonLayout]}>
                          <TouchableOpacity
                            style={styles.cancelButton}
                            activeOpacity={0.5}
                            onPress={() => {
                              onRemove(item.id);
                            }}>
                            <Icon
                              type={'Ionicons'}
                              name={'close'}
                              color={R.color.blackShade4}
                              size={20}
                            />
                          </TouchableOpacity>

                          <Button
                            value={item.isAccepted ? 'Cancel' : 'Accept'}
                            bgColor={
                              item.isAccepted
                                ? R.color.white
                                : R.color.mainColor
                            }
                            width={'70%'}
                            size={'lg'}
                            color={
                              item.isAccepted
                                ? R.color.blackShade4
                                : R.color.white
                            }
                            borderColor={
                              item.isAccepted
                                ? R.color.gray4
                                : R.color.mainColor
                            }
                            disabled={false}
                            loaderColor={R.color.white}
                            borderWidth={1}
                            onPress={() => onAccept(item)}
                          />
                        </View>
                      </View>

                      {index !== arr.length - 1 && (
                        <Divider
                          lineStyles={{
                            marginBottom: R.unit.scale(24),
                            marginTop: R.unit.scale(24),
                          }}
                        />
                      )}
                    </View>
                  );
                })}
              </>
            )}
          </ScrollView>
        )}
      </View>
      <ScheduleFilterModal
        isVisibleModal={isModal}
        setCalendarType={data => setCalendarType(data)}
      />
    </View>
  );
}
export default ScheduleScreen;

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
    marginTop: R.unit.scale(24),
  },
  header: {
    marginTop: R.unit.scale(20),
    marginBottom: R.unit.scale(8),
  },
  titleView: {
    marginLeft: R.unit.scale(16),
    width: '75%',
    marginTop: R.unit.scale(5),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(17),
  },
  popupSvg: {
    aspectRatio: 1,
    height: R.unit.scale(30),
  },
  image: {
    width: R.unit.scale(56),
    height: R.unit.scale(56),
    borderRadius: R.unit.scale(8),
  },
  detailView: {
    marginTop: R.unit.scale(12),
  },
  buttonContainer: {
    marginTop: R.unit.scale(16),
  },
  buttonLayout: {
    justifyContent: 'flex-end',
    width: '70%',
  },
  cancelButton: {
    padding: R.unit.scale(
      Platform.OS == 'ios' && R.unit.width(1) > 1000
        ? 16
        : Platform.OS == 'ios' && R.unit.width(1) < 1000
        ? 12
        : 16,
    ),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(0.75),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
});
