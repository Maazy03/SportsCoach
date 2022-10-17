import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import R from '@components/utils/R';
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory-native';

function BarChart(props) {
  const primData = [
    {
      x: 'Week1',
      y: 50,
    },
    {
      x: 'Week2',
      y: 80,
    },
    {
      x: 'Week3',
      y: 40,
    },
    {x: 'Week4', y: 400},
  ];
  const secondaryData = [
    {
      x: 'Week1',
      y: 60,
    },
    {
      x: 'Week2',
      y: 70,
    },
    {
      x: 'Week3',
      y: 20,
    },
    {x: 'Week4', y: 30},
  ];

  return (
    <ScrollView horizontal={true}>
      <VictoryChart
        height={R.unit.height(0.45)}
        width={R.unit.width(primData.length * 0.45)}
        padding={{
          top: R.unit.scale(100),
          right: R.unit.scale(50),
          bottom: R.unit.scale(30),
          left: R.unit.scale(50),
        }}
        containerComponent={<VictoryVoronoiContainer />}>
        <VictoryAxis
          style={{
            axis: {
              stroke: R.color.gray2, //CHANGE COLOR OF X-AXIS
            },
            tickLabels: {
              fill: R.color.blackShade4, //CHANGE COLOR OF X-AXIS LABELS
            },
            grid: {
              stroke: 'transparent', //CHANGE COLOR OF X-AXIS GRID LINES
              strokeDasharray: 0,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={y => y}
          style={{
            axis: {
              stroke: 'transparent', //CHANGE COLOR OF Y-AXIS
            },
            tickLabels: {
              fill: R.color.blackShade4, //CHANGE COLOR OF Y-AXIS LABELS
            },
            grid: {
              stroke: R.color.gray2, //CHANGE COLOR OF Y-AXIS GRID LINES
              strokeDasharray: 0,
            },
          }}
        />
        <VictoryGroup offset={14}>
          <VictoryBar
            barWidth={() => R.unit.scale(10)}
            domain={{x: [0.7, primData.length * 0.23], y: [0, 10]}}
            data={primData}
            alignment="start"
            cornerRadius={{
              topLeft: () => 5,
              topRight: () => 5,
              bottomRight: () => 5,
              bottomLeft: () => 5,
            }}
            style={{
              data: {
                fill: R.color.mainColor,
              },
            }}
            labels={({datum}) => `Income: ${datum.y.toFixed(0)}$`}
            labelComponent={
              <VictoryTooltip
                flyoutWidth={100}
                flyoutHeight={40}
                pointerWidth={20}
                pointerLength={60}
                flyoutStyle={styles.flyoutStyle}
                style={styles.tooltipStyle}
              />
            }
          />
          <VictoryBar
            barWidth={() => R.unit.scale(10)}
            domain={{y: [0, 400]}}
            data={secondaryData}
            alignment="start"
            cornerRadius={{
              topLeft: () => 5,
              topRight: () => 5,
              bottomRight: () => 5,
              bottomLeft: () => 5,
            }}
            style={{
              data: {
                fill: R.color.hyperLinkColor,
              },
            }}
            labels={({datum}) => `Hours: ${datum.y.toFixed(0)}h`}
            labelComponent={
              <VictoryTooltip
                flyoutWidth={100}
                flyoutHeight={40}
                pointerWidth={20}
                pointerLength={60}
                flyoutStyle={styles.flyoutStyle}
                style={styles.tooltipStyle}
              />
            }
          />
        </VictoryGroup>
      </VictoryChart>
    </ScrollView>
  );
}
export default BarChart;

const styles = StyleSheet.create({
  chartLayout: {
    marginTop: R.unit.scale(40),
    marginBottom: R.unit.scale(40),
    borderBottomRightRadius: 15,
  },
  labels: {
    fontFamily: 'Inter-Regular',
    fontSize: R.unit.scale(10),
    fill: R.color.blackShade4,
  },
  lines: {
    stroke: R.color.gray2,
    strokeDasharray: 0,
  },
  flyoutStyle: {
    stroke: R.color.gray4,
    fill: R.color.white,
  },
  tooltipStyle: {
    fontSize: R.unit.scale(10),
    fill: R.color.blackShade4,
  },
});

// events={[
//   {
//     target: 'data',
//     eventHandlers: {
//       onToggle: ({nativeEvent}) => {
//         return [
//           {
//             // Add an event to reset all the points to the original color
//             target: 'labels',
//             eventKey: 'all',
//             mutation: () => ({active: false}),
//           },
//         ];
//       },
//       onPressOut: ({nativeEvent}) => {
//         return [
//           {
//             target: 'labels',
//             mutation: () => ({active: true}),
//           },
//         ];
//       },
//     },
//   },
// ]}
