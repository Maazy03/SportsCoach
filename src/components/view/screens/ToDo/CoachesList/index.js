import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';

function CoachesList(props) {
  const {item} = props;
  const {image, name, city, state, sportName, rating, review} = item;

  return (
    <View style={[R.styles.rowView, styles.cardLayout]}>
      <Image
        style={styles.profileImage}
        imageStyle={{
          borderRadius: R.unit.scale(120),
        }}
        source={image}
        resizeMode="cover"
      />

      <View style={styles.bioView}>
        <Text
          variant={'h6'}
          font={'Sequel651'}
          color={R.color.blackShade4}
          align={'left'}
          gutterBottom={4}
          numberOfLines={1}
          transform={'none'}>
          {name}
        </Text>

        <View style={[R.styles.rowView, styles.subBioView]}>
          <Icon
            name={'location-sharp'}
            type={'Ionicons'}
            color={R.color.gray}
            size={15}
            iconStyles={{marginRight: R.unit.scale(5)}}
          />

          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            style={{maxWidth: '66%'}}
            numberOfLines={1}
            transform={'none'}>
            {city}, {state}
          </Text>

          <View style={[R.styles.dot, styles.dot]} />

          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.gray}
            style={{maxWidth: '25%'}}
            numberOfLines={1}
            align={'left'}
            transform={'none'}>
            {sportName}
          </Text>
        </View>

        <View style={[R.styles.rowView, styles.ratingView]}>
          <Icon
            name={'star'}
            type={'Foundation'}
            color={R.color.mainColor}
            size={20}
            iconStyles={{marginRight: R.unit.scale(5)}}
          />

          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.blackShade4}
            align={'left'}
            transform={'none'}>
            {rating.toFixed(1)}
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            style={{
              textDecorationLine: 'underline',
              marginLeft: R.unit.scale(5),
            }}
            transform={'none'}>
            ({review} reviews)
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardLayout: {
    width: '100%',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: R.unit.scale(70),
    height: R.unit.scale(90),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(12),
  },
  bioView: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  subBioView: {
    justifyContent: 'flex-start',
    marginBottom: R.unit.scale(12),
  },
  ratingView: {
    justifyContent: 'flex-start',
  },
  dot: {
    marginHorizontal: R.unit.scale(8),
    backgroundColor: R.color.gray,
  },
});

export default CoachesList;
