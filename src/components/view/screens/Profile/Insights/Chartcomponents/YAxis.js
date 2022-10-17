import React from 'react';
import R from '@components/utils/R';
import {VictoryAxis as VictoryAxisC} from 'victory-native';

export const VictoryAxis = props => {
  return (
    <VictoryAxisC
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
  );
};
