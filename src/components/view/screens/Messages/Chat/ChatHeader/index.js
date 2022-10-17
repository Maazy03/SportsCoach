import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import {MiniCalendarIcon} from '@components/utils/Svg';
import PopUp from '@components/common/PopUp';
import LessonDetailsModal from '@components/view/modal/LessonDetailsModal';
import navigationService from '@components/navigation/navigationService';

function ChatHeader(props) {
  const {name} = props;
  const [isModal, setIsModal] = useState(false);
  const [open, setOpen] = useState(false);

  const modalData = {
    end: '2022-10-13T09:39:42+05:00',
    eventDate: '2022-10-13T06:39:42+05:00',
    id: 1,
    location: 'Green Tennis Court',
    start: '2022-10-13T03:39:42+05:00',
    status: 'upcoming',
    title: 'Tennis Lesson with Jennys',
    type: '1-on-1',
  };

  const openModal = () => {
    setIsModal(!isModal);
  };

  const cancelLesson = () => {
    PopUp({
      heading: 'Lesson removed from calendar',
      visibilityTime: 2000,
      leftIcon: (
        <View style={styles.popupSvg}>
          <MiniCalendarIcon height="100%" width="100%" />
        </View>
      ),
      containerStyles: {
        paddingVertical: R.unit.scale(12),
        width: '90%',
      },
    });
  };

  const onTriggerPress = () => {
    setOpen(!open);
  };

  const onBackdropPress = () => {
    setOpen(false);
  };

  return (
    <View style={[R.styles.rowView, styles.headerLayout]}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => {
          navigationService.goBack();
        }}>
        <Icon
          name={'keyboard-arrow-left'}
          type={'MaterialIcons'}
          size={30}
          color={R.color.black}
        />
      </TouchableOpacity>
      <View style={styles.headingView}>
        <View style={R.styles.twoItemsRow}>
          <Image
            style={styles.profileImage}
            imageStyle={{
              borderRadius: R.unit.scale(120),
            }}
            source={R.image.coachPic()}
            resizeMode="cover"
          />
          <View style={{marginLeft: R.unit.scale(16)}}>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.blackShade4}
              gutterBottom={2}
              align={'left'}
              transform={'none'}>
              1-on-1 Tennis Lesson with
            </Text>
            <Text
              variant={'body3'}
              font={'InterBold'}
              color={R.color.blackShade4}
              align={'left'}
              transform={'none'}>
              {name}
            </Text>
          </View>
        </View>
      </View>

      <Menu
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
              color={R.color.black}
            />
          </TouchableOpacity>
        </MenuTrigger>

        <MenuOptions optionsContainerStyle={styles.menuOptionContainer}>
          <MenuOption onSelect={openModal}>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.blackShade4}
              gutterBottom={2}
              align={'left'}
              transform={'none'}>
              Lesson details
            </Text>
          </MenuOption>
          <MenuOption onSelect={cancelLesson}>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.blackShade4}
              gutterBottom={2}
              align={'left'}
              transform={'none'}>
              Cancel lesson
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>

      <LessonDetailsModal isVisibleModal={isModal} modalData={modalData} />
    </View>
  );
}
export default ChatHeader;

const styles = StyleSheet.create({
  headerLayout: {
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(12),
    borderBottomWidth: R.unit.scale(0.75),
    borderBottomColor: R.color.gray4,
  },
  backIcon: {
    padding: R.unit.scale(5),
  },
  headingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: R.unit.scale(55),
    height: R.unit.scale(55),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.white,
    borderWidth: R.unit.scale(1),
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
  popupSvg: {
    aspectRatio: 1,
    height: R.unit.scale(30),
  },
});
