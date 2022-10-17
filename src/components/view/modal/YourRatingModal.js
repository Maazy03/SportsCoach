import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '@components/common/Text';
import * as Progress from 'react-native-progress';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';

function YourRatingModal(props) {
  const {statusFlag} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const keyNotes = [
    {title: 'Accurancy', value: 4},
    {title: 'Location', value: 5},
    {title: 'Value', value: 3},
    {title: 'Communication', value: 5},
  ];

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        // visible={true}
        onRequestClose={() => setIsBlur(false)}
        onShow={() => {
          setIsBlur(true);
        }}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => setIsBlur(false)}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}></TouchableOpacity>
          <>
            <SafeAreaView style={styles.modalView}>
              <View style={styles.notch} />
              <View style={[R.styles.rowView, styles.header]}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setIsBlur(false);
                  }}>
                  <Icon
                    type={'Ionicons'}
                    name={'close'}
                    color={R.color.blackShade4}
                    size={20}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.contentView}>
                <Text
                  variant={'h4'}
                  font={'Sequel651'}
                  color={R.color.blackShade4}
                  align={'left'}
                  numberOfLines={2}
                  transform={'none'}>
                  Your Rating
                </Text>

                <View style={[R.styles.rowView, styles.ratingView]}>
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
                      alignItems: 'center',
                    }}>
                    <Text
                      variant={'h6'}
                      font={'InterRegular'}
                      color={R.color.blackShade4}
                      align={'left'}
                      transform={'none'}>
                      4.0
                    </Text>
                    <Text
                      variant={'body2'}
                      font={'InterRegular'}
                      color={R.color.gray}
                      align={'left'}
                      style={{
                        marginLeft: R.unit.scale(4),
                      }}
                      transform={'none'}>
                      (12 ratings)
                    </Text>
                  </View>
                </View>

                {keyNotes?.map((item, index, arr) => {
                  return (
                    <View
                      key={index}
                      style={{
                        ...R.styles.rowView,
                        marginBottom: R.unit.scale(8),
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          variant={'body2'}
                          font={'InterRegular'}
                          color={R.color.blackShade4}
                          align={'left'}
                          transform={'none'}>
                          {item.title}
                        </Text>
                      </View>

                      <View
                        style={{
                          alignItems: 'center',
                          width: '50%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{width: '80%'}}>
                          <Progress.Bar
                            progress={item.value * 0.2}
                            width={null}
                            color={R.color.mainColor}
                            unfilledColor={R.color.gray2}
                            borderWidth={0}
                          />
                        </View>

                        <Text
                          variant={'body3'}
                          font={'InterSemiBold'}
                          color={R.color.blackShade4}
                          align={'right'}
                          transform={'none'}>
                          {item.value}.0
                        </Text>
                      </View>
                    </View>
                  );
                })}

                <Divider lineStyles={{marginTop: R.unit.scale(24)}} />

                <Text
                  variant={'body2'}
                  font={'Sequel551'}
                  color={R.color.blackShade4}
                  align={'left'}
                  transform={'none'}>
                  Here’s what your students say about you
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
                  <View style={[styles.tag, R.styles.twoItemsRow]}>
                    <Text
                      variant={'body2'}
                      font={'InterRegular'}
                      color={R.color.black}
                      align={'center'}
                      transform={'none'}>
                      Discipline
                    </Text>
                  </View>
                  <View style={[styles.tag, R.styles.twoItemsRow]}>
                    <Text
                      variant={'body2'}
                      font={'InterRegular'}
                      color={R.color.black}
                      align={'center'}
                      transform={'none'}>
                      Discipline
                    </Text>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    alignItems: 'center',
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
    paddingBottom: R.unit.scale(80),
  },
  notch: {
    backgroundColor: R.color.gray5,
    width: '15%',
    height: R.unit.scale(5),
    borderRadius: R.unit.scale(100),
    marginTop: R.unit.scale(8),
  },
  header: {
    paddingVertical: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
    paddingHorizontal: R.unit.scale(10),
    width: '100%',
  },
  contentView: {
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
    paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 30 : 20),
  },
  ratingView: {
    marginTop: R.unit.scale(25),
    marginBottom: R.unit.scale(24),
    justifyContent: 'flex-start',
    width: '100%',
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

export default YourRatingModal;
