import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {calendarType, ratings, locations} from '@components/constants';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import R from '@components/utils/R';
import DropDown from '@components/common/DropDown';
import CoachHeaderModal from '../Layout/CoachModalHeader';
import SavedFiltersModal from '../SavedFiltersModal';

function ScheduleFilterModal(props) {
  const {setCalendarType} = props;
  const scrollRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [agoRating, setAgoRating] = useState('Newest First');
  const [rating, setRating] = useState('All');
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(0);

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

  const onTabChange = item => {
    let index = item.index;
    setPage(index);
    setCalendarType(item.label);
    setIsBlur(false);
    if (index % 2 === 0) {
      scrollRef.current.scrollTo({x: R.unit.width((index / 2) * 1) / 2});
    }
  };

  return (
    <>
      <Modal
        animationType={'slides'}
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
                <CoachHeaderModal
                  closeModal={() => setIsBlur(false)}
                  openSaveModal={openSavedModal}
                />
                <View style={styles.contentView}>
                  <DropDown
                    zIndex={2000}
                    zIndexInverse={1000}
                    zIndexIOS={2000}
                    title={'Choose Location'}
                    arrayData={locations}
                    placeholder={agoRating}
                    loaderParentCall={data => {
                      setAgoRating(data.value);
                    }}
                    value={agoRating}
                    gutterBottom={16}
                  />

                  <DropDown
                    zIndex={1000}
                    zIndexInverse={2000}
                    zIndexIOS={1000}
                    title={'Lesson type'}
                    arrayData={ratings}
                    placeholder={rating}
                    loaderParentCall={data => {
                      setRating(data.value);
                    }}
                    value={rating}
                    gutterBottom={16}
                  />
                  <ScrollView
                    horizontal={true}
                    ref={scrollRef}
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizontalScroll}
                    contentContainerStyle={styles.scrollContent}>
                    {calendarType?.map((item, index) => {
                      return (
                        <View style={styles.tabItem} key={index}>
                          <TouchableOpacity
                            style={{
                              ...styles.tab,
                              backgroundColor:
                                page === index
                                  ? R.color.blackShade4
                                  : R.color.gray6,
                            }}
                            activeOpacity={0.9}
                            onPress={() => onTabChange(item)}>
                            <Text
                              variant={'body3'}
                              font={'InterRegular'}
                              color={
                                page === index
                                  ? R.color.white
                                  : R.color.blackShade4
                              }
                              align={'left'}
                              top={Platform.OS === 'ios' ? -2 : 0}
                              transform={'none'}>
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
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
  contentView: {
    paddingHorizontal: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
  },
  horizontalScroll: {
    width: '100%',
    marginTop: R.unit.scale(16),
  },
  scrollContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  tabItem: {
    display: 'flex',
    marginRight: R.unit.scale(8),
    paddingBottom: R.unit.scale(5),
  },
  tab: {
    width: '100%',
    height: R.unit.scale(36),
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(8),
    borderRadius: R.unit.scale(10),
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

export default ScheduleFilterModal;
