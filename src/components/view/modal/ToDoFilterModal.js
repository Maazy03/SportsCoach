import React, {useEffect, useState} from 'react';
import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {locations, statuses} from '@components/constants';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import R from '@components/utils/R';
import uuid from 'react-native-uuid';
import Icon from '@components/common/Icon';
import DropDown from '@components/common/DropDown';
import SavedFiltersModal from './SavedFiltersModal';

function ToDoFilterModal(props) {
  const {statusFlag} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [location, setLocation] = useState('All');
  const [status, setStatus] = useState('All');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const openSavedModal = () => {
    setIsModal(!isModal);
  };

  const deleteFilter = id => {
    let updated = filters.filter(item => {
      return item.id !== id;
    });
    setFilters(updated);
  };

  const addFilters = () => {
    let reqData = {};

    if (statusFlag) {
      reqData = {...reqData, location, id: uuid.v4(), status};
    } else {
      reqData = {...reqData, location, id: uuid.v4()};
    }
    let tempArr = filters.length > 0 ? [...filters] : [];
    tempArr.push(reqData);
    setFilters(tempArr);
    setIsBlur(false);
  };

  const clearFilters = () => {
    setLocation('All');
    setStatus('All');
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
              <View>
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

                  <Text
                    variant={'body2'}
                    font={'InterSemiBold'}
                    color={R.color.blackShade4}
                    align={'center'}
                    transform={'none'}>
                    Filters
                  </Text>

                  <TouchableOpacity
                    style={styles.cancelButton}
                    activeOpacity={0.6}
                    onPress={openSavedModal}>
                    <Icon
                      type={'MaterialCommunityIcons'}
                      name={'bookmark-outline'}
                      color={R.color.blackShade4}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{...styles.dropDownView, zIndex: 2000}}>
                  <DropDown
                    zIndex={2000}
                    zIndexInverse={1000}
                    zIndexIOS={2000}
                    title={'Choose location'}
                    arrayData={locations}
                    defaultValue={location}
                    loaderParentCall={data => {
                      setLocation(data.value);
                    }}
                    value={location}
                    gutterBottom={16}
                  />
                </View>

                {statusFlag && (
                  <View style={styles.dropDownView}>
                    <DropDown
                      zIndex={1000}
                      zIndexInverse={2000}
                      zIndexIOS={1000}
                      title={'Status'}
                      arrayData={statuses}
                      defaultValue={status}
                      loaderParentCall={data => {
                        setStatus(data.value);
                      }}
                      value={location}
                      gutterBottom={16}
                    />
                  </View>
                )}
              </View>

              <View style={styles.footer}>
                <Button
                  value={'Clear All'}
                  bgColor={R.color.white}
                  width={'40%'}
                  size={'lg'}
                  color={R.color.blackShade4}
                  btnWrapperStyles={{
                    justifyContent: 'flex-start',
                  }}
                  onPress={clearFilters}
                />
                <Button
                  value={'Apply'}
                  bgColor={R.color.mainColor}
                  width={'40%'}
                  size={'lg'}
                  color={R.color.white}
                  borderWidth={1}
                  borderColor={R.color.gray4}
                  onPress={addFilters}
                />
              </View>
            </SafeAreaView>
          </>
        </View>
        {Platform.OS === 'ios' && (
          <SavedFiltersModal
            isVisibleModal={isModal}
            filters={filters}
            deleteFilter={deleteFilter}
          />
        )}
      </Modal>
      {Platform.OS === 'android' && (
        <SavedFiltersModal
          isVisibleModal={isModal}
          filters={filters}
          deleteFilter={deleteFilter}
        />
      )}
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
    justifyContent: 'space-between',
  },
  header: {
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(20),
    borderBottomWidth: R.unit.scale(0.75),
    borderBottomColor: R.color.gray4,
    marginBottom: R.unit.scale(24),
  },
  dropDownView: {
    paddingHorizontal: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
  },
  titleStyle: {
    color: R.color.blackShade4,
    fontFamily: 'Inter-SemiBold',
    fontSize: R.unit.scale(16),
  },
  highlightedDate: {
    height: R.unit.scale(40),
    width: R.unit.scale(40),
    backgroundColor: R.color.hyperLinkColor,
    borderTopLeftRadius: R.unit.scale(60),
    borderTopRightRadius: R.unit.scale(60),
    borderBottomRightRadius: R.unit.scale(60),
    borderBottomLeftRadius: R.unit.scale(60),
  },
  highlightedTextStyle: {
    color: R.color.white,
    fontFamily: 'Inter-SemiBold',
    fontSize: R.unit.scale(14),
  },
  disabledTextStyle: {
    color: R.color.gray4,
    fontFamily: 'Inter-SemiBold',
    fontSize: R.unit.scale(14),
  },
  textStyle: {
    color: R.color.mainColor,
    fontFamily: 'Inter-SemiBold',
    fontSize: R.unit.scale(14),
  },
  cancelButton: {
    padding: R.unit.scale(5),
  },
  footer: {
    width: '100%',
    borderTopWidth: R.unit.scale(0.75),
    borderTopColor: R.color.gray4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: R.unit.scale(16),
  },
});

export default ToDoFilterModal;
