import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import AddPlaceModal from '@components/view/modal/OnBoardCoachModals/AddPlaceModal';
import {
  EditPencilIcon,
  MiniMapListIcon,
  TrashIcon,
} from '@components/utils/Svg';
import Divider from '@components/common/Divider';
import Icon from '@components/common/Icon';

function SessionPlaces(props) {
  const {navigation, item, isLast, editItems, addItems, deletePlace} = props;
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isEditMode, setIsEditModal] = useState(false);

  const openModal = () => {
    setIsModal(!isModal);
  };

  const setModalProps = item => {
    if (Object.entries(item).length === 0) {
      setIsEditModal(false);
    } else {
      setIsEditModal(true);
    }
    setModalData(item);
    openModal();
  };

  const addPlaces = data => {
    addItems(data);
  };

  const editPlaces = data => {
    editItems(data);
  };

  return (
    <View style={{...R.styles.columnView, alignItems: 'flex-start'}}>
      <View style={R.styles.rowView}>
        <View
          style={{
            ...R.styles.svgView,
            height: R.unit.scale(92),
          }}>
          <MiniMapListIcon height="100%" width="100%" />
        </View>
        <View style={styles.textView}>
          {item?.venue?.length > 0 && (
            <Text
              variant={'body2'}
              font={'InterSemiBold'}
              gutterBottom={8}
              color={R.color.black}
              align={'left'}
              numberOfLines={2}
              style={{maxWidth: '85%'}}
              transform={'none'}>
              {item?.venue}
            </Text>
          )}

          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            numberOfLines={2}
            style={{maxWidth: '95%'}}
            transform={'none'}>
            {item?.address}
          </Text>
        </View>
      </View>
      <View style={styles.placeEditView}>
        <TouchableOpacity
          style={styles.editIconView}
          activeOpacity={0.6}
          onPress={() => {
            setModalProps(item);
          }}>
          <View style={[styles.editSvg]}>
            <EditPencilIcon height="100%" width="100%" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editIconView}
          activeOpacity={0.6}
          onPress={() => {
            deletePlace(item?.id);
          }}>
          <View style={[styles.editSvg]}>
            <TrashIcon height="100%" width="100%" />
          </View>
        </TouchableOpacity>
      </View>
      {!isLast && <Divider />}
      {isLast && (
        <TouchableOpacity
          style={[R.styles.twoItemsRow, styles.addPlaceView]}
          onPress={() => {
            setModalProps({});
          }}
          activeOpacity={0.6}>
          <Icon
            name={'plus'}
            type={'Entypo'}
            color={R.color.hyperLinkColor}
            size={16}
          />
          <Text
            variant={'body3'}
            font={'InterMedium'}
            color={R.color.hyperLinkColor}
            align={'left'}
            transform={'none'}>
            Add location
          </Text>
        </TouchableOpacity>
      )}
      <AddPlaceModal
        isVisibleModal={isModal}
        modalData={modalData}
        addItems={addPlaces}
        editItems={editPlaces}
        modalType={isEditMode}
      />
    </View>
  );
}
export default SessionPlaces;

const styles = StyleSheet.create({
  textView: {
    marginLeft: R.unit.scale(16),
    paddingVertical: R.unit.scale(6),
    flex: 1,
  },
  placeEditView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: R.unit.scale(16),
    width: R.unit.scale(93),
    marginTop: R.unit.scale(12),
    marginBottom: R.unit.scale(16),
  },
  editIconView: {
    padding: R.unit.scale(10),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: R.unit.scale(10),
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.height(0.02),
  },
  addPlaceView: {
    marginTop: R.unit.scale(8),
    marginBottom: R.unit.scale(25),
  },
});
