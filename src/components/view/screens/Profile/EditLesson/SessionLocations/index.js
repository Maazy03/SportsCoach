import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {
  EditPencilIcon,
  MiniMapListIcon,
  TrashIcon,
} from '@components/utils/Svg';
import Divider from '@components/common/Divider';

function SessionLocations(props) {
  const {item, isLast, editItems, deletePlace} = props;

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
            editItems(item);
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
    </View>
  );
}
export default SessionLocations;

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
