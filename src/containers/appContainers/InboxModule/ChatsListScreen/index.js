import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import TextInput from '@components/common/TextInput';
import {useState} from 'react';
import {chatsList, evaluations} from '@components/constants';
import ToDoErrorDisplay from '@components/view/screens/ToDo/ToDoErrorDisplay';
import {InstantMessageIcon} from '@components/utils/Svg';

function ChatsListScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const common = useSelector(state => state.common);
  const [text, setText] = useState('');
  const [filteredArray, setFilteredArray] = useState(chatsList);

  const onChange = value => {
    setText(value);
    // if (value.length > 1) {
    //   let updatedArr = evaluations?.filter(item => {
    //     return item.name.toLowerCase().includes(value.toLowerCase());
    //   });
    //   if (updatedArr.length > 0) {
    //     setFilteredArray(updatedArr);
    //   } else {
    //     setFilteredArray([]);
    //   }
    // } else {
    //   setFilteredArray(evaluations);
    // }
  };

  const readChat = item => {
    let id = item.id;
    navigation.navigate('Chat', {
      name: item?.name,
    });
    let obj = filteredArray.find(item => item.id === id);
    obj['isRead'] = true;
    setFilteredArray([...filteredArray]);
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
        paddingBottom: R.unit.scale(20),
      }}>
      <View style={styles.contentView}>
        <Text
          variant={'h3'}
          font={'Sequel551'}
          color={R.color.blackShade4}
          gutterBottom={16}
          align={'left'}
          transform={'none'}>
          Inbox
        </Text>
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
          leftIconStyles={{fontSize: R.unit.scale(12)}}
        />
      </View>

      <View style={{width: R.unit.width(1)}}>
        {filteredArray.length === 0 ? (
          <View style={{flex: 1}}>
            <ToDoErrorDisplay
              icon={<InstantMessageIcon height="100%" width="100%" />}
              heading={'You have no messages yet'}
              text={
                'As soon as the student decides to write you a message, it will appear here.'
              }
            />
          </View>
        ) : (
          filteredArray?.map((item, index, arr) => {
            return (
              <TouchableNativeFeedback
                delayPressIn={0.1}
                delayPressOut={0.1}
                delayLongPress={0.1}
                onPress={() => readChat(item)}
                background={TouchableNativeFeedback.Ripple(
                  R.color.gray,
                  false,
                  300,
                )}>
                <View
                  style={[
                    R.styles.twoItemsRow,
                    styles.chatRow,
                    {
                      backgroundColor: item.isRead
                        ? R.color.white
                        : R.color.blueShade1,
                      borderBottomColor:
                        index !== arr.length - 1 && R.color.gray4,
                      borderBottomWidth: R.unit.scale(
                        index !== arr.length - 1 ? 1 : 0,
                      ),
                    },
                  ]}>
                  <Image
                    style={{
                      ...styles.profileImage,
                      borderColor: item.isRead ? R.color.white : R.color.white,
                    }}
                    imageStyle={{
                      borderRadius: R.unit.scale(120),
                    }}
                    source={item?.picture ? item.picture : R.image.userPin()}
                    resizeMode="cover"
                  />

                  <View style={styles.chatText}>
                    <View style={R.styles.rowView}>
                      <Text
                        variant={'body2'}
                        font={'InterSemiBold'}
                        color={R.color.blackShade4}
                        numberOfLines={1}
                        style={{flex: 1}}
                        align={'left'}
                        lineHeight={20}
                        transform={'none'}>
                        {item.name}
                      </Text>
                      <Text
                        variant={'body3'}
                        font={'InterMedium'}
                        color={R.color.gray}
                        gutterBottom={4}
                        numberOfLines={1}
                        style={{width: '30%'}}
                        align={'right'}
                        transform={'none'}>
                        {item.date}
                      </Text>
                    </View>
                    <Text
                      variant={'body2'}
                      font={'InterRegular'}
                      color={R.color.blackShade4}
                      align={'left'}
                      transform={'none'}>
                      {item.text1}
                    </Text>
                    <Text
                      variant={'body2'}
                      font={'InterMedium'}
                      color={R.color.gray}
                      align={'left'}
                      transform={'none'}>
                      {item.text2}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
export default ChatsListScreen;

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
    marginBottom: R.unit.scale(24),
  },
  profileImage: {
    width: R.unit.scale(55),
    height: R.unit.scale(55),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.white,
    borderWidth: R.unit.scale(1),
  },
  chatRow: {
    paddingVertical: R.unit.scale(12),
    paddingHorizontal: R.unit.scale(16),
  },
  chatText: {
    marginLeft: R.unit.scale(16),
    width: '80%',
  },
});
