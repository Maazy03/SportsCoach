import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {pricingAspects} from '@components/constants';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';

function PricingInfo(props) {
  const {navigation} = props;

  return (
    <ScrollView
      style={[R.styles.container, styles.mainLayout]}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View style={[R.styles.twoItemsRow, styles.header]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}>
          <Icon
            name={'cross'}
            type={'Entypo'}
            size={25}
            color={R.color.black}
          />
        </TouchableOpacity>
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          color={R.color.black}
          align={'center'}
          style={{flex: 1}}
          transform={'none'}>
          How does pricing works?
        </Text>
      </View>
      <View style={styles.formView}>
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          color={R.color.black}
          align={'left'}
          gutterBottom={29}
          transform={'none'}>
          What we offer
        </Text>
        {pricingAspects?.map((item, index) => {
          return (
            <View style={[R.styles.twoItemsRow, styles.listView]} key={index}>
              <Image source={item?.image} />
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.black}
                align={'center'}
                style={{marginLeft: R.unit.scale(16)}}
                transform={'none'}>
                {item?.title}
              </Text>
            </View>
          );
        })}
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.black}
          gutterBottom={8}
          align={'left'}
          transform={'none'}>
          Lytesnap charges{' '}
          <Text
            variant={'body2'}
            font={'InterSemiBold'}
            color={R.color.black}
            align={'left'}
            transform={'none'}>
            10%{' '}
          </Text>
          of your listed lesson price
        </Text>
      </View>
      <View style={styles.footerButton}>
        <Button
          value={'Got it'}
          bgColor={R.color.mainColor}
          width={'100%'}
          size={'lg'}
          color={R.color.white}
          disabled={false}
          loaderColor={R.color.white}
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}
export default PricingInfo;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  header: {
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(20),
    width: '100%',
    borderBottomColor: R.color.gray4,
    borderBottomWidth: R.unit.scale(0.7),
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(24),
  },
  listView: {
    width: '100%',
    marginBottom: R.unit.scale(24),
  },
  footerButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: R.unit.scale(16),
    backgroundColor: R.color.white,
  },
});
