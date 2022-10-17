import React from 'react';
import R from '@components/utils/R';
import {VictoryAxis as VictoryAxisC} from 'victory-native';

export const VictoryAxis = props => {
  return (
    <VictoryAxisC
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
  );
};
