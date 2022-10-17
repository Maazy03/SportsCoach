import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import R from '@components/utils/R';
import {
  VictoryChart,
  VictoryLine,
  VictoryGroup,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory-native';

function LineChart(props) {
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
        origin={{x: 0, y: 0}}
        height={R.unit.height(0.45)}
        padding={{
          top: R.unit.scale(100),
          right: R.unit.scale(50),
          bottom: R.unit.scale(30),
          left: R.unit.scale(50),
        }}
        width={R.unit.width(primData.length * 0.45)}
        containerComponent={
          <VictoryVoronoiContainer
            cornerRadius={10}
            flyoutWidth={100}
            flyoutHeight={50}
            pointerWidth={20}
            labels={({datum}) =>
              `${
                datum?.childName === 'line-chart-group-2-1'
                  ? `Hours: ${datum.y} h`
                  : `Income: ${datum.y} $`
              }  `
            }
            labelComponent={
              <VictoryTooltip
                cornerRadius={10}
                flyoutWidth={100}
                flyoutHeight={30}
                pointerWidth={20}
                pointerLength={60}
                flyoutStyle={styles.flyoutStyle}
                style={styles.tooltipStyle}
              />
            }
          />
        }>
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
          <VictoryLine
            domain={{x: [0.8, primData.length * 0.45], y: [0, 10]}}
            data={primData}
            alignment="start"
            style={{
              data: {
                stroke: R.color.mainColor,
                strokeWidth: 2,
              },
              labels: {fill: R.color.mainColor},
            }}
          />
          <VictoryLine
            domain={{y: [0, 400]}}
            data={secondaryData}
            alignment="start"
            style={{
              data: {
                stroke: R.color.hyperLinkColor,
                strokeWidth: 2,
              },
              labels: {fill: R.color.hyperLinkColor},
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </ScrollView>
  );
}
export default LineChart;

const styles = StyleSheet.create({
  chartLayout: {
    marginTop: R.unit.scale(40),
    marginBottom: R.unit.scale(-30),
    borderBottomRightRadius: 15,
    paddingRight: 40,
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
