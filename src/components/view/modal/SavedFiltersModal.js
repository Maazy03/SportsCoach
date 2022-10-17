import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';

function SavedFiltersModal(props) {
  const {filters, deleteFilter} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const deleteData = id => {
    deleteFilter(id);
  };

  return (
    <>
      <Modal
        animationType={'fades'}
        transparent={true}
        visible={modalVisible}
        // visible={true}
        onRequestClose={() => setIsBlur(false)}
        onShow={() => {
          setIsBlur(true);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
            }}></View>
          <>
            <SafeAreaView style={[styles.modalView]}>
              <View style={[R.styles.rowView, styles.header]}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  activeOpacity={0.6}
                  onPress={() => {
                    setIsBlur(false);
                  }}>
                  <Icon
                    type={'Ionicons'}
                    name={'close'}
                    color={R.color.blackShade4}
                    size={25}
                  />
                </TouchableOpacity>

                <View style={styles.headingText}>
                  <Text
                    variant={'body2'}
                    font={'InterSemiBold'}
                    color={R.color.blackShade4}
                    align={'center'}
                    transform={'none'}>
                    Saved Filters
                  </Text>
                </View>
              </View>

              {filters
                .slice()
                .reverse()
                .map(item => {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        paddingHorizontal: R.unit.scale(16),
                        marginBottom: R.unit.scale(8),
                      }}>
                      <View style={R.styles.rowView}>
                        <View style={{flex: 1}}>
                          <View style={R.styles.twoItemsRow}>
                            <Text
                              variant={'body2'}
                              font={'InterRegular'}
                              color={R.color.blackShade4}
                              align={'left'}
                              style={{maxWidth: '60%'}}
                              numberOfLines={2}
                              transform={'none'}>
                              {item.location}
                            </Text>
                            {item.status && (
                              <Text
                                variant={'body3'}
                                font={'InterSemiBold'}
                                color={R.color.mainColor}
                                align={'left'}
                                style={{
                                  marginLeft: R.unit.scale(10),
                                }}
                                transform={'none'}>
                                {` ${item.status}`}
                              </Text>
                            )}
                          </View>
                        </View>
                        <TouchableOpacity
                          style={{
                            padding: R.unit.scale(10),
                          }}
                          onPress={() => {
                            deleteData(item.id);
                          }}>
                          <Icon
                            type={'FontAwesome5'}
                            name={'trash-alt'}
                            size={20}
                            color={R.color.gray}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    height: '100%',
  },
  header: {
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(20),
    borderBottomWidth: R.unit.scale(0.75),
    borderBottomColor: R.color.gray4,
    marginBottom: R.unit.scale(24),
  },
  headingText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: R.unit.scale(30),
  },
  cancelButton: {
    padding: R.unit.scale(5),
  },
});

export default SavedFiltersModal;
