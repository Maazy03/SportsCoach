import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import R from '@components/utils/R';
import AppIntroSlider from 'react-native-app-intro-slider';
import VideoPlayer from 'react-native-video-player';

function MediaDisplay(props) {
  const {navigation} = props;

  const slides = [
    {
      key: 1,
      video:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      key: 2,
      image:
        'https://lytesnap-demo.web.app/static/media/gallery-img-1.14636f95912c4fb9285b.png',
    },
    {
      key: 3,
      image:
        'https://lytesnap-demo.web.app/static/media/gallery-img-1.14636f95912c4fb9285b.png',
    },
    {
      key: 4,
      image:
        'https://lytesnap-demo.web.app/static/media/gallery-img-1.14636f95912c4fb9285b.png',
    },
    {
      key: 5,
      image:
        'https://lytesnap-demo.web.app/static/media/gallery-img-1.14636f95912c4fb9285b.png',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        {item?.video ? (
          <VideoPlayer
            video={{
              uri: item.video,
            }}
            resizeMode={'cover'}
            controls={false}
            controlsTimeout={1}
            showDuration={false}
            disableFullscreen={true}
            disableSeek={true}
            endWithThumbnail={true}
            hideControlsOnStart={false}
            pauseOnPress={true}
            thumbnail={{
              uri: 'https://lytesnap-demo.web.app/static/media/gallery-img-1.14636f95912c4fb9285b.png',
            }}
            customStyles={{
              playButton: styles.playButton,
              video: {
                height: '100%',
              },
              thumbnail: {
                flexDirection: 'row',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                alignContent: 'center',
              },
            }}
          />
        ) : (
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode={'cover'}
            style={{width: '100%', height: '100%'}}
          />
        )}
      </View>
    );
  };

  return (
    <View style={[styles.mainLayout]}>
      <View style={styles.formView}>
        <AppIntroSlider
          data={slides}
          renderItem={renderItem}
          showNextButton={false}
          showPrevButton={false}
          showDoneButton={false}
          activeDotStyle={{backgroundColor: R.color.white}}
          dotStyle={{backgroundColor: R.color.gray5}}
        />
      </View>
    </View>
  );
}
export default MediaDisplay;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  formView: {
    width: '100%',
    justifyContent: 'center',
  },
  slide: {
    width: R.unit.width(1),
    height: R.unit.scale(193),
  },
  playButton: {
    backgroundColor: R.color.mainColor,
    height: R.unit.scale(40),
    width: R.unit.scale(40),
    marginRight: R.unit.scale(5),
  },
});
