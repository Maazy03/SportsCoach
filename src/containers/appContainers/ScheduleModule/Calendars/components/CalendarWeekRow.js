import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Pressable} from 'react-native';
import moment from 'moment';
import ReservationPointer from './ReservationPointer';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import AvailabilityDetailsModal from '@components/view/modal/ScheduleModals/AvailabilityDetailsModal';

const CalendarWeekRow = ({item, reservations, calenderType}) => {
  const query = calenderType === 'week' ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh a';
  let thisDaysReservations = reservations?.filter(
    reservation =>
      moment(reservation.start).format(query) === moment(item).format(query),
  );
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = data => {
    setIsModal(!isModal);
    setModalData(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {calenderType === 'week' && (
          <>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.gray}
              gutterBottom={2}>
              {moment(item).format('ddd')}
            </Text>
            <Text
              variant={'body3'}
              font={'InterSemiBold'}
              color={R.color.blackShade4}>
              {moment(item).format('DD')}
            </Text>
          </>
        )}
        {calenderType === 'day' && (
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray}
            gutterBottom={2}>
            {moment(item).format('hh a')}
          </Text>
        )}
      </View>
      <Pressable
        activeOpacity={0.5}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? R.color.gray2 : R.color.white,
            borderRadius: pressed ? R.unit.scale(10) : 0,
          },
          styles.right,
        ]}
        onPress={() => openModal(item)}>
        <ScrollView
          contentContainerStyle={styles.scrollviewContainerStyle}
          keyboardShouldPersistTaps="always"
          horizontal
          showsHorizontalScrollIndicator={false}>
          {thisDaysReservations?.map((reservation, index) => {
            return (
              <View
                onStartShouldSetResponder={() => true}
                style={{
                  flexDirection: 'row',
                }}>
                <ReservationPointer
                  key={index}
                  reservation={reservation}
                  calenderType={calenderType}
                />
              </View>
            );
          })}
        </ScrollView>
      </Pressable>
      <AvailabilityDetailsModal
        isVisibleModal={isModal}
        modalData={modalData}
      />
    </View>
  );
};

export default CalendarWeekRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 0.85,
    borderTopWidth: R.unit.scale(1),
    borderTopColor: R.color.gray2,
    minHeight: R.unit.scale(80),
    paddingHorizontal: R.unit.scale(5),
  },
  scrollviewContainerStyle: {
    marginVertical: R.unit.scale(5),
    paddingRight: R.unit.scale(50),
  },
});
