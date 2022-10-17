import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';
import R from '@components/utils/R';
import Button from '@components/common/Button';

function OnBoardCoachHeader(props) {
  const {navigation} = props;
  const common = useSelector(state => state.common);

  return (
    <View style={[R.styles.columnView, styles.container]}>
      <View style={styles.buttonView}>
        <Button
          value="Total progress"
          bgColor={R.color.white}
          width={'38%'}
          size={'sm'}
          variant={'body3'}
          font={'InterMedium'}
          color={R.color.white}
          disabledButtonBGColor={R.color.white}
          disabledButtonTextColor={R.color.black}
          activeOpacity={1}
          disabled={true}
          loaderColor={R.color.white}
          borderWidth={1}
          borderColor={R.color.gray4}
        />
      </View>
      <Progress.Bar
        progress={common?.progressCount}
        width={R.unit.width(1)}
        color={R.color.hyperLinkColor}
        unfilledColor={R.color.blueShade1}
        borderWidth={0}
      />
    </View>
  );
}
export default OnBoardCoachHeader;
const styles = StyleSheet.create({
  container: {
    width: R.unit.width(1),
  },
  buttonView: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(16),
  },
});
