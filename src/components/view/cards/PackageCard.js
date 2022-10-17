import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import Button from '@components/common/Button';

function PackageCard(props) {
  const {item, navigation} = props;
  const user = useSelector(state => state.user);

  const navigate = () => {
    navigation.navigate('PaymentScreen', {
      planId: item?._id,
    });
  };

  return (
    <View style={[styles.cardLayout]}>
      <Text
        variant={'h3'}
        font={'bold'}
        color={R.color.gray}
        align={'left'}
        gutterTop={35}
        gutterBottom={20}
        transform={'capitalize'}>
        {item?.packageType}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          variant={'extraLargeTitle'}
          font={'bold'}
          color={R.color.mainColor}
          align={'left'}
          transform={'capitalize'}>
          ${item?.price}
        </Text>
      </View>
      {item?._id === user?.user?.package && (
        <Text
          variant={'body2'}
          font={'italic'}
          color={R.color.black}
          align={'left'}
          transform={'capitalize'}>
          Active
        </Text>
      )}

      <View style={styles.divider} />

      <View style={[R.styles.rowView, styles.contentItemRow]}>
        <Text
          variant={'body1'}
          font={'regular'}
          color={R.color.black}
          align={'left'}
          style={{marginLeft: R.unit.scale(10)}}
          transform={'capitalize'}>
          Bonus percentage
        </Text>
        <Text
          variant={'body1'}
          font={'thin'}
          color={R.color.gray3}
          align={'left'}
          style={{marginLeft: R.unit.scale(10)}}
          transform={'capitalize'}>
          {item?.bonusPercentage}%
        </Text>
      </View>
      <View style={[R.styles.rowView, styles.contentItemRow]}>
        <Text
          variant={'body1'}
          font={'regular'}
          color={R.color.black}
          align={'left'}
          style={{marginLeft: R.unit.scale(10)}}
          transform={'capitalize'}>
          Bonus units
        </Text>
        <Text
          variant={'body1'}
          font={'thin'}
          color={R.color.gray3}
          align={'left'}
          style={{marginLeft: R.unit.scale(10)}}
          transform={'capitalize'}>
          {item?.bonusUnits}
        </Text>
      </View>
      <View style={[R.styles.rowView, styles.contentItemRow]}>
        <Text
          variant={'body1'}
          font={'regular'}
          color={R.color.black}
          align={'left'}
          style={{marginLeft: R.unit.scale(10)}}
          transform={'capitalize'}>
          total units purchased
        </Text>
        <Text
          variant={'body1'}
          font={'thin'}
          color={R.color.gray3}
          align={'left'}
          style={{marginLeft: R.unit.scale(10)}}
          transform={'capitalize'}>
          {item?.totalUnitsPurchased}
        </Text>
      </View>
      <View style={[R.styles.rowView, styles.contentItemRow]}>
        <Text
          variant={'body1'}
          font={'regular'}
          color={R.color.black}
          align={'left'}
          style={{marginLeft: R.unit.scale(10)}}
          transform={'capitalize'}>
          Recharge Message
        </Text>
        <Text
          variant={'body1'}
          font={'thin'}
          color={R.color.gray3}
          align={'left'}
          style={{marginLeft: R.unit.scale(10)}}
          transform={'capitalize'}>
          50
        </Text>
      </View>

      <Button
        value={'Upgrade'}
        bgColor={R.color.mainColor}
        width={'70%'}
        size={'xmd'}
        gutterTop={R.unit.scale(20)}
        gutterBottom={R.unit.scale(20)}
        height={50}
        variant={'h6'}
        font={'regular'}
        color={R.color.white}
        borderRadius={100}
        borderColor={R.color.mainColor}
        loaderColor={R.color.black}
        borderWidth={1}
        onPress={navigate}
      />
    </View>
  );
}
export default PackageCard;

const styles = StyleSheet.create({
  cardLayout: {
    borderRadius: R.unit.scale(25),
    backgroundColor: R.color.white,
    width: R.unit.width(1) > 800 ? R.unit.width(0.5) : R.unit.width(0.7),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: R.unit.scale(24),
    justifyContent: 'flex-start',
    marginBottom: R.unit.scale(30),
    marginTop: R.unit.scale(10),
    alignItems: 'center',
  },
  divider: {
    marginVertical: R.unit.scale(30),
    backgroundColor: '#B5CFFF',
    height: 0.5,
    width: '80%',
    marginLeft: R.unit.scale(12),
  },
  contentItemRow: {
    paddingHorizontal: 0,
    padding: R.unit.scale(10),
    width: R.unit.width(0.62),
  },
});
