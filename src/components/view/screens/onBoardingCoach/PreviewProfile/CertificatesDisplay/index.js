import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {certificatesList} from '@components/constants';
import {
  CertificateOne,
  LeftSharpArrowIcon,
  RightSharpArrowIcon,
} from '@components/utils/Svg';

function CertificatesDisplay(props) {
  const snapRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [disabledForward, setDisableForward] = useState(false);

  useEffect(() => {
    if (activeIndex === certificatesList.length - 1) {
      setDisableForward(true);
    } else {
      setDisableForward(false);
    }
  }, [activeIndex]);

  const renderItem = data => {
    const {item} = data;
    return (
      <View style={styles.certificateBox}>
        <View style={{...R.styles.svgView, height: R.unit.scale(40)}}>
          <CertificateOne height="100%" width="100%" />
        </View>
        <Text
          variant={'body2'}
          font={'InterRegular'}
          color={R.color.blackShade4}
          align={'left'}
          gutterTop={16}
          numberOfLines={2}
          gutterBottom={24}
          style={{maxWidth: '80%'}}
          transform={'none'}>
          {item?.answer}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.mainLayout]}>
      <View style={[R.styles.rowView, styles.titleView]}>
        <Text
          variant={'h3'}
          font={'Sequel551'}
          color={R.color.black}
          align={'left'}
          gutterTop={5}
          transform={'none'}>
          Certificates
        </Text>
        <View style={[R.styles.twoItemsRow, styles.controlView]}>
          <TouchableOpacity
            disabled={activeIndex === 0}
            activeOpacity={0.6}
            onPress={() => {
              snapRef.current.snapToPrev();
            }}>
            <View style={styles.leftControl}>
              <LeftSharpArrowIcon
                height="100%"
                width="100%"
                stroke={activeIndex === 0 ? R.color.gray4 : '#222222'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabledForward}
            activeOpacity={0.6}
            onPress={() => {
              snapRef.current.snapToNext();
            }}>
            <View style={styles.rightControl}>
              <RightSharpArrowIcon
                height="100%"
                width="100%"
                stroke={disabledForward ? R.color.gray4 : '#222222'}
                fill={'red'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Carousel
        ref={snapRef}
        data={certificatesList}
        renderItem={renderItem}
        sliderWidth={R.unit.width(0.917)}
        itemWidth={R.unit.width(0.7)}
        activeSlideOffset={2}
        activeSlideAlignment={'start'}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        onSnapToItem={index => setActiveIndex(index)}
      />
    </View>
  );
}
export default CertificatesDisplay;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  titleView: {
    marginTop: R.unit.scale(48),
    marginBottom: R.unit.scale(16),
  },
  svgView: {
    height: R.unit.scale(40),
    marginRight: R.unit.scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  controlView: {
    width: '25%',
    justifyContent: 'flex-end',
  },
  leftControl: {
    height: R.unit.scale(30),
    aspectRatio: 1,
  },
  rightControl: {
    height: R.unit.scale(40),
    aspectRatio: 1,
    marginLeft: R.unit.scale(10),
  },
  certificateBox: {
    backgroundColor: R.color.gray6,
    paddingHorizontal: R.unit.scale(16),
    marginRight: R.unit.scale(8),
    minHeight: R.unit.scale(120),
    borderRadius: R.unit.scale(10),
  },
});
