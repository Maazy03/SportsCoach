import React, {useEffect, useState} from 'react';
import {
  Appearance,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import Button from '@components/common/Button';
import {alaramData, availabityLocs} from '@components/constants';
import R from '@components/utils/R';
import CoachHeaderModal from '../Layout/CoachModalHeader';
import DatePicker from 'react-native-date-picker';
import Text from '@components/common/Text';
import CheckBoxLine from '@components/common/CheckBoxLine';
import Radio from '@components/common/Radio';

function AvailabilityDetailsModal(props) {
  const {modalData} = props;
  const colorScheme = Appearance.getColorScheme();

  const [reservationDetails, setReservationDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [activeRepetition, setActiveRepetition] = useState();
  const [date, setDate] = useState(new Date());
  const [locations, setLocations] = useState(availabityLocs);
  const [isBlur, setIsBlur] = useState(false);
  const [show, setShow] = useState(true);
  const [mode, setMode] = useState('date');
  const [open, setOpen] = useState(false);
  const [timeMode, setTimeMode] = useState('from');

  console.log('modalData', modalData);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    setReservationDetails(modalData);
  }, [modalData, props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const selectLocation = Id => {
    let obj = locations.find(({id}) => id === Id);
    let isAccepted = obj.isChecked;
    obj.isChecked = !isAccepted;
    setLocations([...locations]);
  };

  const repetionType = id => {
    setActiveRepetition(id);
  };

  const showMode = currentMode => {
    setShow(true);
    setOpen(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = flag => {
    showMode('time');
    if (flag === 'from') {
      setTimeMode('from');
    } else {
      setTimeMode('to');
    }
  };

  const selectedDate = selectedDate => {
    const currentDate = selectedDate;
    setShow(false);
    if (mode === 'date') {
      new Date(currentDate);
      setReservationDetails({
        ...reservationDetails,
        eventDate: new Date(currentDate),
      });
    } else {
      if (timeMode === 'from') {
        setReservationDetails({
          ...reservationDetails,
          start: new Date(currentDate),
        });
      } else {
        setReservationDetails({
          ...reservationDetails,
          end: new Date(currentDate),
        });
      }
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
                  title={'Details'}
                  closeModal={() => setIsBlur(false)}
                  isRightIcon={false}
                  isRightIconSize={20}
                />
                <View style={styles.contentView}>
                  <Text
                    variant={'body3'}
                    font={'InterRegular'}
                    color={R.color.gray}
                    gutterBottom={12}
                    numberOfLines={1}>
                    Date
                  </Text>
                  <TouchableOpacity
                    style={[R.styles.rowView, styles.dateBox]}
                    onPress={showDatepicker}
                    activeOpacity={0.7}>
                    <Text
                      variant={'body2'}
                      font={'InterRegular'}
                      color={R.color.blackShade4}
                      style={[styles.mV3]}
                      numberOfLines={1}>
                      {moment(modalData).format('dddd, MMMM D')}
                    </Text>
                  </TouchableOpacity>

                  <View style={[R.styles.rowView, styles.timeContainer]}>
                    <View style={{flex: 0.45}}>
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.gray}
                        gutterBottom={12}
                        numberOfLines={1}>
                        From
                      </Text>
                      <TouchableOpacity
                        style={[R.styles.rowView, styles.dateBox]}
                        onPress={() => showTimepicker('from')}
                        activeOpacity={0.7}>
                        <Text
                          variant={'body2'}
                          font={'InterRegular'}
                          color={R.color.blackShade4}
                          style={[styles.mV3]}
                          numberOfLines={1}>
                          {moment(modalData).format('hh:mm A')}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.timeSeperator} />

                    <View style={{flex: 0.45}}>
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.gray}
                        gutterBottom={12}
                        numberOfLines={1}>
                        To
                      </Text>
                      <TouchableOpacity
                        style={[R.styles.rowView, styles.dateBox]}
                        onPress={() => showTimepicker('to')}
                        activeOpacity={0.7}>
                        <Text
                          variant={'body2'}
                          font={'InterRegular'}
                          color={R.color.blackShade4}
                          style={[styles.mV3]}
                          numberOfLines={1}>
                          {moment(modalData).add(1, 'hours').format('hh:mm A')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    variant={'body2'}
                    font={'InterSemiBold'}
                    color={R.color.gray}
                    gutterBottom={16}
                    numberOfLines={1}>
                    Location
                  </Text>
                  {locations?.map(item => {
                    return (
                      <CheckBoxLine
                        text={item.title}
                        onPress={() => selectLocation(item.id)}
                        selected={
                          item.isChecked ||
                          item.title
                            .toLowerCase()
                            .includes(
                              reservationDetails?.location?.toLowerCase(),
                            )
                        }
                        textColor={
                          item.isChecked ? R.color.black : R.color.gray
                        }
                      />
                    );
                  })}
                  <Text
                    variant={'body2'}
                    font={'InterSemiBold'}
                    color={R.color.gray}
                    gutterTop={32}
                    gutterBottom={16}
                    numberOfLines={1}>
                    Location
                  </Text>

                  {alaramData?.map(item => {
                    return (
                      <View
                        style={[
                          R.styles.twoItemsRow,
                          {
                            marginBottom: R.unit.scale(24),
                          },
                        ]}>
                        <Radio
                          selected={item.id === activeRepetition}
                          onPress={() => repetionType(item.id)}
                        />
                        <Text
                          variant={'body2'}
                          font={'InterRegular'}
                          color={
                            item.id === activeRepetition
                              ? R.color.blackShade4
                              : R.color.gray
                          }
                          numberOfLines={1}>
                          {item.title}
                        </Text>
                      </View>
                    );
                  })}
                  {show && (
                    <DatePicker
                      date={date}
                      mode={mode}
                      modal={true}
                      open={open}
                      theme={Platform.OS === 'ios' ? 'dark' : 'dark'}
                      minimumDate={new Date()}
                      onConfirm={date => {
                        setOpen(false);
                        selectedDate(date);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                      textColor={
                        Platform.OS === 'ios'
                          ? R.color.mainColor
                          : colorScheme === 'dark'
                          ? R.color.white
                          : R.color.black
                      }
                      title={`Set ${mode}`}
                      confirmText={'Set'}
                      cancelText={'Clear'}
                      is24hourSource={true}
                      androidVariant={'nativeAndroid'}
                      maximumDate={new Date(2300, 10, 20)}
                    />
                  )}
                </View>
              </View>

              <View style={styles.footer}>
                <Button
                  value={'Save'}
                  bgColor={R.color.mainColor}
                  width={'100%'}
                  size={'lg'}
                  color={R.color.white}
                  borderWidth={1}
                  borderColor={R.color.mainColor}
                  onPress={() => setIsBlur(false)}
                />
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
  cancelButton: {
    padding: R.unit.scale(5),
  },
  dateBox: {
    borderRadius: R.unit.scale(10),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(1),
    paddingVertical: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(16),
  },
  timeContainer: {
    marginTop: R.unit.scale(24),
    marginBottom: R.unit.scale(32),
  },
  timeSeperator: {
    width: R.unit.scale(8),
    height: R.unit.scale(1),
    backgroundColor: R.color.blackShade4,
    marginTop: R.unit.height(0.04),
  },
  checkedBox: {
    borderColor: R.color.black,
    borderWidth: R.unit.scale(1),
    borderRadius: R.unit.scale(20),
    height: R.unit.scale(20),
    width: R.unit.scale(20),
    padding: 2,
    backgroundColor: R.color.red,
    marginRight: R.unit.scale(12),
  },
  unCheckedBox: {
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(0.5),
    borderRadius: R.unit.scale(20),
    height: R.unit.scale(20),
    width: R.unit.scale(20),
    backgroundColor: R.color.white,
    marginRight: R.unit.scale(12),
  },
  footer: {
    width: '100%',
    borderTopWidth: R.unit.scale(0.75),
    borderTopColor: R.color.gray4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(16),
    paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 0 : 16),
  },
});

export default AvailabilityDetailsModal;
