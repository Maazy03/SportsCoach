import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import {EditPencilIcon, TrashIcon} from '@components/utils/Svg';

function CoachEditPicturePanel(props) {
  const {editPic, removePic, disabled} = props;
  return (
    <View style={styles.imageEditView}>
      <TouchableOpacity
        style={styles.editIconView}
        activeOpacity={0.6}
        disabled={disabled}
        onPress={editPic}>
        <View style={[styles.editSvg]}>
          <EditPencilIcon height="100%" width="100%" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editIconView}
        activeOpacity={0.6}
        onPress={removePic}>
        <View style={[styles.editSvg]}>
          <TrashIcon height="100%" width="100%" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default CoachEditPicturePanel;

const styles = StyleSheet.create({
  imageEditView: {
    width: R.unit.scale(160),
    height: R.unit.scale(165),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: R.unit.scale(16),
    paddingLeft: R.unit.scale(16),
  },
  editIconView: {
    padding: R.unit.scale(15),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: R.unit.scale(10),
    marginBottom: R.unit.scale(12),
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.height(0.02),
  },
});
