import React, {useEffect, useState, useRef} from 'react';
import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {
  insightsFilterTags,
  locations,
  seasonFilters,
  sportFilters,
} from '@components/constants';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import R from '@components/utils/R';
import uuid from 'react-native-uuid';
import Icon from '@components/common/Icon';
import DropDown from '@components/common/DropDown';
import SavedFiltersModal from './SavedFiltersModal';

function InsightsFilterModal(props) {
  const {statusFlag, isSeasonal = false} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [location, setLocation] = useState('All');
  const [status, setStatus] = useState('All');
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(0);
  const scrollRef = useRef();

  const [filterType, setFilterType] = useState({
    location: '',
    season: '',
    timeSlot: '',
    sport: '',
  });

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const onTabChange = item => {
    let index = item.index;
    setPage(index);
    setFilterType({...filterType, timeSlot: item.title});
    if (index % 2 === 0) {
      scrollRef.current.scrollTo({x: R.unit.width((index / 2) * 1) / 2});
    }
  };

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

                <View style={styles.dropDownView}>
                  <DropDown
                    zIndex={3000}
                    zIndexInverse={1000}
                    zIndexIOS={3000}
                    title={'Choose location'}
                    arrayData={locations}
                    defaultValue={location}
                    loaderParentCall={data => {
                      setFilterType({...filterType, location: data.value});
                    }}
                    value={location}
                    gutterBottom={16}
                  />

                  {isSeasonal && (
                    <>
                      <DropDown
                        zIndex={2000}
                        zIndexInverse={2000}
                        zIndexIOS={2000}
                        title={'Choose Sport'}
                        arrayData={seasonFilters}
                        defaultValue={status}
                        loaderParentCall={data => {
                          setFilterType({...filterType, season: data.value});
                        }}
                        value={location}
                        gutterBottom={16}
                      />
                      <DropDown
                        zIndex={1000}
                        zIndexInverse={3000}
                        zIndexIOS={1000}
                        title={'Choose season'}
                        arrayData={sportFilters}
                        defaultValue={status}
                        loaderParentCall={data => {
                          setFilterType({...filterType, sport: data.value});
                        }}
                        value={location}
                        gutterBottom={16}
                      />
                    </>
                  )}
                  {!isSeasonal && (
                    <ScrollView
                      horizontal={true}
                      ref={scrollRef}
                      showsHorizontalScrollIndicator={false}
                      style={styles.horizontalScroll}
                      contentContainerStyle={styles.scrollContent}>
                      {insightsFilterTags?.map((item, index) => {
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
                                top={Platform.OS === 'ios' ? -3 : 0}
                                align={'left'}
                                transform={'none'}>
                                {item.title}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </ScrollView>
                  )}
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
                  // onPress={addFilters}
                  onPress={() => setIsBlur(false)}
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
  footer: {
    width: '100%',
    borderTopWidth: R.unit.scale(0.75),
    borderTopColor: R.color.gray4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: R.unit.scale(16),
  },
});

export default InsightsFilterModal;
