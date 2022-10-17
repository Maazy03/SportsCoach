import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import R from '@components/utils/R';
// import {Calendar, Agenda} from 'react-native-calendars'; // 1.5.3
import Text from '@components/common/Text';

function AgendaCalendar(props) {
  const {item, removePic} = props;

  const events = [
    {
      start: '2017-09-07 00:30:00',
      end: '2017-09-07 01:30:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-07 01:30:00',
      end: '2017-09-07 02:20:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-07 04:10:00',
      end: '2017-09-07 04:40:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-07 01:05:00',
      end: '2017-09-07 01:45:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-07 14:30:00',
      end: '2017-09-07 16:30:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-08 01:20:00',
      end: '2017-09-08 02:20:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-08 04:10:00',
      end: '2017-09-08 04:40:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-08 00:45:00',
      end: '2017-09-08 01:45:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-08 11:30:00',
      end: '2017-09-08 12:30:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-09 01:30:00',
      end: '2017-09-09 02:00:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-09 03:10:00',
      end: '2017-09-09 03:40:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2017-09-09 00:10:00',
      end: '2017-09-09 01:45:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
  ];

  return <View style={styles.container}></View>;
}
export default AgendaCalendar;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'red',
    height: 400,
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
