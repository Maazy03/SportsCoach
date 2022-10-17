import React, {useEffect, useState, useRef} from 'react';
import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {sportFilters} from '@components/constants';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import InsightsFilterModal from './InsightsFilterModal';
import {FilterIcon} from '@components/utils/Svg';
import {LineChart} from 'react-native-chart-kit';
import {Rect, Text as TextSVG, Svg} from 'react-native-svg';

function SeasonalStaticsModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [page, setPage] = useState(0);
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const scrollRef = useRef();

  const [filterType, setFilterType] = useState({
    location: '',
    season: '',
    timeSlot: '',
    sport: '',
  });

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const onTabChange = item => {
    let index = item.index;
    setPage(index);
    setFilterType({...filterType, timeSlot: item.title});
    if (index % 2 === 0) {
      scrollRef.current.scrollTo({x: R.unit.width((index / 2) * 1) / 2});
    }
  };

  function* yLabel() {
    yield* ['0$', '100$', '200$', '300$', '400$'];
  }

  function* xLabel() {
    yield* ['<0.5k+', '0.5k+', '1k+', '1.5k+', '2.5k+', '3k+', '3.5k+'];
  }

  const yLabelIterator = yLabel();
  const xLabelIterator = xLabel();

  let labels = [];

  for (let i = 0; i < 7; i++) {
    let value = i * 0.5;
    labels.push(value);
  }

  return (
    <>
      <Modal
        animationType={'fades'}
        transparent={true}
        visible={modalVisible}
        // visible={true}
        onRequestClose={() => setIsBlur(false)}
        onShow={() => {
          setIsBlur(true);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
            }}></View>
          <>
            <SafeAreaView style={[styles.modalView]}>
              <ScrollView>
                <View style={[R.styles.rowView, styles.header]}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    activeOpacity={0.6}
                    onPress={() => {
                      setIsBlur(false);
                    }}>
                    <Icon
                      type={'Ionicons'}
                      name={'close'}
                      color={R.color.blackShade4}
                      size={25}
                    />
                  </TouchableOpacity>

                  <View style={{flex: 1, marginRight: R.unit.scale(24)}}>
                    <Text
                      variant={'body2'}
                      font={'InterSemiBold'}
                      color={R.color.blackShade4}
                      align={'center'}
                      transform={'none'}>
                      Season statistic
                    </Text>
                  </View>
                </View>

                <View style={styles.contentView}>
                  <Text
                    variant={'body2'}
                    font={'InterRegular'}
                    color={R.color.gray}
                    align={'left'}
                    transform={'none'}>
                    The{' '}
                    <Text
                      variant={'body2'}
                      font={'InterSemiBold'}
                      color={R.color.blackShade4}
                      align={'left'}
                      transform={'none'}>
                      number of coaches{' '}
                    </Text>
                    is shown on the left side of the chart, and the bottom line
                    shows the profit for the current season as an indicator of
                    demand. 6k+ includes coaches with income $6000 and more.
                  </Text>
                  <View style={styles.controlRow}>
                    <TouchableOpacity
                      style={styles.modeButton}
                      activeOpacity={0.4}
                      onPress={() => setIsModal(!isModal)}>
                      <View style={{padding: R.unit.scale(5.5)}}>
                        <FilterIcon />
                      </View>
                    </TouchableOpacity>

                    <ScrollView
                      horizontal={true}
                      ref={scrollRef}
                      showsHorizontalScrollIndicator={false}
                      style={styles.horizontalScroll}
                      contentContainerStyle={styles.scrollContent}>
                      {sportFilters?.map((item, index) => {
                        return (
                          <View style={styles.tabItem} key={index}>
                            <TouchableOpacity
                              style={{
                                ...styles.tab,
                                backgroundColor:
                                  page === index
                                    ? R.color.blackShade4
                                    : R.color.gray6,
                              }}
                              activeOpacity={0.9}
                              onPress={() => onTabChange(item)}>
                              <Text
                                variant={'body3'}
                                font={'InterRegular'}
                                color={
                                  page === index
                                    ? R.color.white
                                    : R.color.blackShade4
                                }
                                align={'left'}
                                transform={'none'}>
                                {item.value}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>

                  <ScrollView horizontal>
                    <LineChart
                      data={{
                        labels: labels,
                        datasets: [
                          {
                            data: [80, 100, 120, 140, 160, 170],
                            strokeWidth: 2,
                            color: () => R.color.mainColor,
                          },
                          {
                            data: [190, 230, 260, 300, 350, 400],
                            strokeWidth: 2,
                            color: () => R.color.hyperLinkColor,
                          },
                        ],
                      }}
                      formatYLabel={() => yLabelIterator.next().value}
                      formatXLabel={() => xLabelIterator.next().value}
                      withVerticalLines={false}
                      segments={4}
                      fromZero={false}
                      withDots={true}
                      width={R.unit.width(labels.length * 0.2)}
                      height={R.unit.height(0.6)}
                      yAxisLabel="$"
                      yAxisSuffix="k"
                      yAxisInterval={1}
                      decorator={() => {
                        return tooltipPos.visible ? (
                          <View>
                            <Svg>
                              <Rect
                                x={tooltipPos.x - 15}
                                y={tooltipPos.y + 10}
                                width="50"
                                height="30"
                                fill={R.color.white}
                                strokeWidth="1"
                                stroke={R.color.gray4}
                                rx="5"
                              />
                              <TextSVG
                                x={tooltipPos.x + 5}
                                y={tooltipPos.y + 30}
                                fill={R.color.blackShade4}
                                fontSize="12"
                                fontWeight="300"
                                textAnchor="middle">
                                {tooltipPos.value}$
                              </TextSVG>
                            </Svg>
                          </View>
                        ) : null;
                      }}
                      onDataPointClick={data => {
                        let isSamePoint =
                          tooltipPos.x === data.x && tooltipPos.y === data.y;

                        isSamePoint
                          ? setTooltipPos(previousState => {
                              return {
                                ...previousState,
                                value: data.value,
                                visible: !previousState.visible,
                              };
                            })
                          : setTooltipPos({
                              x: data.x,
                              value: data.value,
                              y: data.y,
                              visible: true,
                            });
                      }}
                      chartConfig={{
                        backgroundColor: R.color.white,
                        backgroundGradientFrom: R.color.white,
                        backgroundGradientTo: R.color.white,
                        fillShadowGradientFrom: R.color.mainColor,
                        fillShadowGradientTo: R.color.hyperLinkColor,
                        fillShadowGradientFromOpacity: 0.3,
                        fillShadowGradientToOpacity: 0.05,
                        propsForBackgroundLines: {
                          r: '1',
                          strokeWidth: '2',
                          stroke: R.color.white,
                        },
                        propsForHorizontalLabels: styles.labelStyles,
                        propsForVerticalLabels: styles.labelStyles,
                        propsForBackgroundLines: {
                          stroke: R.color.gray2,
                          strokeDasharray: 0,
                        },
                        useShadowColorFromDataset: true,
                        decimalPlaces: 2,
                        color: () => R.color.black,
                        labelColor: () => R.color.black,
                        barRadius: 1,
                      }}
                      style={{
                        marginTop: 40,
                      }}
                    />
                  </ScrollView>
                  <View style={[R.styles.rowView, styles.indicatorContainer]}>
                    <View style={R.styles.twoItemsRow}>
                      <View style={styles.redIndicator} />
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.gray}
                        align={'left'}
                        transform={'none'}>
                        Summer
                      </Text>
                    </View>

                    <View style={R.styles.twoItemsRow}>
                      <View style={styles.blueIndicator} />
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.gray}
                        align={'left'}
                        transform={'none'}>
                        Winter
                      </Text>
                    </View>

                    <View style={R.styles.twoItemsRow}>
                      <View style={styles.grayIndicator} />
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.gray}
                        align={'left'}
                        transform={'none'}>
                        Spring
                      </Text>
                    </View>

                    <View
                      style={{
                        ...R.styles.twoItemsRow,
                      }}>
                      <View style={styles.grayIndicator} />
                      <Text
                        variant={'body3'}
                        font={'InterRegular'}
                        color={R.color.gray}
                        align={'left'}
                        transform={'none'}>
                        Autumn
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </>
        </View>
        {Platform.OS === 'ios' && (
          <InsightsFilterModal isVisibleModal={isModal} isSeasonal={true} />
        )}
      </Modal>
      {Platform.OS === 'android' && (
        <InsightsFilterModal isVisibleModal={isModal} isSeasonal={true} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  header: {
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(20),
    borderBottomWidth: R.unit.scale(0.75),
    borderBottomColor: R.color.gray4,
    marginBottom: R.unit.scale(24),
  },
  contentView: {
    paddingHorizontal: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
  },

  horizontalScroll: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  tab: {
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(6),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
  modeButton: {
    padding: R.unit.scale(5),
    backgroundColor: R.color.gray6,
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: R.unit.scale(24),
  },
  indicatorContainer: {
    justifyContent: 'space-between',
    marginTop: R.unit.scale(26),
    marginBottom: R.unit.scale(36),
  },
  labelStyles: {
    fontFamily: 'Inter-Regular',
    fontSize: R.unit.scale(12),
    fill: R.color.gray,
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
  grayIndicator: {
    backgroundColor: R.color.gray4,
    height: R.unit.scale(12),
    width: R.unit.scale(12),
    borderRadius: R.unit.scale(2),
    marginRight: R.unit.scale(12),
  },
  grayIndicator: {
    backgroundColor: R.color.gray4,
    height: R.unit.scale(12),
    width: R.unit.scale(12),
    borderRadius: R.unit.scale(2),
    marginRight: R.unit.scale(12),
  },
});

export default SeasonalStaticsModal;
