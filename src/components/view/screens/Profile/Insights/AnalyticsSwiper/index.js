import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {analyticsData} from '@components/constants';
import {
  CertificateOne,
  LeftSharpArrowIcon,
  MoneyIcon,
  RightSharpArrowIcon,
  StarIconAcc,
  UserTabIcon,
} from '@components/utils/Svg';

function AnalyticsSwiper(props) {
  const snapRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = data => {
    const {item} = data;
    return (
      <View style={styles.certificateBox}>
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          color={R.color.blackShade4}
          align={'left'}
          gutterBottom={4}
          transform={'none'}>
          {item?.title}
        </Text>
        <View style={R.styles.twoItemsRow}>
          <View
            style={{
              ...R.styles.svgView,
              height: R.unit.scale(30),
              marginRight: R.unit.scale(16),
            }}>
            {item.svg}
          </View>
          <Text
            variant={'h3'}
            font={'Sequel651'}
            color={R.color.blackShade4}
            align={'left'}
            gutterTop={5}
            transform={'none'}>
            {item?.value}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.mainLayout]}>
      <Carousel
        data={analyticsData}
        renderItem={renderItem}
        sliderWidth={R.unit.width(0.917)}
        itemWidth={R.unit.width(0.7)}
        activeSlideOffset={2}
        activeSlideAlignment={'start'}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={analyticsData.length}
        activeDotIndex={activeIndex}
        dotContainerStyle={{marginHorizontal: 5}}
        dotStyle={{
          width: R.unit.scale(5),
          height: R.unit.scale(5),
          borderRadius: R.unit.scale(5),
        }}
        inactiveDotColor={R.color.gray4}
        inactiveDotStyle={{
          width: R.unit.scale(7),
          height: R.unit.scale(7),
          borderRadius: R.unit.scale(5),
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}
export default AnalyticsSwiper;

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
  certificateBox: {
    backgroundColor: R.color.white,
    padding: R.unit.scale(16),
    marginRight: R.unit.scale(8),
    borderRadius: R.unit.scale(10),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
  },
});
