import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import R from '@components/utils/R';
import {TrashIcon} from '@components/utils/Svg';
import Text from '@components/common/Text';
import {LastStringTrim} from '@components/utils/stringTrim';

function CertificateView(props) {
  const {item, removePic} = props;

  let name = LastStringTrim(item?.path);
  let initialName = name.substring(0, 14);
  let endName = name.substring(name?.length - 6);

  return (
    <View style={[styles.certificateContainer, R.styles.rowView]}>
      <View style={styles.imageView}>
        <Image
          source={{uri: item?.path}}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: R.unit.scale(10),
          }}
          resizeMode={'cover'}
        />
      </View>

      <View style={styles.imageTextDetailsLayout}>
        <Text
          variant={'body2'}
          font={'InterSemiBold'}
          gutterTop={4}
          color={R.color.black}
          align={'left'}
          style={{width: '90%'}}
          numberOfLines={1}
          transform={'none'}>
          {initialName + '...' + endName}
        </Text>

        <View style={[styles.subTextDetails, R.styles.rowView]}>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            transform={'none'}>
            {item?.size.toFixed(2)}mb
          </Text>
          <View style={R.styles.dot} />
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            style={{maxWidth: '70%'}}
            numberOfLines={1}
            transform={'none'}>
            {item?.modificationDate}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.editIconView}
        activeOpacity={0.6}
        onPress={() => removePic(item?.id)}>
        <View style={[styles.editSvg]}>
          <TrashIcon height="100%" width="100%" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default CertificateView;

const styles = StyleSheet.create({
  certificateContainer: {
    width: '100%',
    height: R.unit.scale(100),
    borderRadius: R.unit.scale(16),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    borderRadius: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(16),
    marginBottom: R.unit.scale(16),
  },
  imageView: {
    width: R.unit.scale(64),
    height: R.unit.scale(64),
    borderRadius: R.unit.scale(16),
  },
  editIconView: {
    padding: R.unit.scale(15),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: R.unit.scale(10),
  },
  imageTextDetailsLayout: {
    flex: 1,
    paddingHorizontal: R.unit.scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTextDetails: {
    marginTop: R.unit.scale(4),
    justifyContent: 'space-around',
    width: '90%',
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.height(0.02),
  },
});
