import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';
import CoachesList from '@components/view/screens/ToDo/CoachesList';
import {StudentRoleIcon} from '@components/utils/Svg';
import {coachLists, coachTags} from '@components/constants';
import Divider from '@components/common/Divider';
import ToDoErrorDisplay from '@components/view/screens/ToDo/ToDoErrorDisplay';

function StudentProfileScreen(props) {
  const {navigation} = props;
  const {type} = props.route.params;

  const goBack = () => {
    if (type === 'Profile') {
      navigation.navigate('ProfileTab', {screen: 'Reviews'});
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScrollView
      style={[R.styles.container, styles.mainLayout]}
      vertical={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: R.unit.scale(10),
      }}>
      <View style={[R.styles.rowView, styles.headerLayout]}>
        <TouchableOpacity style={styles.backIcon} onPress={goBack}>
          <Icon
            type={'Ionicons'}
            name={'close'}
            size={20}
            color={R.color.black}
          />
        </TouchableOpacity>
        <View style={{marginRight: R.unit.scale(20), flex: 1}}>
          <Text
            variant={'body2'}
            font={'InterSemiBold'}
            color={R.color.blackShade4}
            gutterBottom={2}
            align={'center'}
            transform={'none'}>
            User Profile
          </Text>
        </View>
      </View>

      <View style={styles.contentView}>
        <View style={[R.styles.rowView, styles.bioView]}>
          <Image
            style={styles.profileImage}
            imageStyle={{
              borderRadius: R.unit.scale(120),
            }}
            source={R.image.coachPic()}
            resizeMode="cover"
          />

          <View
            style={{
              width: '70%',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}>
            <Text
              variant={'h6'}
              font={'Sequel651'}
              color={R.color.blackShade4}
              align={'left'}
              lineHeight={24}
              numberOfLines={2}
              transform={'none'}>
              Kate Smith
            </Text>

            <View style={[R.styles.rowView, styles.subBioView]}>
              <Icon
                name={'star'}
                type={'Foundation'}
                color={R.color.mainColor}
                size={25}
                iconStyles={{marginRight: R.unit.scale(8)}}
              />

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  variant={'body3'}
                  font={'InterSemiBold'}
                  color={R.color.blackShade4}
                  align={'left'}
                  transform={'none'}>
                  5.0
                </Text>
              </View>

              <View style={[R.styles.dot, styles.dot]} />

              <Text
                variant={'body3'}
                font={'InterSemiBold'}
                color={R.color.blackShade4}
                align={'left'}
                transform={'none'}>
                27 yrs old
              </Text>
            </View>

            <TouchableOpacity style={styles.cancelButton} activeOpacity={0.6}>
              <Icon
                type={'Ionicons'}
                name={'chatbubble-ellipses-outline'}
                color={R.color.blackShade4}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          variant={'h4'}
          font={'Sequel651'}
          color={R.color.blackShade4}
          gutterBottom={8}
          align={'left'}
          transform={'none'}>
          More about Kate
        </Text>
        <Text
          variant={'body2'}
          font={'InterRegular'}
          color={R.color.gray}
          align={'left'}
          gutterBottom={40}
          transform={'none'}>
          Hello, my name is Kate and I am 28 years old. I just moved to the U.S
          from Macedonia. I have played competitive tennis 10+ years . I am well
          aware of all the different types of players there are. I am passionate
          about the sport.
        </Text>
        <Text
          variant={'h4'}
          font={'Sequel651'}
          color={R.color.blackShade4}
          gutterBottom={8}
          align={'left'}
          transform={'none'}>
          Experience
        </Text>

        <View style={styles.tagLayout}>
          {coachTags?.map(item => {
            return (
              <View style={[styles.tag, R.styles.twoItemsRow]}>
                <Text
                  variant={'body2'}
                  font={'InterRegular'}
                  color={R.color.gray}
                  align={'center'}
                  transform={'none'}>
                  {item?.sportName}
                  {': '}
                  <Text
                    variant={'body2'}
                    font={'InterRegular'}
                    color={R.color.blackShade4}
                    align={'center'}
                    transform={'none'}>
                    {item?.expLevel}
                  </Text>
                </Text>
              </View>
            );
          })}
        </View>

        <Text
          variant={'h4'}
          font={'Sequel651'}
          color={R.color.blackShade4}
          gutterBottom={8}
          align={'left'}
          transform={'none'}>
          My coaches
        </Text>

        {coachLists.length === 0 ? (
          <View
            style={{
              marginTop: R.unit.scale(80),
            }}>
            <ToDoErrorDisplay
              icon={<StudentRoleIcon width="100%" height="100%" />}
              heading={'Kate has no coaches yet'}
              isFooter={false}
              text={
                'As soon as the student passes the first training session, the coach from whom she passed it will appear here.'
              }
            />
          </View>
        ) : (
          <>
            {coachLists?.map((item, index, arr) => {
              return (
                <View key={index}>
                  <CoachesList item={item} />
                  {index !== arr.length - 1 && (
                    <Divider lineStyles={{marginVertical: R.unit.scale(24)}} />
                  )}
                </View>
              );
            })}
          </>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  headerLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(16),
    borderBottomWidth: R.unit.scale(0.75),
    borderBottomColor: R.color.gray4,
  },
  contentView: {
    backgroundColor: R.color.white,
    flex: 1,
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
  },
  bioView: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
    width: '100%',
  },
  profileImage: {
    width: R.unit.scale(99),
    height: R.unit.scale(130),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.white,
    borderWidth: R.unit.scale(1),
    marginRight: R.unit.scale(12),
  },
  subBioView: {
    justifyContent: 'flex-start',
    marginBottom: R.unit.scale(16),
  },
  dot: {
    marginHorizontal: R.unit.scale(8),
    backgroundColor: R.color.gray,
  },
  cancelButton: {
    padding: R.unit.scale(12),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(0.75),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
    width: R.unit.scale(47),
  },
  tagLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingVertical: 20,
  },
  tag: {
    paddingVertical: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(8),
    borderRadius: R.unit.scale(8),
    justifyContent: 'space-between',
    marginRight: R.unit.scale(12),
    marginBottom: R.unit.scale(12),
    borderWidth: R.unit.scale(0.75),
    borderColor: R.color.gray4,
  },
});

export default StudentProfileScreen;
