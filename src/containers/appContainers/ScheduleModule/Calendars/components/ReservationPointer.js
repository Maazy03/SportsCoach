import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import AvailabilityDetailsModal from '@components/view/modal/ScheduleModals/AvailabilityDetailsModal';
import LessonDetailsModal from '@components/view/modal/LessonDetailsModal';

const ReservationPointer = ({reservation, calenderType}) => {
  let pastContainer = reservation?.status == 'past' && styles.pastContainer;
  const [modalData, setModalData] = useState({});
  const [isDetailsModal, setIsDetailsModal] = useState(false);

  const openModal = data => {
    setIsDetailsModal(!isDetailsModal);
    setModalData(data);
  };

  return (
    <>
      {calenderType === 'month' && (
        <TouchableOpacity
          style={[styles.monthContainer, pastContainer]}
          onPress={() => openModal(reservation)}>
          <Text
            numberOfLines={1}
            variant={'body5'}
            font={'InterRegular'}
            color={R.color.blackShade4}>
            {moment(reservation?.start).format('hh A')}{' '}
            {moment(reservation?.end).format('hh A')}
          </Text>
        </TouchableOpacity>
      )}

      {calenderType !== 'month' && (
        <TouchableOpacity
          onPress={() => openModal(reservation)}
          style={[
            styles.weekContainer,
            pastContainer,
            calenderType === 'day' && styles.dayContainer,
          ]}>
          <Text
            numberOfLines={1}
            variant={'body4'}
            font={'InterRegular'}
            color={R.color.blackShade4}
            align={'center'}>
            {`${moment(reservation?.start).format('hA')}-${moment(
              reservation?.end,
            ).format('hA')}`}
          </Text>
          <Text
            variant={'body5'}
            font={'InterRegular'}
            color={R.color.blackShade4}
            style={[styles.mV3]}
            numberOfLines={1}>
            {reservation?.location}
          </Text>
          <Text
            variant={'body5'}
            font={'InterRegular'}
            color={R.color.blackShade4}
            numberOfLines={1}>
            {`${reservation?.type} w/ ${reservation?.title}`}
          </Text>
        </TouchableOpacity>
      )}

      <LessonDetailsModal
        isVisibleModal={isDetailsModal}
        modalData={modalData}
        showButtons={true}
      />
    </>
  );
};

export default ReservationPointer;

const styles = StyleSheet.create({
  monthContainer: {
    borderWidth: 1,
    borderColor: R.color.secondaryColor,
    marginHorizontal: 1,
    borderRadius: R.unit.scale(10),
    backgroundColor: '#e4e7f9',
    padding: R.unit.scale(2),
    marginBottom: R.unit.scale(2),
  },
  dayContainer: {
    width: R.unit.width(0.85),
  },
  weekContainer: {
    borderWidth: R.unit.scale(1),
    borderColor: R.color.secondaryColor,
    marginRight: R.unit.scale(5),
    borderRadius: R.unit.scale(10),
    backgroundColor: '#e4e7f9',
    padding: R.unit.scale(5),
    width: R.unit.scale(120),
    justifyContent: 'center',
  },
  mV3: {
    marginVertical: R.unit.scale(3),
  },
  pastContainer: {
    borderColor: R.color.gray,
    backgroundColor: R.color.gray6,
  },
});
