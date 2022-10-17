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
import {FilterIcon, LessonRequestErrorIcon} from '@components/utils/Svg';
import {lessonRequests} from '@components/constants';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';
import ToDoErrorDisplay from '@components/view/screens/ToDo/ToDoErrorDisplay';
import RatingStars from '@components/common/RatingStars';
import ReviewsFilterModal from '@components/view/modal/ReviewsFilterModal';
import YourRatingModal from '@components/view/modal/YourRatingModal';

function ReviewsScreen(props) {
  const {navigation} = props;
  const [text, setText] = useState('');
  const [filteredArray, setFilteredArray] = useState(lessonRequests);
  const [isModal, setIsModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);

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
      setFilteredArray(lessonRequests);
    }
  };

  const openFilters = () => {
    setIsModal(!isModal);
  };

  const openRatingModal = () => {
    setRatingModal(!ratingModal);
  };

  const onAccept = item => {
    let id = item.id;
    let arr = filteredArray.slice(0);
    let index = arr.findIndex(item => {
      return item.id === id;
    });
    // if (index !== -1) {
    //   console.log('arr[index].isAccepted', arr[index].isAccepted);
    //   if (!arr[index].isAccepted) {
    //     arr[index].isAccepted = true;
    //     console.log('DADSAADS', arr);
    //     setFilteredArray(arr);
    //     PopUp({
    //       heading: 'New lesson added to calendar',
    //       leftIcon: (
    //         <View style={styles.popupSvg}>
    //           <MiniCalendarIcon height="100%" width="100%" />
    //         </View>
    //       ),
    //     });
    //   } else {
    //     arr[index].isAccepted = false;
    //     setFilteredArray(arr);
    //     PopUp({
    //       heading: 'New lesson removed from calendar',
    //       leftIcon: (
    //         <View style={styles.popupSvg}>
    //           <MiniCalendarIcon height="100%" width="100%" />
    //         </View>
    //       ),
    //     });
    //   }
    // }
  };
  return (
    <View style={[R.styles.container, styles.mainLayout]}>
      <View style={styles.contentContainer}>
        <View style={[R.styles.rowView, styles.header]}>
          <Text
            variant={'h3'}
            font={'Sequel551'}
            color={R.color.blackShade4}
            align={'left'}
            lineHeight={45}
            transform={'none'}>
            Reviews
          </Text>
          <TouchableOpacity style={R.styles.rowView} onPress={openRatingModal}>
            <Icon
              name={'star'}
              type={'Foundation'}
              color={R.color.mainColor}
              size={20}
              iconStyles={{marginRight: R.unit.scale(8)}}
            />
            <Text
              variant={'h3'}
              font={'Sequel651'}
              color={R.color.blackShade4}
              align={'left'}
              lineHeight={45}
              transform={'none'}>
              4.0
            </Text>
          </TouchableOpacity>
        </View>

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
          style={{paddingTop: R.unit.scale(30)}}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: R.unit.pdBottomList(100),
          }}>
          {filteredArray?.length === 0 ? (
            <View style={{flex: 1}}>
              <ToDoErrorDisplay
                icon={<LessonRequestErrorIcon height="100%" width="100%" />}
                heading={'You have no reviews yet'}
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
                        {
                          alignItems: 'flex-start',
                          marginBottom: R.unit.scale(16),
                        },
                      ]}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                          navigation.navigate('Home', {
                            screen: 'StudentProfile',
                            params: {
                              preRoute: 'Reviews',
                              preStack: 'ProfileTab',
                            },
                          });
                        }}>
                        <Image
                          source={R.image.BaseBallSport()}
                          resizeMode={'contain'}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                      <View>
                        <View style={[R.styles.twoItemsRow, styles.titleView]}>
                          <Text
                            variant={'body2'}
                            font={'InterSemiBold'}
                            color={R.color.blackShade4}
                            align={'left'}
                            numberOfLines={2}
                            transform={'none'}>
                            {item.name}
                          </Text>
                          <View
                            style={{
                              ...R.styles.dot,
                              marginHorizontal: R.unit.scale(16),
                            }}
                          />
                          <Text
                            variant={'body2'}
                            font={'InterRegular'}
                            color={R.color.blackShade4}
                            align={'left'}
                            numberOfLines={2}
                            transform={'none'}>
                            June 14, 2021
                          </Text>
                        </View>
                        <View style={[R.styles.twoItemsRow, styles.titleView]}>
                          <RatingStars
                            starSize={15}
                            starContainerStyles={{width: R.unit.scale(80)}}
                            stars={5}
                            disabled={true}
                          />
                        </View>
                      </View>
                    </View>

                    <Text
                      variant={'body2'}
                      font={'InterRegular'}
                      color={R.color.gray}
                      align={'left'}
                      transform={'none'}>
                      John has a knack. He can teach through his writings. He
                      inspires confidence in his students, and by reading. Watch
                      the Ball, you'll be inspired too.
                    </Text>

                    <View style={styles.tagLayout}>
                      <View style={[styles.tag, R.styles.twoItemsRow]}>
                        <Text
                          variant={'body2'}
                          font={'InterRegular'}
                          color={R.color.black}
                          align={'center'}
                          transform={'none'}>
                          Competitive
                        </Text>
                      </View>

                      <View style={[styles.tag, R.styles.twoItemsRow]}>
                        <Text
                          variant={'body2'}
                          font={'InterRegular'}
                          color={R.color.black}
                          align={'center'}
                          transform={'none'}>
                          Friendly to kids
                        </Text>
                      </View>
                    </View>

                    <View style={[R.styles.rowView, styles.buttonContainer]}>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        activeOpacity={0.6}
                        onPress={() => {
                          navigation.navigate('Inbox', {
                            screen: 'ChatsList',
                          });
                        }}>
                        <Icon
                          type={'Ionicons'}
                          name={'chatbubble-ellipses-outline'}
                          color={R.color.blackShade4}
                          size={20}
                        />
                      </TouchableOpacity>

                      <Button
                        value={'View lesson info'}
                        bgColor={R.color.white}
                        width={'82%'}
                        size={'lg'}
                        font={'InterMedium'}
                        variant={'body3'}
                        color={R.color.blackShade4}
                        borderColor={R.color.gray4}
                        disabled={false}
                        loaderColor={R.color.white}
                        borderWidth={0.75}
                        onPress={() => {
                          navigation.navigate('Home', {
                            screen: 'LessonDetails',
                            params: {
                              type: 'Profile',
                            },
                          });
                        }}
                      />
                    </View>

                    {index !== arr.length - 1 && (
                      <Divider
                        lineStyles={{
                          marginVertical: R.unit.scale(32),
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
      <ReviewsFilterModal isVisibleModal={isModal} />
      <YourRatingModal isVisibleModal={ratingModal} />
    </View>
  );
}
export default ReviewsScreen;

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
    paddingTop: R.unit.scale(32),
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
    justifyContent: 'flex-end',
  },
  buttonLayout: {
    width: '100%',
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
  tagLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  tag: {
    backgroundColor: R.color.white,
    paddingVertical: R.unit.scale(8),
    paddingHorizontal: R.unit.scale(16),
    borderRadius: R.unit.scale(10),
    justifyContent: 'space-between',
    marginRight: R.unit.scale(12),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    marginTop: R.unit.scale(16),
  },
});
