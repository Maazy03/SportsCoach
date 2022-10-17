import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {URL, apiHeader} from '@config/apiUrl';
import {Patch} from '@axios/AxiosInterceptorFunction';
import R from '@components/utils/R';
import Text from '@components/common/Text';

function NotifciationCard(props) {
  const {item, updateMessgeSeen, alreadySeen} = props;
  const auth = useSelector(state => state.auth);
  const header = apiHeader(auth?.userToken, false);
  const [seen, setSeen] = useState(false);

  const messageSeen = async () => {
    setSeen(true);
    const reqData = {
      id: item?._id,
    };
    const notiSeenApi = URL(`notifications/seenNotifications`);
    const response = await Patch(notiSeenApi, reqData, header);
    if (response !== undefined) {
      updateMessgeSeen(item?._id);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        !item?.seen && messageSeen(item?._id);
      }}
      activeOpacity={item?.seen ? 1 : 0.9}
      style={{
        ...styles.cardLayout,
        backgroundColor:
          item?.seen || seen ? R.color.white : 'rgba(15, 98, 254,0.95)',
      }}>
      <View style={R.styles.twoItemsRow}>
        <Image
          source={R.image.notificationIcon()}
          style={{
            ...styles.notiImage,
            borderColor: item?.seen || seen ? R.color.mainColor : R.color.white,
          }}
          resizeMode={'cover'}
        />
        <View>
          <Text
            variant={'body3'}
            font={'medium'}
            color={item?.seen || seen ? R.color.gray : R.color.white}
            align={'left'}
            style={{
              marginLeft: R.unit.scale(10),
              maxWidth: R.unit.width(0.65),
            }}
            numberOfLines={2}
            transform={'capitalize'}>
            {item?.message}
          </Text>
          <Text
            variant={'body5'}
            font={'medium'}
            color={item?.seen || seen ? R.color.black : R.color.white}
            align={'left'}
            style={{
              marginLeft: R.unit.scale(10),
            }}
            numberOfLines={2}
            transform={'capitalize'}>
            {moment(item?.createdAt).startOf('s').fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default NotifciationCard;

const styles = StyleSheet.create({
  cardLayout: {
    borderRadius: R.unit.scale(10),
    backgroundColor: R.color.white,
    width: R.unit.width(0.9),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    justifyContent: 'center',
    marginBottom: R.unit.scale(15),
    paddingVertical: R.unit.scale(15),
    paddingHorizontal: R.unit.scale(10),
  },
  notiImage: {
    width: R.unit.scale(50),
    height: R.unit.scale(50),
    borderWidth: R.unit.scale(1),
    borderRadius: R.unit.scale(200),
    borderWidth: R.unit.scale(1.5),
  },
});
