import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import R from '@components/utils/R';
import TextInput from '@components/common/TextInput';
import {SendMessageIcon} from '@components/utils/Svg';
import Icon from '@components/common/Icon';
import Text from '@components/common/Text';

function ChatFooter(props) {
  const {replyText, isReplyPressed, removeChatPressed, sendChat, textChange} =
    props;
  const inputRef = useRef();
  const [text, setText] = useState('');

  const onChange = value => {
    setText(value);
    textChange(value);
  };

  const sendPress = () => {
    inputRef.current.clear();
    sendChat();
  };

  return (
    <View style={styles.footerLayout}>
      {isReplyPressed && (
        <View style={[R.styles.twoItemsRow, styles.hoveredMessage]}>
          <Icon
            type={'Entypo'}
            name={'cross'}
            onPress={() => {
              removeChatPressed();
            }}
            color={R.color.blackShade2}
            size={20}
          />

          <View style={styles.verticalLine} />
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.blackShade4}
            align={'left'}
            style={{flex: 1}}
            numberOfLines={1}
            transform={'none'}>
            {replyText}
          </Text>
        </View>
      )}

      <TextInput
        secureText={false}
        placeholder={'Type a message'}
        onChangeText={onChange}
        color={R.color.black}
        value={text}
        returnKeyType={'done'}
        alignItems={'center'}
        iconColor={R.color.blackShade4}
        iconRightName={true}
        inputStyles={{paddingLeft: R.unit.scale(16)}}
        forwardedRef={inputRef}
        customIcon={
          <View
            style={{
              padding: R.unit.scale(5),
              height: R.unit.scale(30),
              aspectRatio: 1,
            }}>
            <SendMessageIcon height="100%" width="100%" />
          </View>
        }
        iconPress={sendPress}
      />
    </View>
  );
}
export default ChatFooter;

const styles = StyleSheet.create({
  footerLayout: {
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(12),
    borderBottomWidth: R.unit.scale(0.75),
    borderBottomColor: R.color.gray4,
    position: 'absolute',
    bottom: 0,
    backgroundColor: R.color.white,
  },
  hoveredMessage: {
    paddingVertical: R.unit.scale(15),
  },
  verticalLine: {
    backgroundColor: R.color.selectedVerticalLineColor,
    width: R.unit.scale(2),
    height: '100%',
    marginHorizontal: R.unit.scale(16),
  },
});
