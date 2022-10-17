import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {useState} from 'react';
import ChatHeader from '@components/view/screens/Messages/Chat/ChatHeader';
import ChatFooter from '@components/view/screens/Messages/Chat/ChatFooter';
import Button from '@components/common/Button';
import {useEffect} from 'react';
import {ReplyMessageIcon} from '@components/utils/Svg';

function ChatScreen(props) {
  const {navigation} = props;
  const {name} = props.route.params;

  const array = [
    {
      id: 1,
      from: 'Kate Middleton',
      message:
        'Hi John, I’m interested in practicing my backhand. Would you be able to help me?',
      createdAt: moment().subtract(1, 'days'),
      isReply: null,
    },
    {
      id: 1,
      to: 'Maaz',
      message: 'Hi, Kate!It’s nice to meet you',
      createdAt: moment().subtract(1, 'days'),
      isReply: null,
    },
  ];

  const [text, setText] = useState('');
  const [messages, setMessages] = useState(array);
  const [isReplyPressed, setIsReplyPressed] = useState(false);
  const [replyObj, setReplyObj] = useState(undefined);

  const onChange = value => {
    setText(value);
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarVisible: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarVisible: true,
      });
  }, [navigation]);

  const sendChat = () => {
    setText('');
    let obj = {
      id: 2,
      to: 'Maaz',
      message: text,
      createdAt: new Date(),
      isReply: replyObj ? replyObj : null,
    };
    let tempArr = messages?.length > 0 ? [...messages] : [];
    tempArr.push(obj);
    setMessages(tempArr);
    if (replyObj) {
      setIsReplyPressed(false);
      setReplyObj(undefined);
    }
  };

  const replyPressed = item => {
    setIsReplyPressed(true);
    setReplyObj(item);
  };

  const removeChatPressed = () => {
    setReplyObj(undefined);
    setIsReplyPressed(false);
  };

  return (
    <>
      <ChatHeader
        onPress={() => {
          console.log('PRESSED');
        }}
        name={name}
      />
      <ScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          paddingBottom: R.unit.scale(isReplyPressed ? 100 : 50),
        }}>
        <View style={styles.formView}>
          <View style={{...R.styles.rowView, marginBottom: R.unit.scale(24)}}>
            <Button
              value={'Decline'}
              bgColor={R.color.white}
              width={'45%'}
              size={'lg'}
              color={R.color.blackShade4}
              borderColor={R.color.gray4}
              disabled={false}
              loaderColor={R.color.white}
              borderWidth={1}
            />
            <Button
              value={'Accept'}
              bgColor={R.color.mainColor}
              width={'45%'}
              size={'lg'}
              color={R.color.white}
              borderColor={R.color.mainColor}
              disabled={false}
              loaderColor={R.color.white}
              borderWidth={1}
            />
          </View>

          {messages?.map((item, index, arr) => {
            let prevItemIndex = index === 0 ? arr.length - 1 : index - 1;
            let currentDate = item.createdAt;
            let prevDate = arr[prevItemIndex].createdAt;
            let difference = moment(currentDate).diff(moment(prevDate), 'days');

            return (
              <>
                {difference > 0 || index === 0 ? (
                  <View
                    style={{
                      width: '100%',
                      marginVertical:
                        difference > 0 || index === 0 ? R.unit.scale(12) : 0,
                    }}>
                    <Text
                      variant={'body4'}
                      font={'InterRegular'}
                      color={R.color.gray}
                      align={'center'}
                      transform={'none'}>
                      {moment(item.createdAt).format('Do MMM, h:mm a')}
                    </Text>
                  </View>
                ) : null}

                <View style={styles.messageRow}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={
                        item?.to ? R.image.coachPic() : R.image.BaseBallSport()
                      }
                      resizeMode={'contain'}
                      style={styles.profileImage}
                    />
                    <View style={styles.onlineStatus} />
                  </View>

                  <View style={styles.messageBox}>
                    <Text
                      variant={'body2'}
                      font={'InterSemiBold'}
                      color={R.color.blackShade4}
                      gutterBottom={12}
                      align={'left'}
                      transform={'none'}>
                      {item.to ? item.to : item.from}
                    </Text>
                    {item?.isReply && (
                      <View
                        style={{
                          ...R.styles.twoItemsRow,
                          marginBottom: R.unit.scale(8),
                        }}>
                        <View style={styles.verticalLine} />
                        <View>
                          <Text
                            variant={'body2'}
                            font={'InterSemiBold'}
                            color={R.color.blackShade4}
                            align={'left'}
                            gutterBottom={6}
                            transform={'none'}>
                            {item.isReply.from
                              ? item.isReply.from
                              : item.isReply.to}
                          </Text>
                          <Text
                            variant={'body3'}
                            font={'InterRegular'}
                            color={R.color.blackShade4}
                            align={'left'}
                            numberOfLines={1}
                            transform={'none'}>
                            {item.isReply.message}
                          </Text>
                        </View>
                      </View>
                    )}

                    <Text
                      variant={'body3'}
                      font={'InterRegular'}
                      color={R.color.blackShade4}
                      align={'left'}
                      transform={'none'}>
                      {item.message}
                    </Text>
                  </View>

                  <View style={styles.replyMessageView}>
                    <TouchableOpacity
                      style={styles.replyMessageTouchable}
                      onPress={() => replyPressed(item)}>
                      <ReplyMessageIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          })}
        </View>
      </ScrollView>
      <ChatFooter
        textChange={onChange}
        sendChat={sendChat}
        replyText={replyObj && replyObj.message}
        isReplyPressed={isReplyPressed}
        removeChatPressed={removeChatPressed}
      />
    </>
  );
}
export default ChatScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: R.unit.scale(10),
    marginBottom: R.unit.scale(24),
    flex: 1,
  },
  profileImage: {
    width: R.unit.scale(40),
    height: R.unit.scale(40),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.white,
    borderWidth: R.unit.scale(1),
  },
  onlineStatus: {
    width: R.unit.scale(10),
    height: R.unit.scale(10),
    backgroundColor: 'green',
    position: 'absolute',
    right: 1,
    bottom: 0,
    borderRadius: 20,
    borderWidth: R.unit.scale(1),
    borderColor: R.color.white,
  },
  verticalLine: {
    backgroundColor: R.color.selectedVerticalLineColor,
    width: R.unit.scale(1.5),
    height: '100%',
    marginRight: R.unit.scale(16),
  },
  messageRow: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
  },
  messageBox: {
    backgroundColor: R.color.gray6,
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(12),
    borderRadius: R.unit.scale(10),
    marginLeft: R.unit.scale(16),
    width: '75%',
  },
  replyMessageView: {
    position: 'relative',
    height: '100%',
  },
  replyMessageTouchable: {
    padding: R.unit.scale(5),
    marginLeft: R.unit.scale(2),
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
});
