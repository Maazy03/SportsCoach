import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {DoubleTickIcon} from '@components/utils/Svg';
import {filterTags, notificationsData} from '@components/constants';
import Notification from '@components/view/screens/Notifications/Notification';
import Divider from '@components/common/Divider';
import Icon from '@components/common/Icon';

function NotificationScreen(props) {
  const {navigation} = props;
  const scrollRef = useRef();
  const common = useSelector(state => state.common);
  const [page, setPage] = useState(0);
  const [notifications, setNotifications] = useState(notificationsData);

  const onTabChange = item => {
    let index = item.index;
    let title = item.title;
    setPage(index);
    if (index % 2 === 0) {
      scrollRef.current.scrollTo({x: R.unit.width((index / 2) * 1) / 2});
    }
    // setNotifications(notificationsData);

    if (index === 0) {
      setNotifications(notificationsData);
    } else {
      const newArr = notificationsData?.slice(0);
      let updatedArr = newArr?.filter(item => {
        return item.title.toLowerCase().includes(title.toLowerCase());
      });
      setNotifications(updatedArr);
    }
  };

  const markAllRead = () => {
    notifications.forEach(item => {
      item.isSeen = true;
    });
    setNotifications([...notifications]);
  };

  const readNotification = id => {
    let obj = notifications.find(item => item.id === id);
    if (!obj.isSeen) {
      obj.isSeen = true;
    }
    setNotifications([...notifications]);
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <Notification item={item} readNotification={readNotification} />
        {index !== notifications.length - 1 && (
          <Divider lineStyles={{marginVertical: R.unit.scale(24)}} />
        )}
      </>
    );
  };

  return (
    <View style={[R.styles.container, styles.mainLayout]}>
      <View style={styles.contentView}>
        <View style={R.styles.rowView}>
          <Text
            variant={'h4'}
            font={'Sequel651'}
            color={R.color.blackShade4}
            align={'left'}
            transform={'none'}>
            Notifications
          </Text>
          <TouchableOpacity style={R.styles.twoItemsRow} onPress={markAllRead}>
            <View style={styles.svgView}>
              <DoubleTickIcon height="100%" width="100%" />
            </View>
            <Text
              variant={'body3'}
              font={'InterMedium'}
              color={R.color.hyperLinkColor}
              align={'left'}
              transform={'none'}>
              Mark all as read
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.scrollContent}>
          {filterTags?.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.tab,
                  backgroundColor:
                    page === index ? R.color.blackShade4 : R.color.gray6,
                }}
                activeOpacity={0.9}
                onPress={() => onTabChange(item)}>
                <Text
                  variant={'body3'}
                  font={'InterRegular'}
                  color={page === index ? R.color.white : R.color.blackShade4}
                  align={'left'}
                  style={{top: Platform.OS === 'ios' ? -2 : 0}}
                  transform={'none'}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <FlatList
          bounces={false}
          data={notifications}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: R.unit.pdBottomList(150),
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />

        {common?.bubbleChat && (
          <TouchableOpacity
            style={styles.chatBubbleContainer}
            onPress={() => {
              navigation.navigate('NotificationChat');
            }}
            activeOpacity={0.7}>
            <View style={styles.bubbleUnReadDotContainer}>
              <View style={styles.bubbleUnReadDot} />
            </View>

            <View style={styles.bubbleIcon}>
              <Icon
                type={'Ionicons'}
                name={'chatbubble-ellipses-sharp'}
                color={R.color.white}
                size={20}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default NotificationScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  contentView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(20),
    marginRight: R.unit.scale(10),
  },
  horizontalScroll: {
    width: '100%',
    marginTop: R.unit.scale(16),
  },
  scrollContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: R.unit.scale(32),
  },
  tab: {
    // width: '100%',
    height: R.unit.scale(36),
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(8),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
  chatBubbleContainer: {
    backgroundColor: R.color.hyperLinkColor,
    borderRadius: R.unit.scale(20),
    position: 'absolute',
    top:
      Platform.OS === 'ios' ? R.unit.height(1 - 0.24) : R.unit.height(1 - 0.21),
    right: R.unit.scale(30),
    height: R.unit.scale(60),
    width: R.unit.scale(60),
    zIndex: 999999,
  },
  bubbleUnReadDotContainer: {
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bubbleUnReadDot: {
    backgroundColor: 'red',
    height: R.unit.scale(15),
    width: R.unit.scale(15),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.white,
    borderWidth: R.unit.scale(3),
  },
  bubbleIcon: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
