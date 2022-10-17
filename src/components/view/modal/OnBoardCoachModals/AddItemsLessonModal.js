import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import TextInput from '@components/common/TextInput';
import uuid from 'react-native-uuid';
import Icon from '@components/common/Icon';
import BoilerModalOnBoard from './CoachModalLayout/BoilerModal';

function AddItemsLessonModal(props) {
  const {addItems, title} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [disabledAdd, setDisabledAdd] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  useEffect(() => {
    if (tags?.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [tags]);

  useEffect(() => {
    if (text?.length > 0) {
      setDisabledAdd(false);
    } else {
      setDisabledAdd(true);
    }
  }, [text]);

  const headerProps = {
    isHeader: true,
    isBothButtons: true,
  };

  const addTags = () => {
    setText('');
    let tempArr = tags?.length > 0 ? [...tags] : [];
    tempArr.push({id: uuid.v4(), title: text, isChecked: false});
    setTags(tempArr);
  };

  const deleteTag = id => {
    let updatedTags = tags?.filter(item => {
      return item?.id !== id;
    });
    setTags(updatedTags);
  };

  const submit = () => {
    addItems(tags);
    setIsBlur(false);
    setTags([]);
  };

  const goBack = () => {
    setIsBlur(false);
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      // visible={true}
      visible={modalVisible}
      onShow={() => {
        setIsBlur(true);
      }}>
      <View style={styles.centeredView}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <TouchableOpacity
            onPress={() => setIsBlur(false)}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={styles.modalView}>
            <BoilerModalOnBoard
              {...props}
              headerProps={headerProps}
              disabled={disabled}
              onCloseModal={() => setIsBlur(false)}
              headerTitle={`Add ${title}`}
              onPressNextButton={submit}
              onPressBackButton={goBack}>
              <ScrollView
                style={[styles.mainLayout]}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                  // flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <TextInput
                  secureText={false}
                  titleColor={R.color.black}
                  onChangeText={text => {
                    setText(text);
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  width={0.79}
                  inputWidth={0.79}
                  color={R.color.black}
                  value={text}
                  isRightTitle={false}
                  blurOnSubmit={false}
                  returnKeyType={'done'}
                  backgroundColor={'white'}
                  tags={tags}
                />
                <TouchableOpacity
                  style={[R.styles.twoItemsRow, styles.addFaqView]}
                  onPress={addTags}
                  disabled={disabledAdd}
                  activeOpacity={0.6}>
                  <Icon
                    name={'plus'}
                    type={'Entypo'}
                    color={disabledAdd ? R.color.gray : R.color.hyperLinkColor}
                    size={16}
                  />
                  <Text
                    variant={'body3'}
                    font={'InterMedium'}
                    color={disabledAdd ? R.color.gray : R.color.hyperLinkColor}
                    align={'left'}
                    transform={'none'}>
                    {'Add more'}
                  </Text>
                </TouchableOpacity>
                <View style={styles.tagLayout}>
                  {tags?.map(item => {
                    return (
                      <View style={[styles.tag, R.styles.twoItemsRow]}>
                        <View>
                          <Text
                            variant={'body2'}
                            font={'InterRegular'}
                            color={R.color.black}
                            align={'center'}
                            transform={'none'}>
                            {item?.title}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteTag(item?.id)}>
                          <Icon
                            name={'cross'}
                            type={'Entypo'}
                            size={20}
                            color={R.color.gray5}
                            iconStyles={{
                              marginLeft: R.unit.scale(12),
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </BoilerModalOnBoard>
          </View>
        </>
      </View>
    </Modal>
  );
}
export default AddItemsLessonModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: R.unit.scale(16),
  },
  modalView: {
    backgroundColor: R.color.white,
    alignItems: 'center',
    borderRadius: R.unit.scale(20),
    width: '100%',
  },
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(22),
    width: '100%',
  },
  tagLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingVertical: 20,
  },
  tag: {
    backgroundColor: R.color.blueShade1,
    paddingVertical: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(8),
    borderRadius: R.unit.scale(8),
    justifyContent: 'space-between',
    marginRight: R.unit.scale(12),
    marginBottom: R.unit.scale(12),
  },
  addFaqView: {
    width: '100%',
    marginTop: R.unit.scale(24),
  },
});
