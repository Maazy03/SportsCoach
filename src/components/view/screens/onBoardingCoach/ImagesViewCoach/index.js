import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import R from '@components/utils/R';
import {TrashIcon} from '@components/utils/Svg';
import Video from 'react-native-video';

function ImagesViewCoach(props) {
  const {item, removePic} = props;

  let IsVideo = item?.path?.includes('.mp4');

  return (
    <View style={styles.imageView}>
      {IsVideo ? (
        <Video
          style={{
            height: '100%',
            width: '100%',
            borderRadius: R.unit.scale(10),
          }}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'ignore'}
          source={{uri: item?.path}}
          paused={false}
          controls={true}
          onBuffer={e => {
            // if (e.isBuffering) {
            //   setLoading(true);
            // } else {
            //   setLoading(false);
            // }
          }}
          // onError={videoError}
          // onLoadStart={() => setLoading(true)}
          // onLoad={() => setLoading(false)}
        />
      ) : (
        <Image
          source={{uri: item?.path}}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: R.unit.scale(10),
          }}
          resizeMode={'cover'}
        />
      )}

      <TouchableOpacity
        style={styles.deleteView}
        activeOpacity={0.9}
        onPress={() => removePic(item.id)}>
        <View style={styles.editSvg}>
          <TrashIcon height="100%" width="100%" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default ImagesViewCoach;

const styles = StyleSheet.create({
  imageView: {
    width: '48%',
    height: R.unit.scale(170),
    borderRadius: R.unit.scale(16),
    marginBottom: R.unit.scale(16),
  },
  deleteView: {
    backgroundColor: R.color.white,
    padding: R.unit.scale(8),
    position: 'absolute',
    right: 8,
    top: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: R.unit.scale(10),
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.height(0.023),
  },
});
