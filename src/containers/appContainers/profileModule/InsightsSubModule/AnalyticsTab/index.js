import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import AnalyticsSwiper from '@components/view/screens/Profile/Insights/AnalyticsSwiper';
import Icon from '@components/common/Icon';
import {FilterIcon} from '@components/utils/Svg';
import LineChart from '@components/view/screens/Profile/Insights/LineChart';
import BarChart from '@components/view/screens/Profile/Insights/BarChart';
import InsightsFilterModal from '@components/view/modal/InsightsFilterModal';
import SeasonalStaticsModal from '@components/view/modal/SeasonalStaticsModal';

function AnalyticsTab(props) {
  const {navigation, hideBtn} = props;

  const [isModal, setIsModal] = useState(false);
  const [isSeasonalModal, setIsSeasonalModal] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);

  return (
    <ScrollView
      style={[R.styles.container, styles.mainLayout]}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 100 : 20),
      }}>
      <View style={styles.contentView}>
        <AnalyticsSwiper />

        <View style={R.styles.rowView}>
          <View style={R.styles.twoItemsRow}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setIsModal(!isModal)}>
              <View style={{padding: R.unit.scale(5)}}>
                <FilterIcon />
              </View>
            </TouchableOpacity>
            <View style={[R.styles.rowView, styles.modeButtonContainer]}>
              <TouchableOpacity
                style={styles.modeButton}
                activeOpacity={0.4}
                onPress={() => setShowLineChart(false)}>
                <Icon
                  type={'Feather'}
                  name={'bar-chart-2'}
                  color={
                    !showLineChart ? R.color.hyperLinkColor : R.color.gray5
                  }
                  size={20}
                />
              </TouchableOpacity>

              <View style={styles.verticalSeperator} />

              <TouchableOpacity
                style={styles.modeButton}
                activeOpacity={0.4}
                onPress={() => setShowLineChart(true)}>
                <Icon
                  type={'MaterialIcons'}
                  name={'show-chart'}
                  color={showLineChart ? R.color.hyperLinkColor : R.color.gray5}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 0.6}}>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.gray}
              align={'left'}
              transform={'none'}>
              Aug 22—Aug 25
            </Text>
          </View>
        </View>

        {showLineChart ? <LineChart /> : <BarChart />}

        <View style={[R.styles.rowView, styles.indicatorContainer]}>
          <View style={R.styles.twoItemsRow}>
            <View style={styles.redIndicator} />
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.gray}
              align={'left'}
              transform={'none'}>
              Income
            </Text>
          </View>

          <View style={{...R.styles.twoItemsRow, marginLeft: R.unit.scale(40)}}>
            <View style={styles.blueIndicator} />
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.gray}
              align={'left'}
              transform={'none'}>
              Hours
            </Text>
          </View>
        </View>

        <Text
          variant={'body4'}
          font={'InterRegular'}
          color={R.color.gray}
          align={'center'}
          transform={'none'}>
          Want to learn more about how other sports work{'\n'}
          <Text
            variant={'body4'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'center'}
            transform={'none'}>
            on Lytesnap?{' '}
            <Text
              variant={'body4'}
              font={'InterMedium'}
              color={R.color.hyperLinkColor}
              align={'left'}
              onPress={() => setIsSeasonalModal(!isSeasonalModal)}
              transform={'none'}>
              Check out seasons statistic
            </Text>
            <Icon
              name={'arrow-top-right'}
              size={15}
              type={'MaterialCommunityIcons'}
              color={R.color.hyperLinkColor}
            />
          </Text>
        </Text>
      </View>
      <InsightsFilterModal isVisibleModal={isModal} />
      <SeasonalStaticsModal isVisibleModal={isSeasonalModal} />
    </ScrollView>
  );
}
export default AnalyticsTab;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  contentView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  filterButton: {
    padding: R.unit.scale(10),
    backgroundColor: R.color.gray6,
    borderRadius: R.unit.scale(10),
  },
  modeButtonContainer: {
    backgroundColor: R.color.gray6,
    marginLeft: R.unit.scale(12),
    paddingHorizontal: R.unit.scale(6),
    paddingVertical: R.unit.scale(6),
    borderRadius: R.unit.scale(10),
  },
  modeButton: {
    padding: R.unit.scale(5),
  },
  indicatorContainer: {
    justifyContent: 'center',
    marginTop: R.unit.scale(26),
    marginBottom: R.unit.scale(36),
  },
  redIndicator: {
    backgroundColor: R.color.mainColor,
    height: R.unit.scale(12),
    width: R.unit.scale(12),
    borderRadius: R.unit.scale(2),
    marginRight: R.unit.scale(12),
  },
  blueIndicator: {
    backgroundColor: R.color.hyperLinkColor,
    height: R.unit.scale(12),
    width: R.unit.scale(12),
    borderRadius: R.unit.scale(2),
    marginRight: R.unit.scale(12),
  },
  verticalSeperator: {
    width: 1,
    paddingVertical: R.unit.scale(12),
    backgroundColor: R.color.blackShade4,
    marginHorizontal: R.unit.scale(5),
  },
});
