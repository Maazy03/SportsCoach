import React, {useEffect, useState} from 'react';
import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ratings, showArray} from '@components/constants';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import R from '@components/utils/R';
import uuid from 'react-native-uuid';
import Icon from '@components/common/Icon';
import DropDown from '@components/common/DropDown';
import SavedFiltersModal from './SavedFiltersModal';

function ReviewsFilterModal(props) {
  const {statusFlag} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [agoRating, setAgoRating] = useState('Newest First');
  const [rating, setRating] = useState('All');
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
    // let reqData = {};
    // if (statusFlag) {
    //   reqData = {...reqData, location, id: uuid.v4(), rating};
    // } else {
    //   reqData = {...reqData, location, id: uuid.v4()};
    // }
    // let tempArr = filters.length > 0 ? [...filters] : [];
    // tempArr.push(reqData);
    // setFilters(tempArr);
    setIsBlur(false);
  };

  const clearFilters = () => {
    setAgoRating('All');
    setRating('All');
    setIsBlur(false);
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
                    title={'Show'}
                    arrayData={showArray}
                    placeholder={agoRating}
                    loaderParentCall={data => {
                      setAgoRating(data.value);
                    }}
                    value={agoRating}
                    gutterBottom={16}
                  />
                </View>

                <View style={styles.dropDownView}>
                  <DropDown
                    zIndex={1000}
                    zIndexInverse={2000}
                    zIndexIOS={1000}
                    title={'Rating'}
                    arrayData={ratings}
                    placeholder={rating}
                    loaderParentCall={data => {
                      setRating(data.value);
                    }}
                    value={rating}
                    gutterBottom={16}
                  />
                </View>
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

export default ReviewsFilterModal;
